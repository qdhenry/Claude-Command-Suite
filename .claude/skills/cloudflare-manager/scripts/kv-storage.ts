#!/usr/bin/env bun
/**
 * Cloudflare KV Storage Management
 *
 * Usage:
 *   bun scripts/kv-storage.ts create-namespace <name>
 *   bun scripts/kv-storage.ts list-namespaces
 *   bun scripts/kv-storage.ts delete-namespace <namespace-id>
 *   bun scripts/kv-storage.ts write <namespace-id> <key> <value>
 *   bun scripts/kv-storage.ts read <namespace-id> <key>
 *   bun scripts/kv-storage.ts delete <namespace-id> <key>
 *   bun scripts/kv-storage.ts list-keys <namespace-id>
 *   bun scripts/kv-storage.ts bulk-write <namespace-id> <json-file>
 *   bun scripts/kv-storage.ts bulk-delete <namespace-id> <key1> [key2...]
 *
 * Features:
 * - Create and manage KV namespaces
 * - CRUD operations on key-value pairs
 * - Bulk operations for efficiency
 * - List keys with pagination
 */

import { readFileSync, existsSync } from 'fs';
import {
  makeApiRequestWithRetry,
  getAccountId,
  validateNamespaceName,
  validateJson,
  parseArgs,
  printSuccess,
  printError,
  printInfo,
  CloudflareApiError,
} from './utils';

interface KVNamespace {
  id: string;
  title: string;
  supports_url_encoding?: boolean;
}

interface KVKey {
  name: string;
  expiration?: number;
  metadata?: any;
}

/**
 * Create a new KV namespace
 */
async function createNamespace(name: string): Promise<{ success: boolean; id?: string }> {
  try {
    validateNamespaceName(name);
    const accountId = await getAccountId();

    printInfo(`Creating KV namespace: ${name}`);

    const response = await makeApiRequestWithRetry<KVNamespace>(
      `/accounts/${accountId}/storage/kv/namespaces`,
      {
        method: 'POST',
        body: { title: name },
      }
    );

    const namespace = response.result;

    printSuccess(`KV namespace created successfully!`);
    console.log(`\n📦 Namespace: ${namespace.title}`);
    console.log(`🆔 ID: ${namespace.id}`);
    console.log('');

    return { success: true, id: namespace.id };
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to create KV namespace');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
    return { success: false };
  }
}

/**
 * List all KV namespaces
 */
async function listNamespaces(): Promise<void> {
  try {
    const accountId = await getAccountId();

    const response = await makeApiRequestWithRetry<KVNamespace[]>(
      `/accounts/${accountId}/storage/kv/namespaces`
    );

    const namespaces = response.result;

    if (!namespaces || namespaces.length === 0) {
      printInfo('No KV namespaces found.');
      return;
    }

    console.log(`\n📦 KV Namespaces (${namespaces.length}):\n`);

    for (const ns of namespaces) {
      console.log(`  ${ns.title}`);
      console.log(`    ID: ${ns.id}`);
      console.log('');
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to list KV namespaces');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Delete a KV namespace
 */
async function deleteNamespace(namespaceId: string): Promise<void> {
  try {
    const accountId = await getAccountId();

    printInfo(`Deleting KV namespace: ${namespaceId}`);

    await makeApiRequestWithRetry(
      `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}`,
      { method: 'DELETE' }
    );

    printSuccess(`KV namespace deleted successfully`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to delete KV namespace');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Write a key-value pair
 */
async function writeKey(
  namespaceId: string,
  key: string,
  value: string,
  options: { expiration?: number; metadata?: any } = {}
): Promise<void> {
  try {
    const accountId = await getAccountId();

    printInfo(`Writing key: ${key}`);

    // Build URL with query parameters
    const queryParams: Record<string, string> = {};
    if (options.expiration) {
      queryParams.expiration = String(options.expiration);
    }
    if (options.metadata) {
      queryParams.metadata = JSON.stringify(options.metadata);
    }

    await makeApiRequestWithRetry(
      `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`,
      {
        method: 'PUT',
        body: value,
        headers: { 'Content-Type': 'text/plain' },
        queryParams,
      }
    );

    printSuccess(`Key "${key}" written successfully`);

    if (options.expiration) {
      const expiresAt = new Date(options.expiration * 1000);
      console.log(`⏰ Expires: ${expiresAt.toLocaleString()}\n`);
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to write key');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Read a key's value
 */
async function readKey(namespaceId: string, key: string): Promise<void> {
  try {
    const accountId = await getAccountId();

    const response = await makeApiRequestWithRetry<string>(
      `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`
    );

    console.log(`\n📖 Key: ${key}`);
    console.log(`📄 Value:\n`);
    console.log(response.result);
    console.log('');
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      if (error.statusCode === 404) {
        printError(`Key "${key}" not found in namespace`);
      } else {
        printError('Failed to read key');
        printError(error.getUserMessage());
      }
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Delete a key
 */
async function deleteKey(namespaceId: string, key: string): Promise<void> {
  try {
    const accountId = await getAccountId();

    printInfo(`Deleting key: ${key}`);

    await makeApiRequestWithRetry(
      `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`,
      { method: 'DELETE' }
    );

    printSuccess(`Key "${key}" deleted successfully`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to delete key');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * List all keys in a namespace
 */
async function listKeys(namespaceId: string, limit: number = 100): Promise<void> {
  try {
    const accountId = await getAccountId();

    const response = await makeApiRequestWithRetry<{ keys: KVKey[]; list_complete: boolean }>(
      `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/keys`,
      {
        queryParams: { limit: String(limit) },
      }
    );

    const { keys, list_complete } = response.result;

    if (!keys || keys.length === 0) {
      printInfo('No keys found in namespace.');
      return;
    }

    console.log(`\n🔑 Keys (${keys.length}${!list_complete ? '+' : ''}):\n`);

    for (const key of keys) {
      console.log(`  ${key.name}`);
      if (key.expiration) {
        const expiresAt = new Date(key.expiration * 1000);
        console.log(`    Expires: ${expiresAt.toLocaleString()}`);
      }
      if (key.metadata) {
        console.log(`    Metadata: ${JSON.stringify(key.metadata)}`);
      }
      console.log('');
    }

    if (!list_complete) {
      printInfo('More keys available. Use pagination to see all keys.');
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to list keys');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Bulk write key-value pairs from JSON file
 */
async function bulkWrite(namespaceId: string, jsonPath: string): Promise<void> {
  try {
    const accountId = await getAccountId();

    if (!existsSync(jsonPath)) {
      throw new Error(`JSON file not found: ${jsonPath}`);
    }

    const content = readFileSync(jsonPath, 'utf-8');
    const data = validateJson(content);

    if (typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('JSON must be an object with key-value pairs');
    }

    const entries = Object.entries(data);
    printInfo(`Bulk writing ${entries.length} keys...`);

    // KV API supports bulk write, but we'll use individual writes for simplicity
    let successCount = 0;
    let failCount = 0;

    for (const [key, value] of entries) {
      try {
        const valueStr = typeof value === 'string' ? value : JSON.stringify(value);

        await makeApiRequestWithRetry(
          `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`,
          {
            method: 'PUT',
            body: valueStr,
            headers: { 'Content-Type': 'text/plain' },
          }
        );

        successCount++;
        console.log(`  ✅ ${key}`);
      } catch (error) {
        failCount++;
        console.log(`  ❌ ${key}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    console.log('');
    printSuccess(`Bulk write complete: ${successCount} succeeded, ${failCount} failed`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Bulk write failed');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Bulk delete keys
 */
async function bulkDelete(namespaceId: string, keys: string[]): Promise<void> {
  try {
    const accountId = await getAccountId();

    printInfo(`Bulk deleting ${keys.length} keys...`);

    // Use KV bulk delete API
    await makeApiRequestWithRetry(
      `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/bulk`,
      {
        method: 'DELETE',
        body: keys,
      }
    );

    printSuccess(`${keys.length} keys deleted successfully`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Bulk delete failed');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Main CLI handler
 */
async function main() {
  const { command, args, flags } = parseArgs(process.argv);

  if (!command) {
    console.log(`
Cloudflare KV Storage Management

Usage:
  bun scripts/kv-storage.ts create-namespace <name>
  bun scripts/kv-storage.ts list-namespaces
  bun scripts/kv-storage.ts delete-namespace <namespace-id>
  bun scripts/kv-storage.ts write <namespace-id> <key> <value>
  bun scripts/kv-storage.ts read <namespace-id> <key>
  bun scripts/kv-storage.ts delete <namespace-id> <key>
  bun scripts/kv-storage.ts list-keys <namespace-id>
  bun scripts/kv-storage.ts bulk-write <namespace-id> <json-file>
  bun scripts/kv-storage.ts bulk-delete <namespace-id> <key1> [key2...]

Examples:
  bun scripts/kv-storage.ts create-namespace user-sessions
  bun scripts/kv-storage.ts write abc123 "session:user1" '{"userId":"1"}'
  bun scripts/kv-storage.ts read abc123 "session:user1"
  bun scripts/kv-storage.ts list-keys abc123
    `);
    return;
  }

  switch (command) {
    case 'create-namespace': {
      const [name] = args;
      if (!name) {
        printError('Usage: create-namespace <name>');
        process.exit(1);
      }
      await createNamespace(name);
      break;
    }

    case 'list-namespaces':
      await listNamespaces();
      break;

    case 'delete-namespace': {
      const [namespaceId] = args;
      if (!namespaceId) {
        printError('Usage: delete-namespace <namespace-id>');
        process.exit(1);
      }
      await deleteNamespace(namespaceId);
      break;
    }

    case 'write': {
      const [namespaceId, key, value] = args;
      if (!namespaceId || !key || !value) {
        printError('Usage: write <namespace-id> <key> <value>');
        process.exit(1);
      }
      await writeKey(namespaceId, key, value);
      break;
    }

    case 'read': {
      const [namespaceId, key] = args;
      if (!namespaceId || !key) {
        printError('Usage: read <namespace-id> <key>');
        process.exit(1);
      }
      await readKey(namespaceId, key);
      break;
    }

    case 'delete': {
      const [namespaceId, key] = args;
      if (!namespaceId || !key) {
        printError('Usage: delete <namespace-id> <key>');
        process.exit(1);
      }
      await deleteKey(namespaceId, key);
      break;
    }

    case 'list-keys': {
      const [namespaceId] = args;
      if (!namespaceId) {
        printError('Usage: list-keys <namespace-id>');
        process.exit(1);
      }
      const limit = flags.limit ? parseInt(String(flags.limit)) : 100;
      await listKeys(namespaceId, limit);
      break;
    }

    case 'bulk-write': {
      const [namespaceId, jsonPath] = args;
      if (!namespaceId || !jsonPath) {
        printError('Usage: bulk-write <namespace-id> <json-file>');
        process.exit(1);
      }
      await bulkWrite(namespaceId, jsonPath);
      break;
    }

    case 'bulk-delete': {
      const [namespaceId, ...keys] = args;
      if (!namespaceId || keys.length === 0) {
        printError('Usage: bulk-delete <namespace-id> <key1> [key2...]');
        process.exit(1);
      }
      await bulkDelete(namespaceId, keys);
      break;
    }

    default:
      printError(`Unknown command: ${command}`);
      process.exit(1);
  }
}

// Run if called directly
if (import.meta.main) {
  main().catch((error) => {
    printError(`Fatal error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
}

export {
  createNamespace,
  listNamespaces,
  deleteNamespace,
  writeKey,
  readKey,
  deleteKey,
  listKeys,
  bulkWrite,
  bulkDelete,
};

#!/usr/bin/env bun
/**
 * Cloudflare Workers Deployment and Management
 *
 * Usage:
 *   bun scripts/workers.ts deploy <name> <script-path> [--kv-binding <namespace>] [--r2-binding <bucket>]
 *   bun scripts/workers.ts update <name> <script-path>
 *   bun scripts/workers.ts get <name>
 *   bun scripts/workers.ts list
 *   bun scripts/workers.ts delete <name>
 *   bun scripts/workers.ts logs <name> [--tail]
 *   bun scripts/workers.ts get-url <name>
 *
 * Features:
 * - Deploy new workers with automatic URL extraction
 * - Update existing worker code
 * - Bind KV namespaces and R2 buckets
 * - View worker details and logs
 * - Get worker URLs
 */

import { readFileSync, existsSync } from 'fs';
import {
  makeApiRequestWithRetry,
  getAccountId,
  validateWorkerName,
  parseArgs,
  printSuccess,
  printError,
  printInfo,
  CloudflareApiError,
} from './utils';

interface WorkerScript {
  id: string;
  etag: string;
  size: number;
  modified_on: string;
}

interface WorkerRoute {
  id: string;
  pattern: string;
  script: string;
}

interface WorkerBinding {
  type: string;
  name: string;
  namespace_id?: string;
  bucket_name?: string;
}

/**
 * Deploy a new worker
 */
async function deployWorker(
  name: string,
  scriptPath: string,
  options: {
    kvBindings?: Array<{ name: string; namespaceId: string }>;
    r2Bindings?: Array<{ name: string; bucketName: string }>;
  } = {}
): Promise<{ success: boolean; url?: string; id?: string }> {
  try {
    validateWorkerName(name);

    if (!existsSync(scriptPath)) {
      throw new Error(`Script file not found: ${scriptPath}`);
    }

    const scriptContent = readFileSync(scriptPath, 'utf-8');
    const accountId = await getAccountId();

    printInfo(`Deploying worker: ${name}`);

    // Build metadata with bindings
    const metadata: any = {
      body_part: 'script',
      bindings: [],
    };

    // Add KV bindings
    if (options.kvBindings && options.kvBindings.length > 0) {
      for (const binding of options.kvBindings) {
        metadata.bindings.push({
          type: 'kv_namespace',
          name: binding.name,
          namespace_id: binding.namespaceId,
        });
      }
    }

    // Add R2 bindings
    if (options.r2Bindings && options.r2Bindings.length > 0) {
      for (const binding of options.r2Bindings) {
        metadata.bindings.push({
          type: 'r2_bucket',
          name: binding.name,
          bucket_name: binding.bucketName,
        });
      }
    }

    // For Workers API, we need to use multipart/form-data
    // Since node-fetch doesn't handle this well, we'll use curl as fallback
    const result = await deployWorkerWithCurl(accountId, name, scriptContent, metadata);

    if (result.success) {
      // Get worker URL
      const url = await getWorkerUrl(accountId, name);

      printSuccess(`Worker deployed successfully!`);
      console.log(`\n📦 Worker: ${name}`);
      console.log(`🌐 URL: ${url}`);
      console.log(`🆔 Account ID: ${accountId}`);

      if (options.kvBindings && options.kvBindings.length > 0) {
        console.log(`\n🔗 KV Bindings:`);
        for (const binding of options.kvBindings) {
          console.log(`  - ${binding.name}: ${binding.namespaceId}`);
        }
      }

      if (options.r2Bindings && options.r2Bindings.length > 0) {
        console.log(`\n🔗 R2 Bindings:`);
        for (const binding of options.r2Bindings) {
          console.log(`  - ${binding.name}: ${binding.bucketName}`);
        }
      }

      console.log('');

      return { success: true, url, id: name };
    }

    return { success: false };
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Worker deployment failed');
      printError(error.getUserMessage());
    } else {
      printError(`Deployment error: ${error instanceof Error ? error.message : String(error)}`);
    }
    return { success: false };
  }
}

/**
 * Deploy worker using curl (for multipart/form-data support)
 */
async function deployWorkerWithCurl(
  accountId: string,
  name: string,
  scriptContent: string,
  metadata: any
): Promise<{ success: boolean }> {
  const { spawnSync } = await import('child_process');
  const { loadConfig } = await import('./utils');

  const config = loadConfig();

  // Write script to temp file
  const tmpScript = `/tmp/worker-${name}.js`;
  const tmpMetadata = `/tmp/worker-${name}-metadata.json`;

  await Bun.write(tmpScript, scriptContent);
  await Bun.write(tmpMetadata, JSON.stringify(metadata));

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${name}`;

  const curlArgs = [
    '-X', 'PUT',
    url,
    '-H', `Authorization: Bearer ${config.apiKey}`,
    '-F', `script=@${tmpScript};type=application/javascript`,
    '-F', `metadata=@${tmpMetadata};type=application/json`,
  ];

  const result = spawnSync('curl', curlArgs, {
    encoding: 'utf-8',
    stdio: 'pipe',
  });

  if (result.error) {
    throw new Error(`curl failed: ${result.error.message}`);
  }

  const response = JSON.parse(result.stdout);

  if (!response.success) {
    throw new CloudflareApiError(
      'Worker deployment failed',
      response.errors?.[0]?.code || 500,
      response.errors || []
    );
  }

  return { success: true };
}

/**
 * Get worker URL (auto-generated subdomain)
 */
async function getWorkerUrl(accountId: string, name: string): Promise<string> {
  try {
    // Get subdomain from account
    const response = await makeApiRequestWithRetry<{ subdomain: string }>(
      `/accounts/${accountId}/workers/subdomain`
    );

    const subdomain = response.result.subdomain;

    // Worker URL format: https://<worker-name>.<subdomain>.workers.dev
    return `https://${name}.${subdomain}.workers.dev`;
  } catch (error) {
    // If subdomain fetch fails, return generic URL
    return `https://${name}.<account>.workers.dev`;
  }
}

/**
 * Get worker details
 */
async function getWorker(name: string): Promise<void> {
  try {
    validateWorkerName(name);
    const accountId = await getAccountId();

    const response = await makeApiRequestWithRetry<WorkerScript>(
      `/accounts/${accountId}/workers/scripts/${name}`
    );

    const worker = response.result;
    const url = await getWorkerUrl(accountId, name);

    console.log(`\n📦 Worker: ${name}`);
    console.log(`🌐 URL: ${url}`);
    console.log(`📏 Size: ${worker.size} bytes`);
    console.log(`🕒 Modified: ${new Date(worker.modified_on).toLocaleString()}`);
    console.log(`🔖 ETag: ${worker.etag}`);
    console.log('');
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to get worker details');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * List all workers
 */
async function listWorkers(): Promise<void> {
  try {
    const accountId = await getAccountId();

    const response = await makeApiRequestWithRetry<Array<WorkerScript & { id: string }>>(
      `/accounts/${accountId}/workers/scripts`
    );

    const workers = response.result;

    if (!workers || workers.length === 0) {
      printInfo('No workers found.');
      return;
    }

    console.log(`\n📦 Workers (${workers.length}):\n`);

    for (const worker of workers) {
      const url = await getWorkerUrl(accountId, worker.id);
      console.log(`  ${worker.id}`);
      console.log(`    URL: ${url}`);
      console.log(`    Size: ${worker.size} bytes`);
      console.log(`    Modified: ${new Date(worker.modified_on).toLocaleString()}`);
      console.log('');
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to list workers');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Delete a worker
 */
async function deleteWorker(name: string): Promise<void> {
  try {
    validateWorkerName(name);
    const accountId = await getAccountId();

    printInfo(`Deleting worker: ${name}`);

    await makeApiRequestWithRetry(
      `/accounts/${accountId}/workers/scripts/${name}`,
      { method: 'DELETE' }
    );

    printSuccess(`Worker "${name}" deleted successfully`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to delete worker');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Update worker script
 */
async function updateWorker(name: string, scriptPath: string): Promise<void> {
  try {
    validateWorkerName(name);

    if (!existsSync(scriptPath)) {
      throw new Error(`Script file not found: ${scriptPath}`);
    }

    const scriptContent = readFileSync(scriptPath, 'utf-8');
    const accountId = await getAccountId();

    printInfo(`Updating worker: ${name}`);

    // Use same deployment method as deploy
    const metadata = { body_part: 'script', bindings: [] };
    await deployWorkerWithCurl(accountId, name, scriptContent, metadata);

    printSuccess(`Worker "${name}" updated successfully`);

    const url = await getWorkerUrl(accountId, name);
    console.log(`🌐 URL: ${url}\n`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to update worker');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Get worker logs (tail)
 */
async function getWorkerLogs(name: string, tail: boolean = false): Promise<void> {
  try {
    validateWorkerName(name);
    const accountId = await getAccountId();

    printInfo(`Fetching logs for worker: ${name}`);

    if (tail) {
      printInfo('Log tailing requires wrangler CLI. Install with: npm install -g wrangler');
      console.log(`\nRun: wrangler tail ${name}\n`);
    } else {
      printInfo('Worker logs are available via wrangler CLI or Cloudflare dashboard.');
      console.log(`\nDashboard: https://dash.cloudflare.com/${accountId}/workers/services/view/${name}/production/logs`);
      console.log(`CLI: wrangler tail ${name}\n`);
    }
  } catch (error) {
    printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Main CLI handler
 */
async function main() {
  const { command, args, flags } = parseArgs(process.argv);

  if (!command) {
    console.log(`
Cloudflare Workers Management

Usage:
  bun scripts/workers.ts deploy <name> <script-path> [options]
  bun scripts/workers.ts update <name> <script-path>
  bun scripts/workers.ts get <name>
  bun scripts/workers.ts list
  bun scripts/workers.ts delete <name>
  bun scripts/workers.ts logs <name> [--tail]
  bun scripts/workers.ts get-url <name>

Options:
  --kv-binding <namespace>    Bind KV namespace (format: NAME:NAMESPACE_ID)
  --r2-binding <bucket>       Bind R2 bucket (format: NAME:BUCKET_NAME)

Examples:
  bun scripts/workers.ts deploy api-handler ./worker.js
  bun scripts/workers.ts deploy app ./worker.js --kv-binding CACHE:abc123
  bun scripts/workers.ts list
  bun scripts/workers.ts get api-handler
    `);
    return;
  }

  switch (command) {
    case 'deploy': {
      const [name, scriptPath] = args;
      if (!name || !scriptPath) {
        printError('Usage: deploy <name> <script-path>');
        process.exit(1);
      }

      const kvBindings: Array<{ name: string; namespaceId: string }> = [];
      const r2Bindings: Array<{ name: string; bucketName: string }> = [];

      // Parse bindings
      if (flags['kv-binding']) {
        const binding = String(flags['kv-binding']);
        const [bindingName, namespaceId] = binding.split(':');
        if (bindingName && namespaceId) {
          kvBindings.push({ name: bindingName, namespaceId });
        }
      }

      if (flags['r2-binding']) {
        const binding = String(flags['r2-binding']);
        const [bindingName, bucketName] = binding.split(':');
        if (bindingName && bucketName) {
          r2Bindings.push({ name: bindingName, bucketName });
        }
      }

      await deployWorker(name, scriptPath, { kvBindings, r2Bindings });
      break;
    }

    case 'update': {
      const [name, scriptPath] = args;
      if (!name || !scriptPath) {
        printError('Usage: update <name> <script-path>');
        process.exit(1);
      }
      await updateWorker(name, scriptPath);
      break;
    }

    case 'get': {
      const [name] = args;
      if (!name) {
        printError('Usage: get <name>');
        process.exit(1);
      }
      await getWorker(name);
      break;
    }

    case 'list':
      await listWorkers();
      break;

    case 'delete': {
      const [name] = args;
      if (!name) {
        printError('Usage: delete <name>');
        process.exit(1);
      }
      await deleteWorker(name);
      break;
    }

    case 'logs': {
      const [name] = args;
      if (!name) {
        printError('Usage: logs <name> [--tail]');
        process.exit(1);
      }
      await getWorkerLogs(name, !!flags.tail);
      break;
    }

    case 'get-url': {
      const [name] = args;
      if (!name) {
        printError('Usage: get-url <name>');
        process.exit(1);
      }
      validateWorkerName(name);
      const accountId = await getAccountId();
      const url = await getWorkerUrl(accountId, name);
      console.log(url);
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

export { deployWorker, getWorker, listWorkers, deleteWorker, updateWorker, getWorkerUrl };

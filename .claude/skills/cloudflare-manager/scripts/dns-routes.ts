#!/usr/bin/env bun
/**
 * Cloudflare DNS and Worker Routes Management
 *
 * Usage:
 *   bun scripts/dns-routes.ts list-zones
 *   bun scripts/dns-routes.ts create-dns <zone-name> <type> <name> <content>
 *   bun scripts/dns-routes.ts list-dns <zone-name>
 *   bun scripts/dns-routes.ts delete-dns <zone-name> <record-id>
 *   bun scripts/dns-routes.ts create-route <zone-name> <pattern> <worker-name>
 *   bun scripts/dns-routes.ts list-routes <zone-name>
 *   bun scripts/dns-routes.ts delete-route <zone-name> <route-id>
 *
 * Features:
 * - Manage DNS records (A, AAAA, CNAME, TXT, etc.)
 * - Configure worker routes
 * - List zones and records
 * - Update routing configurations
 */

import {
  makeApiRequestWithRetry,
  getAccountId,
  parseArgs,
  printSuccess,
  printError,
  printInfo,
  CloudflareApiError,
} from './utils';

interface Zone {
  id: string;
  name: string;
  status: string;
  name_servers: string[];
}

interface DNSRecord {
  id: string;
  type: string;
  name: string;
  content: string;
  proxied: boolean;
  ttl: number;
}

interface WorkerRoute {
  id: string;
  pattern: string;
  script: string;
}

/**
 * Get zone ID by name
 */
async function getZoneId(zoneName: string): Promise<string> {
  try {
    const response = await makeApiRequestWithRetry<Zone[]>(
      `/zones`,
      {
        queryParams: { name: zoneName },
      }
    );

    if (!response.result || response.result.length === 0) {
      throw new Error(`Zone "${zoneName}" not found. Ensure the domain is added to your Cloudflare account.`);
    }

    return response.result[0].id;
  } catch (error) {
    throw error;
  }
}

/**
 * List all zones
 */
async function listZones(): Promise<void> {
  try {
    const response = await makeApiRequestWithRetry<Zone[]>(`/zones`);

    const zones = response.result;

    if (!zones || zones.length === 0) {
      printInfo('No zones found. Add a domain to your Cloudflare account first.');
      return;
    }

    console.log(`\n🌐 Zones (${zones.length}):\n`);

    for (const zone of zones) {
      console.log(`  ${zone.name}`);
      console.log(`    ID: ${zone.id}`);
      console.log(`    Status: ${zone.status}`);
      console.log(`    Name Servers: ${zone.name_servers.join(', ')}`);
      console.log('');
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to list zones');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Create DNS record
 */
async function createDnsRecord(
  zoneName: string,
  type: string,
  name: string,
  content: string,
  options: { proxied?: boolean; ttl?: number } = {}
): Promise<void> {
  try {
    const zoneId = await getZoneId(zoneName);

    printInfo(`Creating ${type} record: ${name} -> ${content}`);

    const response = await makeApiRequestWithRetry<DNSRecord>(
      `/zones/${zoneId}/dns_records`,
      {
        method: 'POST',
        body: {
          type: type.toUpperCase(),
          name,
          content,
          proxied: options.proxied ?? false,
          ttl: options.ttl ?? 1, // 1 = automatic
        },
      }
    );

    const record = response.result;

    printSuccess(`DNS record created successfully!`);
    console.log(`\n📝 Record: ${record.name}`);
    console.log(`🔤 Type: ${record.type}`);
    console.log(`📍 Content: ${record.content}`);
    console.log(`🔒 Proxied: ${record.proxied ? 'Yes' : 'No'}`);
    console.log(`🆔 ID: ${record.id}`);
    console.log('');
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to create DNS record');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * List DNS records for a zone
 */
async function listDnsRecords(zoneName: string): Promise<void> {
  try {
    const zoneId = await getZoneId(zoneName);

    const response = await makeApiRequestWithRetry<DNSRecord[]>(
      `/zones/${zoneId}/dns_records`
    );

    const records = response.result;

    if (!records || records.length === 0) {
      printInfo(`No DNS records found for zone "${zoneName}".`);
      return;
    }

    console.log(`\n📝 DNS Records for ${zoneName} (${records.length}):\n`);

    for (const record of records) {
      console.log(`  ${record.name} (${record.type})`);
      console.log(`    Content: ${record.content}`);
      console.log(`    Proxied: ${record.proxied ? 'Yes' : 'No'}`);
      console.log(`    TTL: ${record.ttl === 1 ? 'Auto' : record.ttl}`);
      console.log(`    ID: ${record.id}`);
      console.log('');
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to list DNS records');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Delete DNS record
 */
async function deleteDnsRecord(zoneName: string, recordId: string): Promise<void> {
  try {
    const zoneId = await getZoneId(zoneName);

    printInfo(`Deleting DNS record: ${recordId}`);

    await makeApiRequestWithRetry(
      `/zones/${zoneId}/dns_records/${recordId}`,
      { method: 'DELETE' }
    );

    printSuccess(`DNS record deleted successfully`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to delete DNS record');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Create worker route
 */
async function createWorkerRoute(
  zoneName: string,
  pattern: string,
  workerName: string
): Promise<void> {
  try {
    const zoneId = await getZoneId(zoneName);

    printInfo(`Creating worker route: ${pattern} -> ${workerName}`);

    const response = await makeApiRequestWithRetry<WorkerRoute>(
      `/zones/${zoneId}/workers/routes`,
      {
        method: 'POST',
        body: {
          pattern,
          script: workerName,
        },
      }
    );

    const route = response.result;

    printSuccess(`Worker route created successfully!`);
    console.log(`\n🛣️  Pattern: ${route.pattern}`);
    console.log(`⚙️  Worker: ${route.script}`);
    console.log(`🆔 ID: ${route.id}`);
    console.log('');
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to create worker route');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * List worker routes for a zone
 */
async function listWorkerRoutes(zoneName: string): Promise<void> {
  try {
    const zoneId = await getZoneId(zoneName);

    const response = await makeApiRequestWithRetry<WorkerRoute[]>(
      `/zones/${zoneId}/workers/routes`
    );

    const routes = response.result;

    if (!routes || routes.length === 0) {
      printInfo(`No worker routes found for zone "${zoneName}".`);
      return;
    }

    console.log(`\n🛣️  Worker Routes for ${zoneName} (${routes.length}):\n`);

    for (const route of routes) {
      console.log(`  ${route.pattern}`);
      console.log(`    Worker: ${route.script}`);
      console.log(`    ID: ${route.id}`);
      console.log('');
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to list worker routes');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Delete worker route
 */
async function deleteWorkerRoute(zoneName: string, routeId: string): Promise<void> {
  try {
    const zoneId = await getZoneId(zoneName);

    printInfo(`Deleting worker route: ${routeId}`);

    await makeApiRequestWithRetry(
      `/zones/${zoneId}/workers/routes/${routeId}`,
      { method: 'DELETE' }
    );

    printSuccess(`Worker route deleted successfully`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to delete worker route');
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
Cloudflare DNS and Worker Routes Management

Usage:
  bun scripts/dns-routes.ts list-zones
  bun scripts/dns-routes.ts create-dns <zone-name> <type> <name> <content> [--proxied] [--ttl <seconds>]
  bun scripts/dns-routes.ts list-dns <zone-name>
  bun scripts/dns-routes.ts delete-dns <zone-name> <record-id>
  bun scripts/dns-routes.ts create-route <zone-name> <pattern> <worker-name>
  bun scripts/dns-routes.ts list-routes <zone-name>
  bun scripts/dns-routes.ts delete-route <zone-name> <route-id>

DNS Record Types:
  A, AAAA, CNAME, TXT, MX, NS, SRV, CAA, etc.

Examples:
  bun scripts/dns-routes.ts create-dns example.com A api 192.168.1.1
  bun scripts/dns-routes.ts create-dns example.com CNAME www example.com --proxied
  bun scripts/dns-routes.ts create-route example.com "example.com/api/*" api-handler
  bun scripts/dns-routes.ts list-dns example.com
    `);
    return;
  }

  switch (command) {
    case 'list-zones':
      await listZones();
      break;

    case 'create-dns': {
      const [zoneName, type, name, content] = args;
      if (!zoneName || !type || !name || !content) {
        printError('Usage: create-dns <zone-name> <type> <name> <content>');
        process.exit(1);
      }
      await createDnsRecord(zoneName, type, name, content, {
        proxied: !!flags.proxied,
        ttl: flags.ttl ? parseInt(String(flags.ttl)) : undefined,
      });
      break;
    }

    case 'list-dns': {
      const [zoneName] = args;
      if (!zoneName) {
        printError('Usage: list-dns <zone-name>');
        process.exit(1);
      }
      await listDnsRecords(zoneName);
      break;
    }

    case 'delete-dns': {
      const [zoneName, recordId] = args;
      if (!zoneName || !recordId) {
        printError('Usage: delete-dns <zone-name> <record-id>');
        process.exit(1);
      }
      await deleteDnsRecord(zoneName, recordId);
      break;
    }

    case 'create-route': {
      const [zoneName, pattern, workerName] = args;
      if (!zoneName || !pattern || !workerName) {
        printError('Usage: create-route <zone-name> <pattern> <worker-name>');
        process.exit(1);
      }
      await createWorkerRoute(zoneName, pattern, workerName);
      break;
    }

    case 'list-routes': {
      const [zoneName] = args;
      if (!zoneName) {
        printError('Usage: list-routes <zone-name>');
        process.exit(1);
      }
      await listWorkerRoutes(zoneName);
      break;
    }

    case 'delete-route': {
      const [zoneName, routeId] = args;
      if (!zoneName || !routeId) {
        printError('Usage: delete-route <zone-name> <route-id>');
        process.exit(1);
      }
      await deleteWorkerRoute(zoneName, routeId);
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
  listZones,
  createDnsRecord,
  listDnsRecords,
  deleteDnsRecord,
  createWorkerRoute,
  listWorkerRoutes,
  deleteWorkerRoute,
  getZoneId,
};

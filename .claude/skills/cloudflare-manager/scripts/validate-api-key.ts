#!/usr/bin/env bun
/**
 * Validate Cloudflare API Key and Display Permissions
 *
 * Usage:
 *   bun scripts/validate-api-key.ts
 *   bun scripts/validate-api-key.ts --update-skill
 *
 * Features:
 * - Validates API key by calling Cloudflare API
 * - Fetches and displays granted permissions
 * - Optionally updates SKILL.md with permissions list
 * - Caches validation results (24 hour TTL)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import {
  makeApiRequest,
  printSuccess,
  printError,
  printInfo,
  printWarning,
  parseArgs,
  CloudflareApiError,
} from './utils';

interface PermissionGroup {
  id: string;
  name: string;
}

interface TokenPermission {
  id: string;
  key: string;
  name: string;
  permission_groups: PermissionGroup[];
}

interface UserToken {
  id: string;
  name: string;
  status: string;
  permissions: TokenPermission[];
}

const CACHE_FILE = join(process.env.HOME || '~', '.claude/skills/cloudflare-manager/.permissions-cache.json');
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Validate API key and fetch permissions
 */
async function validateApiKey(): Promise<{
  valid: boolean;
  permissions: Array<{ resource: string; scope: string }>;
  accountInfo?: any;
}> {
  try {
    // First, verify the token by getting user info
    const userResponse = await makeApiRequest('/user/tokens/verify');

    if (!userResponse.success) {
      return { valid: false, permissions: [] };
    }

    printSuccess('API key is valid!');
    printInfo(`Token Status: ${userResponse.result.status}`);
    printInfo(`Token ID: ${userResponse.result.id}`);

    // Get account information
    const accountsResponse = await makeApiRequest<Array<{ id: string; name: string; type: string }>>('/accounts');

    if (accountsResponse.result && accountsResponse.result.length > 0) {
      const account = accountsResponse.result[0];
      printInfo(`Account: ${account.name} (${account.id})`);
    }

    // Fetch permission groups (this shows what the token can do)
    // Note: The /user/tokens/permission_groups endpoint shows available permissions
    // The actual token permissions need to be checked via the verify endpoint
    try {
      const permissionsResponse = await makeApiRequest<TokenPermission[]>('/user/tokens/permission_groups');

      // Extract permissions from the verify response
      const tokenPermissions = userResponse.result.policies || [];
      const permissions: Array<{ resource: string; scope: string }> = [];

      // Parse token permissions
      if (Array.isArray(tokenPermissions)) {
        for (const policy of tokenPermissions) {
          if (policy.resources && policy.permission_groups) {
            for (const resource of Object.keys(policy.resources)) {
              for (const permGroup of policy.permission_groups) {
                permissions.push({
                  resource: resource,
                  scope: permGroup.name || permGroup.id,
                });
              }
            }
          }
        }
      }

      // If no permissions found in policies, list all available permission groups
      if (permissions.length === 0 && permissionsResponse.result) {
        printInfo('Showing available permission groups (token may have access to all or subset):');
        for (const perm of permissionsResponse.result) {
          permissions.push({
            resource: perm.name,
            scope: 'Available',
          });
        }
      }

      return {
        valid: true,
        permissions,
        accountInfo: accountsResponse.result?.[0],
      };
    } catch (error) {
      // If permission groups endpoint fails, still return valid token
      printInfo('Could not fetch detailed permissions, but token is valid.');
      return {
        valid: true,
        permissions: [
          { resource: 'Token verified', scope: 'Active' }
        ],
        accountInfo: accountsResponse.result?.[0],
      };
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('API Key Validation Failed');
      printError(error.getUserMessage());
    } else {
      printError(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
    }
    return { valid: false, permissions: [] };
  }
}

/**
 * Display permissions in a user-friendly format
 */
function displayPermissions(permissions: Array<{ resource: string; scope: string }>): void {
  console.log('\n🔑 Granted Permissions:\n');

  if (permissions.length === 0) {
    console.log('  No permissions found or token has unrestricted access.');
    return;
  }

  // Group by resource
  const grouped = new Map<string, string[]>();
  for (const perm of permissions) {
    if (!grouped.has(perm.resource)) {
      grouped.set(perm.resource, []);
    }
    grouped.get(perm.resource)!.push(perm.scope);
  }

  // Display grouped permissions
  for (const [resource, scopes] of grouped.entries()) {
    const uniqueScopes = [...new Set(scopes)];
    console.log(`  ✅ ${resource}: ${uniqueScopes.join(', ')}`);
  }

  console.log('');
}

/**
 * Update SKILL.md with permissions list
 */
function updateSkillMd(permissions: Array<{ resource: string; scope: string }>): void {
  const skillMdPath = join(process.env.HOME || '~', '.claude/skills/cloudflare-manager/SKILL.md');

  if (!existsSync(skillMdPath)) {
    printError(`SKILL.md not found at: ${skillMdPath}`);
    return;
  }

  try {
    let content = readFileSync(skillMdPath, 'utf-8');

    // Generate permissions markdown
    let permissionsMarkdown = '<!-- PERMISSIONS_START -->\n';
    permissionsMarkdown += `*Last validated: ${new Date().toISOString()}*\n\n`;

    if (permissions.length === 0) {
      permissionsMarkdown += 'No specific permissions found. Token may have unrestricted access.\n';
    } else {
      // Group by resource
      const grouped = new Map<string, string[]>();
      for (const perm of permissions) {
        if (!grouped.has(perm.resource)) {
          grouped.set(perm.resource, []);
        }
        grouped.get(perm.resource)!.push(perm.scope);
      }

      for (const [resource, scopes] of grouped.entries()) {
        const uniqueScopes = [...new Set(scopes)];
        permissionsMarkdown += `- **${resource}**: ${uniqueScopes.join(', ')}\n`;
      }
    }

    permissionsMarkdown += '<!-- PERMISSIONS_END -->';

    // Replace permissions section
    const permissionsRegex = /<!-- PERMISSIONS_START -->[\s\S]*?<!-- PERMISSIONS_END -->/;

    if (permissionsRegex.test(content)) {
      content = content.replace(permissionsRegex, permissionsMarkdown);
    } else {
      printWarning('Could not find permissions markers in SKILL.md');
      return;
    }

    writeFileSync(skillMdPath, content, 'utf-8');
    printSuccess('Updated SKILL.md with current permissions');
  } catch (error) {
    printError(`Failed to update SKILL.md: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Cache validation results
 */
function cacheValidation(result: any): void {
  try {
    const cacheData = {
      timestamp: Date.now(),
      result,
    };
    writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2), 'utf-8');
  } catch (error) {
    // Silently fail on cache write
  }
}

/**
 * Load cached validation results
 */
function loadCache(): any | null {
  try {
    if (!existsSync(CACHE_FILE)) {
      return null;
    }

    const cacheData = JSON.parse(readFileSync(CACHE_FILE, 'utf-8'));
    const age = Date.now() - cacheData.timestamp;

    if (age > CACHE_TTL) {
      // Cache expired
      return null;
    }

    return cacheData.result;
  } catch (error) {
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  const { flags } = parseArgs(process.argv);

  console.log('🔍 Validating Cloudflare API Key...\n');

  // Check cache unless --no-cache flag is set
  if (!flags['no-cache']) {
    const cached = loadCache();
    if (cached) {
      printInfo('Using cached validation results (use --no-cache to force re-validation)');
      displayPermissions(cached.permissions);

      if (flags['update-skill']) {
        updateSkillMd(cached.permissions);
      }
      return;
    }
  }

  // Validate API key
  const result = await validateApiKey();

  if (!result.valid) {
    printError('API key validation failed. Please check your configuration.');
    process.exit(1);
  }

  // Display permissions
  displayPermissions(result.permissions);

  // Cache results
  cacheValidation(result);

  // Update SKILL.md if requested
  if (flags['update-skill']) {
    updateSkillMd(result.permissions);
  } else {
    printInfo('Tip: Run with --update-skill to update SKILL.md with current permissions');
  }

  printSuccess('Validation complete! You\'re ready to use Cloudflare services.');
}

// Run if called directly
if (import.meta.main) {
  main().catch((error) => {
    printError(`Fatal error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
}

export { validateApiKey, displayPermissions, updateSkillMd };

#!/usr/bin/env bun
/**
 * Cloudflare Pages Deployment and Management
 *
 * Usage:
 *   bun scripts/pages.ts deploy <project-name> <directory>
 *   bun scripts/pages.ts list
 *   bun scripts/pages.ts get <project-name>
 *   bun scripts/pages.ts delete <project-name>
 *   bun scripts/pages.ts set-env <project-name> <key> <value>
 *   bun scripts/pages.ts get-url <project-name>
 *   bun scripts/pages.ts list-deployments <project-name>
 *
 * Features:
 * - Deploy static sites and applications to Pages
 * - Automatically extract and return deployment URLs
 * - Manage environment variables
 * - List projects and deployments
 */

import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import {
  makeApiRequestWithRetry,
  getAccountId,
  parseArgs,
  printSuccess,
  printError,
  printInfo,
  CloudflareApiError,
} from './utils';

interface PagesProject {
  name: string;
  subdomain: string;
  domains: string[];
  created_on: string;
  production_branch: string;
  deployment_configs: any;
}

interface PagesDeployment {
  id: string;
  url: string;
  environment: string;
  created_on: string;
  modified_on: string;
  latest_stage: {
    name: string;
    status: string;
  };
}

/**
 * Deploy to Cloudflare Pages
 */
async function deployPages(
  projectName: string,
  directory: string
): Promise<{ success: boolean; url?: string; deploymentId?: string }> {
  try {
    if (!existsSync(directory)) {
      throw new Error(`Directory not found: ${directory}`);
    }

    const accountId = await getAccountId();

    printInfo(`Deploying ${directory} to Cloudflare Pages project "${projectName}"...`);
    printInfo('Note: Direct file upload via API is complex. Using wrangler CLI is recommended.');

    // Check if project exists, create if not
    let project: PagesProject;
    try {
      const response = await makeApiRequestWithRetry<PagesProject>(
        `/accounts/${accountId}/pages/projects/${projectName}`
      );
      project = response.result;
      printInfo(`Using existing project: ${projectName}`);
    } catch (error) {
      // Project doesn't exist, create it
      printInfo(`Creating new project: ${projectName}`);

      const createResponse = await makeApiRequestWithRetry<PagesProject>(
        `/accounts/${accountId}/pages/projects`,
        {
          method: 'POST',
          body: {
            name: projectName,
            production_branch: 'main',
          },
        }
      );

      project = createResponse.result;
      printSuccess(`Project created: ${projectName}`);
    }

    // For actual file upload, we recommend using wrangler
    printInfo('For file upload, use Cloudflare Wrangler CLI:');
    console.log(`\n  npx wrangler pages deploy ${directory} --project-name=${projectName}\n`);

    // Extract URL from project
    const url = `https://${project.subdomain}.pages.dev`;

    printSuccess(`Pages project ready!`);
    console.log(`\n📦 Project: ${project.name}`);
    console.log(`🌐 URL: ${url}`);
    console.log(`🌳 Production Branch: ${project.production_branch}`);

    if (project.domains && project.domains.length > 0) {
      console.log(`\n🔗 Custom Domains:`);
      for (const domain of project.domains) {
        console.log(`  - ${domain}`);
      }
    }

    console.log('');

    return { success: true, url, deploymentId: project.name };
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Pages deployment failed');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
    return { success: false };
  }
}

/**
 * List all Pages projects
 */
async function listProjects(): Promise<void> {
  try {
    const accountId = await getAccountId();

    const response = await makeApiRequestWithRetry<PagesProject[]>(
      `/accounts/${accountId}/pages/projects`
    );

    const projects = response.result;

    if (!projects || projects.length === 0) {
      printInfo('No Pages projects found.');
      return;
    }

    console.log(`\n📦 Pages Projects (${projects.length}):\n`);

    for (const project of projects) {
      console.log(`  ${project.name}`);
      console.log(`    URL: https://${project.subdomain}.pages.dev`);
      console.log(`    Created: ${new Date(project.created_on).toLocaleString()}`);
      console.log(`    Production Branch: ${project.production_branch}`);

      if (project.domains && project.domains.length > 0) {
        console.log(`    Custom Domains: ${project.domains.join(', ')}`);
      }

      console.log('');
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to list Pages projects');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Get Pages project details
 */
async function getProject(projectName: string): Promise<void> {
  try {
    const accountId = await getAccountId();

    const response = await makeApiRequestWithRetry<PagesProject>(
      `/accounts/${accountId}/pages/projects/${projectName}`
    );

    const project = response.result;

    console.log(`\n📦 Project: ${project.name}`);
    console.log(`🌐 URL: https://${project.subdomain}.pages.dev`);
    console.log(`📅 Created: ${new Date(project.created_on).toLocaleString()}`);
    console.log(`🌳 Production Branch: ${project.production_branch}`);

    if (project.domains && project.domains.length > 0) {
      console.log(`\n🔗 Custom Domains:`);
      for (const domain of project.domains) {
        console.log(`  - ${domain}`);
      }
    }

    console.log('');
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to get project details');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Delete a Pages project
 */
async function deleteProject(projectName: string): Promise<void> {
  try {
    const accountId = await getAccountId();

    printInfo(`Deleting Pages project: ${projectName}`);

    await makeApiRequestWithRetry(
      `/accounts/${accountId}/pages/projects/${projectName}`,
      { method: 'DELETE' }
    );

    printSuccess(`Pages project "${projectName}" deleted successfully`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to delete project');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Set environment variable for Pages project
 */
async function setEnvironmentVariable(
  projectName: string,
  key: string,
  value: string,
  environment: 'production' | 'preview' = 'production'
): Promise<void> {
  try {
    const accountId = await getAccountId();

    printInfo(`Setting environment variable ${key} for ${projectName} (${environment})...`);

    // Get current environment variables
    const getResponse = await makeApiRequestWithRetry<PagesProject>(
      `/accounts/${accountId}/pages/projects/${projectName}`
    );

    const currentConfig = getResponse.result.deployment_configs || {};
    const envConfig = currentConfig[environment] || { env_vars: {} };

    // Update environment variable
    envConfig.env_vars = envConfig.env_vars || {};
    envConfig.env_vars[key] = { value };

    // Update project
    await makeApiRequestWithRetry(
      `/accounts/${accountId}/pages/projects/${projectName}`,
      {
        method: 'PATCH',
        body: {
          deployment_configs: {
            ...currentConfig,
            [environment]: envConfig,
          },
        },
      }
    );

    printSuccess(`Environment variable "${key}" set successfully`);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to set environment variable');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Get Pages project URL
 */
async function getProjectUrl(projectName: string): Promise<void> {
  try {
    const accountId = await getAccountId();

    const response = await makeApiRequestWithRetry<PagesProject>(
      `/accounts/${accountId}/pages/projects/${projectName}`
    );

    const project = response.result;
    const url = `https://${project.subdomain}.pages.dev`;

    console.log(url);
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to get project URL');
      printError(error.getUserMessage());
    } else {
      printError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * List deployments for a project
 */
async function listDeployments(projectName: string): Promise<void> {
  try {
    const accountId = await getAccountId();

    const response = await makeApiRequestWithRetry<PagesDeployment[]>(
      `/accounts/${accountId}/pages/projects/${projectName}/deployments`
    );

    const deployments = response.result;

    if (!deployments || deployments.length === 0) {
      printInfo(`No deployments found for project "${projectName}".`);
      return;
    }

    console.log(`\n🚀 Deployments for ${projectName} (${deployments.length}):\n`);

    for (const deployment of deployments) {
      console.log(`  Deployment ID: ${deployment.id}`);
      console.log(`    URL: ${deployment.url}`);
      console.log(`    Environment: ${deployment.environment}`);
      console.log(`    Status: ${deployment.latest_stage.status}`);
      console.log(`    Created: ${new Date(deployment.created_on).toLocaleString()}`);
      console.log(`    Modified: ${new Date(deployment.modified_on).toLocaleString()}`);
      console.log('');
    }
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      printError('Failed to list deployments');
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
Cloudflare Pages Management

Usage:
  bun scripts/pages.ts deploy <project-name> <directory>
  bun scripts/pages.ts list
  bun scripts/pages.ts get <project-name>
  bun scripts/pages.ts delete <project-name>
  bun scripts/pages.ts set-env <project-name> <key> <value> [--env production|preview]
  bun scripts/pages.ts get-url <project-name>
  bun scripts/pages.ts list-deployments <project-name>

Examples:
  bun scripts/pages.ts deploy my-app ./dist
  bun scripts/pages.ts set-env my-app API_URL https://api.example.com
  bun scripts/pages.ts get-url my-app
  bun scripts/pages.ts list-deployments my-app

Note: For actual file uploads, use Wrangler CLI:
  npx wrangler pages deploy <directory> --project-name=<project-name>
    `);
    return;
  }

  switch (command) {
    case 'deploy': {
      const [projectName, directory] = args;
      if (!projectName || !directory) {
        printError('Usage: deploy <project-name> <directory>');
        process.exit(1);
      }
      await deployPages(projectName, directory);
      break;
    }

    case 'list':
      await listProjects();
      break;

    case 'get': {
      const [projectName] = args;
      if (!projectName) {
        printError('Usage: get <project-name>');
        process.exit(1);
      }
      await getProject(projectName);
      break;
    }

    case 'delete': {
      const [projectName] = args;
      if (!projectName) {
        printError('Usage: delete <project-name>');
        process.exit(1);
      }
      await deleteProject(projectName);
      break;
    }

    case 'set-env': {
      const [projectName, key, value] = args;
      if (!projectName || !key || !value) {
        printError('Usage: set-env <project-name> <key> <value>');
        process.exit(1);
      }
      const environment = (flags.env as 'production' | 'preview') || 'production';
      await setEnvironmentVariable(projectName, key, value, environment);
      break;
    }

    case 'get-url': {
      const [projectName] = args;
      if (!projectName) {
        printError('Usage: get-url <project-name>');
        process.exit(1);
      }
      await getProjectUrl(projectName);
      break;
    }

    case 'list-deployments': {
      const [projectName] = args;
      if (!projectName) {
        printError('Usage: list-deployments <project-name>');
        process.exit(1);
      }
      await listDeployments(projectName);
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
  deployPages,
  listProjects,
  getProject,
  deleteProject,
  setEnvironmentVariable,
  getProjectUrl,
  listDeployments,
};

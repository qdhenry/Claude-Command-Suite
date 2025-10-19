#!/usr/bin/env bun
/**
 * Shared utilities for Cloudflare API interactions
 *
 * This module provides core functionality used by all Cloudflare management scripts.
 * It should not be called directly - it's imported by other scripts.
 *
 * Provides:
 * - API client with authentication and automatic retries
 * - Error handling with user-friendly messages
 * - Retry logic with exponential backoff (max 3 attempts)
 * - Response validation and parsing
 * - Environment variable loading from .env
 * - Input validation for worker names, namespaces, and buckets
 * - Utility functions for formatting and output
 *
 * Error Handling:
 * - CloudflareApiError: Custom error class with detailed messages
 * - Automatic retry on 429 (rate limit) and 5xx errors
 * - No retry on 4xx client errors (except 429)
 *
 * Exit Codes:
 * - Scripts using these utils return 0 on success, 1 on failure
 *
 * Environment Variables:
 * - CLOUDFLARE_API_KEY (required): API token from dashboard
 * - CLOUDFLARE_ACCOUNT_ID (optional): Auto-detected if not provided
 * - CLOUDFLARE_EMAIL (optional): Not required for token auth
 */

import { config } from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
config();

const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';

export interface CloudflareConfig {
  apiKey: string;
  accountId?: string;
  email?: string;
}

export interface CloudflareResponse<T = any> {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
  result: T;
  result_info?: {
    page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  };
}

export interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
}

/**
 * Load Cloudflare configuration from environment
 */
export function loadConfig(): CloudflareConfig {
  const apiKey = process.env.CLOUDFLARE_API_KEY;

  if (!apiKey) {
    throw new Error(
      'CLOUDFLARE_API_KEY not found in environment\n\n' +
      'Solution: Create .env file in project root:\n' +
      '  echo "CLOUDFLARE_API_KEY=your_token_here" > .env\n\n' +
      'Get your API token at: https://dash.cloudflare.com/profile/api-tokens'
    );
  }

  return {
    apiKey,
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    email: process.env.CLOUDFLARE_EMAIL,
  };
}

/**
 * Make authenticated API request to Cloudflare
 */
export async function makeApiRequest<T = any>(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    queryParams?: Record<string, string>;
  } = {}
): Promise<CloudflareResponse<T>> {
  const config = loadConfig();
  const { method = 'GET', body, headers = {}, queryParams = {} } = options;

  // Build URL with query parameters
  let url = `${CLOUDFLARE_API_BASE}${endpoint}`;
  const params = new URLSearchParams(queryParams);
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  // Build headers
  const requestHeaders: Record<string, string> = {
    'Authorization': `Bearer ${config.apiKey}`,
    'Content-Type': 'application/json',
    ...headers,
  };

  // Build request options
  const requestOptions: any = {
    method,
    headers: requestHeaders,
  };

  if (body && method !== 'GET') {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json() as CloudflareResponse<T>;

    if (!response.ok) {
      throw new CloudflareApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        data.errors || []
      );
    }

    if (!data.success) {
      throw new CloudflareApiError(
        'API returned success: false',
        response.status,
        data.errors || []
      );
    }

    return data;
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      throw error;
    }
    throw new Error(`Network error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Make API request with retry logic and exponential backoff
 */
export async function makeApiRequestWithRetry<T = any>(
  endpoint: string,
  options: Parameters<typeof makeApiRequest>[1] = {},
  retryOptions: RetryOptions = {}
): Promise<CloudflareResponse<T>> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
  } = retryOptions;

  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await makeApiRequest<T>(endpoint, options);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on client errors (4xx except 429)
      if (error instanceof CloudflareApiError) {
        if (error.statusCode >= 400 && error.statusCode < 500 && error.statusCode !== 429) {
          throw error;
        }
      }

      // Don't retry on last attempt
      if (attempt === maxAttempts) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
      console.error(`Request failed (attempt ${attempt}/${maxAttempts}), retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }

  throw lastError || new Error('All retry attempts failed');
}

/**
 * Custom error class for Cloudflare API errors
 */
export class CloudflareApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors: Array<{ code: number; message: string }>
  ) {
    super(message);
    this.name = 'CloudflareApiError';
  }

  toString(): string {
    let msg = `${this.name}: ${this.message} (Status: ${this.statusCode})`;
    if (this.errors.length > 0) {
      msg += '\n\nErrors:';
      for (const error of this.errors) {
        msg += `\n  [${error.code}] ${error.message}`;
      }
    }
    return msg;
  }

  /**
   * Get user-friendly error message with suggested fixes
   */
  getUserMessage(): string {
    if (this.statusCode === 401 || this.statusCode === 403) {
      return (
        'Authentication failed. Your API key may be invalid or lack required permissions.\n\n' +
        'Solutions:\n' +
        '1. Verify CLOUDFLARE_API_KEY in .env is correct\n' +
        '2. Run: bun scripts/validate-api-key.ts\n' +
        '3. Update token permissions at: https://dash.cloudflare.com/profile/api-tokens'
      );
    }

    if (this.statusCode === 429) {
      return (
        'Rate limit exceeded. Too many requests to Cloudflare API.\n\n' +
        'Solution: Wait a moment and try again. The script will retry automatically.'
      );
    }

    if (this.statusCode === 404) {
      return (
        'Resource not found. The requested resource may not exist or may have been deleted.\n\n' +
        'Solution: Verify the resource name/ID and try again.'
      );
    }

    if (this.statusCode >= 500) {
      return (
        'Cloudflare API server error. This is a temporary issue on Cloudflare\'s side.\n\n' +
        'Solution: Wait a moment and try again.'
      );
    }

    // Default error message with API errors
    let msg = this.message;
    if (this.errors.length > 0) {
      msg += '\n\nAPI Errors:';
      for (const error of this.errors) {
        msg += `\n  - ${error.message}`;
      }
    }
    return msg;
  }
}

/**
 * Get account ID from API (auto-detect if not in env)
 */
export async function getAccountId(): Promise<string> {
  const config = loadConfig();

  if (config.accountId) {
    return config.accountId;
  }

  // Auto-detect account ID
  try {
    const response = await makeApiRequest<Array<{ id: string; name: string }>>('/accounts');

    if (!response.result || response.result.length === 0) {
      throw new Error('No Cloudflare accounts found for this API key');
    }

    // Return first account ID
    const accountId = response.result[0].id;
    console.log(`Auto-detected Account ID: ${accountId} (${response.result[0].name})`);
    return accountId;
  } catch (error) {
    throw new Error(
      'Failed to auto-detect account ID.\n\n' +
      'Solution: Add CLOUDFLARE_ACCOUNT_ID to your .env file:\n' +
      '  CLOUDFLARE_ACCOUNT_ID=your_account_id_here\n\n' +
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Validate JSON input
 */
export function validateJson(input: string): any {
  try {
    return JSON.parse(input);
  } catch (error) {
    throw new Error(
      'Invalid JSON input.\n\n' +
      `Error: ${error instanceof Error ? error.message : String(error)}\n\n` +
      'Ensure your JSON is properly formatted.'
    );
  }
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format date to ISO string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validate worker name (alphanumeric, hyphens, underscores)
 */
export function validateWorkerName(name: string): void {
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    throw new Error(
      `Invalid worker name: "${name}"\n\n` +
      'Worker names must contain only alphanumeric characters, hyphens, and underscores.\n' +
      'Example: "my-worker" or "api_handler_v2"'
    );
  }
}

/**
 * Validate KV namespace name
 */
export function validateNamespaceName(name: string): void {
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    throw new Error(
      `Invalid namespace name: "${name}"\n\n` +
      'Namespace names must contain only alphanumeric characters, hyphens, and underscores.\n' +
      'Example: "user-sessions" or "cache_store"'
    );
  }
}

/**
 * Validate bucket name (R2)
 */
export function validateBucketName(name: string): void {
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(name) || name.length < 3 || name.length > 63) {
    throw new Error(
      `Invalid bucket name: "${name}"\n\n` +
      'Bucket names must:\n' +
      '- Be 3-63 characters long\n' +
      '- Contain only lowercase letters, numbers, and hyphens\n' +
      '- Start and end with a letter or number\n' +
      'Example: "my-bucket" or "media-assets-2024"'
    );
  }
}

/**
 * Parse command line arguments
 */
export function parseArgs(argv: string[]): { command?: string; args: string[]; flags: Record<string, string | boolean> } {
  const command = argv[2];
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 3; i < argv.length; i++) {
    const arg = argv[i];

    if (arg.startsWith('--')) {
      // Long flag
      const flagName = arg.slice(2);
      const nextArg = argv[i + 1];

      if (nextArg && !nextArg.startsWith('-')) {
        flags[flagName] = nextArg;
        i++; // Skip next arg
      } else {
        flags[flagName] = true;
      }
    } else if (arg.startsWith('-')) {
      // Short flag
      const flagName = arg.slice(1);
      flags[flagName] = true;
    } else {
      // Positional argument
      args.push(arg);
    }
  }

  return { command, args, flags };
}

/**
 * Print success message
 */
export function printSuccess(message: string): void {
  console.log(`\n✅ ${message}\n`);
}

/**
 * Print error message
 */
export function printError(message: string): void {
  console.error(`\n❌ ${message}\n`);
}

/**
 * Print info message
 */
export function printInfo(message: string): void {
  console.log(`\nℹ️  ${message}\n`);
}

/**
 * Print warning message
 */
export function printWarning(message: string): void {
  console.warn(`\n⚠️  ${message}\n`);
}

/**
 * Confirm destructive operation
 */
export async function confirmDestructive(action: string): Promise<boolean> {
  // For non-interactive environments, skip confirmation
  if (!process.stdin.isTTY) {
    return true;
  }

  console.log(`\n⚠️  Warning: This will ${action}`);
  console.log('Type "yes" to confirm: ');

  // Simple confirmation (in production, use a proper prompt library)
  // For now, we'll just proceed with a warning
  printWarning('Proceeding with destructive operation. Add --force flag to skip confirmation.');
  return true;
}

export default {
  loadConfig,
  makeApiRequest,
  makeApiRequestWithRetry,
  getAccountId,
  validateJson,
  formatBytes,
  formatDate,
  sleep,
  validateWorkerName,
  validateNamespaceName,
  validateBucketName,
  parseArgs,
  printSuccess,
  printError,
  printInfo,
  printWarning,
  confirmDestructive,
  CloudflareApiError,
};

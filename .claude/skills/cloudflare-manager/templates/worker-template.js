/**
 * Cloudflare Worker Template
 *
 * This is a basic worker template with a fetch event handler.
 * Customize this template for your specific use case.
 *
 * Quick Start:
 * 1. Copy this template: cp templates/worker-template.js my-worker.js
 * 2. Customize the handleRequest function
 * 3. Deploy: bun scripts/workers.ts deploy my-worker ./my-worker.js
 *
 * Features demonstrated:
 * - Basic routing
 * - JSON responses
 * - Error handling
 * - KV storage examples (commented)
 * - R2 storage examples (commented)
 * - External API calls (commented)
 * - CORS headers (commented)
 *
 * Performance tips:
 * - Keep script size under 1MB for fast cold starts
 * - Use async/await for non-blocking operations
 * - Cache frequently accessed data in KV
 * - Set appropriate Cache-Control headers
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Handle incoming requests
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const url = new URL(request.url);

  // Example: Simple routing
  switch (url.pathname) {
    case '/':
      return new Response('Hello from Cloudflare Worker!', {
        headers: { 'content-type': 'text/plain' },
      });

    case '/json':
      return new Response(JSON.stringify({
        message: 'Hello from Cloudflare Worker!',
        timestamp: new Date().toISOString(),
        url: request.url,
        method: request.method,
      }), {
        headers: { 'content-type': 'application/json' },
      });

    case '/api':
      return handleApi(request);

    default:
      return new Response('Not Found', { status: 404 });
  }
}

/**
 * Handle API requests
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleApi(request) {
  // Example: Handle different HTTP methods
  switch (request.method) {
    case 'GET':
      return new Response(JSON.stringify({
        status: 'ok',
        data: 'GET request handled',
      }), {
        headers: { 'content-type': 'application/json' },
      });

    case 'POST':
      try {
        const body = await request.json();
        return new Response(JSON.stringify({
          status: 'ok',
          received: body,
        }), {
          headers: { 'content-type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({
          status: 'error',
          message: 'Invalid JSON',
        }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }

    default:
      return new Response('Method Not Allowed', { status: 405 });
  }
}

/**
 * Example: Using KV storage (if bound)
 *
 * To use KV storage in your worker:
 * 1. Create namespace: bun scripts/kv-storage.ts create-namespace my-cache
 * 2. Save the namespace ID (e.g., abc123)
 * 3. Deploy with binding: bun scripts/workers.ts deploy my-worker ./worker.js --kv-binding CACHE:abc123
 *
 * KV Best Practices:
 * - Use for read-heavy workloads (KV is eventually consistent)
 * - Max value size: 25 MB
 * - Max key size: 512 bytes
 * - Set expirationTtl to auto-cleanup old data
 * - Use JSON.stringify/parse for objects
 *
 * Example implementation:
 */
/*
async function handleWithKV(request) {
  const cacheKey = 'user-data-123';

  // Try to get from cache
  const cached = await CACHE.get(cacheKey);
  if (cached) {
    return new Response(cached, {
      headers: {
        'content-type': 'application/json',
        'x-cache': 'HIT',
      },
    });
  }

  // Fetch fresh data
  const freshData = JSON.stringify({
    user: 'John Doe',
    timestamp: new Date().toISOString(),
  });

  // Store in cache with 60 second TTL
  await CACHE.put(cacheKey, freshData, { expirationTtl: 60 });

  return new Response(freshData, {
    headers: {
      'content-type': 'application/json',
      'x-cache': 'MISS',
    },
  });
}
*/

/**
 * Example: Using R2 storage (if bound)
 *
 * To use R2 storage in your worker:
 * 1. Create bucket: bun scripts/r2-storage.ts create-bucket my-files
 * 2. Upload files: bun scripts/r2-storage.ts upload my-files ./file.txt file.txt
 * 3. Deploy with binding: bun scripts/workers.ts deploy my-worker ./worker.js --r2-binding BUCKET:my-files
 *
 * R2 Best Practices:
 * - Use for large files (R2 has no file size limit)
 * - No egress fees when accessed from Workers
 * - Supports standard S3 operations
 * - Set appropriate caching headers
 * - Use ETags for conditional requests
 *
 * Example implementation:
 */
/*
async function handleWithR2(request) {
  const url = new URL(request.url);
  const objectKey = url.pathname.slice(1); // Remove leading /

  // Get object from R2
  const object = await BUCKET.get(objectKey);

  if (!object) {
    return new Response('File not found', { status: 404 });
  }

  // Check for conditional request (ETag)
  const ifNoneMatch = request.headers.get('if-none-match');
  if (ifNoneMatch && ifNoneMatch === object.etag) {
    return new Response(null, { status: 304 }); // Not Modified
  }

  return new Response(object.body, {
    headers: {
      'content-type': object.httpMetadata.contentType || 'application/octet-stream',
      'cache-control': 'public, max-age=3600',
      'etag': object.etag,
      'content-length': object.size.toString(),
    },
  });
}
*/

/**
 * Example: Fetch from external API
 *
 * Best practices for external API calls:
 * - Always set timeouts to prevent hanging requests
 * - Cache responses when appropriate
 * - Handle errors gracefully
 * - Use AbortController for request timeouts
 * - Add retry logic for transient failures
 *
 * Example implementation:
 */
/*
async function handleExternalApi(request) {
  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch('https://api.example.com/data', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Cloudflare-Worker/1.0',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch data',
      message: error.message,
    }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }
}
*/

/**
 * Example: Add CORS headers
 *
 * Use CORS when your worker serves an API consumed by web browsers.
 *
 * Security considerations:
 * - Use specific origins instead of '*' in production
 * - Only allow necessary HTTP methods
 * - Limit allowed headers
 * - Set appropriate max-age for preflight cache
 *
 * Example implementation:
 */
/*
function handleCors(request) {
  // Handle OPTIONS (preflight) request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Change to specific origin in production
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
      },
    });
  }

  // For actual requests, add CORS headers to response
  return addCorsHeaders(new Response('Your API response'));
}

function addCorsHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*'); // Change in production
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
*/

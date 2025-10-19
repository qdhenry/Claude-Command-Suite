# Cloudflare Manager Skill

A comprehensive Claude Code skill for managing Cloudflare services including Workers, KV Storage, R2 buckets, Pages, DNS, and routing.

## Features

- **Workers Deployment**: Deploy and manage Cloudflare Workers with automatic URL extraction
- **KV Storage**: Create namespaces, read/write data, bulk operations
- **R2 Storage**: Manage buckets and objects (S3-compatible storage)
- **Pages**: Deploy static sites and configure environments
- **DNS & Routing**: Configure DNS records and worker routes
- **API Validation**: Validate credentials and check permissions
- **Error Handling**: Automatic retries with exponential backoff
- **URL Auto-Extraction**: Automatically captures and returns deployment URLs

## Quick Start

### 1. Installation

```bash
# Install dependencies
cd ~/.claude/skills/cloudflare-manager
bun install
```

### 2. Configuration

Create a `.env` file in your project root (not in the skill directory):

```bash
CLOUDFLARE_API_KEY=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id  # Optional, auto-detected
```

**Getting your API token**:
1. Visit https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template or create custom token
4. Required permissions:
   - Account > Workers Scripts > Edit
   - Account > Workers KV Storage > Edit
   - Account > Workers R2 Storage > Edit
   - Account > Cloudflare Pages > Edit
   - Zone > DNS > Edit (if using custom domains)

### 3. Validation

Verify your setup:

```bash
cd ~/.claude/skills/cloudflare-manager
bun scripts/validate-api-key.ts
```

Expected output:
```
✅ API key is valid!
ℹ️  Token Status: active
ℹ️  Account: Your Account Name (abc123...)

🔑 Granted Permissions:
  ✅ Workers Scripts: Edit
  ✅ Workers KV Storage: Edit
  ✅ Workers R2 Storage: Edit
```

## Usage Examples

### Deploy a Worker

```bash
# Create worker script
cat > hello-worker.js << 'EOF'
addEventListener('fetch', event => {
  event.respondWith(new Response('Hello World!'));
});
EOF

# Deploy
bun scripts/workers.ts deploy hello-worker ./hello-worker.js

# Returns: https://hello-worker.username.workers.dev
```

### Use with Claude Code

```
User: "Deploy a new Cloudflare worker named 'api-handler' and return the URL"

Claude: [Uses cloudflare-manager skill]
        Deployed worker: https://api-handler.username.workers.dev
```

### Create KV Storage

```bash
# Create namespace
bun scripts/kv-storage.ts create-namespace user-sessions
# Returns: Namespace ID (save this!)

# Write data
bun scripts/kv-storage.ts write <namespace-id> "user:123" '{"name":"John"}'

# Read data
bun scripts/kv-storage.ts read <namespace-id> "user:123"
```

### Manage R2 Buckets

```bash
# Create bucket
bun scripts/r2-storage.ts create-bucket my-files

# Upload file
bun scripts/r2-storage.ts upload my-files ./photo.jpg images/photo.jpg

# List objects
bun scripts/r2-storage.ts list-objects my-files
```

## Documentation

- **[SKILL.md](SKILL.md)** - Main skill documentation with quick start guide
- **[examples.md](examples.md)** - Comprehensive examples and advanced patterns
- **[templates/](templates/)** - Worker and configuration templates

## Project Structure

```
cloudflare-manager/
├── SKILL.md              # Main skill documentation
├── README.md             # This file
├── examples.md           # Advanced examples and patterns
├── package.json          # Dependencies
├── scripts/              # Deployment scripts
│   ├── validate-api-key.ts  # API key validation
│   ├── workers.ts            # Worker management
│   ├── kv-storage.ts         # KV namespace operations
│   ├── r2-storage.ts         # R2 bucket operations
│   ├── pages.ts              # Pages deployment
│   ├── dns-routes.ts         # DNS and routing
│   └── utils.ts              # Shared utilities
└── templates/            # Starter templates
    ├── worker-template.js     # Basic worker template
    └── wrangler.toml.template # Wrangler config template
```

## Requirements

- **Bun**: Runtime for executing scripts
- **Cloudflare Account**: Free or paid account
- **API Token**: With appropriate permissions
- **Internet Connection**: For API calls

## Best Practices

### Security
- Never commit `.env` files - add to `.gitignore`
- Use token-based authentication (not API keys)
- Rotate tokens every 90 days
- Use least-privilege permissions
- Store secrets via `wrangler secret put`

### Performance
- Keep worker scripts under 1MB
- Use KV for read-heavy workloads
- Use R2 for large files (>25MB)
- Set appropriate cache TTLs
- Enable compression for text responses

### Development
- Test locally with `wrangler dev`
- Use staging before production
- Version your workers: `api-v1`, `api-v2`
- Monitor logs: `wrangler tail worker-name`
- Document namespace IDs and bucket names

## Troubleshooting

### "CLOUDFLARE_API_KEY not found in environment"

**Solution**: Create `.env` file in your project root:
```bash
cd /path/to/your/project
echo "CLOUDFLARE_API_KEY=your_token_here" > .env
```

### "Worker deployment failed"

**Solutions**:
1. Check script syntax: `node --check ./worker.js`
2. Verify file exists: `ls -lh ./worker.js`
3. Re-validate API key: `bun scripts/validate-api-key.ts --no-cache`
4. Check worker name (alphanumeric, hyphens, underscores only)

### "API rate limit exceeded (429)"

**Solution**: Scripts automatically retry with exponential backoff. Wait 1-2 minutes before manual retry.

### "KV namespace not found"

**Solutions**:
1. List namespaces: `bun scripts/kv-storage.ts list-namespaces`
2. Verify using namespace ID (not name)
3. Check namespace wasn't deleted
4. Ensure API token has KV permissions

For more troubleshooting, see [SKILL.md](SKILL.md#troubleshooting).

## Performance Tips

1. **Minimize worker size**: Keep scripts small for faster cold starts
2. **Cache strategically**: Use KV for frequently-read data
3. **Parallel operations**: Use Promise.all for concurrent tasks
4. **Edge caching**: Set Cache-Control headers appropriately
5. **Monitor usage**: Check Cloudflare dashboard regularly

## Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [KV Storage Guide](https://developers.cloudflare.com/kv/)
- [R2 Storage Documentation](https://developers.cloudflare.com/r2/)
- [Pages Documentation](https://developers.cloudflare.com/pages/)
- [API Reference](https://developers.cloudflare.com/api/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

## Contributing

This skill is part of the Claude Code Skills ecosystem. For issues or improvements:

1. Test changes thoroughly
2. Update documentation
3. Follow existing code patterns
4. Validate with `bun scripts/validate-api-key.ts`

## License

This skill is provided as-is for use with Claude Code.

## Support

- Documentation: See [SKILL.md](SKILL.md) and [examples.md](examples.md)
- Validation: `bun scripts/validate-api-key.ts`
- Cloudflare Docs: https://developers.cloudflare.com/
- Cloudflare Community: https://community.cloudflare.com/

---

**Version**: 1.0.0
**Last Updated**: 2025-10-19
**Skill Score**: 8.7/10 (Validated)

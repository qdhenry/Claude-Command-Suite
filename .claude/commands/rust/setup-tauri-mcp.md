---
name: setup-tauri-mcp
description: Set up the tauri-mcp MCP server for Claude Code with Node.js wrapper
allowed-tools: Bash, Read, Write, Edit, WebFetch
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Install and configure the tauri-mcp MCP server for use with Claude Code.

The tauri-mcp server provides AI-assisted interaction with Tauri desktop applications, including process management, window manipulation, input simulation, screenshots, and IPC command execution. This command handles the complete setup including the Node.js wrapper required for stdio communication with Claude Code.
</objective>

<context>
Check current state:
- Rust binary installed: !`which tauri-mcp 2>/dev/null || echo "Not installed"`
- Node.js wrapper exists: !`ls ~/.local/share/tauri-mcp/index.js 2>/dev/null || echo "Not installed"`
- MCP config exists: !`cat .mcp.json 2>/dev/null | grep -A5 "tauri-mcp" || echo "Not configured"`
</context>

<process>
1. **Install the Rust binary** (if not already installed):
   ```bash
   cargo install tauri-mcp
   ```
   This installs to `~/.cargo/bin/tauri-mcp`

2. **Set up the Node.js wrapper** (required for Claude Code compatibility):
   The Rust binary's `serve` command runs an HTTP server, but Claude Code needs stdio communication. The Node.js wrapper bridges this gap.

   ```bash
   mkdir -p ~/.local/share/tauri-mcp
   cd ~/.local/share/tauri-mcp
   curl -sL https://raw.githubusercontent.com/dirvine/tauri-mcp/main/server/index.js -o index.js
   curl -sL https://raw.githubusercontent.com/dirvine/tauri-mcp/main/server/package.json -o package.json
   npm install
   ```

3. **Create tauri-mcp.toml config** (optional, in project root):
   ```toml
   auto_discover = true
   session_management = true
   event_streaming = false
   performance_profiling = false
   network_interception = false
   ```

4. **Configure .mcp.json** in the project:
   Add or update the tauri-mcp entry:
   ```json
   {
     "mcpServers": {
       "tauri-mcp": {
         "command": "node",
         "args": ["~/.local/share/tauri-mcp/index.js"],
         "env": {
           "TAURI_MCP_BINARY": "~/.cargo/bin/tauri-mcp",
           "TAURI_MCP_LOG_LEVEL": "info"
         }
       }
     }
   }
   ```
   Note: Replace `~` with actual home directory path in the JSON.

5. **Verify installation**:
   ```bash
   # Test Node.js wrapper starts
   TAURI_MCP_BINARY=~/.cargo/bin/tauri-mcp node ~/.local/share/tauri-mcp/index.js &
   sleep 2
   kill %1 2>/dev/null
   ```

6. **Enable in Claude Code**:
   - Restart Claude Code or start a new session
   - Run `/mcp` and approve the tauri-mcp server
   - Select "Reconnect" if it shows as failed
</process>

<available_tools>
Once enabled, you'll have access to these MCP tools:
- `launch_app` - Launch a Tauri application
- `stop_app` - Stop a running app
- `get_app_logs` - Get stdout/stderr logs
- `take_screenshot` - Capture app window
- `get_window_info` - Get window dimensions and state
- `send_keyboard_input` - Send keyboard input
- `send_mouse_click` - Send mouse clicks
- `execute_js` - Execute JavaScript in webview
- `get_devtools_info` - Get DevTools connection info
- `monitor_resources` - Monitor CPU/memory usage
- `list_ipc_handlers` - List Tauri IPC commands
- `call_ipc_command` - Call Tauri IPC commands
</available_tools>

<troubleshooting>
**Server shows "failed" status:**
- Ensure Node.js wrapper is installed (not just Rust binary)
- The Rust binary alone won't work - it runs HTTP, not stdio
- Check that TAURI_MCP_BINARY env var points to valid binary

**"command not found" errors:**
- Run `cargo install tauri-mcp` to install Rust binary
- Run `npm install` in `~/.local/share/tauri-mcp/`

**Debug logging:**
- Set `TAURI_MCP_LOG_LEVEL` to `debug` in .mcp.json env

**Verify paths:**
- All paths in .mcp.json must be absolute (no `~` shorthand)
- Example: `/Users/username/.cargo/bin/tauri-mcp`
</troubleshooting>

<success_criteria>
- Rust binary installed at `~/.cargo/bin/tauri-mcp`
- Node.js wrapper installed at `~/.local/share/tauri-mcp/`
- npm dependencies installed (`@modelcontextprotocol/sdk`)
- `.mcp.json` configured with tauri-mcp server entry
- Server shows "connected" status in `/mcp` command
- Tools available: `launch_app`, `take_screenshot`, etc.
</success_criteria>

<references>
- Repository: https://github.com/dirvine/tauri-mcp
- Node.js wrapper: Uses `@modelcontextprotocol/sdk` for stdio transport
- The wrapper spawns the Rust binary as subprocess for each tool call
</references>

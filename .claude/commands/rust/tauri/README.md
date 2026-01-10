# Tauri MCP Slash Commands

**Author:** Quintin Henry (https://github.com/qdhenry/)

A comprehensive slash command suite for interacting with Tauri desktop applications via the tauri-mcp MCP server.

## Prerequisites

The tauri-mcp server must be installed and configured. Run `/rust:setup-tauri-mcp` to install.

## Command Reference

### App Lifecycle

| Command | Description |
|---------|-------------|
| `/rust:tauri:launch [path]` | Launch a Tauri application, returns process ID |
| `/rust:tauri:stop <pid>` | Stop a running Tauri application |

### Inspection & Debugging

| Command | Description |
|---------|-------------|
| `/rust:tauri:inspect <pid>` | Full inspection (screenshot, logs, resources, window) |
| `/rust:tauri:logs <pid>` | View stdout/stderr logs |
| `/rust:tauri:screenshot <pid>` | Capture window screenshot |
| `/rust:tauri:window <pid>` | Get window dimensions, position, state |
| `/rust:tauri:resources <pid>` | Monitor CPU, memory usage |
| `/rust:tauri:devtools <pid>` | Get DevTools connection info |
| `/rust:tauri:health <pid>` | Comprehensive health check |

### IPC & Backend Testing

| Command | Description |
|---------|-------------|
| `/rust:tauri:list-commands <pid>` | List all registered IPC commands |
| `/rust:tauri:call-ipc <pid> <cmd> [args]` | Call a Tauri IPC command |
| `/rust:tauri:exec-js <pid> <code>` | Execute JavaScript in webview |

### UI Automation

| Command | Description |
|---------|-------------|
| `/rust:tauri:click <pid> <x> <y>` | Send mouse click to coordinates |
| `/rust:tauri:type <pid> <text>` | Send keyboard input |

## Quick Start

```bash
# 1. Launch the app
/rust:tauri:launch
# Returns: Process ID: 12345

# 2. Take a screenshot
/rust:tauri:screenshot 12345

# 3. Check what IPC commands are available
/rust:tauri:list-commands 12345

# 4. Call an IPC command
/rust:tauri:call-ipc 12345 get_projects

# 5. Run a health check
/rust:tauri:health 12345

# 6. Stop when done
/rust:tauri:stop 12345
```

## Common Workflows

### UI Testing Workflow

```bash
# Launch and screenshot
/rust:tauri:launch
/rust:tauri:screenshot 12345 --output ./test-start.png

# Interact with UI
/rust:tauri:click 12345 200 100
/rust:tauri:type 12345 Test Input
/rust:tauri:click 12345 300 200

# Capture result
/rust:tauri:screenshot 12345 --output ./test-end.png
```

### Debugging Workflow

```bash
# Launch app
/rust:tauri:launch

# Full inspection
/rust:tauri:inspect 12345

# Check logs for errors
/rust:tauri:logs 12345

# Execute debug JS
/rust:tauri:exec-js 12345 console.log(window.__DEBUG_STATE__)

# Connect DevTools if needed
/rust:tauri:devtools 12345
```

### IPC Testing Workflow

```bash
# Launch and discover commands
/rust:tauri:launch
/rust:tauri:list-commands 12345

# Test CRUD operations
/rust:tauri:call-ipc 12345 create_project {"name": "Test Project"}
/rust:tauri:call-ipc 12345 get_projects
/rust:tauri:call-ipc 12345 delete_project {"id": "proj-123"}

# Monitor resources during operations
/rust:tauri:resources 12345
```

### Performance Testing Workflow

```bash
# Launch and baseline
/rust:tauri:launch
/rust:tauri:resources 12345  # Baseline

# Perform operation
/rust:tauri:call-ipc 12345 heavy_operation {"data": "..."}

# Check impact
/rust:tauri:resources 12345  # Compare to baseline
```

## Argument Patterns

Most commands follow this pattern:
```
/rust:tauri:<command> <process_id> [additional_args]
```

- `<process_id>` - Always required (from `/rust:tauri:launch`)
- `[args]` - Optional additional arguments

### JSON Arguments

For IPC calls, provide JSON as the last argument:
```bash
/rust:tauri:call-ipc 12345 create_task {"title": "My Task", "priority": 1}
```

### Flags

Some commands accept flags:
```bash
/rust:tauri:logs 12345 --lines 50
/rust:tauri:screenshot 12345 --output ./my-screenshot.png
/rust:tauri:click 12345 100 200 --button right
```

## Tips

1. **Always get the process ID first** - All commands require it
2. **Use `/rust:tauri:inspect` for quick overview** - Combines multiple checks
3. **Screenshots help with click coordinates** - Take one, find coordinates, then click
4. **Use `/rust:tauri:exec-js` for complex DOM interactions** - More reliable than coordinate clicking
5. **Check `/rust:tauri:health` periodically** - Catches issues early

## Related Commands

- `/rust:setup-tauri-mcp` - Install and configure the tauri-mcp server
- `/rust:audit-clean-arch` - Audit Rust code architecture (for src-tauri/)

## Troubleshooting

### Server not connected
Run `/mcp` and check tauri-mcp status. Run `/rust:setup-tauri-mcp` if not configured.

### Process ID invalid
The app may have terminated. Run `/rust:tauri:launch` to start fresh.

### Commands not working
Check `/rust:tauri:logs` for backend errors, `/rust:tauri:health` for overall status.

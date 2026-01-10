# Rust Commands

Commands for Rust development, clean architecture auditing, and Tauri application development.

**Author:** Quintin Henry (https://github.com/qdhenry/)

## Clean Architecture Audit Commands

| Command | Description |
|---------|-------------|
| `/rust:audit-clean-arch` | Comprehensive audit of Rust codebase against Clean Architecture principles |
| `/rust:audit-dependencies` | Deep-dive audit of dependency direction (Dependency Rule compliance) |
| `/rust:audit-layer-boundaries` | Analyze layer boundary definitions and identify mixed responsibilities |
| `/rust:audit-ports-adapters` | Audit Ports & Adapters (Hexagonal) pattern implementation |
| `/rust:suggest-refactor` | Actionable refactoring suggestions with prioritized recommendations |

## Setup Commands

| Command | Description |
|---------|-------------|
| `/rust:setup-tauri-mcp` | Install and configure the tauri-mcp MCP server for Claude Code |

## Usage

### Full Architecture Audit
```bash
# Run comprehensive clean architecture audit
/rust:audit-clean-arch

# Focus on specific path
/rust:audit-clean-arch src/core/
```

### Dependency Analysis
```bash
# Audit all dependencies for Dependency Rule violations
/rust:audit-dependencies

# Focus on application layer
/rust:audit-dependencies src/application/
```

### Layer Boundary Check
```bash
# Check layer separation and mixed responsibilities
/rust:audit-layer-boundaries
```

### Ports & Adapters Pattern
```bash
# Audit hexagonal architecture implementation
/rust:audit-ports-adapters repositories
```

### Get Refactoring Suggestions
```bash
# All suggestions
/rust:suggest-refactor

# Only critical issues
/rust:suggest-refactor --critical
```

## Clean Architecture Reference

```
Infrastructure → Adapters → Application → Domain
     ↓              ↓            ↓           ↓
   May use      May use      May use    Uses NOTHING
   anything    App+Domain    Domain      external
```

**The Dependency Rule:** Dependencies may only point INWARD toward the domain layer.

## Tauri Commands (`/rust:tauri:*`)

Tauri desktop application interaction commands. See [`tauri/README.md`](./tauri/README.md) for full documentation.

| Command | Description |
|---------|-------------|
| `/rust:tauri:launch` | Launch a Tauri application, returns process ID |
| `/rust:tauri:stop` | Stop a running Tauri application |
| `/rust:tauri:inspect` | Full inspection (screenshot, logs, resources, window) |
| `/rust:tauri:logs` | View stdout/stderr logs |
| `/rust:tauri:screenshot` | Capture window screenshot |
| `/rust:tauri:window` | Get window dimensions, position, state |
| `/rust:tauri:resources` | Monitor CPU, memory usage |
| `/rust:tauri:devtools` | Get DevTools connection info |
| `/rust:tauri:health` | Comprehensive health check |
| `/rust:tauri:list-commands` | List all registered IPC commands |
| `/rust:tauri:call-ipc` | Call a Tauri IPC command |
| `/rust:tauri:exec-js` | Execute JavaScript in webview |
| `/rust:tauri:click` | Send mouse click to coordinates |
| `/rust:tauri:type` | Send keyboard input |

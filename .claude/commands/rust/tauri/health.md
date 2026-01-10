---
name: rust:tauri:health
description: Comprehensive health check of a running Tauri application
allowed-tools: mcp__tauri-mcp__get_app_logs, mcp__tauri-mcp__get_window_info, mcp__tauri-mcp__monitor_resources, mcp__tauri-mcp__list_ipc_handlers, mcp__tauri-mcp__execute_js
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Perform a comprehensive health check on a running Tauri application, analyzing logs for errors, resource usage, window state, and IPC functionality.
</objective>

<instructions>
Health check the Tauri application: **$ARGUMENTS**

Arguments: `[process_id]`

## Health Check Process

Perform ALL of the following checks:

### 1. Window Health
Use `mcp__tauri-mcp__get_window_info`:
- [ ] Window is visible
- [ ] Window has non-zero dimensions
- [ ] Window is not minimized (unless expected)

### 2. Resource Health
Use `mcp__tauri-mcp__monitor_resources`:
- [ ] CPU usage is reasonable (< 50% idle)
- [ ] Memory usage is acceptable
- [ ] No runaway resource consumption

### 3. Log Health
Use `mcp__tauri-mcp__get_app_logs`:
- [ ] No unhandled errors in recent logs
- [ ] No panic messages
- [ ] No critical warnings

### 4. IPC Health
Use `mcp__tauri-mcp__list_ipc_handlers`:
- [ ] IPC handlers are registered
- [ ] Expected commands are available

### 5. Frontend Health
Use `mcp__tauri-mcp__execute_js`:
- [ ] No JavaScript errors: `window.onerror === null`
- [ ] App is responsive: `document.readyState === 'complete'`
- [ ] Key elements exist: `!!document.querySelector('#root, #app, main')`

## Usage Examples

```bash
# Run full health check
/tauri:health 12345
```
</instructions>

<output_format>
```
=== Tauri App Health Check ===
Process ID: [PID]
Timestamp: [time]

--- Window Health ---
[PASS] Window visible
[PASS] Dimensions: 1200x800
[PASS] Not minimized

--- Resource Health ---
[PASS] CPU: 5% (acceptable)
[PASS] Memory: 180 MB (acceptable)

--- Log Health ---
[PASS] No errors in last 100 lines
[WARN] 2 warnings detected (see details below)

--- IPC Health ---
[PASS] 24 commands registered
[PASS] Core commands available

--- Frontend Health ---
[PASS] Document ready
[PASS] No JS errors
[PASS] Root element exists

=== Overall Status: HEALTHY ===
(or DEGRADED / UNHEALTHY with details)

--- Warnings/Issues ---
[List any warnings or issues found]

--- Recommendations ---
[Suggested actions if any issues detected]
```
</output_format>

<severity_levels>
**HEALTHY (Green):**
All checks pass, no warnings.

**DEGRADED (Yellow):**
- Minor warnings in logs
- Slightly elevated resource usage
- Non-critical elements missing

**UNHEALTHY (Red):**
- Errors in logs
- Window not visible/responsive
- High resource usage
- IPC not functioning
- JavaScript errors
</severity_levels>

---
name: rust:tauri:inspect
description: Full inspection of a running Tauri app - screenshot, logs, window info, and resources
allowed-tools: mcp__tauri-mcp__take_screenshot, mcp__tauri-mcp__get_app_logs, mcp__tauri-mcp__get_window_info, mcp__tauri-mcp__monitor_resources, mcp__tauri-mcp__get_devtools_info, Read
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Perform a comprehensive inspection of a running Tauri application, gathering all available diagnostic information in one command.
</objective>

<instructions>
Inspect the Tauri application: **$ARGUMENTS**

Arguments: `[process_id]`

## Inspection Process

Gather ALL of the following in parallel where possible:

### 1. Window Information
Use `mcp__tauri-mcp__get_window_info`:
- Window dimensions (width, height)
- Window position (x, y)
- Window state (visible, focused, minimized, etc.)

### 2. Application Logs
Use `mcp__tauri-mcp__get_app_logs`:
- Last 50 lines of stdout/stderr
- Highlight any errors or warnings

### 3. Resource Usage
Use `mcp__tauri-mcp__monitor_resources`:
- CPU usage percentage
- Memory consumption
- Other available metrics

### 4. Screenshot
Use `mcp__tauri-mcp__take_screenshot`:
- Capture current visual state
- Save to temp location or docs/screenshots/

### 5. DevTools Information
Use `mcp__tauri-mcp__get_devtools_info`:
- DevTools connection details
- Debugging port if available

## Usage Examples

```bash
# Full inspection
/tauri:inspect 12345
```
</instructions>

<output_format>
```
=== Tauri App Inspection Report ===
Process ID: [PID]
Timestamp: [current time]

--- Window ---
Size: [width]x[height]
Position: ([x], [y])
State: [visible/focused/minimized]

--- Resources ---
CPU: [X]%
Memory: [X] MB
[other metrics]

--- DevTools ---
Port: [port]
URL: [devtools URL if available]

--- Recent Logs ---
[last 10 significant log entries]

--- Screenshot ---
[path to screenshot]
[display image]

--- Health Summary ---
[OK/WARNING/ERROR]: [brief status]
```
</output_format>

<use_cases>
**Debugging Sessions:**
Get complete picture of app state when investigating issues.

**Performance Analysis:**
Check resource usage alongside visual state.

**Development Workflow:**
Quick status check during active development.

**Issue Reporting:**
Gather all diagnostic info for bug reports.
</use_cases>

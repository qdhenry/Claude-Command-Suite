---
name: rust:tauri:stop
description: Stop a running Tauri application by process ID
allowed-tools: mcp__tauri-mcp__stop_app, mcp__tauri-mcp__get_app_logs, Bash
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Gracefully stop a running Tauri application. Captures final logs before termination.
</objective>

<context>
Running Tauri processes: !`pgrep -l -f "tauri\|monotask" 2>/dev/null || echo "No Tauri apps currently running"`
</context>

<instructions>
Stop the Tauri application: **$ARGUMENTS**

The argument should be a process ID from a previous `/tauri:launch` command.

## Stop Process

1. **Get Final Logs**
   Before stopping, capture any remaining logs using `mcp__tauri-mcp__get_app_logs`:
   - `process_id`: The PID to stop
   - `lines`: Last 50 lines

2. **Stop the Application**
   Use `mcp__tauri-mcp__stop_app` with:
   - `process_id`: The process ID to terminate

3. **Verify Termination**
   Confirm the process has stopped using a quick process check.

4. **Report Results**
   - Confirmation of termination
   - Any notable final log entries
   - Errors if termination failed

## Usage Examples

```bash
# Stop by process ID
/tauri:stop 12345

# Stop with "process_id" prefix (from copy-paste)
/tauri:stop process_id: 12345
```
</instructions>

<output_format>
```
App Stopped Successfully
- Process ID: [PID]
- Final Status: [exit status if available]

Notable final logs:
[any errors or important messages]
```
</output_format>

<troubleshooting>
**"Process not found":**
- The app may have already terminated
- Verify the process ID is correct
- Run `/tauri:launch` to start a new instance

**"Failed to stop":**
- Try `kill -9 [PID]` as a fallback
- Check if the process is zombied
</troubleshooting>

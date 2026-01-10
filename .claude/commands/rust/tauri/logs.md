---
name: rust:tauri:logs
description: View stdout/stderr logs from a running Tauri application
allowed-tools: mcp__tauri-mcp__get_app_logs
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Retrieve and display logs from a running Tauri application's stdout and stderr streams.
</objective>

<instructions>
Get logs from the Tauri application: **$ARGUMENTS**

Arguments format: `[process_id] [--lines N]`
- `process_id`: Required - the process ID from `/tauri:launch`
- `--lines N`: Optional - number of recent lines (default: 100)

## Process

1. **Parse Arguments**
   Extract process_id and optional line count from $ARGUMENTS.

2. **Retrieve Logs**
   Use `mcp__tauri-mcp__get_app_logs` with:
   - `process_id`: The target process
   - `lines`: Number of lines to retrieve

3. **Format Output**
   - Separate stdout and stderr if distinguishable
   - Highlight errors and warnings
   - Show timestamps if available

## Usage Examples

```bash
# Get last 100 lines (default)
/tauri:logs 12345

# Get last 50 lines
/tauri:logs 12345 --lines 50

# Get all available logs
/tauri:logs 12345 --lines 1000
```
</instructions>

<output_format>
```
=== Logs for Process [PID] ===
[timestamp] [level] message
[timestamp] [level] message
...

=== Summary ===
- Total lines: N
- Errors: N
- Warnings: N
```
</output_format>

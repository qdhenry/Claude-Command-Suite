---
name: rust:tauri:list-commands
description: List all registered Tauri IPC commands (invoke handlers) in a running app
allowed-tools: mcp__tauri-mcp__list_ipc_handlers
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Discover all available Tauri IPC commands registered in the running application. These are the `#[tauri::command]` functions callable via `invoke()` from the frontend.
</objective>

<instructions>
List IPC commands for the Tauri application: **$ARGUMENTS**

Arguments: `[process_id]`

## Process

1. **Query IPC Handlers**
   Use `mcp__tauri-mcp__list_ipc_handlers` with the process ID.

2. **Format Results**
   Organize commands by category if patterns are detected:
   - Database commands (db_*, get_*, create_*, update_*, delete_*)
   - System commands (window_*, app_*, config_*)
   - Feature commands (based on naming patterns)

3. **Provide Usage Information**
   For each command, note:
   - Command name (as used in invoke())
   - Expected parameters if discoverable
   - Related commands

## Usage Examples

```bash
# List all commands
/tauri:list-commands 12345
```
</instructions>

<output_format>
```
=== Tauri IPC Commands ===
Process ID: [PID]
Total Commands: [N]

--- Database Operations ---
- get_projects
- create_project
- update_project
- delete_project

--- Task Management ---
- get_tasks
- create_task
- update_task_status

--- System ---
- get_app_config
- set_theme

--- Usage ---
Call any command using:
  /tauri:call-ipc 12345 command_name {"arg": "value"}
```
</output_format>

<related_commands>
- `/tauri:call-ipc` - Call a specific IPC command
- `/tauri:inspect` - Full app inspection including IPC
</related_commands>

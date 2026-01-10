---
name: rust:tauri:call-ipc
description: Call a Tauri IPC command with arguments and view the response
allowed-tools: mcp__tauri-mcp__call_ipc_command, mcp__tauri-mcp__list_ipc_handlers
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Invoke a Tauri IPC command (same as frontend `invoke()` calls) directly from the command line. Useful for testing backend commands without UI interaction.
</objective>

<instructions>
Call IPC command: **$ARGUMENTS**

Arguments format: `[process_id] [command_name] [args_json]`
- `process_id`: Required - the process ID from `/tauri:launch`
- `command_name`: Required - the IPC command name (e.g., `get_projects`)
- `args_json`: Optional - JSON object with command arguments

## Process

1. **Parse Arguments**
   Extract process_id, command_name, and optional args from $ARGUMENTS.

2. **Call the IPC Command**
   Use `mcp__tauri-mcp__call_ipc_command` with:
   - `process_id`: Target process
   - `command_name`: The Tauri command to invoke
   - `args`: JSON object with parameters (if any)

3. **Format Response**
   - Pretty-print JSON responses
   - Highlight errors or unexpected results
   - Show timing information if available

## Usage Examples

```bash
# Simple command with no args
/tauri:call-ipc 12345 get_projects

# Command with arguments
/tauri:call-ipc 12345 get_project {"id": "abc-123"}

# Create operation
/tauri:call-ipc 12345 create_task {"title": "Test Task", "project_id": "proj-1"}

# Update with complex args
/tauri:call-ipc 12345 update_task_status {"task_id": "task-1", "status": "completed"}
```
</instructions>

<output_format>
```
=== IPC Call Result ===
Command: [command_name]
Process: [PID]

--- Request ---
Args: [formatted JSON args]

--- Response ---
[formatted JSON response]

--- Timing ---
Duration: [X]ms
```

For errors:
```
=== IPC Call Failed ===
Command: [command_name]
Error: [error message]

Suggestion: [troubleshooting hint]
```
</output_format>

<common_patterns>
**CRUD Operations:**
```bash
# Create
/tauri:call-ipc [pid] create_[entity] {"field": "value"}

# Read
/tauri:call-ipc [pid] get_[entity] {"id": "..."}
/tauri:call-ipc [pid] list_[entities] {}

# Update
/tauri:call-ipc [pid] update_[entity] {"id": "...", "field": "new_value"}

# Delete
/tauri:call-ipc [pid] delete_[entity] {"id": "..."}
```

**Query with Filters:**
```bash
/tauri:call-ipc [pid] search_tasks {"query": "bug", "status": "open"}
```
</common_patterns>

<troubleshooting>
**"Command not found":**
- Run `/tauri:list-commands [pid]` to see available commands
- Check command name spelling (snake_case)

**"Invalid arguments":**
- Verify JSON syntax is valid
- Check required fields for the command
- Look at Rust command definition for expected types

**"Serialization error":**
- Ensure argument types match (string vs number vs boolean)
- Check for missing required fields
</troubleshooting>

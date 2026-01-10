---
name: rust:tauri:type
description: Send keyboard input (text or key combinations) to a Tauri application
allowed-tools: mcp__tauri-mcp__send_keyboard_input, mcp__tauri-mcp__take_screenshot
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Send keyboard input to a Tauri application. Can type text or send special key combinations.
</objective>

<instructions>
Send keyboard input to the Tauri application: **$ARGUMENTS**

Arguments format: `[process_id] [keys_or_text]`
- `process_id`: Required - the process ID from `/tauri:launch`
- `keys_or_text`: Required - text to type or key combination

## Process

1. **Send the Input**
   Use `mcp__tauri-mcp__send_keyboard_input` with:
   - `process_id`: Target process
   - `keys`: The text or key sequence to send

2. **Verify Result**
   Optionally take a screenshot to confirm input was received.

## Usage Examples

```bash
# Type text
/tauri:type 12345 Hello World

# Type in a search field (after clicking it)
/tauri:click 12345 200 50
/tauri:type 12345 search query

# Special keys (format depends on MCP implementation)
/tauri:type 12345 Enter
/tauri:type 12345 Tab
/tauri:type 12345 Escape

# Key combinations
/tauri:type 12345 Cmd+A
/tauri:type 12345 Ctrl+C
/tauri:type 12345 Shift+Tab
```
</instructions>

<output_format>
```
=== Keyboard Input Sent ===
Process: [PID]
Input: "[keys_or_text]"
Type: [text/key/combination]
```
</output_format>

<common_keys>
**Navigation:**
- `Tab` - Next field
- `Shift+Tab` - Previous field
- `Enter` - Submit/confirm
- `Escape` - Cancel/close

**Editing:**
- `Cmd+A` / `Ctrl+A` - Select all
- `Cmd+C` / `Ctrl+C` - Copy
- `Cmd+V` / `Ctrl+V` - Paste
- `Cmd+Z` / `Ctrl+Z` - Undo
- `Backspace` - Delete character
- `Delete` - Forward delete

**App Navigation:**
- `Cmd+,` / `Ctrl+,` - Settings (common)
- `Cmd+N` / `Ctrl+N` - New (common)
- `Cmd+W` / `Ctrl+W` - Close window
</common_keys>

<workflow_example>
**Fill a Form:**
```bash
# Click first input
/tauri:click 12345 200 100
# Type name
/tauri:type 12345 John Doe
# Tab to next field
/tauri:type 12345 Tab
# Type email
/tauri:type 12345 john@example.com
# Tab to submit
/tauri:type 12345 Tab
# Press Enter to submit
/tauri:type 12345 Enter
```
</workflow_example>

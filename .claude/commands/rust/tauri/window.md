---
name: rust:tauri:window
description: Get detailed window information including dimensions, position, and state
allowed-tools: mcp__tauri-mcp__get_window_info
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Retrieve detailed information about a Tauri application's window state, dimensions, and position.
</objective>

<instructions>
Get window information for the Tauri application: **$ARGUMENTS**

Arguments: `[process_id]`

## Process

1. **Query Window Information**
   Use `mcp__tauri-mcp__get_window_info` with the process ID.

2. **Format Results**
   Display all available window properties in a clear format.

## Usage Examples

```bash
# Get window info
/tauri:window 12345
```
</instructions>

<output_format>
```
=== Window Information ===
Process ID: [PID]

--- Dimensions ---
Width: [X] px
Height: [Y] px
Aspect Ratio: [ratio]

--- Position ---
X: [X] (from left edge of screen)
Y: [Y] (from top edge of screen)

--- State ---
Visible: [yes/no]
Focused: [yes/no]
Minimized: [yes/no]
Maximized: [yes/no]
Fullscreen: [yes/no]

--- Additional ---
[Any other available properties]
```
</output_format>

<use_cases>
**Before Screenshots:**
Verify window is visible and properly sized before capturing.

**Coordinate Calculation:**
Use dimensions to calculate click targets relative to window.

**Window State Debugging:**
Check if window is hidden, minimized, or off-screen.

**Responsive Testing:**
Verify window size for different viewport testing.
</use_cases>

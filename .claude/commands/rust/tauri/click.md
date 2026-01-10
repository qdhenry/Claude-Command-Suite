---
name: rust:tauri:click
description: Send a mouse click to specific coordinates in a Tauri application window
allowed-tools: mcp__tauri-mcp__send_mouse_click, mcp__tauri-mcp__take_screenshot, mcp__tauri-mcp__get_window_info
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Send a mouse click event to a specific position in a Tauri application window. Useful for UI automation and testing.
</objective>

<instructions>
Send mouse click to the Tauri application: **$ARGUMENTS**

Arguments format: `[process_id] [x] [y] [--button left|right|middle]`
- `process_id`: Required - the process ID from `/tauri:launch`
- `x`: Required - X coordinate (pixels from left edge)
- `y`: Required - Y coordinate (pixels from top edge)
- `--button`: Optional - mouse button (default: left)

## Process

1. **Verify Window State**
   Use `mcp__tauri-mcp__get_window_info` to confirm window is visible and focused.

2. **Take Pre-Click Screenshot** (if helpful)
   Capture state before the click for debugging.

3. **Send the Click**
   Use `mcp__tauri-mcp__send_mouse_click` with:
   - `process_id`: Target process
   - `x`: X coordinate
   - `y`: Y coordinate
   - `button`: "left", "right", or "middle"

4. **Verify Result**
   Optionally take a post-click screenshot to confirm the action worked.

## Usage Examples

```bash
# Left click at coordinates
/tauri:click 12345 100 200

# Right click (context menu)
/tauri:click 12345 100 200 --button right

# Click a specific button (find coords from screenshot first)
/tauri:screenshot 12345
# Identify button at (150, 300)
/tauri:click 12345 150 300
```
</instructions>

<output_format>
```
=== Mouse Click Sent ===
Process: [PID]
Position: ([x], [y])
Button: [left/right/middle]

Window Size: [width]x[height]
Click Within Bounds: [yes/no]
```
</output_format>

<workflow_tip>
**Finding Coordinates:**
1. Take a screenshot: `/tauri:screenshot [pid]`
2. Open the image and identify the target element
3. Note the approximate x,y coordinates
4. Send the click: `/tauri:click [pid] [x] [y]`
5. Verify with another screenshot

**For Repeated Testing:**
Consider using `/tauri:exec-js` to click elements by selector instead:
```javascript
document.querySelector('#my-button').click()
```
</workflow_tip>

<troubleshooting>
**Click doesn't register:**
- Verify coordinates are within window bounds
- Ensure window is focused and visible
- Try clicking center of element, not edges

**Wrong element clicked:**
- Take a fresh screenshot to verify current state
- Remember coordinates are relative to window, not screen
</troubleshooting>

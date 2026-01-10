---
name: rust:tauri:screenshot
description: Capture a screenshot of a running Tauri application window
allowed-tools: mcp__tauri-mcp__take_screenshot, mcp__tauri-mcp__get_window_info, Read
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Take a screenshot of a Tauri application window for visual inspection, debugging, or UI parity comparison.
</objective>

<instructions>
Capture screenshot of the Tauri application: **$ARGUMENTS**

Arguments format: `[process_id] [--output path]`
- `process_id`: Required - the process ID from `/tauri:launch`
- `--output path`: Optional - custom save path (default: auto-generated)

## Process

1. **Get Window Info First**
   Use `mcp__tauri-mcp__get_window_info` to verify the window is visible and get dimensions.

2. **Capture Screenshot**
   Use `mcp__tauri-mcp__take_screenshot` with:
   - `process_id`: The target process
   - `output_path`: Optional path to save the screenshot

3. **Display the Screenshot**
   Use the Read tool to view the captured image.

4. **Report Results**
   - Screenshot path
   - Window dimensions at capture time
   - Any issues (window occluded, minimized, etc.)

## Usage Examples

```bash
# Take screenshot with auto-generated name
/tauri:screenshot 12345

# Save to specific path
/tauri:screenshot 12345 --output ./docs/screenshots/current-state.png

# For UI parity work
/tauri:screenshot 12345 --output ./docs/screenshots/desktop-task-view.png
```
</instructions>

<output_format>
```
Screenshot Captured
- File: [path to screenshot]
- Dimensions: [width]x[height]
- Window State: [visible/focused/etc]

[Display the image if possible]
```
</output_format>

<use_cases>
**UI Parity Work:**
Compare desktop app appearance to web app for feature parity verification.

**Bug Documentation:**
Capture visual state when reporting UI issues.

**Before/After Comparison:**
Document UI changes during refactoring or feature development.

**Automated Testing:**
Capture state at specific points in test flows.
</use_cases>

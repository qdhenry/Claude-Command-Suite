---
name: rust:tauri:launch
description: Launch a Tauri desktop application and return its process ID for subsequent operations
allowed-tools: mcp__tauri-mcp__launch_app, mcp__tauri-mcp__get_app_logs, mcp__tauri-mcp__get_window_info, Bash, Read
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Launch a Tauri desktop application and prepare it for interaction. Returns the process ID needed for all subsequent tauri commands.
</objective>

<context>
Project Tauri app location: !`ls -la apps/desktop/src-tauri/target/release/*.app 2>/dev/null || ls -la apps/desktop/src-tauri/target/debug/*.app 2>/dev/null || echo "No built app found - run 'bun run build' in apps/desktop first"`
Current running apps: !`pgrep -l -f "tauri\|monotask" 2>/dev/null || echo "No Tauri apps currently running"`
</context>

<instructions>
Launch the Tauri application: **$ARGUMENTS**

If no path is provided, attempt to find and launch the project's desktop app.

## Launch Process

1. **Determine App Path**
   - If `$ARGUMENTS` contains a path, use that
   - Otherwise, look for built app in `apps/desktop/src-tauri/target/`
   - Prefer release build over debug build

2. **Launch the Application**
   Use `mcp__tauri-mcp__launch_app` with:
   - `app_path`: Path to the .app bundle (macOS) or executable
   - `args`: Optional launch arguments (e.g., `["--dev"]`)

3. **Wait for Startup**
   After launching, wait 2-3 seconds for the app to initialize.

4. **Verify Launch Success**
   - Use `mcp__tauri-mcp__get_window_info` to confirm window is visible
   - Use `mcp__tauri-mcp__get_app_logs` to check for startup errors

5. **Report Results**
   Provide:
   - Process ID (required for all subsequent commands)
   - Window dimensions and state
   - Any startup logs or errors

## Usage Examples

```bash
# Launch project's desktop app
/tauri:launch

# Launch specific app
/tauri:launch /Applications/MyTauriApp.app

# Launch with arguments
/tauri:launch apps/desktop/src-tauri/target/release/bundle/macos/Monotask.app --dev
```
</instructions>

<output_format>
Provide a concise summary:
```
App Launched Successfully
- Process ID: [PID]
- Window: [width]x[height] at ([x], [y])
- Status: [visible/minimized/etc]

Use this process_id for subsequent /tauri: commands.
```

Or if launch failed:
```
Launch Failed
- Error: [error message]
- Suggestion: [how to fix]
```
</output_format>

<troubleshooting>
**"No built app found":**
- Run `cd apps/desktop && bun run build` to build the app first
- For dev testing, use `bun run dev` instead and interact via browser

**"Permission denied":**
- On macOS, you may need to allow the app in System Preferences > Security
- Run `xattr -cr /path/to/app.app` to clear quarantine flags

**App launches but window doesn't appear:**
- Check logs for initialization errors
- Verify display/screen configuration
- Some apps need specific environment variables
</troubleshooting>

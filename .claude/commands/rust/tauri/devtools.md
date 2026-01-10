---
name: rust:tauri:devtools
description: Get DevTools connection information for debugging a Tauri application
allowed-tools: mcp__tauri-mcp__get_devtools_info
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Retrieve DevTools connection information for a running Tauri application, enabling browser-based debugging of the webview.
</objective>

<instructions>
Get DevTools info for the Tauri application: **$ARGUMENTS**

Arguments: `[process_id]`

## Process

1. **Query DevTools Information**
   Use `mcp__tauri-mcp__get_devtools_info` with the process ID.

2. **Provide Connection Instructions**
   Show how to connect to DevTools for debugging.

## Usage Examples

```bash
# Get DevTools connection info
/tauri:devtools 12345
```
</instructions>

<output_format>
```
=== DevTools Information ===
Process ID: [PID]

--- Connection ---
Debug Port: [port]
WebSocket URL: [ws://...]
HTTP URL: [http://...]

--- How to Connect ---
1. Open Chrome/Edge browser
2. Navigate to: chrome://inspect
3. Click "Configure..." and add: localhost:[port]
4. Your app should appear under "Remote Target"
5. Click "inspect" to open DevTools

--- Alternative ---
Direct URL: [devtools://devtools/bundled/inspector.html?ws=...]
```
</output_format>

<debugging_tips>
**What You Can Do with DevTools:**
- Inspect DOM elements and styles
- Debug JavaScript with breakpoints
- Monitor network requests
- Profile performance
- View console logs and errors
- Inspect localStorage/sessionStorage

**Common Debug Tasks:**
- Check for JavaScript errors in Console
- Inspect React components (with React DevTools)
- Monitor Tauri IPC calls in Network tab
- Profile rendering performance
</debugging_tips>

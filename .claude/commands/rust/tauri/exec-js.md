---
name: rust:tauri:exec-js
description: Execute JavaScript code in the Tauri app's webview context
allowed-tools: mcp__tauri-mcp__execute_js
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Execute arbitrary JavaScript in the Tauri application's webview. Useful for inspecting state, triggering actions, or debugging frontend behavior.
</objective>

<instructions>
Execute JavaScript in the Tauri app: **$ARGUMENTS**

Arguments format: `[process_id] [javascript_code]`
- `process_id`: Required - the process ID from `/tauri:launch`
- `javascript_code`: Required - JavaScript to execute in the webview

## Process

1. **Parse Arguments**
   Extract process_id and JavaScript code from $ARGUMENTS.

2. **Execute the Code**
   Use `mcp__tauri-mcp__execute_js` with:
   - `process_id`: Target process
   - `javascript_code`: The JS to run

3. **Return Results**
   - Display the return value
   - Show any console output or errors
   - Format objects/arrays as pretty JSON

## Usage Examples

```bash
# Get current URL/route
/tauri:exec-js 12345 window.location.href

# Check React state (if using React)
/tauri:exec-js 12345 document.querySelector('[data-testid="project-list"]').textContent

# Get localStorage data
/tauri:exec-js 12345 JSON.stringify(localStorage)

# Check DOM element exists
/tauri:exec-js 12345 !!document.querySelector('.task-card')

# Get current theme
/tauri:exec-js 12345 document.documentElement.classList.contains('dark')

# Trigger a click
/tauri:exec-js 12345 document.querySelector('button[data-action="refresh"]').click()

# Call Tauri invoke directly
/tauri:exec-js 12345 window.__TAURI__.invoke('get_projects')
```
</instructions>

<output_format>
```
=== JavaScript Execution ===
Process: [PID]

--- Code ---
[the executed code]

--- Result ---
[formatted return value]

--- Console Output ---
[any console.log output if captured]
```
</output_format>

<common_snippets>
**State Inspection:**
```javascript
// Get all data attributes on body
Object.fromEntries([...document.body.attributes].map(a => [a.name, a.value]))

// Find all buttons with text
[...document.querySelectorAll('button')].map(b => b.textContent.trim())

// Get form values
Object.fromEntries(new FormData(document.querySelector('form')))
```

**Debug Helpers:**
```javascript
// Log React component tree (if React DevTools installed)
window.__REACT_DEVTOOLS_GLOBAL_HOOK__

// Check for errors in DOM
document.querySelectorAll('[data-error], .error, .text-red-500').length

// Get current route (React Router)
window.location.pathname
```

**UI Interaction:**
```javascript
// Simulate user typing
document.querySelector('input').value = 'test'
document.querySelector('input').dispatchEvent(new Event('input', {bubbles: true}))

// Click and wait
document.querySelector('button').click()
```
</common_snippets>

<security_note>
JavaScript execution has full access to the webview context. Use carefully:
- Avoid executing untrusted code
- Be aware of side effects (clicks, form submissions, etc.)
- This bypasses normal UI interaction patterns
</security_note>

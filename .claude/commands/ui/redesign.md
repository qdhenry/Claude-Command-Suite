---
name: redesign
description: Analyze screenshots and implement UI redesigns using the project's design system and Tailwind CSS
usage: /redesign <screenshot1> [screenshot2] [screenshot3] ...
version: 1.0.0
author: Claude Code
examples:
  - /redesign screenshot.png
  - /redesign dashboard.png login.png settings.png
  - /redesign /path/to/design/mockup.jpg
---

# UI Redesign Command

This command invokes the ui-redesign-specialist agent to analyze screenshots and implement UI redesigns while preserving existing functionality.

## Arguments Processing
{{#if args}}
  {{#each args}}
    - Screenshot {{@index}}: {{this}}
  {{/each}}
{{else}}
  No screenshots provided. Please provide at least one screenshot path.
{{/if}}

## Agent Invocation

{{#if args}}
Launch the ui-redesign-specialist agent with the following screenshots:

/agent ui-redesign-specialist "Please analyze the following screenshot(s) and help implement the UI redesign:

Screenshots to analyze:
{{#each args}}
- {{this}}
{{/each}}

1. First, read and analyze each screenshot file
2. Perform a comprehensive visual analysis of the design elements
3. Examine the existing implementation to understand current functionality
4. Create an implementation plan that preserves all existing features
5. Implement the new design using the project's design system and Tailwind CSS

Please start by reading the screenshot files and analyzing their visual elements."
{{else}}
Error: No screenshots provided. Usage: /redesign <screenshot1> [screenshot2] ...
{{/if}}
---
name: redesign-from-screenshot
description: Analyze screenshots and implement UI redesigns using the project's design system and Tailwind CSS
usage: /redesign-from-screenshot <screenshot1> [screenshot2] [screenshot3] ...
version: 1.0.0
author: Claude Code
examples:
  - /redesign-from-screenshot screenshot.png
  - /redesign-from-screenshot dashboard.png login.png settings.png
  - /redesign-from-screenshot /path/to/design/mockup.jpg
---

# UI Redesign Command

This command invokes the ui-redesign-specialist agent to analyze screenshots and implement UI redesigns while preserving existing functionality.

## Instructions

1. **Analyze Screenshot Requirements**
   - Read and examine all provided screenshot files
   - Identify visual elements, layout, spacing, and design patterns
   - Catalog colors, typography, and interactive components
   - Note responsive design requirements and breakpoints

2. **Examine Existing Implementation**
   - Locate current implementation files
   - Document existing functionality and business logic
   - Map data flows and component relationships
   - Identify event handlers and state management patterns

3. **Create Implementation Plan**
   - Determine component reuse vs creation needs
   - Plan Tailwind CSS integration strategy
   - Ensure functionality preservation approach
   - Consider accessibility requirements

4. **Implement Design Changes**
   - Apply visual changes using Tailwind CSS
   - Maintain existing event handlers and state management
   - Ensure responsive behavior matches design
   - Preserve all existing functionality

5. **Validate Implementation**
   - Compare result against original screenshots
   - Test all existing functionality
   - Verify accessibility compliance
   - Check responsive behavior across breakpoints

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
Error: No screenshots provided. Usage: /redesign-from-screenshot <screenshot1> [screenshot2] ...
{{/if}}
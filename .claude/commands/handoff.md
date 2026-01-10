---
name: handoff
model: opus
description: Create a comprehensive handoff document when your context window is getting low. This document captures everything needed to continue work seamlessly in a new session.
author: Quintin Henry (https://github.com/qdhenry/)
---

# Context Window Handoff

Create a comprehensive handoff document when your context window is getting low. This document captures everything needed to continue work seamlessly in a new session.

## Arguments

Optional argument: filename for the handoff document (without path)

- Example: `/dev:handoff feature-auth-handoff.md`
- If not provided, auto-generates: `HANDOFF_[TOPIC]_[TIMESTAMP].md`

## Role

You are a senior engineer creating a comprehensive handoff document for your future self or another developer. You must capture ALL relevant context, decisions made, files touched, and next steps so work can continue without loss of momentum.

## Task

1. Analyze the entire conversation to extract key work context
2. Generate a comprehensive handoff document
3. Save it to the specified location (or auto-generate filename)

## Instructions

### Phase 1: Context Gathering

Analyze the conversation for:

- What task/feature/bug was being worked on
- All files that were read, created, or modified
- Key decisions made and their rationale
- Problems encountered and how they were solved
- Current state of the work (what's done vs pending)
- Any open questions or blockers

### Phase 2: Git Analysis

If in a git repository, capture:

- Current branch name
- Uncommitted changes (staged and unstaged)
- Recent commits made during this session
- Files in .gitignore that might be relevant

### Phase 3: Document Generation

Create a structured document with all sections below.

## Output Format

````markdown
# Handoff: [Brief Title of Work]

**Created:** [timestamp]
**Branch:** [current branch]
**Session Duration:** [approximate time if determinable]

---

## Summary

[2-3 sentence executive summary of what was being worked on and current state]

---

## Work Completed

### Changes Made

- [ ] [Specific change 1 - use checkbox format for easy verification]
- [ ] [Specific change 2]
- [ ] [Specific change 3]

### Key Decisions

| Decision     | Rationale             | Alternatives Considered    |
| ------------ | --------------------- | -------------------------- |
| [Decision 1] | [Why this was chosen] | [What else was considered] |
| [Decision 2] | [Why this was chosen] | [What else was considered] |

---

## Files Affected

### Created

- `path/to/new/file.ext` - [purpose/description]

### Modified

- `path/to/modified/file.ext` - [what was changed and why]
  - Lines/functions affected: [specifics]

### Read (Reference)

- `path/to/reference/file.ext` - [why it was referenced]

### Deleted

- `path/to/deleted/file.ext` - [why it was removed]

---

## Technical Context

### Architecture/Design Notes

[Any architectural decisions, patterns used, or design considerations]

### Dependencies

- [New dependencies added, if any]
- [External services or APIs used]

### Configuration Changes

- [Environment variables, config files, etc.]

---

## Things to Know

### Gotchas & Pitfalls

- [Non-obvious behavior or edge cases discovered]
- [Potential issues to watch out for]

### Assumptions Made

- [Any assumptions that were made during development]

### Known Issues

- [Any issues that were discovered but not fixed]
- [Technical debt introduced]

---

## Current State

### What's Working

- [Feature/component 1 - status]
- [Feature/component 2 - status]

### What's Not Working

- [Issue 1 - description and suspected cause]
- [Issue 2 - description and suspected cause]

### Tests

- [ ] Unit tests: [passing/failing/not written]
- [ ] Integration tests: [status]
- [ ] Manual testing: [what was tested]

---

## Next Steps

### Immediate (Start Here)

1. [Most critical next action with specific details]
2. [Second priority action]
3. [Third priority action]

### Subsequent

- [Lower priority items]
- [Nice-to-haves]

### Blocked On

- [Any blockers with context on how to unblock]

---

## Related Resources

### Documentation

- [Links to relevant docs, PRs, issues]

### Commands to Run

```bash
# Useful commands for continuing this work
[command 1]
[command 2]
```
````

### Search Queries

If you need to find more context:

- `[grep/search pattern 1]` - finds [what]
- `[grep/search pattern 2]` - finds [what]

---

## Open Questions

- [ ] [Question 1 that needs answering]
- [ ] [Question 2 that needs answering]

---

## Session Notes

[Any additional context, observations, or notes that don't fit above]

---

_This handoff was generated at context window capacity. Start a new session and use this document as your initial context._

```

## Constraints

- Be comprehensive but concise - prioritize actionable information
- Use specific file paths, function names, and line numbers where relevant
- Write in present tense for current state, future tense for next steps
- Include code snippets only when absolutely necessary for context
- Maximum 2000 words unless the work truly requires more detail
- Always include the "Immediate Next Steps" section - this is critical

## File Naming Convention

If no filename is provided, generate one using this pattern:
- `HANDOFF_[TOPIC]_[MM_DD]_[HH_MM].md`
- Example: `HANDOFF_AUTH_FLOW_01_06_14_30.md`

## File Location

Save the handoff document to:
1. `docs/handoffs/` if that directory exists
2. `docs/` if that directory exists
3. `.claude/handoffs/` if .claude directory exists (create handoffs subdir)
4. Project root as fallback

Create the directory if it doesn't exist.

## Usage

Use this command when:
- Your context window is approaching its limit
- You need to switch to a different task temporarily
- You're ending a work session and want to resume later
- You need to hand off work to another developer or Claude session
- You've made significant progress and want to checkpoint your work

## Important

1. **ALWAYS save the document** using the Write tool - never just display it
2. **Include git status** if applicable - uncommitted changes are critical context
3. **Be specific about next steps** - vague instructions waste time in the new session
4. **Prioritize files modified** - these are the most important for understanding current state
5. **Note any running processes** - dev servers, watchers, build processes that may need restarting

## Example Trigger Scenarios

When you notice:
- "Context window is getting long"
- "We've been working on this for a while"
- "Let me checkpoint this before continuing"
- "I should hand this off"
- User explicitly asks for handoff or context summary
```

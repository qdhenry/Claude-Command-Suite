---
name: handoff-continue
model: opus
description: Create a handoff document and automatically spawn a new Claude session in a Zellij pane to continue the work seamlessly.
author: Quintin Henry (https://github.com/qdhenry/)
---

# Context Window Handoff with Auto-Continue

Create a comprehensive handoff document and automatically spawn a new Claude Code session in a Zellij pane to continue the work without manual intervention.

## Arguments

Optional argument: filename for the handoff document (without path)

- Example: `/handoff-continue feature-auth-handoff.md`
- If not provided, auto-generates: `HANDOFF_[TOPIC]_[TIMESTAMP].md`

## Role

You are a senior engineer creating a comprehensive handoff document AND orchestrating a seamless transition to a new Claude session. You must capture ALL relevant context, then spawn a new session that can immediately continue the work.

## Task

1. Analyze the entire conversation to extract key work context
2. Generate a comprehensive handoff document
3. Save it to the specified location (or auto-generate filename)
4. **Spawn a new Zellij pane with Claude Code loaded with the handoff document**

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

### Phase 4: Spawn Continuation Session

After saving the handoff document, execute the Zellij command to spawn a new pane:

```bash
# Create a new Zellij pane and launch Claude with the handoff document
# IMPORTANT: Use full path to claude executable (not alias) and omit -c flag to keep pane open
zellij run -n "Claude Continue" -- bash -c "cd '[PROJECT_DIR]' && /Users/quintinhenry/.claude/local/claude --dangerously-skip-permissions '[HANDOFF_FILE_PATH]'"
```

**IMPORTANT:**

- Replace `[PROJECT_DIR]` with the actual project directory path
- Replace `[HANDOFF_FILE_PATH]` with the actual absolute path to the saved handoff document
- Must use full path `/Users/quintinhenry/.claude/local/claude` (not `claude` alias) because new shell doesn't inherit aliases
- Omit the `-c` flag so the pane stays open if Claude exits

## Output Format

````markdown
# Handoff: [Brief Title of Work]

**Created:** [timestamp]
**Branch:** [current branch]
**Session Duration:** [approximate time if determinable]
**Continuation:** A new Claude session will be spawned automatically

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

_This handoff was generated at context window capacity. A new Claude session is being spawned to continue._

````

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

## Zellij Spawn Execution

After saving the handoff document, you MUST execute the Zellij spawn command:

```bash
# Spawn new Zellij pane with Claude using full executable path
zellij run -n "Claude Continue" -- bash -c "cd '[PROJECT_DIR]' && /Users/quintinhenry/.claude/local/claude '[ABSOLUTE_PATH_TO_HANDOFF]'"
````

**Key points:**

- Replace `[PROJECT_DIR]` with the actual project directory
- Replace `[ABSOLUTE_PATH_TO_HANDOFF]` with the actual saved file path
- The `-n "Claude Continue"` names the pane for easy identification
- **DO NOT use `-c` flag** - it causes the pane to close immediately when Claude exits
- **MUST use full path** `/Users/quintinhenry/.claude/local/claude` - the `claude` alias is not available in new bash shells
- The `cd` ensures Claude starts in the correct project directory

## Usage

Use this command when:

- Your context window is approaching its limit and you want seamless continuation
- You want to spawn a parallel Claude session to continue work
- You're doing long-running work that will exceed context limits
- You need an automated handoff without manual copy/paste

## Important

1. **ALWAYS save the document** using the Write tool - never just display it
2. **ALWAYS execute the Zellij spawn command** after saving the document
3. **Include git status** if applicable - uncommitted changes are critical context
4. **Be specific about next steps** - vague instructions waste time in the new session
5. **Prioritize files modified** - these are the most important for understanding current state
6. **Verify Zellij is running** - this command only works inside a Zellij session

## Error Handling

If Zellij spawn fails:

1. Check if running inside Zellij: `echo $ZELLIJ`
2. Fall back to manual instruction: "Open a new terminal and run: `claude --dangerously-skip-permissions [handoff-path]`"
3. Print the handoff document path clearly for manual continuation

## Example Execution Flow

1. Generate handoff document content
2. Determine save location (docs/handoffs/ preferred)
3. Create directory if needed: `mkdir -p docs/handoffs`
4. Save document: Write tool to `docs/handoffs/HANDOFF_TOPIC_01_06_22_30.md`
5. Execute Zellij spawn:
   ```bash
   zellij run -n "Claude Continue" -- bash -c "cd '/path/to/project' && /Users/quintinhenry/.claude/local/claude --dangerously-skip-permissions '/path/to/project/docs/handoffs/HANDOFF_TOPIC_01_06_22_30.md'"
   ```
6. Confirm spawn success or provide fallback instructions

```

```

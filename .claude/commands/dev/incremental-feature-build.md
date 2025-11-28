# Incremental Feature Build Command

Systematic approach for building complex features incrementally, preventing premature completion and ensuring comprehensive functionality through structured feature tracking.

## Instructions

Build a feature incrementally using the structured approach for: **$ARGUMENTS**

This command implements best practices for long-running agent tasks, preventing the tendency to one-shot applications or prematurely consider projects complete.

---

## Phase 1: Feature Requirements Expansion

### 1.1 Create Feature Tracking Directory

```bash
mkdir -p .feature-tracking
```

### 1.2 Generate Comprehensive Feature List

Analyze the user's request and expand it into a comprehensive list of granular features. Each feature should be a discrete, testable unit of functionality.

**Create file: `.feature-tracking/features.json`**

```json
{
  "project": "$ARGUMENTS",
  "created": "YYYY-MM-DD",
  "version": "1.0.0",
  "summary": {
    "total": 0,
    "passing": 0,
    "failing": 0
  },
  "features": []
}
```

### 1.3 Feature Schema

Each feature MUST follow this exact JSON schema:

```json
{
  "id": "FEAT-001",
  "category": "functional|ui|integration|performance|security|accessibility",
  "priority": "critical|high|medium|low",
  "description": "Clear, actionable description of the feature",
  "steps": [
    "Step 1: Specific action to verify",
    "Step 2: Expected behavior check",
    "Step 3: Edge case validation"
  ],
  "dependencies": ["FEAT-000"],
  "passes": false,
  "implementedAt": null,
  "commitHash": null
}
```

### 1.4 Feature Categories

Generate features across ALL relevant categories:

| Category | Description | Examples |
|----------|-------------|----------|
| `functional` | Core business logic | User can submit form, data saves correctly |
| `ui` | User interface elements | Button displays, modal opens, responsive layout |
| `integration` | System connections | API calls work, database syncs, auth flows |
| `performance` | Speed and efficiency | Page loads under 3s, lazy loading works |
| `security` | Protection measures | Input sanitized, auth required, CSRF protection |
| `accessibility` | Inclusive design | Screen reader support, keyboard navigation |

### 1.5 Feature Generation Guidelines

When expanding the user's request:

1. **Be Exhaustive**: Aim for 50-200+ features for complex projects
2. **Be Specific**: Each feature should be independently verifiable
3. **Include Edge Cases**: Error states, empty states, boundary conditions
4. **Cover All Paths**: Happy path AND unhappy paths
5. **Think Like a User**: What would they expect at each step?

---

## Phase 2: Initialize Progress Tracking

### 2.1 Create Progress File

**Create file: `.feature-tracking/PROGRESS.md`**

```markdown
# Feature Implementation Progress

## Project: $ARGUMENTS
## Started: YYYY-MM-DD

---

## Current Status

- **Features Total**: X
- **Implemented**: 0
- **Remaining**: X

---

## Session Log

### Session 1 - YYYY-MM-DD

**Focus**: Initial setup and first features

**Completed**:
- (none yet)

**Notes**:
- (session notes here)

**Commit**: (hash when committed)

---

## Implementation Order

Based on dependencies, implement in this order:

1. [ ] FEAT-001 - Description
2. [ ] FEAT-002 - Description
...

---

## Blocked/Issues

(Track any blockers here)
```

### 2.2 Git Initialization Check

Ensure git is initialized and create initial tracking commit:

```bash
git add .feature-tracking/
git commit -m "feat: initialize feature tracking for $ARGUMENTS

- Created features.json with X features to implement
- All features marked as failing (passes: false)
- Created progress tracking file"
```

---

## Phase 3: Incremental Implementation

### CRITICAL RULES

**You MUST follow these rules without exception:**

1. **ONE FEATURE AT A TIME**: Never work on multiple features simultaneously
2. **NO TEST REMOVAL**: It is **UNACCEPTABLE** to remove or edit features from features.json because this could lead to missing or buggy functionality
3. **ONLY CHANGE STATUS**: The only modification allowed to features.json is changing `passes` from `false` to `true` and updating `implementedAt` and `commitHash`
4. **COMMIT AFTER EACH**: Create a git commit after each feature is implemented
5. **CLEAN STATE**: Each commit must leave the codebase in a working state

### 3.1 Feature Implementation Loop

For each feature, follow this exact workflow:

#### Step A: Select Next Feature

1. Read `.feature-tracking/features.json`
2. Find the first feature where `passes: false`
3. Check dependencies are satisfied (all dependent features pass)
4. Announce: "Now implementing FEAT-XXX: [description]"

#### Step B: Implement Feature

1. Write the necessary code
2. Ensure existing functionality still works
3. Test the specific feature manually or with tests
4. Verify all steps in the feature definition

#### Step C: Update Tracking (JSON Only)

Edit `.feature-tracking/features.json`:
- Change `"passes": false` to `"passes": true`
- Set `"implementedAt": "YYYY-MM-DD HH:MM"`
- Update summary counts

```json
{
  "id": "FEAT-001",
  "passes": true,
  "implementedAt": "2024-01-15 14:30",
  "commitHash": "(to be filled)"
}
```

#### Step D: Commit Progress

```bash
git add .
git commit -m "feat(FEAT-XXX): [brief description]

Implemented: [feature description]

Verification:
- [step 1 verified]
- [step 2 verified]
- [step 3 verified]

Progress: X/Y features complete"
```

#### Step E: Update Progress File

Add to `.feature-tracking/PROGRESS.md`:

```markdown
### FEAT-XXX - [Description]
- **Status**: PASSED
- **Implemented**: YYYY-MM-DD HH:MM
- **Commit**: [hash]
- **Notes**: [any implementation notes]
```

#### Step F: Update Commit Hash

Edit features.json to add the commit hash from Step D.

### 3.2 Continue Until Complete

Repeat the implementation loop until ALL features show `passes: true`.

---

## Phase 4: Recovery Protocols

### 4.1 If Implementation Fails

If a feature cannot be implemented correctly:

1. **DO NOT** mark it as passing
2. **DO NOT** remove the feature
3. **DO** use git to revert: `git checkout -- [files]`
4. **DO** document the blocker in PROGRESS.md
5. **DO** move to the next non-blocked feature

### 4.2 If Code Breaks

If implementing a feature breaks existing functionality:

1. Run `git diff` to see changes
2. Run `git stash` to save work
3. Verify baseline still works
4. Run `git stash pop` and fix carefully
5. Or `git checkout -- .` to fully reset

### 4.3 Revert Bad Commits

If a commit introduced bugs:

```bash
git log --oneline -10  # Find the bad commit
git revert [hash]      # Create revert commit
```

---

## Phase 5: Completion Verification

### 5.1 Final Checklist

Before declaring the project complete:

```bash
# Generate completion report
cat .feature-tracking/features.json | grep '"passes": false'
```

**Must return empty** - all features must pass.

### 5.2 Summary Generation

Create final summary in PROGRESS.md:

```markdown
## Project Complete

- **Total Features**: X
- **All Passing**: Yes
- **Total Commits**: Y
- **Duration**: Z days/hours

### Feature Breakdown by Category

| Category | Count | Status |
|----------|-------|--------|
| functional | X | All Pass |
| ui | X | All Pass |
| integration | X | All Pass |
| ... | ... | ... |
```

### 5.3 Final Commit

```bash
git add .
git commit -m "feat: complete $ARGUMENTS implementation

All X features implemented and verified:
- functional: X/X passing
- ui: X/X passing
- integration: X/X passing
- [other categories]

See .feature-tracking/features.json for full details"
```

---

## Example Feature Expansion

For a request like "Build a todo app", expand to features like:

```json
{
  "features": [
    {
      "id": "FEAT-001",
      "category": "ui",
      "priority": "critical",
      "description": "App displays main todo list container on page load",
      "steps": [
        "Navigate to app URL",
        "Verify todo container element exists",
        "Check container is visible and centered"
      ],
      "dependencies": [],
      "passes": false
    },
    {
      "id": "FEAT-002",
      "category": "functional",
      "priority": "critical",
      "description": "User can add a new todo item",
      "steps": [
        "Locate input field for new todo",
        "Type 'Buy groceries' and press Enter",
        "Verify new todo appears in list",
        "Verify input field is cleared"
      ],
      "dependencies": ["FEAT-001"],
      "passes": false
    },
    {
      "id": "FEAT-003",
      "category": "functional",
      "priority": "critical",
      "description": "User can mark todo as complete",
      "steps": [
        "Click checkbox next to existing todo",
        "Verify checkbox shows checked state",
        "Verify todo text shows strikethrough style"
      ],
      "dependencies": ["FEAT-002"],
      "passes": false
    }
  ]
}
```

---

## Usage Examples

### Start New Feature Build
```
/dev:incremental-feature-build user authentication system with OAuth
```

### Resume Existing Build
```
/dev:incremental-feature-build (continuing from features.json)
```

### View Progress
```bash
cat .feature-tracking/PROGRESS.md
cat .feature-tracking/features.json | jq '.summary'
```

---

## Key Principles

1. **JSON Over Markdown**: Use JSON for feature tracking because models are less likely to inappropriately modify structured data
2. **Atomic Progress**: Each commit represents one verified feature
3. **Git as Safety Net**: Commit frequently to enable easy rollbacks
4. **No Shortcuts**: Every feature must be individually verified
5. **Clean States Only**: Never leave the codebase in a broken state

---

## Related Commands

- `/dev:code-review` - Review implemented code quality
- `/test:generate-test-cases` - Generate automated tests for features
- `/orchestration:status` - Check overall task progress
- `/dev:debug-error` - Debug failing features

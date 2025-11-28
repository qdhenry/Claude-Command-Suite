# Parallel Feature Build Command

Orchestrated parallel implementation of complex features using multiple agents, with dependency-aware batching and synchronized progress tracking.

## Instructions

Build features in parallel using agent orchestration for: **$ARGUMENTS**

This command extends the incremental approach with parallel execution capabilities, launching multiple agents to work on independent features simultaneously while maintaining strict tracking and clean merge protocols.

> **Note:** `$ARGUMENTS` is automatically replaced with the text following the command invocation.
> Example: `/dev:parallel-feature-build e-commerce checkout` sets `$ARGUMENTS` to "e-commerce checkout"

---

## Phase 1: Feature Requirements & Dependency Analysis

### 1.1 Create Feature Tracking Directory

```bash
# Create tracking directories with error handling
mkdir -p .feature-tracking/{agents,batches,merges} || { echo "ERROR: Cannot create directories. Check permissions."; exit 1; }
```

If directory creation fails, verify:
- You have write permissions in the current directory
- Sufficient disk space is available

### 1.2 Generate Comprehensive Feature List

Same as incremental approach - expand user request into granular features.

**Create file: `.feature-tracking/features.json`**

```json
{
  "project": "$ARGUMENTS",
  "created": "YYYY-MM-DD",
  "version": "1.0.0",
  "mode": "parallel",
  "summary": {
    "total": 0,
    "passing": 0,
    "failing": 0,
    "in_progress": 0
  },
  "agents": {
    "max_parallel": 4,
    "active": []
  },
  "features": []
}
```

### 1.3 Enhanced Feature Schema for Parallel Execution

```json
{
  "id": "FEAT-001",
  "category": "functional|ui|integration|performance|security|accessibility",
  "priority": "critical|high|medium|low",
  "description": "Clear, actionable description",
  "steps": ["Step 1", "Step 2", "Step 3"],
  "dependencies": ["FEAT-000"],
  "dependents": ["FEAT-002", "FEAT-003"],
  "status": "pending|in_progress|passed|blocked",
  "assignedAgent": null,
  "branch": null,
  "batch": null,
  "implementedAt": null,
  "mergedAt": null,
  "commitHash": null
}
```

### 1.4 Build Dependency Graph

**Create file: `.feature-tracking/dependency-graph.json`**

```json
{
  "generated": "YYYY-MM-DD HH:MM",
  "criticalPath": ["FEAT-001", "FEAT-005", "FEAT-012"],
  "criticalPathLength": 3,
  "batches": [
    {
      "batch": 1,
      "features": ["FEAT-001", "FEAT-002", "FEAT-003"],
      "parallel": true,
      "blockedBy": []
    },
    {
      "batch": 2,
      "features": ["FEAT-004", "FEAT-005"],
      "parallel": true,
      "blockedBy": [1]
    }
  ],
  "isolatedFeatures": ["FEAT-010", "FEAT-011"],
  "graph": {
    "FEAT-001": { "in": [], "out": ["FEAT-004", "FEAT-005"] },
    "FEAT-002": { "in": [], "out": ["FEAT-006"] }
  }
}
```

### 1.5 Dependency Analysis Rules

1. **No Dependencies**: Can start immediately in Batch 1
2. **Single Dependency**: Waits for that feature only
3. **Multiple Dependencies**: Waits for ALL dependencies
4. **Circular Detection**: FAIL if cycles found - must restructure

#### Circular Dependency Detection

Before proceeding, verify no cycles exist in the dependency graph:

```bash
# Using jq to detect cycles (simplified check)
# This finds features that depend on features that depend back on them
cat .feature-tracking/features.json | jq '
  .features as $all |
  [.features[] |
    select(.dependencies[] as $dep |
      $all[] | select(.id == $dep) | .dependencies[] == .id
    )
  ] | if length > 0 then
    "CIRCULAR DEPENDENCY DETECTED: \(.[].id)"
  else
    "No cycles detected"
  end
'
```

**If cycles are detected:**
1. Identify the circular chain (A → B → A)
2. Break the cycle by splitting one feature into sub-features
3. Or merge dependent features into a single feature
4. Re-run dependency analysis

---

## Phase 2: Parallel Execution Planning

### 2.1 Calculate Optimal Batches

Use topological sort to determine execution order:

```
Batch 1: All features with no dependencies (run in parallel)
Batch 2: Features depending only on Batch 1 (run in parallel after Batch 1)
Batch 3: Features depending on Batch 1 or 2 (run in parallel after Batch 2)
...continue until all features assigned
```

### 2.2 Agent Assignment Strategy

**Create file: `.feature-tracking/agent-assignments.json`**

```json
{
  "strategy": "round-robin|load-balanced|priority-based",
  "maxAgents": 4,
  "assignments": [
    {
      "agentId": "agent-1",
      "features": ["FEAT-001", "FEAT-004"],
      "branch": "feature/agent-1-batch",
      "status": "idle|working|waiting"
    }
  ]
}
```

### 2.3 Create Main Feature Branch

Before launching agents, create the integration branch where all features will be merged:

```bash
# Create and switch to the main feature branch
git checkout -b feature/$PROJECT_NAME-main

# Push to establish remote tracking
git push -u origin feature/$PROJECT_NAME-main

# Record in coordination files
echo "feature/$PROJECT_NAME-main" > .feature-tracking/main-branch.txt
```

**Important:** All agent branches will merge INTO this branch, not directly to main/master.

### 2.4 Create Master Coordination Document

**Create file: `.feature-tracking/COORDINATION.md`**

```markdown
# Parallel Feature Build Coordination

## Project: $ARGUMENTS
## Mode: Parallel Execution
## Max Agents: 4

---

## Execution Batches

### Batch 1 (No Dependencies) - PARALLEL
| Feature | Agent | Branch | Status |
|---------|-------|--------|--------|
| FEAT-001 | agent-1 | feat/agent-1-b1 | pending |
| FEAT-002 | agent-2 | feat/agent-2-b1 | pending |
| FEAT-003 | agent-3 | feat/agent-3-b1 | pending |

### Batch 2 (Depends on Batch 1) - PARALLEL after Batch 1
| Feature | Agent | Branch | Status |
|---------|-------|--------|--------|

---

## Merge Queue

| Order | Feature | From Branch | Status |
|-------|---------|-------------|--------|

---

## Active Agents

| Agent ID | Current Feature | Branch | Started |
|----------|-----------------|--------|---------|
```

---

## Phase 3: Agent Orchestration

### 3.1 Launch Parallel Agents

For each feature in the current batch, use the Task tool to spawn an agent:

```markdown
**Agent Instructions for FEAT-XXX:**

You are implementing feature FEAT-XXX for project: $ARGUMENTS

**Your Feature:**
- ID: FEAT-XXX
- Description: [description]
- Verification Steps:
  1. [step 1]
  2. [step 2]
  3. [step 3]

**Your Branch:** feat/agent-X-FEAT-XXX

**CRITICAL RULES:**
1. Work ONLY on your assigned feature
2. Create atomic, focused commits
3. Do NOT modify features.json directly
4. Write progress to: .feature-tracking/agents/agent-X-progress.md
5. When complete, update: .feature-tracking/agents/agent-X-status.json

**Workflow:**
1. Create and checkout your branch: `git checkout -b feat/agent-X-FEAT-XXX`
2. Implement the feature
3. Test all verification steps
4. Commit with message: `feat(FEAT-XXX): [description]`
5. Update your status file to "completed"
6. Push branch: `git push origin feat/agent-X-FEAT-XXX`

**Status File Format (.feature-tracking/agents/agent-X-status.json):**
```json
{
  "agentId": "agent-X",
  "featureId": "FEAT-XXX",
  "status": "completed",
  "branch": "feat/agent-X-FEAT-XXX",
  "commitHash": "[hash]",
  "completedAt": "YYYY-MM-DD HH:MM",
  "notes": "Any implementation notes"
}
```

Report back when complete.
```

### 3.2 Agent Progress Files

Each agent writes to: `.feature-tracking/agents/agent-X-progress.md`

```markdown
# Agent X Progress

## Assigned Feature: FEAT-XXX
## Branch: feat/agent-X-FEAT-XXX

### Implementation Log

**[HH:MM]** Started implementation
- Created component structure
- Added basic functionality

**[HH:MM]** Testing verification steps
- Step 1: PASS
- Step 2: PASS
- Step 3: PASS

**[HH:MM]** Implementation complete
- Committed: [hash]
- Ready for merge
```

### 3.3 Monitor Agent Completion

Poll agent status files until all agents in batch complete:

```bash
# Check all agent statuses with polling interval
check_agents_complete() {
  local all_complete=true
  for f in .feature-tracking/agents/agent-*-status.json; do
    if [ -f "$f" ]; then
      status=$(cat "$f" | jq -r '.status')
      if [ "$status" != "completed" ]; then
        all_complete=false
        echo "Agent $(basename $f): $status"
      fi
    else
      all_complete=false
    fi
  done
  $all_complete
}

# Poll with 30-second intervals until all agents complete
while ! check_agents_complete; do
  echo "Waiting for agents to complete..."
  sleep 30
done
echo "All agents complete!"
```

**Alternative: File watching** (if available)
```bash
# Use inotifywait for real-time monitoring (Linux)
inotifywait -m -e modify .feature-tracking/agents/*.json
```

---

## Phase 4: Merge Coordination

### 4.1 Merge Order Protocol

After all agents in a batch complete:

1. **Sort by Feature ID** for deterministic merge order
2. **Merge sequentially** to main feature branch
3. **Verify after each merge** that codebase still works

### 4.2 Merge Workflow

```bash
# Read the main feature branch name (created in Phase 2.3)
MAIN_BRANCH=$(cat .feature-tracking/main-branch.txt)

# For each completed feature branch
git checkout "$MAIN_BRANCH"
git merge --no-ff feat/agent-X-FEAT-XXX -m "merge(FEAT-XXX): [description]

Implemented by: agent-X
Verification: All steps passed
Batch: X of Y"

# Test that merge didn't break anything
[run tests or verification]

# If merge conflicts:
# 1. Resolve conflicts
# 2. Run full test suite
# 3. Commit resolution
```

### 4.3 Update Master Tracking

After successful merge, update `.feature-tracking/features.json` using file locking to prevent race conditions:

```bash
# Acquire lock before updating shared tracking file
LOCKFILE=".feature-tracking/.features.lock"

acquire_lock() {
  while ! mkdir "$LOCKFILE" 2>/dev/null; do
    echo "Waiting for lock..."
    sleep 1
  done
}

release_lock() {
  rmdir "$LOCKFILE"
}

# Usage
acquire_lock
# Update features.json here
release_lock
```

**Update the feature entry:**
```json
{
  "id": "FEAT-XXX",
  "status": "passed",
  "assignedAgent": "agent-X",
  "branch": "feat/agent-X-FEAT-XXX",
  "implementedAt": "YYYY-MM-DD HH:MM",
  "mergedAt": "YYYY-MM-DD HH:MM",
  "commitHash": "[merge-commit-hash]"
}
```

### 4.4 Conflict Resolution Protocol

If merge conflicts occur:

1. **Identify conflicting files**
2. **Analyze which agent's changes take precedence**
3. **Resolve favoring the more complete implementation**
4. **Document resolution** in merge commit message
5. **Re-verify affected features**

---

## Phase 5: Batch Progression

### 5.1 Batch Completion Check

```bash
# Verify all features in batch are merged
cat .feature-tracking/features.json | jq '[.features[] | select(.batch == 1 and .status != "passed")] | length'
# Must return 0
```

### 5.2 Advance to Next Batch

1. Update COORDINATION.md with batch completion status
2. Identify next batch of features
3. Assign to agents (may reuse same agents)
4. Launch new parallel execution round

### 5.3 Continue Until All Batches Complete

```
While batches remain:
  1. Launch agents for current batch (parallel)
  2. Wait for all agents to complete
  3. Merge all branches sequentially
  4. Verify merged codebase
  5. Advance to next batch
```

---

## Phase 6: Recovery & Error Handling

### 6.1 Agent Failure Protocol

If an agent fails to complete:

1. **Check agent progress file** for last known state
2. **Salvage work if possible**: `git cherry-pick` good commits
3. **Reassign feature** to different agent or handle sequentially
4. **Do NOT block other agents** in same batch

### 6.2 Merge Failure Protocol

If merge cannot be resolved:

1. **Abort merge**: `git merge --abort`
2. **Identify conflicting features**
3. **Re-implement one feature** to avoid conflict
4. **Or execute features sequentially** instead of parallel

### 6.3 Rollback Batch

If entire batch must be reverted:

```bash
# Find commit before batch started
git log --oneline | grep "Batch X start"

# Revert all batch commits
git revert [batch-commits]

# Retry batch with adjusted approach
```

---

## Phase 7: Completion & Reporting

### 7.1 Final Verification

```bash
# All features must be passed
cat .feature-tracking/features.json | jq '[.features[] | select(.status != "passed")] | length'
# Must return 0
```

### 7.2 Generate Performance Report

**Create file: `.feature-tracking/PERFORMANCE-REPORT.md`**

```markdown
# Parallel Execution Performance Report

## Summary
- **Total Features**: X
- **Total Batches**: Y
- **Max Parallelism**: 4 agents
- **Total Duration**: Z hours

## Batch Breakdown

| Batch | Features | Duration | Parallelism |
|-------|----------|----------|-------------|
| 1 | 4 | 30min | 4x |
| 2 | 3 | 25min | 3x |
| 3 | 2 | 20min | 2x |

## Efficiency Metrics

- **Sequential Estimate**: X hours
- **Parallel Actual**: Y hours
- **Speedup Factor**: X/Y
- **Agent Utilization**: Z%

## Merge Statistics

- **Clean Merges**: X
- **Conflicts Resolved**: Y
- **Re-implementations**: Z
```

### 7.3 Final Commit

```bash
git add .
git commit -m "feat: complete parallel build of $ARGUMENTS

Execution Summary:
- Total features: X
- Batches: Y
- Max parallel agents: 4
- Speedup: Zx over sequential

All features verified and merged successfully.
See .feature-tracking/PERFORMANCE-REPORT.md for details"
```

---

## Usage Examples

### Start Parallel Feature Build

```
/dev:parallel-feature-build e-commerce checkout system
```

### With Agent Limit

```
/dev:parallel-feature-build --agents 2 user dashboard
```

### Monitor Progress

```bash
# View coordination status
cat .feature-tracking/COORDINATION.md

# Check agent statuses
ls .feature-tracking/agents/

# View dependency graph
cat .feature-tracking/dependency-graph.json | jq '.batches'
```

---

## Comparison: Sequential vs Parallel

| Aspect | Sequential | Parallel |
|--------|------------|----------|
| Speed | Slower | Faster (up to Nx) |
| Complexity | Simple | Complex coordination |
| Merge Risk | None | Potential conflicts |
| Best For | Small projects | Large feature sets |
| Agent Count | 1 | 2-4+ |

---

## Key Principles

1. **Independence First**: Only parallelize truly independent features
2. **Conservative Batching**: When in doubt, add to later batch
3. **Merge Early, Merge Often**: Don't let branches diverge too long
4. **Agent Isolation**: Each agent owns their branch exclusively
5. **Deterministic Merge Order**: Same order every time for reproducibility
6. **Fail Safe**: Any failure falls back to sequential execution

---

## Related Commands

- `/dev:incremental-feature-build` - Sequential single-agent approach
- `/orchestration:start` - General task orchestration
- `/orchestration:status` - Check orchestration progress
- `/dev:code-review` - Review merged code quality

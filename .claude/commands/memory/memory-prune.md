---
tools:
  - read
  - write
  - edit
  - bash
arguments: $PRUNE_CRITERIA
---

# Memory Tree Pruning

Selectively remove low-value, outdated, or irrelevant nodes from the semantic tree to maintain quality and performance.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Define Pruning Criteria**
   - Parse criteria from "$PRUNE_CRITERIA":
     * `old`: Nodes older than threshold
     * `low-value`: Low confidence/relevance
     * `dead-ends`: No children, low access
     * `failed`: BBCR failure nodes
     * `redundant`: Duplicate content
     * `orphaned`: Broken relationships
   - Set default if not specified:
     * Age > 30 days AND
     * Access count < 5 AND
     * No critical markers

2. **Identify Prune Candidates**
   - Scan tree for matching nodes:
     ```
     Candidates = nodes.filter(
       age > threshold AND
       importance < min_importance AND
       not protected AND
       not checkpoint AND
       not high_deltaS
     )
     ```
   - Calculate prune score:
     * Age factor (0-1)
     * Value factor (0-1)
     * Access factor (0-1)
     * Relationship factor (0-1)
   - Rank by prune priority

3. **Analyze Impact**
   - For each candidate:
     * Check dependent nodes
     * Identify broken chains
     * Find affected paths
   - Calculate impact metrics:
     * Nodes affected
     * Chains broken
     * Information lost
   - Mark safe vs risky prunes

4. **Apply Protection Rules**
   - Never prune:
     * Checkpoint nodes
     * High ΔS nodes (>0.7)
     * Recent nodes (<7 days)
     * User-marked important
     * Branch points
   - Protect related:
     * Parent of protected
     * Critical path nodes
     * Bridge nodes

5. **Execute Pruning**
   - Create pre-prune backup
   - Remove selected nodes
   - Update relationships:
     * Reconnect orphaned children
     * Update parent references
     * Fix broken chains
   - Rebuild indices
   - Log pruned nodes

## Output Format

```
MEMORY TREE PRUNING ANALYSIS
═══════════════════════════════════════
Prune Criteria: $PRUNE_CRITERIA
Nodes Analyzed: [total]
Candidates Found: [count]

Pruning Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Before: ████████████████████ [N] nodes
After:  ████████████ [M] nodes
Pruned: ████ [N-M] nodes ([percentage]%)

Prune Categories:
┌─────────────────────────────────────┐
│ Category      │ Count │ % of Total  │
├─────────────────────────────────────┤
│ Old & Unused  │ [N]   │ [%]         │
│ Dead Ends     │ [N]   │ [%]         │
│ Low Value     │ [N]   │ [%]         │
│ Failed Paths  │ [N]   │ [%]         │
│ Redundant     │ [N]   │ [%]         │
│ Orphaned      │ [N]   │ [%]         │
└─────────────────────────────────────┘

Nodes to Prune (Top 10):
────────────────────────────────────────
1. Node [id] - Score: 0.92
   Age: [days] | Access: [count] | Value: Low
   Topic: "[topic]"
   Reason: Old and never accessed
   Impact: None (dead end)
   
2. Node [id] - Score: 0.88
   Age: [days] | Access: [count] | Value: Low
   Topic: "[topic]"
   Reason: Redundant with [other_node]
   Impact: Low (reroute 1 reference)

3. Node [id] - Score: 0.85
   Age: [days] | Access: [count] | Value: Low
   Topic: "[topic]"
   Reason: Failed reasoning path
   Impact: None (already bypassed)

[... more nodes ...]

Protected Nodes (Not Pruned):
────────────────────────────────────────
✓ [count] Checkpoint nodes
✓ [count] High ΔS nodes (>0.7)
✓ [count] Recent nodes (<7 days)
✓ [count] User-marked important
✓ [count] Critical path nodes

Impact Analysis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Information Loss: [percentage]%
• Key insights preserved: 100%
• Minor details lost: [percentage]%
• Redundant info removed: [percentage]%

Chain Repairs Needed: [count]
• [Parent] → [Pruned] → [Child]
  Reconnect: [Parent] → [Child]
• [Node] → [Pruned] (dead end)
  Remove reference from [Node]

Tree Health Improvement:
• Avg ΔS: [before] → [after] ↑
• Noise reduction: [percentage]%
• Navigation speed: +[percentage]%
• Memory usage: -[percentage]%

Pruning Safety: [SAFE/MODERATE/RISKY]

Confirm Pruning? [Execute/Preview/Cancel]

Recovery:
• Backup created: .wfgy/backups/pre_prune_[timestamp].json
• Undo command: /memory:restore "pre_prune_[timestamp]"
```

## Pruning Strategies

### Conservative Pruning
- Only obvious dead ends
- Very old, never accessed
- Confirmed redundant
- ~10-20% reduction

### Standard Pruning
- Old and low value
- Redundant paths
- Failed experiments
- ~20-30% reduction

### Aggressive Pruning
- All low-value nodes
- Simplify all paths
- Keep only essential
- ~30-50% reduction

### Custom Criteria

```bash
# Prune by age
/memory:prune --older-than 60

# Prune by value
/memory:prune --value-below 0.3

# Prune by access
/memory:prune --accessed-less-than 2

# Prune failed paths
/memory:prune --failed-only

# Combined criteria
/memory:prune --old --low-value --dead-ends
```

## Pruning Rules

### Safe to Prune
- Dead end nodes
- Very old, unused
- Redundant content
- Failed paths
- Low confidence

### Careful Pruning
- Low access but recent
- Part of long chains
- Has some children
- Moderate value

### Never Prune
- Checkpoints
- High ΔS nodes
- Recent activity
- User marked
- Critical paths

## Configuration

```json
{
  "pruning": {
    "auto_prune": true,
    "age_threshold_days": 30,
    "access_threshold": 5,
    "value_threshold": 0.3,
    "protect_recent_days": 7,
    "max_prune_percent": 30
  }
}
```

## Integration

Pruning works with:
- `/memory:checkpoint` before pruning
- `/memory:compress` for gentler cleanup
- `/semantic:tree-view` to see results
- `/memory:recall` to verify important data retained
---
tools:
  - read
  - write
  - bash
  - grep
arguments: $CHECKPOINT_NAME
---

# Memory Checkpoint Creation

Create a checkpoint of the current semantic tree state for recovery, branching, or milestone marking.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Prepare Checkpoint**
   - Parse checkpoint name from "$CHECKPOINT_NAME"
   - If empty, auto-generate: "checkpoint_[timestamp]"
   - Read active tree from `.wfgy/trees/active_tree.json`
   - Calculate current state metrics

2. **Capture State Snapshot**
   - Tree structure and all nodes
   - Current context from `.wfgy/context.json`
   - Active configuration
   - Boundary maps
   - Formula states:
     * BBMC residue levels
     * BBPF path states
     * BBAM attention distribution
     * Current ΔS and λ_observe

3. **Create Checkpoint Package**
   ```json
   {
     "id": "checkpoint_uuid",
     "name": "$CHECKPOINT_NAME",
     "timestamp": "ISO_8601",
     "tree_state": {
       "tree_name": "name",
       "node_count": N,
       "last_node": "node_id",
       "nodes": [...]
     },
     "context_state": {
       "current_deltaS": value,
       "lambda": "direction",
       "e_resonance": value,
       "active_module": "BBMC/BBPF/BBCR/BBAM"
     },
     "metrics": {
       "avg_deltaS": value,
       "stability": value,
       "confidence": percentage
     },
     "metadata": {
       "reason": "manual/auto/pre-risk",
       "tags": ["milestone", "stable", "experimental"]
     }
   }
   ```

4. **Store Checkpoint**
   - Save to `.wfgy/checkpoints/[tree_name]/[checkpoint_name].json`
   - Update checkpoint index
   - Create recovery instructions
   - Log in `.wfgy/logs/checkpoints.log`
   - Maintain max checkpoints (default: 50)

5. **Verify Checkpoint**
   - Test checkpoint integrity
   - Validate all data preserved
   - Ensure recovery possible
   - Calculate checkpoint size
   - Update checkpoint registry

## Output Format

```
CHECKPOINT CREATED SUCCESSFULLY
═══════════════════════════════════════
Checkpoint Name: $CHECKPOINT_NAME
Checkpoint ID: [uuid]
Created: [timestamp]

State Captured:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tree: [tree_name]
Nodes: [count]
Position: Node [id] "[topic]"

Current Metrics:
• ΔS: [value]
• λ: [direction]
• E_resonance: [value]
• Confidence: [percentage]%

Checkpoint Statistics:
┌─────────────────────────────────────┐
│ Metric         │ Value  │ Status    │
├─────────────────────────────────────┤
│ Completeness   │ 100%   │ ✓ Full    │
│ Size           │ [size] │ Normal    │
│ Compression    │ [ratio]│ Applied   │
│ Recovery Time  │ ~[sec] │ Fast      │
└─────────────────────────────────────┘

Checkpoint Contents:
• Semantic nodes: [count]
• Relationships: [count]
• Context state: Preserved
• Configuration: Saved
• Boundaries: Mapped

Tags Applied:
[#manual] [#stable] [#milestone]

Recovery Instructions:
────────────────────────────────────────
To restore this checkpoint:
/memory:restore "$CHECKPOINT_NAME"

To branch from this checkpoint:
/semantic:tree-init "new_branch"
/memory:restore "$CHECKPOINT_NAME"

To compare with current:
/memory:diff "$CHECKPOINT_NAME"

Checkpoint Location:
.wfgy/checkpoints/[tree_name]/$CHECKPOINT_NAME.json

Related Checkpoints:
• Previous: [previous_checkpoint] ([time_ago])
• Next: None (latest)
• Similar: [similar_checkpoint]
```

## Checkpoint Types

### Manual Checkpoint
User-initiated save point
```bash
/memory:checkpoint "before_major_change"
```

### Automatic Checkpoint
System-triggered saves:
- Every N nodes (default: 50)
- Before high-risk operations
- At stability points
- Daily backups

### Recovery Checkpoint
Created before BBCR operations
```bash
/memory:checkpoint --type recovery
```

### Milestone Checkpoint
Major achievement markers
```bash
/memory:checkpoint "v1.0_complete" --milestone
```

## Checkpoint Management

### List Checkpoints
```bash
/memory:checkpoint --list
```

### Delete Old Checkpoints
```bash
/memory:checkpoint --cleanup --keep 10
```

### Export Checkpoint
```bash
/memory:checkpoint --export "checkpoint_name"
```

### Compare Checkpoints
```bash
/memory:checkpoint --compare "checkpoint1" "checkpoint2"
```

## Auto-Checkpoint Rules

Configure in `.wfgy/config.json`:
```json
{
  "auto_checkpoint": {
    "enabled": true,
    "frequency": 50,
    "on_risk": true,
    "risk_threshold": 0.7,
    "max_checkpoints": 50,
    "cleanup_age_days": 30
  }
}
```

## Recovery Scenarios

1. **Logic Failure**: Return to last stable
2. **Exploration**: Branch for experiments
3. **Milestone**: Mark achievements
4. **Backup**: Regular safety saves
5. **Comparison**: Track progress

## Integration

Checkpoints work with:
- `/memory:restore` to recover state
- `/wfgy:bbcr` for failure recovery
- `/semantic:tree-switch` for branches
- `/boundary:risk-assess` for auto-saves
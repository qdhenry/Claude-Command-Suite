---
tools:
  - read
  - write
  - edit
  - glob
arguments: $TREE_NAME
---

# Semantic Tree Switch

Switch between different semantic trees to manage multiple contexts, projects, or reasoning threads.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **List Available Trees**
   - If "$TREE_NAME" is empty or "list":
     * Scan `.wfgy/trees/` directory
     * Read tree metadata from each file
     * Display tree list with statistics
   - Read current active tree from `.wfgy/trees/active_tree.json`

2. **Validate Target Tree**
   - Parse target from "$TREE_NAME"
   - Search for exact match in tree registry
   - If not found, try fuzzy matching:
     * Case-insensitive search
     * Partial name matching
     * Suggest similar names
   - Load target tree metadata

3. **Save Current Context**
   - Create checkpoint of current tree
   - Save current position/context
   - Record switch event in current tree
   - Update last modified timestamp
   - Preserve any unsaved nodes

4. **Switch Active Tree**
   - Update `.wfgy/trees/active_tree.json`:
     ```json
     {
       "active": "$TREE_NAME",
       "previous": "[previous_tree]",
       "switched_at": "ISO_8601",
       "switch_count": N
     }
     ```
   - Load new tree into context
   - Update `.wfgy/context.json`
   - Reset semantic state to tree's last position
   - Load tree-specific configuration

5. **Initialize New Context**
   - Set ΔS baseline from last node
   - Restore λ_observe direction
   - Load active modules
   - Restore attention distribution
   - Apply tree-specific thresholds

6. **Display Tree Summary**
   - Show recent nodes from new tree
   - Display tree statistics
   - Highlight last position
   - Show available checkpoints
   - Suggest next actions

## Output Format

```
Switched to Semantic Tree: $TREE_NAME
═══════════════════════════════════════
Previous Tree: [previous_name]
Current Tree: $TREE_NAME

Tree Information:
- Created: [timestamp]
- Last Modified: [timestamp]
- Total Nodes: [count]
- Checkpoints: [count]

Tree Statistics:
- Average ΔS: [value]
- Primary Module: [BBMC/BBPF/BBCR/BBAM]
- Memory Usage: [size]
- Compression: [status]

Recent Activity (Last 5 Nodes):
────────────────────────────────────────
1. [timestamp] "Topic" (ΔS: 0.45) - BBMC
2. [timestamp] "Topic" (ΔS: 0.62) - BBPF
3. [timestamp] "Topic" (ΔS: 0.38) - BBAM
4. [timestamp] "Topic" (ΔS: 0.71) - BBPF
5. [timestamp] "Topic" (ΔS: 0.29) - BBMC

Current Position:
Node: [latest_node_id]
Topic: "[latest_topic]"
Context: [brief_context]

Available Actions:
• Continue building: /semantic:node-build
• View full tree: /semantic:tree-view
• Create checkpoint: /memory:checkpoint
• Return to previous: /semantic:tree-switch "[previous]"
```

## Tree List Format

When listing all trees:
```
Available Semantic Trees
═══════════════════════════════════════
◉ Active Tree (Current)
  Created: 2024-01-15 | Nodes: 127 | Avg ΔS: 0.52

○ Project Alpha
  Created: 2024-01-10 | Nodes: 89 | Avg ΔS: 0.48

○ Debug Sessions
  Created: 2024-01-08 | Nodes: 234 | Avg ΔS: 0.61

○ Research Notes
  Created: 2024-01-05 | Nodes: 56 | Avg ΔS: 0.43

○ Creative Brainstorm
  Created: 2024-01-03 | Nodes: 178 | Avg ΔS: 0.67

Commands:
Switch: /semantic:tree-switch "Tree Name"
Create: /semantic:tree-init "New Tree"
Delete: /semantic:tree-delete "Tree Name"
```

## Quick Switch

Common switching patterns:

```bash
# List all trees
/semantic:tree-switch

# Switch to specific tree
/semantic:tree-switch "Project Alpha"

# Switch to previous tree
/semantic:tree-switch --previous

# Switch to most recent tree
/semantic:tree-switch --recent

# Switch to tree with pattern
/semantic:tree-switch "Debug*"
```

## Tree Management

### Create Specialized Trees

```bash
# Development trees
/semantic:tree-init "Feature-Authentication"
/semantic:tree-init "Bugfix-Memory-Leak"

# Research trees
/semantic:tree-init "Research-Quantum"
/semantic:tree-init "Research-ML-Models"

# Creative trees
/semantic:tree-init "Story-WorldBuilding"
/semantic:tree-init "Design-UI-Concepts"
```

### Tree Organization

Best practices:
- One tree per major project
- Separate trees for debugging
- Research trees for exploration
- Archive completed trees
- Regular tree exports for backup

## Integration

After switching:
- `/semantic:tree-view` to orient yourself
- `/semantic:node-build` to continue work
- `/boundary:detect` to check knowledge state
- `/memory:recall` to review key insights
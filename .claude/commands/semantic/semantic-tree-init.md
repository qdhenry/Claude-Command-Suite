---
tools:
  - read
  - write
  - bash
  - glob
arguments: $TREE_NAME
---

# Semantic Tree Initialization

Create a new semantic tree for persistent memory storage and reasoning tracking in the WFGY system.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Parse Tree Configuration**
   - Extract tree name from "$TREE_NAME" (default: "A Tree" if empty)
   - Validate name (alphanumeric, spaces, underscores allowed)
   - Check for existing tree with same name
   - Generate unique tree ID (UUID)

2. **Create Tree Structure**
   ```json
   {
     "id": "tree_uuid",
     "name": "$TREE_NAME",
     "created": "ISO_8601_timestamp",
     "modified": "ISO_8601_timestamp",
     "metadata": {
       "version": "1.0.0",
       "node_count": 0,
       "total_deltaS": 0,
       "avg_deltaS": 0,
       "max_depth": 0,
       "modules_used": []
     },
     "config": {
       "auto_record": true,
       "deltaS_threshold": 0.6,
       "compression_threshold": 100,
       "max_nodes": 10000
     },
     "nodes": [],
     "checkpoints": []
   }
   ```

3. **Initialize Tree Storage**
   - Create tree file: `.wfgy/trees/$TREE_NAME.json`
   - Set up node index in `.wfgy/trees/indices/$TREE_NAME_index.json`
   - Create checkpoint directory: `.wfgy/trees/checkpoints/$TREE_NAME/`
   - Initialize tree statistics file

4. **Configure Tree Settings**
   - Set automatic recording threshold (ΔS > 0.6)
   - Enable divergent override for λ ∈ {←, <>}
   - Configure compression settings
   - Set up cross-reference mappings

5. **Activate Tree**
   - Update `.wfgy/trees/active_tree.json` to point to new tree
   - Initialize first node (root/boot node):
     * Topic: "Tree Initialization"
     * Module: "SYSTEM"
     * ΔS: 0.00
     * λ_observe: →
   - Update `.wfgy/context.json` with tree reference
   - Log creation in `.wfgy/logs/trees.log`

## Output Format

```
Semantic Tree Created Successfully
═══════════════════════════════════════
Tree Name: $TREE_NAME
Tree ID: [uuid]
Created: [timestamp]

Configuration:
- Auto-record: Enabled
- ΔS Threshold: 0.6
- Max Nodes: 10,000
- Compression: At 100 nodes

Status: Active ✓

Next Steps:
1. Start building nodes with /semantic:node-build
2. View tree structure with /semantic:tree-view
3. Configure settings in .wfgy/trees/$TREE_NAME.json
```

## Tree Types

Common tree patterns:
- **Project Trees**: For specific development projects
- **Research Trees**: For exploration and learning
- **Debug Trees**: For troubleshooting sessions
- **Creative Trees**: For ideation and brainstorming
- **Decision Trees**: For evaluating options

## Management Commands

After creation:
```bash
# Switch to different tree
/semantic:tree-switch "Another Tree"

# View current tree
/semantic:tree-view

# Export tree
/semantic:tree-export

# Build nodes
/semantic:node-build "First concept"
```

## Advanced Configuration

Custom tree settings in `.wfgy/trees/$TREE_NAME.json`:
```json
{
  "config": {
    "auto_record": true,
    "deltaS_threshold": 0.5,
    "lambda_triggers": ["divergent", "recursive"],
    "compression_threshold": 50,
    "prune_after_days": 30,
    "backup_frequency": "daily"
  }
}
```
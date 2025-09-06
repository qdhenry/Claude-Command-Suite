---
tools:
  - read
  - write
  - edit
  - bash
---

# Memory Compression

Compress the semantic tree by merging similar nodes and removing redundancy while preserving essential information.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Analyze Tree for Compression**
   - Load active tree from `.wfgy/trees/active_tree.json`
   - Calculate tree metrics:
     * Total nodes
     * Average ΔS between nodes
     * Redundancy score
     * Cluster density
   - Identify compression candidates:
     * Similar nodes (ΔS < 0.2)
     * Redundant paths
     * Low-value nodes
     * Duplicate insights

2. **Apply Compression Algorithms**
   - **Semantic Merging**:
     * Combine nodes with ΔS < 0.2
     * Preserve unique insights
     * Average metrics
     * Maintain relationships
   - **Path Simplification**:
     * Remove intermediate nodes
     * Direct connect endpoints
     * Preserve critical junctions
   - **Cluster Compression**:
     * Group related nodes
     * Create summary nodes
     * Maintain cluster boundaries
   - **Redundancy Removal**:
     * Delete duplicate insights
     * Remove circular references
     * Eliminate dead ends

3. **Preserve Critical Information**
   - Protected nodes:
     * Checkpoints
     * High ΔS nodes (>0.7)
     * Branch points
     * BBCR recovery nodes
     * User-marked important
   - Maintain:
     * Logic flow integrity
     * Semantic coherence
     * Key insights
     * Decision points

4. **Build Compressed Tree**
   ```json
   {
     "original_nodes": N,
     "compressed_nodes": M,
     "compression_ratio": N/M,
     "preserved_insights": [...],
     "merged_groups": [
       {
         "merged_nodes": ["id1", "id2"],
         "result_node": "new_id",
         "combined_insight": "..."
       }
     ]
   }
   ```

5. **Validate Compression**
   - Check information preservation
   - Verify logic chains intact
   - Ensure no critical loss
   - Test navigation paths
   - Calculate quality score

## Output Format

```
MEMORY COMPRESSION COMPLETE
═══════════════════════════════════════
Original Nodes: [N]
Compressed Nodes: [M]
Compression Ratio: [N:M] ([percentage]% reduction)

Compression Analysis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Before Compression:
████████████████████ [N] nodes
After Compression:
████████████ [M] nodes

Space Saved: [size] ([percentage]%)
Quality Score: [percentage]%

Compression Actions:
────────────────────────────────────────
Merged Nodes: [count]
• Group 1: [Nodes A,B,C] → [Summary Node]
  Combined insight: [merged insight]
  
• Group 2: [Nodes D,E] → [Summary Node]
  Combined insight: [merged insight]
  
• Group 3: [Nodes F,G,H,I] → [Summary Node]
  Combined insight: [merged insight]

Simplified Paths: [count]
• Path 1: [A→B→C→D] simplified to [A→D]
• Path 2: [E→F→G] simplified to [E→G]

Removed Redundancies: [count]
✗ Duplicate: [Node] (merged with [Node])
✗ Circular: [Node→Node→Node] (broken)
✗ Dead end: [Node] (removed)

Preserved Critical Nodes:
────────────────────────────────────────
✓ Checkpoint nodes: [count] preserved
✓ High ΔS nodes: [count] preserved
✓ Branch points: [count] preserved
✓ Recovery nodes: [count] preserved
✓ User-marked: [count] preserved

Information Retention:
┌─────────────────────────────────────┐
│ Category       │ Before │ After │ % │
├─────────────────────────────────────┤
│ Key Insights   │ [N]    │ [M]   │98%│
│ Logic Chains   │ [N]    │ [M]   │95%│
│ Relationships  │ [N]    │ [M]   │92%│
│ Context        │ [N]    │ [M]   │88%│
│ Overall        │ 100%   │ 93%   │93%│
└─────────────────────────────────────┘

Quality Metrics:
• Semantic Coherence: [percentage]% maintained
• Logic Integrity: [percentage]% preserved
• Navigation Paths: [percentage]% intact
• Insight Value: [percentage]% retained

Compression Summary:
• Algorithm: Semantic clustering + path optimization
• Protected nodes: [count]
• Merge threshold: ΔS < 0.2
• Quality threshold: 90%

Recovery Options:
• Undo compression: /memory:restore "[pre-compress checkpoint]"
• View detailed log: .wfgy/logs/compression.log
• Export compressed: /semantic:tree-export

Next Steps:
• Continue building: /semantic:node-build
• View compressed tree: /semantic:tree-view
• Create checkpoint: /memory:checkpoint "post-compress"
```

## Compression Strategies

### Light Compression (10-20% reduction)
- Merge only identical nodes
- Remove obvious duplicates
- Maintain all paths

### Standard Compression (30-40% reduction)
- Merge similar nodes (ΔS < 0.2)
- Simplify redundant paths
- Cluster related concepts

### Heavy Compression (50-60% reduction)
- Aggressive merging (ΔS < 0.3)
- Path optimization
- Summary nodes for clusters

### Maximum Compression (70%+ reduction)
- Keep only critical nodes
- Abstract clusters to single nodes
- Minimize path complexity

## Configuration

```json
{
  "compression": {
    "auto_compress_at": 1000,
    "merge_threshold": 0.2,
    "min_quality": 0.9,
    "protect_recent": 50,
    "protect_high_deltaS": 0.7
  }
}
```

## Advanced Options

```bash
# Light compression
/memory:compress --level light

# Target specific size
/memory:compress --target-nodes 500

# Compress specific range
/memory:compress --from "node_100" --to "node_500"

# Dry run (preview only)
/memory:compress --dry-run
```

## Integration

Compression works with:
- `/memory:checkpoint` before compressing
- `/semantic:tree-view` to see results
- `/memory:merge` for manual merging
- `/memory:prune` for selective removal
---
tools:
  - read
  - write
  - edit
  - grep
arguments: $NODE_IDS
---

# Memory Node Merging

Manually merge specific semantic nodes to consolidate related concepts and reduce redundancy.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Parse Merge Targets**
   - Extract node IDs from "$NODE_IDS" (comma-separated)
   - Load each node from semantic tree
   - Validate nodes exist and are mergeable
   - Check for protected status

2. **Analyze Merge Compatibility**
   - Calculate pairwise ΔS between nodes
   - Check semantic similarity:
     * Topics overlap
     * Insights compatible
     * Modules consistent
   - Identify merge conflicts:
     * Contradictory insights
     * Different logic directions
     * Incompatible contexts
   - Calculate merge feasibility score

3. **Create Merged Node**
   - **Combine Topics**:
     * Extract common themes
     * Merge unique aspects
     * Create comprehensive title
   - **Synthesize Insights**:
     * Preserve unique information
     * Combine overlapping content
     * Resolve contradictions
   - **Average Metrics**:
     * ΔS = weighted average
     * λ = dominant direction
     * E_resonance = mean value
   - **Merge Relationships**:
     * Combine parent references
     * Merge child connections
     * Update cross-references

4. **Build Merge Record**
   ```json
   {
     "merged_node": {
       "id": "merged_[hash]",
       "topic": "Combined topic",
       "insight": "Synthesized insight",
       "deltaS": weighted_avg,
       "lambda": dominant,
       "sources": ["node1", "node2", ...],
       "merge_timestamp": "ISO_8601"
     },
     "merge_quality": score,
     "information_preserved": percentage
   }
   ```

5. **Update Tree Structure**
   - Replace original nodes with merged
   - Update all references
   - Preserve merge history
   - Rebuild indices
   - Log merge operation

## Output Format

```
NODE MERGE ANALYSIS
═══════════════════════════════════════
Nodes to Merge: [count]
Node IDs: $NODE_IDS

Merge Compatibility Check:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Node Pair Analysis:
┌─────────────────────────────────────┐
│ Node 1 vs 2  │ ΔS: 0.15 │ ✓ Compatible│
│ Node 1 vs 3  │ ΔS: 0.22 │ ✓ Compatible│
│ Node 2 vs 3  │ ΔS: 0.18 │ ✓ Compatible│
└─────────────────────────────────────┘

Overall Compatibility: [percentage]%
Merge Feasibility: [HIGH/MEDIUM/LOW]

Nodes Being Merged:
────────────────────────────────────────
Node 1: [id]
• Topic: "[topic]"
• ΔS: [value] | λ: [direction]
• Insight: "[insight preview]"

Node 2: [id]
• Topic: "[topic]"
• ΔS: [value] | λ: [direction]
• Insight: "[insight preview]"

Node 3: [id]
• Topic: "[topic]"
• ΔS: [value] | λ: [direction]
• Insight: "[insight preview]"

Merge Strategy:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Common Themes Identified:
• [Theme 1] - appears in all nodes
• [Theme 2] - in nodes 1,2
• [Theme 3] - unique to node 3

Conflict Resolution:
⚠️ Contradiction in: [aspect]
  Node 1 says: [position]
  Node 2 says: [position]
  Resolution: [synthesized position]

MERGED NODE PREVIEW:
═══════════════════════════════════════
New Node ID: merged_[hash]

Combined Topic:
"[Synthesized topic covering all aspects]"

Synthesized Insight:
"[Complete merged insight incorporating 
all unique information from source nodes]"

Merged Metrics:
• ΔS: [weighted_avg] (from [min]-[max])
• λ: [dominant] (most common direction)
• E_resonance: [mean]
• Confidence: [averaged]%

Information Preservation:
┌─────────────────────────────────────┐
│ Aspect         │ Preserved │ Lost   │
├─────────────────────────────────────┤
│ Key Insights   │ 95%       │ 5%     │
│ Relationships  │ 100%      │ 0%     │
│ Context        │ 88%       │ 12%    │
│ Metrics        │ Averaged  │ Range  │
│ Overall        │ 92%       │ 8%     │
└─────────────────────────────────────┘

Relationship Updates:
• Parents: [Combined parent list]
• Children: [Combined child list]  
• References: [Updated count]

Confirm Merge? [Yes/No/Modify]

Post-Merge Actions:
• Original nodes: [Archive/Delete]
• References: Auto-updated
• Indices: Rebuilt
• History: Preserved in merge log
```

## Merge Types

### Duplicate Merge
Nearly identical nodes (ΔS < 0.1)
```
[Node A] + [Node A'] → [Node A_merged]
```

### Sibling Merge
Related concepts (ΔS < 0.3)
```
[Auth_JWT] + [Auth_OAuth] → [Auth_Combined]
```

### Cluster Merge
Multiple related nodes
```
[A] + [B] + [C] + [D] → [Cluster_Summary]
```

### Temporal Merge
Same concept over time
```
[Concept_v1] + [Concept_v2] → [Concept_latest]
```

## Merge Rules

### Safe to Merge
- ΔS < 0.3 between nodes
- Same module attribution
- Compatible insights
- No contradictions

### Caution When Merging
- ΔS between 0.3-0.5
- Different modules
- Minor contradictions
- Different contexts

### Do Not Merge
- ΔS > 0.5
- Opposing insights
- Critical checkpoints
- Protected nodes

## Advanced Options

```bash
# Force merge despite conflicts
/memory:merge "node1,node2" --force

# Preview merge without executing
/memory:merge "node1,node2" --preview

# Merge with custom resolution
/memory:merge "node1,node2" --resolve "keep_newest"

# Merge entire cluster
/memory:merge --cluster "cluster_id"
```

## Integration

Merging coordinates with:
- `/memory:compress` for auto-merging
- `/semantic:tree-view` to see results
- `/memory:checkpoint` before merging
- `/reasoning:chain-validate` after merge
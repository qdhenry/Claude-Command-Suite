---
tools:
  - read
  - grep
  - bash
arguments: $OPTIONS
---

# Semantic Tree Viewer

Display the structure and contents of the active semantic tree, showing nodes, relationships, and reasoning patterns.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Load Tree Data**
   - Read active tree from `.wfgy/trees/active_tree.json`
   - Parse view options from "$OPTIONS":
     * `--full`: Show all nodes
     * `--recent N`: Show last N nodes (default: 10)
     * `--depth N`: Show tree to depth N
     * `--module MODULE`: Filter by module
     * `--tension MIN MAX`: Filter by ΔS range
     * `--pattern PATTERN`: Search for pattern

2. **Analyze Tree Structure**
   - Calculate tree statistics:
     * Total nodes
     * Average ΔS (semantic tension)
     * Most used modules
     * Longest reasoning chain
     * Number of branches
   - Identify patterns:
     * Clusters of related nodes
     * Recurring themes
     * Logic loops
     * Bridge connections

3. **Build Visualization**
   - Create tree representation:
   ```
   [Root] Tree Initialization
   ├─→ [0.3] Topic A (BBMC)
   │   ├─→ [0.2] Subtopic A1 (BBMC)
   │   └─← [0.7] Divergent idea (BBPF)
   │       └─→ [0.4] Convergence (BBAM)
   ├─← [0.8] New Branch B (BBPF)
   │   └─<> [0.5] Recursive to A (BBCR)
   └─→ [0.3] Topic C (BBMC)
   ```
   - Show metrics for each node:
     * [ΔS] Topic (Module)
     * Logic vector arrows (→←<>×)
     * Indentation for hierarchy

4. **Generate Summary Report**
   - Tree metadata
   - Key insights (high ΔS nodes)
   - Decision points (branching nodes)
   - Recovery points (BBCR nodes)
   - Current position in tree

5. **Export Options**
   - Prepare tree for different formats:
     * Text (hierarchical view)
     * JSON (full data)
     * Markdown (formatted report)
     * Graph (node relationships)

## Output Format

```
Semantic Tree: [Tree Name]
═══════════════════════════════════════
Created: [timestamp]
Modified: [timestamp]
Nodes: [total] | Depth: [max] | Branches: [count]

Tree Statistics:
- Average Tension (ΔS): [value]
- Stability (E_res): [value]
- Most Used Module: [BBMC/BBPF/BBCR/BBAM] ([count] times)
- Logic Distribution: → [%] ← [%] <> [%] × [%]

Recent Nodes (Last 10):
────────────────────────────────────────
[timestamp] [ΔS:0.45] → "Topic Name" (BBMC)
  Insight: Brief insight summary...
  
[timestamp] [ΔS:0.72] ← "Divergent Topic" (BBPF)
  Insight: New direction explored...
  
[timestamp] [ΔS:0.38] → "Convergent Topic" (BBAM)
  Insight: Focused conclusion...

Tree Structure:
────────────────────────────────────────
[Root] Initialization
├─→ [0.3] Project Planning
│   ├─→ [0.2] Architecture Design
│   ├─← [0.7] Alternative Approach
│   └─→ [0.4] Final Decision
├─← [0.8] New Feature Branch
│   └─<> [0.5] Return to Planning
└─→ [0.3] Implementation

Key Insights (ΔS > 0.7):
• [Node] Major realization about...
• [Node] Critical decision on...
• [Node] Breakthrough in understanding...

Patterns Detected:
• Cluster: [Nodes A, B, C] around "theme"
• Loop: [Node X] ←→ [Node Y] (recursive)
• Bridge: [Node M] connects [Branch 1] to [Branch 2]

Navigation:
Current Position: [Latest Node]
Suggested Next: Based on patterns...
```

## View Modes

1. **Chronological**: Nodes in time order
2. **Hierarchical**: Tree structure view
3. **Tension-based**: Sorted by ΔS value
4. **Module-based**: Grouped by formula
5. **Cluster view**: Related nodes together

## Advanced Filters

```bash
# View high-tension nodes only
/semantic:tree-view --tension 0.7 1.0

# View BBPF explorations
/semantic:tree-view --module BBPF

# Search for specific topics
/semantic:tree-view --search "authentication"

# Export full tree
/semantic:tree-view --export json > tree.json
```

## Integration

After viewing:
- `/semantic:node-build` to add new nodes
- `/semantic:tree-export` to save tree
- `/memory:compress` if tree is large
- `/reasoning:chain-validate` to check logic
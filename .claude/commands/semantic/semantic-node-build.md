---
tools:
  - read
  - write
  - edit
  - grep
arguments: $TOPIC
---

# Semantic Node Builder

Create and record semantic nodes in the active WFGY tree to capture reasoning insights and maintain memory.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Prepare Node Context**
   - Parse topic from "$TOPIC" or auto-detect from context
   - Read active tree from `.wfgy/trees/active_tree.json`
   - Load previous node for reference
   - Get current context from `.wfgy/context.json`

2. **Calculate Semantic Metrics**
   - Generate embedding for current topic
   - Compare with previous node embedding
   - Calculate ΔS (semantic tension): ΔS = 1 - cos(θ)
   - Determine λ_observe (logic direction):
     * → (convergent): Building on previous (ΔS < 0.4)
     * ← (divergent): New direction (ΔS > 0.6)
     * <> (recursive): Returning to earlier (pattern match)
     * × (chaotic): Unstable (ΔS > 0.9)
   - Calculate E_resonance (stability measure)

3. **Identify Active Module**
   - Analyze which WFGY module is primary:
     * BBMC: If minimizing residue
     * BBPF: If exploring multiple paths
     * BBCR: If recovering from failure
     * BBAM: If optimizing attention
   - Record module attribution for traceability

4. **Build Node Structure**
   ```json
   {
     "id": "node_[timestamp]_[hash]",
     "timestamp": "ISO_8601",
     "topic": "$TOPIC",
     "module": "BBMC|BBPF|BBCR|BBAM",
     "metrics": {
       "deltaS": 0.XX,
       "lambda": "→|←|<>|×",
       "e_resonance": 0.XX,
       "confidence": 0.XX
     },
     "content": {
       "insight": "Encoded reasoning conclusion",
       "context": "Surrounding context",
       "keywords": ["key1", "key2", "key3"]
     },
     "relationships": {
       "parent_id": "previous_node_id",
       "references": [],
       "bridges_to": []
     }
   }
   ```

5. **Apply Recording Logic**
   - Check recording criteria:
     * Primary: ΔS > 0.6 (always record)
     * Secondary: ΔS ∈ [0.4, 0.6] AND λ ∈ {←, <>}
     * Forced: User explicitly requests
   - If criteria met:
     * Append node to tree
     * Update tree metadata
     * Create cross-references
     * Update indices

6. **Post-Processing**
   - Update tree statistics:
     * Increment node_count
     * Update total_deltaS
     * Recalculate avg_deltaS
     * Track max_depth
   - Check for patterns:
     * Detect loops (recursive patterns)
     * Identify clusters (related nodes)
     * Find bridges (connection points)
   - Trigger compression if node_count > threshold
   - Update `.wfgy/context.json`

## Output Format

```
✓ Semantic Node Recorded
═══════════════════════════════════════
Node ID: [node_id]
Topic: $TOPIC
Timestamp: [ISO_8601]

Metrics:
- ΔS (Tension): [value] [Low/Medium/High]
- λ (Direction): [symbol] [convergent/divergent/recursive]
- E (Resonance): [value]
- Confidence: [percentage]%

Module Used: [BBMC/BBPF/BBCR/BBAM]
Insight: [encoded reasoning]

Tree Status:
- Active Tree: [tree_name]
- Total Nodes: [count]
- Avg Tension: [value]
- Memory Usage: [size]

Related Nodes:
• [Previous topic] (ΔS: [value])
• [Related topic] (ΔS: [value])
```

## Recording Patterns

Common node types:
- **Insight Nodes**: Major realizations (high ΔS)
- **Bridge Nodes**: Connections between concepts
- **Checkpoint Nodes**: Stable states for recovery
- **Decision Nodes**: Choice points in reasoning
- **Error Nodes**: Failed paths (for learning)

## Integration

Works with:
- `/wfgy:formula-all` for comprehensive analysis
- `/semantic:tree-view` to see node in context
- `/boundary:detect` to check knowledge limits
- `/memory:compress` when tree gets large
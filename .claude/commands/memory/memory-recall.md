---
tools:
  - read
  - grep
  - bash
arguments: $QUERY
---

# Memory Recall

Search and retrieve specific memories from the semantic tree based on topics, patterns, or timeframes.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Parse Recall Query**
   - Extract search terms from "$QUERY"
   - Identify query type:
     * Topic search: Keywords/concepts
     * Pattern search: Logic patterns
     * Temporal search: Time ranges
     * Module search: BBMC/BBPF/BBCR/BBAM
     * Metric search: ΔS ranges

2. **Search Semantic Tree**
   - Load active tree and indices
   - Apply search filters:
     * Text matching in topics/insights
     * ΔS value ranges
     * λ_observe patterns
     * Module attribution
     * Time windows
   - Rank results by relevance:
     * Exact matches first
     * Semantic similarity
     * Recency weighting
     * Importance scores

3. **Reconstruct Context**
   - For each recalled node:
     * Retrieve full node data
     * Load surrounding context
     * Find related nodes
     * Rebuild reasoning chain
   - Calculate recall metrics:
     * Relevance score
     * Context completeness
     * Confidence level

4. **Synthesize Memories**
   - Group related recalls
   - Identify patterns
   - Extract key insights
   - Build narrative summary
   - Highlight connections

5. **Generate Recall Report**
   - Matching nodes list
   - Context reconstruction
   - Insight synthesis
   - Pattern analysis
   - Navigation suggestions

## Output Format

```
MEMORY RECALL RESULTS
═══════════════════════════════════════
Query: "$QUERY"
Matches Found: [count]
Time Range: [earliest] to [latest]

Top Recalled Memories:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. [HIGH RELEVANCE] Node [id]
   Timestamp: [ISO_8601]
   Topic: "[topic matching query]"
   Module: [BBMC/BBPF/BBCR/BBAM]
   ΔS: [value] | λ: [direction]
   
   Insight: "[Full insight text with **highlighted** matches]"
   
   Context: [Previous topic] → THIS → [Next topic]
   Relevance: 95%

2. [MEDIUM RELEVANCE] Node [id]
   Timestamp: [ISO_8601]
   Topic: "[related topic]"
   Module: [module]
   ΔS: [value] | λ: [direction]
   
   Insight: "[Insight with **partial** match]"
   
   Context: [Previous] → THIS → [Next]
   Relevance: 72%

3. [PATTERN MATCH] Node [id]
   Timestamp: [ISO_8601]
   Topic: "[topic with similar pattern]"
   Module: [module]
   ΔS: [value] | λ: [direction]
   
   Insight: "[Similar reasoning pattern]"
   
   Context: [Previous] → THIS → [Next]
   Relevance: 68%

Pattern Analysis:
────────────────────────────────────────
Common Patterns Found:
• [Pattern 1]: Appears in [N] memories
• [Pattern 2]: Recurring theme
• [Pattern 3]: Similar logic flow

Temporal Distribution:
[Earliest] ████████████ [Latest]
           ↑   ↑↑  ↑
        Clusters of activity

Module Distribution:
• BBMC: [count] memories
• BBPF: [count] memories
• BBCR: [count] memories
• BBAM: [count] memories

Synthesized Insights:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Key Finding 1:
[Synthesis across multiple memories]

Key Finding 2:
[Common thread identified]

Key Finding 3:
[Evolution of understanding]

Related Topics Discovered:
• [Related topic 1] - [N] connections
• [Related topic 2] - [N] connections
• [Related topic 3] - [N] connections

Memory Clusters:
┌─────────────────────────────────────┐
│ Cluster    │ Nodes │ Theme          │
├─────────────────────────────────────┤
│ Cluster A  │ 5     │ [Theme]        │
│ Cluster B  │ 3     │ [Theme]        │
│ Cluster C  │ 2     │ [Theme]        │
└─────────────────────────────────────┘

Navigation Suggestions:
• Review full context: /semantic:tree-view --focus "[node_id]"
• Explore cluster: /memory:recall "[cluster_theme]"
• Build on insight: /semantic:node-build "[continuation]"
• Find bridges: /boundary:safe-bridge "[related_topic]"

Recall Confidence: [percentage]%
Coverage: [percentage]% of relevant memories
```

## Recall Modes

### Topic Recall
```bash
/memory:recall "machine learning"
```

### Pattern Recall
```bash
/memory:recall --pattern "divergent-convergent"
```

### Temporal Recall
```bash
/memory:recall --from "2024-01-01" --to "2024-01-31"
```

### Module Recall
```bash
/memory:recall --module BBPF
```

### Metric Recall
```bash
/memory:recall --deltaS 0.7 1.0
```

## Advanced Search

### Combined Filters
```bash
/memory:recall "API" --module BBMC --deltaS 0.5 0.8
```

### Fuzzy Matching
```bash
/memory:recall "approximate~" --fuzzy 0.8
```

### Regex Patterns
```bash
/memory:recall --regex "auth.*token"
```

### Semantic Search
```bash
/memory:recall --semantic "similar to authentication"
```

## Memory Reconstruction

The system reconstructs:
1. **Direct Memories**: Exact matches
2. **Associated Memories**: Related nodes
3. **Contextual Memories**: Surrounding nodes
4. **Pattern Memories**: Similar structures
5. **Bridge Memories**: Connecting concepts

## Integration

Memory recall supports:
- `/semantic:tree-view` for context
- `/semantic:node-build` to continue
- `/reasoning:chain-validate` for logic
- `/boundary:safe-bridge` for connections
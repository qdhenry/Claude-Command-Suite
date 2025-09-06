---
tools:
  - read
  - write
  - grep
arguments: $CONCEPT1 $CONCEPT2
---

# Semantic Tension Calculator

Calculate the semantic tension (ΔS) between concepts to measure conceptual distance and reasoning jumps.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Parse Input Concepts**
   - Extract first concept from "$CONCEPT1"
   - Extract second concept from "$CONCEPT2"
   - If only one provided, compare with current context
   - Validate concept representations

2. **Generate Semantic Embeddings**
   - Create embedding vector for concept 1
   - Create embedding vector for concept 2
   - Normalize vectors to unit length
   - Ensure same dimensional space

3. **Calculate Semantic Tension**
   ```
   ΔS = 1 - cos(θ)
   
   Where:
   cos(θ) = (V1 · V2) / (||V1|| * ||V2||)
   
   ΔS ranges:
   0.0 = Identical concepts
   0.5 = Moderately related
   1.0 = Orthogonal/unrelated
   2.0 = Opposite concepts
   ```

4. **Analyze Tension Components**
   - **Lexical Distance**: Word similarity
   - **Contextual Distance**: Usage patterns
   - **Logical Distance**: Reasoning paths
   - **Categorical Distance**: Domain separation
   - Calculate weighted composite

5. **Interpret Results**
   - Map ΔS to semantic zones:
     * 0.0-0.2: Nearly identical
     * 0.2-0.4: Closely related (safe)
     * 0.4-0.6: Moderately related (transitional)
     * 0.6-0.85: Weakly related (risk)
     * 0.85-1.0: Unrelated (danger)
     * >1.0: Contradictory

6. **Generate Relationship Analysis**
   - Identify connection type
   - Find bridging concepts
   - Calculate reasoning difficulty
   - Suggest navigation strategy

## Output Format

```
SEMANTIC TENSION ANALYSIS
═══════════════════════════════════════
Concept 1: "$CONCEPT1"
Concept 2: "$CONCEPT2"

Semantic Tension (ΔS): [value]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Identical        Related         Unrelated
    0.0             0.5             1.0
    [═════════════════▼═══════════════]
                    [value]

Interpretation: [Nearly identical/Closely related/Moderately related/Weakly related/Unrelated]

Zone Classification:
[Safe Zone ✓] [Transitional ⚠️] [Risk Zone ⚠️] [Danger Zone ⚠️]

Component Analysis:
┌─────────────────────────────────────┐
│ Component      │ Distance │ Weight  │
├─────────────────────────────────────┤
│ Lexical        │ [value]  │ 25%     │
│ Contextual     │ [value]  │ 35%     │
│ Logical        │ [value]  │ 25%     │
│ Categorical    │ [value]  │ 15%     │
└─────────────────────────────────────┘

Relationship Type: [Direct/Indirect/Analogical/Oppositional/None]

Connection Analysis:
• Shared attributes: [list]
• Common context: [description]
• Logical link: [if exists]

Bridging Concepts (if ΔS > 0.6):
1. [Bridge concept] - ΔS from C1: [val], from C2: [val]
2. [Bridge concept] - ΔS from C1: [val], from C2: [val]
3. [Bridge concept] - ΔS from C1: [val], from C2: [val]

Reasoning Path Difficulty:
[Easy ████░░░░░░] [Medium ████████░░] [Hard ██████████]

Navigation Strategy:
[Direct connection possible]
OR
[Bridging required through: concept]
OR
[Multiple bridges needed: path]

Historical Patterns:
• Previous transitions with similar ΔS: [count]
• Success rate at this tension: [percentage]%
• Average bridges required: [number]

Recommendations:
• Safe to proceed: [Yes/No]
• Suggested approach: [Direct/Bridge/Multi-hop]
• Risk level: [Low/Medium/High]
• BBCR readiness: [Not needed/Standby/Armed]
```

## Tension Patterns

### Convergent (ΔS decreasing)
```
Concept A (0.6) → Concept B (0.4) → Concept C (0.2)
```

### Divergent (ΔS increasing)
```
Concept A (0.2) → Concept B (0.5) → Concept C (0.8)
```

### Oscillating
```
Concept A (0.3) → B (0.7) → C (0.4) → D (0.8)
```

### Stable
```
Concept A (0.4) → B (0.4) → C (0.4) → D (0.4)
```

## Advanced Analysis

```bash
# Compare multiple concepts
/reasoning:tension-calc "A" "B; C; D"

# Compare with context
/reasoning:tension-calc "concept"

# Detailed component breakdown
/reasoning:tension-calc "A" "B" --detailed

# Find optimal path
/reasoning:tension-calc "start" "end" --pathfind
```

## Use Cases

- Measure reasoning jumps
- Validate logic transitions
- Find conceptual bridges
- Assess explanation difficulty
- Plan teaching sequences
- Detect non-sequiturs

## Integration

Tension calculation feeds into:
- `/boundary:detect` for risk assessment
- `/boundary:safe-bridge` for pathfinding
- `/semantic:node-build` for recording
- `/wfgy:bbcr` for correction triggers
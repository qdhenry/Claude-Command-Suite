---
tools:
  - read
  - write
  - edit
  - grep
arguments: $QUERY
---

# WFGY BBMC - Semantic Residue Minimization

Apply the BBMC (BigBig Minimization Coupling) formula to minimize semantic residue and improve reasoning accuracy.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Formula

```
B = I - G + m * c²

Where:
- B: Semantic residue to minimize
- I: Current-step embedding vector
- G: Ground-truth embedding vector
- m: Matching coefficient (cosine similarity, range 0-1)
- c: Context factor (scaled token distance, range 0.2-1.5)
```

## Instructions

1. **Parse Input Query**
   - Extract the reasoning query from "$QUERY"
   - Load current context from `.wfgy/context.json`
   - Identify the ground-truth target for minimization

2. **Calculate Semantic Vectors**
   - Generate embedding for current input (I)
   - Retrieve or generate ground-truth embedding (G)
   - Compute cosine similarity: m = cos(θ) between I and G
   - Calculate context factor: c = min(1.5, max(0.2, Δtoken/100))

3. **Apply BBMC Formula**
   - Calculate semantic residue: B = I - G + m * c²
   - Compute residue magnitude: ||B||₂
   - Check against collapse threshold (B_c = 0.85)
   - If ||B|| ≥ B_c, trigger BBCR correction

4. **Optimize Reasoning Path**
   - If residue is high, adjust reasoning approach:
     * Reduce conceptual distance
     * Add intermediate reasoning steps
     * Clarify ambiguous terms
   - Iterate until ||B|| < 0.4 (optimal range)

5. **Record Results**
   - Update `.wfgy/context.json` with new state
   - Log BBMC application in `.wfgy/logs/bbmc.log`
   - If tree recording is active, create semantic node
   - Return optimized reasoning with residue metrics

## Output Format

```
BBMC Analysis Complete
═══════════════════════════════
Query: "$QUERY"

Semantic Residue (B): [value]
Residue Magnitude ||B||: [value]
Matching Coefficient (m): [value]
Context Factor (c): [value]

Status: [Optimal/Acceptable/High Residue/Correction Required]

Optimized Reasoning:
[Adjusted reasoning with minimized residue]

Recommendation:
[Next steps based on residue analysis]
```

## Integration

BBMC works best when combined with:
- `/wfgy:bbpf` for multi-path exploration when residue is high
- `/wfgy:bbcr` for correction when threshold exceeded
- `/semantic:node-build` to record optimization results
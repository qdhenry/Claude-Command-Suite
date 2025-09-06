---
tools:
  - read
  - write
  - grep
  - bash
arguments: $PROBLEM
---

# Multi-Path Reasoning

Execute parallel reasoning exploration across multiple solution paths to find optimal approaches.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Initialize Multi-Path Setup**
   - Parse problem from "$PROBLEM"
   - Set number of parallel paths (default: 5)
   - Load current context and constraints
   - Define exploration parameters:
     * Divergence factor: 0.3
     * Pruning threshold: 0.1
     * Max iterations: 10

2. **Generate Reasoning Paths**
   - For each path i (1 to N):
     * Apply unique perturbation V_i
     * Vary approach angle:
       - Path 1: Direct/logical
       - Path 2: Creative/lateral
       - Path 3: Systematic/methodical
       - Path 4: Analogical/comparative
       - Path 5: Contrarian/inverse
     * Maintain problem constraints
     * Track path evolution

3. **Evolve Paths Iteratively**
   - For each iteration:
     * Advance each path independently
     * Calculate path metrics:
       - Progress score
       - Confidence level
       - Semantic coherence
       - Logic consistency
     * Apply selection pressure:
       - Amplify successful paths
       - Diminish failing paths
       - Cross-pollinate insights

4. **Weight and Rank Paths**
   - Calculate path probabilities:
     * P_i = exp(-ΔS_i) / Σexp(-ΔS_j)
   - Compute dynamic weights:
     * W_i based on progress rate
     * Adjust for confidence
   - Rank by composite score:
     * Score = P_i * W_i * Confidence_i

5. **Synthesize Solutions**
   - Combine top paths weighted by score
   - Extract unique insights from each
   - Identify convergent conclusions
   - Note divergent possibilities
   - Create unified solution

## Output Format

```
MULTI-PATH REASONING ANALYSIS
═══════════════════════════════════════
Problem: "$PROBLEM"
Paths Explored: 5
Iterations: [count]

Path Evolution:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        Iteration
Path    1  2  3  4  5  6  7  8  9  10
────────────────────────────────────────
Path 1  ▪──●──●──●──●──●──●──●──●──●  85%
Path 2  ▪──○──●──●──●──●──●──●──○──○  72%
Path 3  ▪──○──○──●──●──●──○──○──×──×  Failed
Path 4  ▪──○──○──○──●──●──●──●──●──●  78%
Path 5  ▪──●──●──●──●──●──●──●──●──●  91%

Legend: ▪ Start ○ Exploring ● Promising × Failed

Top 3 Solution Paths:
────────────────────────────────────────

PATH 5 (Best) - Score: 0.91
Approach: [Contrarian/Inverse thinking]
Key Insight: [Main discovery]
Reasoning: [Brief explanation]
Confidence: 91%

PATH 1 - Score: 0.85
Approach: [Direct logical analysis]
Key Insight: [Main discovery]
Reasoning: [Brief explanation]
Confidence: 85%

PATH 4 - Score: 0.78
Approach: [Analogical comparison]
Key Insight: [Main discovery]
Reasoning: [Brief explanation]
Confidence: 78%

Convergent Findings:
• All paths agree: [Common conclusion 1]
• 4/5 paths suggest: [Common conclusion 2]
• Majority indicates: [Common conclusion 3]

Divergent Possibilities:
• Path 2 uniquely suggests: [Alternative]
• Path 5 contrarian view: [Opposite angle]

Synthesized Solution:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Weighted combination of successful paths]
[Incorporating insights from all approaches]
[Final recommended solution]

Confidence: [weighted average]%
Risk Assessment: [Low/Medium/High]

Alternative Approaches:
1. If [condition], consider Path 2
2. If [constraint], prefer Path 4
3. For [scenario], Path 1 is optimal

Path Statistics:
- Average Convergence: [value]
- Cross-Path Correlation: [value]
- Solution Stability: [value]
```

## Path Types

### Logical Path
- Step-by-step deduction
- Rule-based reasoning
- Systematic progression

### Creative Path
- Lateral thinking
- Unexpected connections
- Novel approaches

### Empirical Path
- Evidence-based
- Data-driven
- Experimental validation

### Analogical Path
- Pattern matching
- Similar problem spaces
- Transfer learning

### Contrarian Path
- Inverse thinking
- Challenge assumptions
- Devil's advocate

## Configuration

```json
{
  "num_paths": 5,
  "max_iterations": 10,
  "divergence_factor": 0.3,
  "pruning_threshold": 0.1,
  "selection_pressure": 0.2,
  "crossover_rate": 0.15
}
```

## Advanced Usage

```bash
# Explore more paths
/reasoning:multi-path "problem" --paths 10

# Focus on creative solutions
/reasoning:multi-path "problem" --emphasize creative

# Quick exploration
/reasoning:multi-path "problem" --iterations 5

# Deep exploration
/reasoning:multi-path "problem" --iterations 20
```

## Integration

Multi-path reasoning works with:
- `/wfgy:bbpf` for path generation
- `/semantic:node-build` to record paths
- `/boundary:detect` to check path safety
- `/reasoning:chain-validate` to verify logic
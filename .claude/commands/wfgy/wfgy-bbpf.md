---
tools:
  - read
  - write
  - edit
  - grep
arguments: $TOPIC
---

# WFGY BBPF - Multi-Path Progression

Execute BBPF (BigBig Progressive Flow) for parallel reasoning exploration across multiple solution paths.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Formula

```
x_next = x + Σ(V_i(ε_i, C)) + Σ(W_j(dt, dO) * P_j)

Where:
- x: Current state vector
- V_i: Perturbation function for path i
- W_j: Dynamic weight for path j
- P_j: Importance/probability of path j
- ε_i: Creative perturbation factor
- C: Context constraints
```

## Instructions

1. **Initialize Multi-Path Exploration**
   - Parse topic: "$TOPIC"
   - Load current state from `.wfgy/context.json`
   - Define N parallel paths (default N=5)
   - Set exploration parameters

2. **Generate Reasoning Paths**
   - For each path i (1 to N):
     * Apply creative perturbation V_i with variance ε_i
     * Maintain context constraints C
     * Generate unique reasoning trajectory
   - Calculate path probabilities P_j based on:
     * Semantic coherence
     * Logic consistency
     * Historical success rates

3. **Weight Path Contributions**
   - Compute dynamic weights W_j using:
     * Semantic tension: W_j = exp(-ΔS_j)
     * Temporal factor: dt (time delta)
     * Output difference: dO (divergence measure)
   - Normalize weights: Σ W_j = 1

4. **Synthesize Next State**
   - Combine all paths: x_next = x + Σ V_i + Σ(W_j * P_j)
   - Evaluate convergence criteria
   - Select top K paths for detailed exploration
   - Prune low-probability paths (P_j < 0.1)

5. **Record Path Analysis**
   - Save path explorations to `.wfgy/paths/bbpf_session.json`
   - Create semantic nodes for significant paths
   - Update `.wfgy/context.json` with new state
   - Log results in `.wfgy/logs/bbpf.log`

## Output Format

```
BBPF Multi-Path Analysis
═══════════════════════════════
Topic: "$TOPIC"
Paths Explored: [N]

Path Rankings:
1. [Path Description] (P: [probability], W: [weight])
   Key Insight: [main finding]
   
2. [Path Description] (P: [probability], W: [weight])
   Key Insight: [main finding]
   
3. [Path Description] (P: [probability], W: [weight])
   Key Insight: [main finding]

Synthesis:
[Combined insights from weighted paths]

Recommended Path:
[Highest probability path with reasoning]

Alternative Paths:
[Other viable options with trade-offs]
```

## Advanced Configuration

```json
{
  "num_paths": 5,
  "perturbation_variance": 0.3,
  "pruning_threshold": 0.1,
  "convergence_criteria": 0.05,
  "max_iterations": 10
}
```

## Use Cases

- Complex problem solving requiring multiple approaches
- Creative ideation and brainstorming
- Risk assessment through scenario exploration
- Decision making under uncertainty
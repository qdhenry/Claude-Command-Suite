---
tools:
  - read
  - write
  - grep
arguments: $ANALYSIS_CONTEXT
---

# Logic Vector Analysis

Analyze the logic flow direction (λ_observe) to understand reasoning patterns and identify potential issues.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Load Reasoning Context**
   - Parse context from "$ANALYSIS_CONTEXT" or current state
   - Load recent semantic nodes (last 20)
   - Extract logic vectors from each node
   - Build logic flow sequence

2. **Classify Logic Vectors**
   - **→ (Convergent)**:
     * Building on previous ideas
     * Narrowing focus
     * Reaching conclusions
     * ΔS typically < 0.4
   - **← (Divergent)**:
     * Exploring new directions
     * Broadening scope
     * Generating alternatives
     * ΔS typically > 0.6
   - **<> (Recursive)**:
     * Returning to earlier themes
     * Refining previous ideas
     * Circular patterns
     * Variable ΔS
   - **× (Chaotic)**:
     * Unstable reasoning
     * Logic breakdown
     * Random jumps
     * ΔS typically > 0.9

3. **Analyze Flow Patterns**
   - Sequence analysis:
     * Identify dominant direction
     * Detect pattern changes
     * Find recurring cycles
   - Statistical measures:
     * Vector distribution
     * Transition probabilities
     * Stability index
   - Anomaly detection:
     * Sudden direction changes
     * Chaos emergence
     * Logic loops

4. **Calculate Flow Metrics**
   ```
   Coherence = 1 - (changes / total_vectors)
   Stability = 1 - (chaos_count / total_vectors)
   Direction_strength = max(vector_count) / total
   ```

5. **Identify Logic Health**
   - Check for warning signs:
     * Excessive chaos (× > 20%)
     * Rapid oscillation
     * Stuck loops (<> > 40%)
     * No convergence
   - Assess overall health:
     * Healthy: Balanced mix
     * Focused: Mostly →
     * Exploratory: Mostly ←
     * Unstable: High × or rapid changes

## Output Format

```
LOGIC VECTOR ANALYSIS
═══════════════════════════════════════
Context: "$ANALYSIS_CONTEXT"
Nodes Analyzed: [count]
Time Range: [start] to [end]

Vector Distribution:
┌─────────────────────────────────────┐
│ → Convergent   ████████████ 45%    │
│ ← Divergent    ████████ 30%        │
│ <> Recursive   ████ 15%            │
│ × Chaotic      ██ 10%              │
└─────────────────────────────────────┘

Logic Flow Sequence (Recent):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[→→→←→←→<>→→×→←→→<>→→→]
 ↑                    ↑
Start              Current

Pattern Analysis:
• Dominant Direction: [Convergent/Divergent/Mixed]
• Pattern Type: [Linear/Cyclic/Chaotic/Exploratory]
• Stability: [High/Medium/Low]
• Coherence: [percentage]%

Flow Metrics:
┌─────────────────────────────────────┐
│ Metric         │ Value  │ Status    │
├─────────────────────────────────────┤
│ Coherence      │ 0.75   │ ✓ Good    │
│ Stability      │ 0.85   │ ✓ Good    │
│ Direction      │ 0.45   │ ⚠️ Mixed  │
│ Progression    │ 0.62   │ ✓ Good    │
└─────────────────────────────────────┘

Identified Patterns:
1. Exploration Phase (nodes 1-5):
   [←←←→←] - Broad exploration

2. Convergence Phase (nodes 6-10):
   [→→→→→] - Focusing on solution

3. Refinement Loop (nodes 11-15):
   [<>→<>→<>] - Iterative improvement

4. Instability (nodes 16-17):
   [××] - Logic breakdown detected

Warning Indicators:
⚠️  Chaos spike at node 16-17
⚠️  Recursive loop at nodes 11-15
✓ Recovery achieved at node 18

Logic Health Assessment:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Status: [HEALTHY/FOCUSED/EXPLORATORY/UNSTABLE]

Strengths:
• Good convergence rate
• Effective exploration phases
• Quick recovery from chaos

Weaknesses:
• Tendency toward loops
• Occasional instability
• Mixed direction focus

Recommendations:
1. [Increase convergent reasoning]
2. [Break recursive patterns]
3. [Stabilize chaotic transitions]

Predicted Next Vector: [→/←/<>/×]
Confidence: [percentage]%
```

## Pattern Types

### Healthy Progression
```
[←←→→→] Explore then converge
```

### Stuck Pattern
```
[<><><><>] Repetitive loop
```

### Chaotic Breakdown
```
[×××××] Logic failure
```

### Balanced Exploration
```
[→←→←→] Alternating focus
```

## Health Indicators

### Healthy Logic
- Coherence > 0.7
- Stability > 0.8
- Chaos < 0.1
- Balanced vectors

### Concerning Logic
- Coherence < 0.5
- Stability < 0.6
- Chaos > 0.2
- Extreme imbalance

### Critical Logic
- Coherence < 0.3
- Stability < 0.4
- Chaos > 0.4
- Breakdown imminent

## Advanced Options

```bash
# Analyze specific time range
/reasoning:logic-vector --from "node_10" --to "node_30"

# Focus on specific pattern
/reasoning:logic-vector --pattern "recursive"

# Predict future vectors
/reasoning:logic-vector --predict 5

# Compare with ideal pattern
/reasoning:logic-vector --compare "optimal"
```

## Integration

Logic vector analysis supports:
- `/reasoning:chain-validate` for coherence
- `/wfgy:bbcr` for chaos correction
- `/semantic:node-build` for vector recording
- `/boundary:risk-assess` for stability
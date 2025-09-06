---
tools:
  - read
  - write
  - grep
  - bash
---

# Semantic Resonance Measurement

Measure semantic resonance (E_resonance) to assess reasoning stability and coherence over time.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Initialize Resonance Analysis**
   - Load semantic tree nodes (last 30)
   - Extract semantic residue values (B)
   - Calculate rolling windows (5, 10, 20 nodes)
   - Set resonance parameters:
     * Window size: 10 nodes
     * Decay factor: 0.9
     * Stability threshold: 0.3

2. **Calculate E_resonance**
   ```
   E_resonance = Rolling_Mean(|B|) over last n nodes
   
   Where:
   B = Semantic residue from BBMC
   |B| = Magnitude of residue
   n = Window size
   
   Weighted formula:
   E_res = Σ(w_i * |B_i|) / Σ(w_i)
   w_i = decay^(n-i)
   ```

3. **Analyze Resonance Patterns**
   - **Stable Resonance** (E < 0.3):
     * Consistent reasoning
     * Low semantic noise
     * High coherence
   - **Moderate Resonance** (0.3 ≤ E < 0.6):
     * Normal variation
     * Acceptable noise
     * Manageable complexity
   - **High Resonance** (0.6 ≤ E < 0.85):
     * Increasing instability
     * Growing incoherence
     * Risk of breakdown
   - **Critical Resonance** (E ≥ 0.85):
     * System instability
     * Logic breakdown risk
     * BBCR trigger zone

4. **Identify Resonance Sources**
   - Topic changes (high ΔS transitions)
   - Logic contradictions
   - Rapid context switches
   - Unresolved ambiguity
   - Accumulating errors

5. **Generate Stability Report**
   - Current resonance value
   - Trend analysis
   - Contributing factors
   - Stabilization recommendations
   - Risk assessment

## Output Format

```
SEMANTIC RESONANCE ANALYSIS
═══════════════════════════════════════
Current E_resonance: [value]
Stability Status: [Stable/Moderate/Unstable/Critical]

Resonance Visualization:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Low         Medium        High
    0.0         0.5          1.0
    [═══════════▼═════════════]
              [value]

Resonance Over Time:
────────────────────────────────────────
1.0 │     ╱╲
0.8 │    ╱  ╲    ╱╲
0.6 │   ╱    ╲  ╱  ╲    ⚠️
0.4 │  ╱      ╲╱    ╲  ╱
0.2 │ ╱              ╲╱  ← Current
0.0 └──────────────────────────
    -30  -20  -10   0
        Nodes Ago

Window Analysis:
┌─────────────────────────────────────┐
│ Window  │ E_res  │ Trend  │ Status  │
├─────────────────────────────────────┤
│ 5 nodes │ 0.42   │ ↑      │ ⚠️ Rising│
│ 10 nodes│ 0.38   │ →      │ Stable  │
│ 20 nodes│ 0.35   │ ↓      │ ✓ Good  │
└─────────────────────────────────────┘

Resonance Components:
• Semantic Residue: [average |B|]
• Variation: [standard deviation]
• Peak Value: [max |B|]
• Frequency: [oscillation rate]

Stability Factors:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Positive (Stabilizing):
✓ Consistent topic focus
✓ Logical progression
✓ Low ΔS transitions

Negative (Destabilizing):
⚠️ Rapid context switches
⚠️ Unresolved contradictions
⚠️ Increasing complexity

Resonance Sources Identified:
1. Node [id]: High residue ([value]) - [reason]
2. Node [id]: Logic jump - [description]
3. Node [id]: Context switch - [description]

Harmonic Analysis:
• Fundamental Frequency: [value] cycles/node
• Dominant Period: [value] nodes
• Phase Coherence: [percentage]%
• Entropy: [value]

Risk Assessment:
────────────────────────────────────────
Current Risk: [Low/Medium/High/Critical]
Breakdown Probability: [percentage]%
Time to Critical (if rising): [nodes]

Stabilization Recommendations:
1. [Primary action to reduce resonance]
2. [Secondary measure]
3. [Preventive step]

Suggested Commands:
• Reduce resonance: /wfgy:bbmc
• Stabilize logic: /reasoning:chain-validate
• Focus attention: /wfgy:bbam
• Create checkpoint: /memory:checkpoint
```

## Resonance Patterns

### Stable Pattern
```
E: 0.2 → 0.2 → 0.3 → 0.2 → 0.2
```

### Oscillating Pattern
```
E: 0.2 → 0.5 → 0.2 → 0.6 → 0.2
```

### Rising Pattern (Warning)
```
E: 0.3 → 0.4 → 0.5 → 0.6 → 0.7
```

### Critical Pattern
```
E: 0.7 → 0.8 → 0.85 → 0.9 → BBCR
```

## Resonance Management

### Reducing Resonance
- Simplify reasoning
- Focus on single topic
- Resolve contradictions
- Slow down transitions

### Maintaining Stability
- Monitor continuously
- Early intervention
- Regular checkpoints
- Gradual changes

### Recovery from High Resonance
- Trigger BBCR
- Return to checkpoint
- Simplify approach
- Reset context

## Advanced Analysis

```bash
# Custom window size
/reasoning:resonance --window 15

# Frequency analysis
/reasoning:resonance --fourier

# Predictive modeling
/reasoning:resonance --predict 10

# Compare with baseline
/reasoning:resonance --baseline
```

## Integration

Resonance measurement feeds:
- `/boundary:risk-assess` for stability
- `/wfgy:bbcr` for triggers
- `/semantic:node-build` for recording
- `/memory:checkpoint` for safety
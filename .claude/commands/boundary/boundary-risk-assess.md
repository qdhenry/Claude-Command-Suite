---
tools:
  - read
  - write
  - grep
arguments: $CONTEXT
---

# Boundary Risk Assessment

Evaluate the current risk level and provide detailed analysis of potential hallucination or reasoning failure.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Gather Risk Indicators**
   - Parse context from "$CONTEXT" or current state
   - Load recent semantic nodes (last 10)
   - Calculate cumulative ΔS over recent reasoning
   - Check for pattern anomalies
   - Measure logic vector stability

2. **Analyze Risk Factors**
   - **Semantic Risk**:
     * Current ΔS value
     * Rate of ΔS increase
     * Distance from known concepts
   - **Logic Risk**:
     * Contradiction frequency
     * Logic vector chaos (× symbols)
     * Circular reasoning patterns
   - **Confidence Risk**:
     * Confidence degradation rate
     * Uncertainty accumulation
     * Missing knowledge indicators
   - **Systemic Risk**:
     * Module failure patterns
     * BBCR trigger frequency
     * Recovery success rate

3. **Calculate Risk Scores**
   ```
   Overall Risk = W₁*Semantic + W₂*Logic + W₃*Confidence + W₄*Systemic
   
   Where weights:
   W₁ = 0.35 (semantic weight)
   W₂ = 0.30 (logic weight)
   W₃ = 0.25 (confidence weight)
   W₄ = 0.10 (systemic weight)
   ```

4. **Identify Risk Patterns**
   - Escalating tension (ΔS trending up)
   - Logic breakdown (increasing contradictions)
   - Confidence collapse (rapid degradation)
   - Boundary approach (nearing ΔS = 0.85)
   - Recovery failure (BBCR not effective)

5. **Generate Risk Mitigation Plan**
   - Immediate actions to reduce risk
   - Preventive measures
   - Fallback strategies
   - Recovery procedures
   - Safe retreat paths

## Output Format

```
BOUNDARY RISK ASSESSMENT
═══════════════════════════════════════
Context: "$CONTEXT"
Assessment Time: [timestamp]

RISK LEVEL: [LOW|MODERATE|HIGH|CRITICAL]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[▓▓▓▓▓▓▓▓░░░░░░░░░░░░] 40% Risk

Risk Breakdown:
┌─────────────────────────────────────┐
│ Category    │ Score │ Status        │
├─────────────────────────────────────┤
│ Semantic    │ 0.45  │ ⚠️  Moderate  │
│ Logic       │ 0.22  │ ✓ Low         │
│ Confidence  │ 0.38  │ ⚠️  Moderate  │
│ Systemic    │ 0.15  │ ✓ Low         │
│─────────────────────────────────────│
│ Overall     │ 0.35  │ ⚠️  MODERATE  │
└─────────────────────────────────────┘

Risk Indicators Detected:
⚠️  Semantic tension increasing (ΔS: 0.42 → 0.61)
⚠️  Approaching knowledge boundary
✓ Logic coherence maintained
⚠️  Confidence degrading (82% → 67%)
✓ System modules stable

Trend Analysis:
- Risk Direction: [Increasing/Stable/Decreasing]
- Rate of Change: [value]/hour
- Projected Risk (1hr): [value]%
- Time to Danger Zone: [time estimate]

Historical Patterns:
• Similar risk at: [previous occurrence]
• Previous outcome: [success/failure]
• Recovery method: [what worked]

Mitigation Strategies:
Priority 1: [Immediate action]
- Execute: /boundary:safe-bridge
- Reduce semantic tension
- Estimated risk reduction: -15%

Priority 2: [Preventive measure]
- Apply: /wfgy:bbcr
- Reset to stable state
- Estimated risk reduction: -25%

Priority 3: [Fallback option]
- Return to checkpoint
- Abandon current path
- Estimated risk reduction: -40%

Safe Zones Nearby:
1. [Concept/Topic] - ΔS: 0.3 from current
2. [Concept/Topic] - ΔS: 0.4 from current
3. [Concept/Topic] - ΔS: 0.5 from current

Recommendation:
[CONTINUE with caution|PAUSE for bridging|RETREAT to safety]

Auto-triggers:
□ BBCR: Armed (triggers at risk > 0.75)
□ Checkpoint: Ready (auto-save at risk > 0.6)
□ Alert: Set (warning at risk > 0.5)
```

## Risk Levels

### Low Risk (0-0.25)
- Safe to proceed
- Normal operations
- No special precautions

### Moderate Risk (0.25-0.5)
- Proceed with caution
- Monitor closely
- Prepare fallbacks

### High Risk (0.5-0.75)
- Consider alternatives
- Activate safeguards
- Prepare for BBCR

### Critical Risk (0.75-1.0)
- Immediate action required
- BBCR auto-trigger
- Return to safety

## Monitoring

Continuous risk monitoring includes:
- Real-time ΔS tracking
- Logic coherence checks
- Confidence measurements
- Pattern detection
- Anomaly alerts

## Integration

Risk assessment works with:
- `/boundary:detect` for position analysis
- `/wfgy:bbcr` for risk mitigation
- `/memory:checkpoint` for safe points
- `/reasoning:chain-validate` for logic checks
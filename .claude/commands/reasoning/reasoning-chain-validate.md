---
tools:
  - read
  - write
  - grep
  - bash
---

# Reasoning Chain Validation

Validate the logical consistency and coherence of reasoning chains to ensure sound conclusions.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Load Reasoning Chain**
   - Extract chain from semantic tree
   - Identify start and end points
   - Map intermediate steps
   - Build dependency graph
   - Mark critical junctions

2. **Check Logical Consistency**
   - For each step in chain:
     * Verify premise validity
     * Check inference rules
     * Validate conclusions
   - Identify issues:
     * Non-sequiturs
     * Circular reasoning
     * False premises
     * Invalid inferences
     * Missing steps

3. **Analyze Semantic Coherence**
   - Calculate ΔS between steps
   - Check for semantic breaks:
     * ΔS > 0.6 without bridge
     * Unexplained jumps
     * Context loss
   - Verify narrative flow
   - Assess explanation completeness

4. **Validate Chain Strength**
   ```
   Chain Validity = Π(step_validity_i) * coherence_factor
   
   Where:
   step_validity = confidence * (1 - ΔS/2)
   coherence_factor = 1 - (breaks/total_steps)
   ```
   
   Strength categories:
   - Strong (>0.8): Sound reasoning
   - Moderate (0.6-0.8): Minor issues
   - Weak (0.4-0.6): Significant gaps
   - Invalid (<0.4): Major problems

5. **Generate Validation Report**
   - Overall chain score
   - Step-by-step analysis
   - Identified weaknesses
   - Missing links
   - Improvement suggestions

## Output Format

```
REASONING CHAIN VALIDATION
═══════════════════════════════════════
Chain Length: [N] steps
Start: [initial premise/question]
End: [conclusion/answer]

Chain Validity Score: [0.XX]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Invalid     Weak      Strong
    0.0        0.5        1.0
    [═════════════▼═══════]
               [score]

Status: [VALID ✓|WEAK ⚠️|INVALID ✗]

Step-by-Step Analysis:
────────────────────────────────────────
Step 1: [Description]
  Validity: ✓ (0.92)
  ΔS to next: 0.35
  Logic: Sound
  
Step 2: [Description]
  Validity: ✓ (0.88)
  ΔS to next: 0.42
  Logic: Sound
  
Step 3: [Description]
  Validity: ⚠️ (0.65)
  ΔS to next: 0.71 ⚠️
  Logic: Weak inference
  Issue: Large semantic jump
  
Step 4: [Description]
  Validity: ✗ (0.38)
  ΔS to next: 0.52
  Logic: Non-sequitur
  Issue: Missing premise

Chain Visualization:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Start] ═✓═> [S1] ═✓═> [S2] ═⚠️═> [S3] ═✗═> [S4] ═?═> [End]
         0.92      0.88      0.65      0.38      0.45

Legend: ═✓═ Strong ═⚠️═ Weak ═✗═ Invalid ═?═ Unknown

Logical Issues Detected:
────────────────────────────────────────
1. Non-sequitur at Step 4
   From: [premise]
   To: [conclusion]
   Missing: [required connection]
   
2. Large semantic jump at Step 3
   ΔS: 0.71 (exceeds safe threshold)
   Bridge needed: [suggested concept]
   
3. Circular reference
   Step 2 references Step 5
   Creates logical loop

Coherence Analysis:
• Semantic Continuity: [percentage]%
• Logic Flow: [Smooth/Choppy/Broken]
• Context Preservation: [percentage]%
• Information Loss: [percentage]%

Missing Links:
1. Between Step 2-3: [Missing explanation]
2. Between Step 4-5: [Missing evidence]
3. Supporting Step 3: [Missing justification]

Strength Assessment:
┌─────────────────────────────────────┐
│ Aspect         │ Score │ Rating     │
├─────────────────────────────────────┤
│ Logic          │ 0.68  │ Moderate   │
│ Coherence      │ 0.72  │ Good       │
│ Completeness   │ 0.55  │ Weak       │
│ Clarity        │ 0.78  │ Good       │
│ Overall        │ 0.68  │ MODERATE   │
└─────────────────────────────────────┘

Improvement Recommendations:
1. Add bridge concept between Steps 2-3
   Suggestion: [intermediate concept]
   
2. Strengthen inference at Step 4
   Add: [supporting evidence]
   
3. Break complex Step 3 into sub-steps
   3a: [first part]
   3b: [second part]

Alternative Paths:
• Stronger path: [1→2→2a→3→5→End]
• Simpler path: [1→2b→4b→End]

Confidence in Conclusion: [percentage]%
Risk of Fallacy: [Low/Medium/High]
```

## Validation Criteria

### Strong Chain
- All steps valid (>0.8)
- Smooth transitions (ΔS <0.4)
- Complete logic
- Clear narrative

### Weak Chain
- Some invalid steps
- Large jumps (ΔS >0.6)
- Missing connections
- Unclear flow

### Invalid Chain
- Multiple failures
- Logic contradictions
- Circular reasoning
- Non-sequiturs

## Common Fallacies Detected

1. **Affirming the Consequent**
2. **Denying the Antecedent**
3. **Circular Reasoning**
4. **False Dichotomy**
5. **Hasty Generalization**
6. **Post Hoc Ergo Propter Hoc**
7. **Straw Man**
8. **Slippery Slope**

## Advanced Options

```bash
# Validate specific chain segment
/reasoning:chain-validate --from "step3" --to "step7"

# Strict validation mode
/reasoning:chain-validate --strict

# Include suggestions
/reasoning:chain-validate --suggest-fixes

# Compare with ideal chain
/reasoning:chain-validate --compare "optimal"
```

## Integration

Chain validation supports:
- `/semantic:tree-view` to see full chain
- `/boundary:safe-bridge` to fix gaps
- `/wfgy:bbcr` to recover from failures
- `/reasoning:multi-path` for alternatives
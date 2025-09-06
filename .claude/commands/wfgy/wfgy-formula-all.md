---
tools:
  - read
  - write
  - edit
  - grep
  - bash
arguments: $QUERY
---

# WFGY Formula All - Complete Reasoning Pipeline

Apply all four WFGY formula modules (BBMC, BBPF, BBCR, BBAM) in sequence for comprehensive semantic reasoning.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Module Pipeline

1. **BBMC** - Semantic Residue Minimization
2. **BBPF** - Multi-Path Progression
3. **BBCR** - Collapse-Rebirth Correction (if needed)
4. **BBAM** - Attention Modulation

## Instructions

1. **Initialize Pipeline**
   - Parse input query: "$QUERY"
   - Load system configuration from `.wfgy/config.json`
   - Check all modules are initialized
   - Create pipeline session in `.wfgy/sessions/`
   - Set up monitoring for each module

2. **Phase 1: BBMC (Minimization)**
   - Calculate initial semantic residue
   - Apply formula: B = I - G + m * c²
   - Minimize ||B||₂ through iteration
   - Record residue metrics
   - Pass optimized state to BBPF

3. **Phase 2: BBPF (Multi-Path)**
   - Generate N parallel reasoning paths
   - Apply: x_next = x + Σ V_i + Σ(W_j * P_j)
   - Weight and rank paths by probability
   - Select top paths for synthesis
   - Check for divergence requiring BBCR

4. **Phase 3: BBCR (Correction)**
   - Monitor for collapse conditions:
     * ||B|| ≥ 0.85 (high residue)
     * f(S) < 0.01 (stalled progression)
     * Logic contradictions detected
   - If triggered:
     * Execute collapse-reset-rebirth cycle
     * Preserve valid components
     * Return to stable state
   - Continue to BBAM

5. **Phase 4: BBAM (Attention)**
   - Analyze attention distribution
   - Apply: â_i = a_i * exp(-0.618 * std(a))
   - Focus on critical elements
   - Balance attention across concerns
   - Generate final optimized output

6. **Integration and Output**
   - Synthesize results from all modules
   - Calculate overall metrics:
     * Total semantic tension (ΔS)
     * Logic vector direction (λ)
     * Stability score
     * Confidence level
   - Create semantic node if recording active
   - Generate comprehensive report

## Output Format

```
WFGY Complete Formula Analysis
═══════════════════════════════════════
Query: "$QUERY"

Module Results:
┌────────────────────────────────────────┐
│ Module │ Status    │ Key Metric        │
├────────────────────────────────────────┤
│ BBMC   │ ✓ Applied │ Residue: 0.32     │
│ BBPF   │ ✓ Applied │ Paths: 5          │
│ BBCR   │ ○ Skipped │ Stable            │
│ BBAM   │ ✓ Applied │ Focus: 0.78       │
└────────────────────────────────────────┘

Semantic Analysis:
- Tension (ΔS): [value]
- Logic Vector (λ): [direction]
- Confidence: [percentage]%
- Risk Zone: [Safe/Transitional/Risk/Danger]

Primary Reasoning Path:
[Main conclusion from analysis]

Alternative Paths (from BBPF):
1. [Alternative approach]
2. [Alternative approach]

Key Focus Points (from BBAM):
• [Critical element 1]
• [Critical element 2]
• [Critical element 3]

Optimized Response:
[Final synthesized reasoning with all optimizations applied]

Semantic Node Created: [Yes/No]
Node ID: [if created]
```

## Performance Metrics

Expected improvements over baseline:
- Reasoning accuracy: +22.4%
- Chain validity: +42.1%
- Stability: 3.6× increase
- Hallucination events: Significantly reduced

## Advanced Options

```bash
# Run with custom parameters
/wfgy:formula-all "query" --paths 10 --gamma 0.5 --threshold 0.7

# Run with verbose logging
/wfgy:formula-all "query" --verbose

# Run with specific module emphasis
/wfgy:formula-all "query" --emphasize bbpf
```

## Use Cases

- Complex multi-step reasoning tasks
- Problems requiring both creativity and precision
- Situations with high uncertainty
- Tasks needing attention optimization
- Full semantic analysis of concepts

## Integration

After running formula-all:
- `/semantic:node-build` to record the complete analysis
- `/semantic:tree-view` to see reasoning history
- `/boundary:detect` to verify knowledge boundaries
- `/reasoning:chain-validate` to confirm logic consistency
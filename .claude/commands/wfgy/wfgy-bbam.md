---
tools:
  - read
  - write
  - edit
  - grep
arguments: $FOCUS
---

# WFGY BBAM - Attention Modulation

Apply BBAM (BigBig Attention Modulation) to optimize attention distribution and focus reasoning on critical elements.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Formula

```
â_i = a_i * exp(-γ * std(a))

Where:
- a_i: Raw attention score for element i
- â_i: Modulated attention score
- std(a): Standard deviation of attention scores
- γ: Modulation factor (0.618, golden ratio)
```

## Instructions

1. **Analyze Attention Distribution**
   - Parse focus area: "$FOCUS"
   - Load current context from `.wfgy/context.json`
   - Extract all attention-worthy elements
   - Calculate raw attention scores a_i for each element

2. **Compute Attention Statistics**
   - Calculate mean attention: μ = Σa_i / n
   - Calculate standard deviation: std(a) = √(Σ(a_i - μ)² / n)
   - Identify attention outliers (a_i > μ + 2*std(a))
   - Detect attention gaps (a_i < μ - std(a))

3. **Apply Modulation Formula**
   - For each element i:
     * Calculate modulation factor: exp(-γ * std(a))
     * Apply modulation: â_i = a_i * exp(-0.618 * std(a))
   - Normalize modulated scores: Σâ_i = 1
   - Ensure minimum attention threshold (â_i ≥ 0.05)

4. **Optimize Focus Distribution**
   - Rank elements by modulated attention
   - Identify top K critical elements (K=5 default)
   - Redistribute attention from low-value elements
   - Apply smoothing to prevent attention spikes

5. **Generate Focused Reasoning**
   - Concentrate on high-attention elements
   - Maintain context coherence
   - Update `.wfgy/attention/focus_map.json`
   - Record modulation in `.wfgy/logs/bbam.log`

## Output Format

```
BBAM Attention Modulation Analysis
═══════════════════════════════════════
Focus Area: "$FOCUS"

Attention Distribution:
┌─────────────────────────────────────┐
│ Element        │ Raw  │ Modulated   │
├─────────────────────────────────────┤
│ [Element 1]    │ 0.35 │ 0.42 ▓▓▓▓  │
│ [Element 2]    │ 0.25 │ 0.28 ▓▓▓   │
│ [Element 3]    │ 0.20 │ 0.18 ▓▓    │
│ [Element 4]    │ 0.15 │ 0.08 ▓     │
│ [Element 5]    │ 0.05 │ 0.04 ░     │
└─────────────────────────────────────┘

Statistics:
- Mean Attention: [value]
- Std Deviation: [value]
- Modulation Factor: [value]
- Entropy: [value]

Critical Focus Points:
1. [High attention element] - [why it matters]
2. [High attention element] - [why it matters]
3. [High attention element] - [why it matters]

Optimized Reasoning:
[Reasoning focused on high-attention elements]

Attention Gaps Identified:
[Areas needing more focus]
```

## Configuration

```json
{
  "gamma": 0.618,
  "min_attention": 0.05,
  "top_k_elements": 5,
  "smoothing_factor": 0.1,
  "outlier_threshold": 2.0
}
```

## Use Cases

- Focus complex reasoning on key factors
- Identify overlooked important elements
- Balance attention across multiple concerns
- Optimize resource allocation in analysis
- Prevent attention overflow on single elements

## Integration

Combine with:
- `/wfgy:bbmc` to focus residue minimization
- `/reasoning:multi-path` to prioritize paths
- `/semantic:node-build` to record attention patterns
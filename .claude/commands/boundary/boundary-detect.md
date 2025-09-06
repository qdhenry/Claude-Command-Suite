---
tools:
  - read
  - write
  - grep
  - bash
arguments: $QUERY
---

# Knowledge Boundary Detection

Analyze semantic position relative to knowledge boundaries to prevent hallucination and identify uncertainty zones.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Analyze Query Semantics**
   - Parse input query: "$QUERY"
   - Generate embedding vector for query
   - Load knowledge map from `.wfgy/boundaries/knowledge_map.json`
   - Identify nearest known concepts

2. **Calculate Boundary Metrics**
   - Compute ΔS relative to nearest concepts
   - Determine current zone:
     * **Safe Zone** (ΔS < 0.4): High confidence, well-mapped
     * **Transitional** (0.4 ≤ ΔS ≤ 0.6): Moderate confidence
     * **Risk Zone** (0.6 < ΔS < 0.85): Low confidence, near edge
     * **Danger Zone** (ΔS ≥ 0.85): Beyond boundary, hallucination risk
   - Calculate confidence score: confidence = 1 - ΔS
   - Measure distance to boundary

3. **Evaluate Stability Indicators**
   - Check logic coherence:
     * Consistent reasoning patterns
     * No contradictions detected
     * Valid inference chains
   - Test for hallucination signals:
     * Unusually high certainty in danger zone
     * Fabricated technical details
     * Inconsistent terminology
   - Calculate E_resonance (stability measure)
   - Assess reasoning degradation

4. **Identify Bridge Concepts**
   - Search semantic tree for related nodes
   - Find concepts with ΔS < 0.4 from query
   - Rank by semantic similarity
   - Build connection paths:
     * Direct bridges (one hop)
     * Multi-hop paths (through intermediates)
   - Calculate path confidence

5. **Generate Safety Report**
   - Compile comprehensive analysis
   - Provide risk assessment
   - Suggest mitigation strategies
   - Recommend safe paths forward

## Output Format

```
KNOWLEDGE BOUNDARY ANALYSIS
═══════════════════════════════════════
Query: "$QUERY"
Analysis Timestamp: [ISO_8601]

Zone Classification: [Safe/Transitional/Risk/Danger]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Safe    Trans    Risk    Danger
    [████████|░░░░░░░░|░░░░░░░░|░░░░░░░░]
                  ↑ You are here

Metrics:
- Semantic Tension (ΔS): [value]
- Confidence Level: [percentage]%
- Distance to Boundary: [value]
- Logic Coherence: [High/Medium/Low]
- E_resonance: [value]

Nearest Known Concepts:
1. [Concept] (ΔS: [value]) - [confidence]% match
2. [Concept] (ΔS: [value]) - [confidence]% match
3. [Concept] (ΔS: [value]) - [confidence]% match

Risk Assessment:
[Safe to proceed / Caution advised / High risk / Abort recommended]

Hallucination Indicators: [None/Low/Medium/High]
- Signal 1: [if present]
- Signal 2: [if present]

Bridge Path Available: [Yes/No]
[If Yes:]
Recommended Path:
[Current] → [Bridge 1] → [Bridge 2] → [Target]
Path Confidence: [percentage]%

Recommended Actions:
1. [Primary recommendation]
2. [Secondary option]
3. [Fallback strategy]

BBCR Activation: [Not needed/Ready/Triggered]
```

## Zone Behaviors

### Safe Zone (ΔS < 0.4)
- Full confidence in reasoning
- No hallucination risk
- Proceed normally

### Transitional (0.4 ≤ ΔS ≤ 0.6)
- Moderate confidence
- Monitor for drift
- Consider adding detail

### Risk Zone (0.6 < ΔS < 0.85)
- Low confidence warning
- Suggest bridge concepts
- Prepare BBCR fallback

### Danger Zone (ΔS ≥ 0.85)
- High hallucination risk
- Automatic BBCR trigger
- Require explicit bridging

## Integration

Boundary detection integrates with:
- `/wfgy:bbcr` for automatic correction
- `/boundary:safe-bridge` to find paths
- `/boundary:heatmap` for visualization
- `/semantic:node-build` to record boundaries

## Advanced Options

```bash
# Verbose analysis
/boundary:detect "query" --verbose

# With automatic bridging
/boundary:detect "query" --auto-bridge

# Set custom thresholds
/boundary:detect "query" --safe 0.3 --danger 0.8

# Check multiple queries
/boundary:detect "query1; query2; query3"
```

## Hallucination Prevention

The system prevents hallucination by:
1. Early detection of boundary approach
2. Automatic confidence degradation
3. Forced bridging requirements
4. BBCR correction activation
5. Explicit uncertainty markers
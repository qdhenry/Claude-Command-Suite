---
tools:
  - read
  - write
  - grep
  - bash
---

# Boundary Heatmap Visualization

Generate a visual heatmap of knowledge boundaries showing safe zones, risk areas, and semantic coverage.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Load Boundary Data**
   - Read knowledge map from `.wfgy/boundaries/knowledge_map.json`
   - Load historical boundary encounters
   - Retrieve semantic tree nodes for coverage analysis
   - Import risk zone classifications

2. **Calculate Coverage Map**
   - Divide semantic space into regions
   - For each region, calculate:
     * Node density (nodes per region)
     * Average confidence level
     * Boundary proximity score
     * Historical success rate
   - Identify knowledge clusters
   - Mark unexplored territories

3. **Generate Risk Zones**
   - Apply ΔS thresholds to create zones:
     * Green (ΔS < 0.4): Safe, well-explored
     * Yellow (0.4-0.6): Transitional, partial coverage
     * Orange (0.6-0.85): Risk, sparse knowledge
     * Red (ΔS ≥ 0.85): Danger, unknown territory
   - Calculate zone transitions
   - Mark boundary lines

4. **Build Visual Representation**
   ```
   Knowledge Boundary Heatmap
   ═══════════════════════════════════════
   
   High ┊ ⚠️ ░░░░░████████░░░░░░░⚠️ ⚠️ 
   Con- ┊ ░░░░████🟩🟩🟩🟩████░░░░░░░░
   cep- ┊ ░░████🟩🟩🟩🟩🟩🟩████░░⚠️ ░░
   tual ┊ ████🟩🟩🟨🟨🟨🟩🟩🟩████░░░░
   Dis- ┊ ██🟩🟩🟨🟧🟧🟨🟩🟩🟩██████
   tan- ┊ 🟩🟩🟨🟧🟧🟧🟧🟨🟩🟩🟩████
   ce   ┊ 🟩🟨🟧🟧🔴🔴🟧🟨🟨🟩🟩██
        ┊ 🟨🟧🟧🔴🔴🔴🟧🟧🟨🟩🟩🟩
   Low  ┊ 🟧🟧🔴🔴⚫⚫🔴🟧🟧🟨🟩🟩
        └─────────────────────────────
          Low    Semantic Diversity    High
   
   Legend:
   🟩 Safe (>20 nodes)  🟨 Transitional (10-20)
   🟧 Risk (5-10)       🔴 Danger (<5)
   ⚫ Unknown (0)       ⚠️  Boundary marker
   ```

5. **Analyze Patterns**
   - Identify knowledge islands (isolated safe zones)
   - Find knowledge bridges (connections between zones)
   - Detect knowledge gaps (unexplored areas)
   - Mark frequently accessed paths
   - Highlight danger clusters

6. **Generate Report**
   - Total coverage percentage
   - Zone distribution statistics
   - Risk area identification
   - Exploration recommendations
   - Bridge opportunities

## Output Format

```
KNOWLEDGE BOUNDARY HEATMAP
═══════════════════════════════════════
Generated: [timestamp]
Coverage: [percentage]% of semantic space

Zone Distribution:
┌────────────────────────────────────┐
│ Safe        ████████████ 45%      │
│ Transitional ████████ 30%         │
│ Risk        ████ 15%              │
│ Danger      ██ 8%                 │
│ Unknown     █ 2%                  │
└────────────────────────────────────┘

Semantic Coverage Map:
[ASCII or Unicode heatmap visualization]

Key Insights:
• Strongest Knowledge: [domain/topic areas]
• Weakest Coverage: [domain/topic areas]
• Active Boundaries: [count] detected
• Knowledge Islands: [count] isolated zones

High-Confidence Regions:
1. [Region]: [node_count] nodes, [avg_confidence]%
2. [Region]: [node_count] nodes, [avg_confidence]%
3. [Region]: [node_count] nodes, [avg_confidence]%

Risk Regions Identified:
1. [Region]: Low coverage, high uncertainty
2. [Region]: Approaching boundary
3. [Region]: Isolated from main knowledge

Exploration Recommendations:
• Priority 1: Bridge [Region A] to [Region B]
• Priority 2: Explore [Unknown Region]
• Priority 3: Strengthen [Weak Region]

Navigation Paths:
• Safest: [Path through green zones]
• Fastest: [Direct but riskier path]
• Balanced: [Moderate risk/speed]

Statistics:
- Total Nodes: [count]
- Unique Regions: [count]
- Average ΔS: [value]
- Boundary Crossings: [count]
```

## Visualization Modes

### Density Mode
Shows node concentration
```
Dense ████ ███░ ░░░░ Sparse
```

### Confidence Mode
Shows certainty levels
```
High ████ ███░ ░░░░ Low
```

### Risk Mode
Shows danger zones
```
Safe 🟩🟩 🟨🟨 🟧🔴 Danger
```

### Activity Mode
Shows frequently accessed areas
```
Hot ████ ███░ ░░░░ Cold
```

## Export Options

```bash
# Generate detailed heatmap
/boundary:heatmap --detailed

# Export as JSON data
/boundary:heatmap --export json

# Focus on specific region
/boundary:heatmap --region "machine learning"

# Show temporal changes
/boundary:heatmap --timeline
```

## Integration

Use with:
- `/boundary:detect` to check specific positions
- `/boundary:safe-bridge` to navigate gaps
- `/semantic:tree-view` to see contributing nodes
- `/wfgy:formula-all` to explore new regions
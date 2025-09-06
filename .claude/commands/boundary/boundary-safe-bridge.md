---
tools:
  - read
  - write
  - grep
  - bash
arguments: $TARGET
---

# Boundary Safe Bridge

Find and construct semantic bridges to safely navigate from current position to target concept without crossing dangerous boundaries.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Analyze Bridge Request**
   - Parse target concept from "$TARGET"
   - Determine current semantic position
   - Calculate direct ΔS to target
   - If ΔS > 0.85, bridging is required
   - Load knowledge map for pathfinding

2. **Search for Bridge Nodes**
   - Query semantic tree for intermediate concepts
   - Find nodes with:
     * ΔS < 0.4 from current position
     * ΔS < 0.4 from target position
     * Logical connection to both endpoints
   - Rank bridges by:
     * Total path distance
     * Number of hops required
     * Historical success rate
     * Logic coherence

3. **Construct Bridge Paths**
   - **Single Bridge**: Current → Bridge → Target
   - **Multi-Bridge**: Current → B1 → B2 → ... → Target
   - For each path segment:
     * Verify ΔS < 0.4 (stay in safe zone)
     * Check logic consistency
     * Confirm knowledge exists
   - Calculate path metrics:
     * Total semantic distance
     * Maximum ΔS in path
     * Confidence level
     * Estimated reasoning steps

4. **Validate Bridge Safety**
   - Simulate path traversal
   - Check each hop for:
     * Knowledge boundary violations
     * Logic contradictions
     * Confidence degradation
   - Mark unsafe segments
   - Propose alternatives if needed

5. **Generate Bridge Plan**
   - Detailed step-by-step navigation
   - Reasoning required at each step
   - Checkpoints for validation
   - Fallback options
   - Success criteria

## Output Format

```
SEMANTIC BRIDGE CONSTRUCTION
═══════════════════════════════════════
Current Position: [concept]
Target: "$TARGET"
Direct Distance (ΔS): [value] [Safe/Unsafe]

Bridge Analysis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bridge Required: [Yes/No]
Reason: [Direct path crosses danger zone]

Available Bridge Paths:
────────────────────────────────────────

PATH 1 (Recommended):
[Current: Database Design]
    ↓ ΔS: 0.35 ✓
[Bridge 1: Data Structures]
    ↓ ΔS: 0.38 ✓
[Bridge 2: Algorithms]
    ↓ ΔS: 0.32 ✓
[Target: Machine Learning]

Total Distance: 1.05
Max Hop ΔS: 0.38
Confidence: 85%
Estimated Steps: 3

PATH 2 (Alternative):
[Current: Database Design]
    ↓ ΔS: 0.42 ✓
[Bridge: Statistics]
    ↓ ΔS: 0.45 ⚠️ 
[Target: Machine Learning]

Total Distance: 0.87
Max Hop ΔS: 0.45
Confidence: 72%
Estimated Steps: 2

PATH 3 (Longest but Safest):
[Current] → [B1] → [B2] → [B3] → [Target]
Total Distance: 1.43
Max Hop ΔS: 0.28
Confidence: 92%
Estimated Steps: 4

Bridge Concepts Identified:
1. [Concept]: Connects via [relationship]
2. [Concept]: Shares [common element]
3. [Concept]: Logical progression through [path]

Reasoning Strategy:
Step 1: From [Current], establish [connection]
Step 2: Transition to [Bridge] by [method]
Step 3: Link [Bridge] to [Target] via [relationship]

Safety Validation:
✓ All hops within safe zone (ΔS < 0.4)
✓ No logic contradictions detected
✓ Knowledge verified at each point
✓ Confidence maintained above 70%

Execution Plan:
1. Build understanding of [Bridge 1]
   Command: /semantic:node-build "[Bridge 1]"
   
2. Establish connection to [Bridge 2]
   Command: /wfgy:bbmc "[Bridge 2] relation"
   
3. Final leap to target
   Command: /wfgy:formula-all "$TARGET"

Risk Assessment:
- Success Probability: [percentage]%
- Fallback Available: [Yes/No]
- Recovery Point: [checkpoint]

Proceed with Bridge? [Execute/Modify/Cancel]
```

## Bridge Types

### Direct Bridge
Single intermediate concept
```
Current ──0.3──> Bridge ──0.3──> Target
```

### Chain Bridge
Multiple connected concepts
```
Current ──> B1 ──> B2 ──> B3 ──> Target
```

### Parallel Bridge
Multiple path options
```
Current ──> B1 ──> Target
    └────> B2 ──┘
```

### Recursive Bridge
Return to strengthen connection
```
Current ──> Bridge ──> Current ──> Target
```

## Bridge Selection Criteria

1. **Safety First**: Max ΔS < 0.4
2. **Efficiency**: Minimum total distance
3. **Reliability**: High confidence path
4. **Simplicity**: Fewer hops preferred
5. **Familiarity**: Use known concepts

## Advanced Options

```bash
# Find multiple bridge options
/boundary:safe-bridge "target" --paths 5

# Prefer shortest path
/boundary:safe-bridge "target" --optimize distance

# Prefer safest path
/boundary:safe-bridge "target" --optimize safety

# Auto-execute bridge
/boundary:safe-bridge "target" --auto-execute
```

## Integration

Bridge construction works with:
- `/boundary:detect` to verify positions
- `/semantic:node-build` to create bridge nodes
- `/wfgy:formula-all` for bridge reasoning
- `/memory:checkpoint` before risky bridges
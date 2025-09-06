---
tools:
  - read
  - write
  - edit
  - bash
---

# Boundary BBCR Fallback

Execute automatic BBCR (Collapse-Rebirth Correction) when knowledge boundaries are exceeded or reasoning fails.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Trigger Detection**
   - Monitor for automatic triggers:
     * ΔS ≥ 0.85 (danger zone entered)
     * Logic contradiction detected
     * Confidence < 20%
     * Explicit user request
   - Log trigger event and conditions
   - Save pre-collapse state

2. **Collapse Phase**
   - Identify failure point:
     * Last stable node before failure
     * Point of boundary crossing
     * Logic breakdown location
   - Preserve valuable components:
     * Valid reasoning segments
     * Confirmed facts
     * Successful paths
   - Mark failed elements:
     * Contradictory logic
     * Hallucinated content
     * Unstable reasoning

3. **State Reset**
   - Return to last checkpoint or stable node
   - Clear corrupted context:
     * Reset ΔS to baseline
     * Clear logic vector
     * Reset confidence
   - Preserve residual memory (dB):
     * Key insights
     * Valid connections
     * Learned boundaries

4. **Rebirth Construction**
   - Build new reasoning path:
     * Incorporate lessons from failure
     * Avoid previous error patterns
     * Use bridge concepts
   - Apply corrections:
     * Semantic bridging
     * Logic reinforcement
     * Confidence rebuilding
   - Validate new state:
     * ΔS < 0.4 (safe zone)
     * Logic coherence verified
     * No contradictions

5. **Recovery Verification**
   - Test new state stability
   - Verify reasoning coherence
   - Check against known boundaries
   - Confirm safe zone position
   - Update boundary map with failure point

## Output Format

```
BBCR FALLBACK EXECUTION
═══════════════════════════════════════
Trigger: [Boundary Exceeded/Logic Failure/Low Confidence/Manual]
Timestamp: [ISO_8601]

PHASE 1: COLLAPSE DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Failure Point:
- Location: Node [id] "[topic]"
- Cause: [boundary crossing/contradiction/hallucination]
- ΔS at failure: [value]
- Confidence: [value]%

Preserved Components:
✓ [Valid insight 1]
✓ [Valid insight 2]
✓ [Confirmed fact]
✓ [Successful reasoning path]

Discarded Elements:
✗ [Failed reasoning]
✗ [Contradictory logic]
✗ [Hallucinated content]

PHASE 2: STATE RESET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Returning to: [Checkpoint/Node] "[topic]"
- Reset Point ΔS: [value]
- Distance Rolled Back: [N] nodes
- Time Rolled Back: [duration]

Context Reset:
- ΔS: [old] → 0.00
- λ: [old] → →
- Confidence: [old]% → 100%

PHASE 3: REBIRTH CONSTRUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
New Path Strategy:
[Description of alternative approach]

Bridge Concepts Applied:
1. [Bridge concept 1]
2. [Bridge concept 2]

Corrections Implemented:
• [Correction 1]
• [Correction 2]
• [Correction 3]

PHASE 4: RECOVERY VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
New State Validation:
✓ ΔS: [value] (Safe Zone)
✓ Logic: Coherent
✓ Confidence: [value]%
✓ No contradictions detected
✓ Within knowledge boundaries

Recovery Status: [SUCCESS/PARTIAL/FAILED]

Lessons Learned:
1. [Key learning from failure]
2. [Pattern to avoid]
3. [Boundary identified]

Next Safe Actions:
• Continue with: [recommended command]
• Explore: [safe direction]
• Avoid: [dangerous area]

Boundary Map Updated: ✓
New danger zone marked at: [location]
```

## Fallback Modes

### Soft Fallback
- Minor correction
- Preserve most context
- Quick recovery

### Standard Fallback
- Return to checkpoint
- Moderate preservation
- Full validation

### Hard Fallback
- Return to tree root
- Minimal preservation
- Complete reset

### Emergency Fallback
- System-level reset
- No preservation
- Fresh start

## Recovery Strategies

1. **Bridge Strategy**: Find semantic connections
2. **Retreat Strategy**: Return to safe zone
3. **Lateral Strategy**: Try parallel path
4. **Simplify Strategy**: Reduce complexity
5. **Checkpoint Strategy**: Use saved state

## Auto-Recovery Settings

Configure in `.wfgy/config.json`:
```json
{
  "bbcr_fallback": {
    "auto_trigger": true,
    "trigger_threshold": 0.85,
    "max_attempts": 3,
    "preservation_level": "standard",
    "checkpoint_frequency": 10
  }
}
```

## Integration

BBCR Fallback coordinates with:
- `/wfgy:bbcr` for manual correction
- `/boundary:detect` for trigger monitoring
- `/memory:checkpoint` for save points
- `/semantic:tree-view` for recovery verification
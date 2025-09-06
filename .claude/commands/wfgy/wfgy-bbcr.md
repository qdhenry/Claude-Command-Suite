---
tools:
  - read
  - write
  - edit
  - grep
  - bash
---

# WFGY BBCR - Collapse-Rebirth Correction

Execute BBCR (BigBig Coupling Resolver) for recovering from reasoning failures and logic collapse.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Formula

```
if ||B|| ≥ B_c or f(S) < ε:
    collapse()
    reset_state(S, dB)
    rebirth(S_next, dB)

Where:
- B_c: Collapse threshold (0.85)
- f(S): Progression metric
- ε: Minimum progression threshold
- dB: Residual memory to preserve
```

## Instructions

1. **Detect Collapse Conditions**
   - Read current state from `.wfgy/context.json`
   - Calculate semantic residue magnitude ||B||
   - Evaluate progression metric f(S)
   - Check conditions:
     * Residue exceeds threshold: ||B|| ≥ 0.85
     * Progression stalled: f(S) < 0.01
     * Logic contradiction detected
     * Semantic tension > 0.9

2. **Execute Collapse Phase**
   - Save current state to `.wfgy/recovery/collapse_state.json`
   - Identify salvageable components (dB):
     * Valid reasoning segments
     * Confirmed facts
     * Stable semantic nodes
   - Mark failed paths in `.wfgy/paths/failed.json`
   - Clear corrupted context elements

3. **Reset State with Memory**
   - Return to last stable checkpoint
   - Preserve residual memory dB
   - Reset semantic tension to baseline
   - Clear logic vector to neutral (→)
   - Reinitialize formula modules

4. **Rebirth with Correction**
   - Generate new state S_next incorporating:
     * Lessons from failure
     * Preserved valid components
     * Alternative reasoning paths
   - Apply semantic bridging to reconnect concepts
   - Validate new state stability
   - Ensure ||B|| < 0.4 before proceeding

5. **Recovery Verification**
   - Test recovered state coherence
   - Validate against known boundaries
   - Check for recurring failure patterns
   - Update `.wfgy/recovery/success_log.json`
   - Create recovery report

## Output Format

```
BBCR Collapse-Rebirth Correction
═══════════════════════════════════════
Trigger: [Residue Overflow/Progression Stall/Logic Failure]

Collapse Analysis:
- Semantic Residue: [value]
- Progression Metric: [value]
- Failure Type: [description]

Preserved Components:
✓ [Valid component 1]
✓ [Valid component 2]
✓ [Valid component 3]

Recovery Strategy:
[Description of correction approach]

New State:
- Semantic Tension: [value]
- Logic Vector: [direction]
- Stability Score: [value]

Status: [Recovery Successful/Partial Recovery/Manual Intervention Required]

Next Steps:
[Recommended actions post-recovery]
```

## Automatic Triggers

BBCR automatically activates when:
- `/wfgy:bbmc` detects residue ≥ 0.85
- `/boundary:detect` enters danger zone
- `/reasoning:chain-validate` finds contradictions
- Manual trigger via this command

## Recovery Modes

1. **Soft Reset**: Minor correction, preserve most context
2. **Hard Reset**: Return to checkpoint, minimal preservation
3. **Bridge Mode**: Find semantic path around failure
4. **Abort**: Complete reset to initial state

## Integration

Post-recovery commands:
- `/semantic:node-build` to record recovery
- `/boundary:detect` to verify safe zone
- `/reasoning:chain-validate` to confirm coherence
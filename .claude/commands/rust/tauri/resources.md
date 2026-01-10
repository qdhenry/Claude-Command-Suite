---
name: rust:tauri:resources
description: Monitor CPU, memory, and resource usage of a running Tauri application
allowed-tools: mcp__tauri-mcp__monitor_resources
author: Quintin Henry (https://github.com/qdhenry/)
---

<objective>
Monitor the resource consumption of a running Tauri application to identify performance issues or memory leaks.
</objective>

<instructions>
Monitor resources for the Tauri application: **$ARGUMENTS**

Arguments: `[process_id]`

## Process

1. **Query Resource Metrics**
   Use `mcp__tauri-mcp__monitor_resources` with the process ID.

2. **Analyze Results**
   - Compare to expected baselines
   - Identify concerning metrics
   - Note trends if called repeatedly

3. **Provide Recommendations**
   Based on the metrics, suggest:
   - Whether performance is acceptable
   - Potential issues to investigate
   - Next debugging steps if needed

## Usage Examples

```bash
# Check current resource usage
/tauri:resources 12345

# Use in a monitoring loop (manual)
/tauri:resources 12345
# wait, perform actions
/tauri:resources 12345
# compare results
```
</instructions>

<output_format>
```
=== Resource Usage ===
Process ID: [PID]
Timestamp: [time]

--- CPU ---
Usage: [X]%
[assessment: low/moderate/high]

--- Memory ---
Resident: [X] MB
Virtual: [X] MB
[assessment: normal/elevated/concerning]

--- Other Metrics ---
[any additional available metrics]

--- Assessment ---
[Overall health: Good/Warning/Investigate]
[Recommendations if any]
```
</output_format>

<baselines>
**Typical Healthy Values (Tauri Desktop App):**
- CPU Idle: < 5%
- CPU Active: < 30% (during normal use)
- Memory: 100-300 MB (depends on app complexity)
- Memory Growth: Should stabilize, not grow indefinitely

**Warning Signs:**
- CPU > 50% when idle
- Memory > 500 MB for simple apps
- Continuous memory growth (potential leak)
- CPU spikes during simple operations
</baselines>

<use_cases>
**Performance Testing:**
Measure resource usage during specific operations.

**Memory Leak Detection:**
Monitor over time to detect growing memory usage.

**Optimization Validation:**
Compare before/after metrics when optimizing code.

**CI/CD Integration:**
Automated resource checks in test pipelines.
</use_cases>

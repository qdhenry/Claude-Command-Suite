# Explain Command Execution Trace

Show detailed execution trace and reasoning for any command or system action

## Instructions

Provide comprehensive tracing and explanation of command execution: **$ARGUMENTS**

1. **Command Analysis**
   - Identify the command being traced
   - Understand the intended purpose and scope
   - Review command parameters and context
   - Determine expected vs actual behavior

2. **Execution Flow Mapping**
   - Map out the complete execution path
   - Identify all decision points and branches
   - Document data transformations and state changes
   - Track resource usage and system interactions

3. **Step-by-Step Breakdown**
   ```
   Step 1: [Action] → [Result] → [Reasoning]
   Step 2: [Action] → [Result] → [Reasoning]
   Step 3: [Action] → [Result] → [Reasoning]
   ```

4. **Decision Reasoning**
   - Explain why each decision was made
   - Document the criteria and logic used
   - Identify alternative paths considered
   - Clarify trade-offs and priorities

5. **Confidence Assessment**
   - Rate confidence level for each step (1-10)
   - Identify areas of uncertainty
   - Document assumptions made
   - Flag potential issues or risks

6. **Predictability Analysis**
   - Compare actual vs expected behavior
   - Identify any unexpected deviations
   - Analyze consistency with previous executions
   - Document learned patterns

7. **Impact Assessment**
   - Identify all systems and files affected
   - Document changes made to state
   - Assess potential side effects
   - Evaluate success criteria

8. **Transparency Report**
   ```markdown
   ## Command Execution Trace

   **Command**: `/project:command-name argument`
   **Timestamp**: 2024-01-15 10:30:45 UTC
   **Execution Time**: 2.3 seconds
   **Confidence Score**: 8.5/10

   ### Execution Steps
   1. **Initialize Context** (Confidence: 9/10)
      - Action: Load project configuration
      - Result: Found 3 config files, loaded settings
      - Reasoning: Required for environment-specific behavior
      - Duration: 0.2s

   2. **Validate Input** (Confidence: 10/10)
      - Action: Parse and validate arguments
      - Result: All parameters valid, type-checked
      - Reasoning: Prevents errors downstream
      - Duration: 0.1s

   3. **Analyze Codebase** (Confidence: 7/10)
      - Action: Scan files matching criteria
      - Result: Found 23 files, 1,247 lines analyzed
      - Reasoning: Statistical analysis requires sufficient sample
      - Uncertainty: Some files may be false positives
      - Duration: 1.8s

   ### Decision Points
   - **Pattern Match**: Used regex over AST parsing (faster, 95% accuracy)
   - **Scope**: Limited to src/ directory (standard practice)
   - **Threshold**: Set minimum confidence at 7/10 (balances speed vs accuracy)

   ### State Changes
   - Created temporary analysis files in .claude/temp/
   - Updated command history log
   - Cached results for 1 hour

   ### Assumptions Made
   - Project follows standard directory structure
   - Source files are in expected formats
   - No critical dependencies are missing

   ### Success Metrics
   - ✅ Completed without errors
   - ✅ Results within expected range
   - ⚠️  Some low-confidence matches (acceptable threshold)
   ```

9. **Repairability Information**
   - Document how to undo changes if needed
   - Identify checkpoints and restoration points
   - Provide rollback procedures
   - List recovery options available

10. **Lessons Learned**
    - Document insights gained from execution
    - Identify patterns for future predictions
    - Note any unexpected behaviors
    - Update system knowledge base

11. **User Agency Preservation**
    - Identify points where user input was required
    - Document automated decisions made
    - Explain how user maintains control
    - Provide override options for key decisions

**Output Format:**
- Clear execution timeline with timestamps
- Confidence scores for each major step
- Decision reasoning in plain language
- Visual flow diagram when helpful
- Actionable insights and recommendations

**For Complex Commands:**
- Break down into logical phases
- Show parallel vs sequential operations
- Highlight critical path and dependencies
- Document error handling and recovery

**For System Operations:**
- Show all file and system changes
- Document security implications
- Explain performance considerations
- Provide monitoring and validation steps

This command builds trust through complete transparency, helping users understand exactly what happened, why it happened, and how confident the system is in each step.
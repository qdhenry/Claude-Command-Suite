---
allowed-tools: Task, TodoWrite, mcp__spec-workflow__spec-list, mcp__spec-workflow__manage-tasks, mcp__spec-workflow__spec-status, mcp__linear__list_issues, mcp__linear__list_projects, Bash, Read, LS, Grep, Glob
---

# Parallel Tasks Execution

Deploy specialized AI agents to work on multiple tasks simultaneously while maintaining coordination and task tracking. This command can reduce development time by 60-80% through intelligent agent coordination and task parallelization.

## Instructions

### 1. **Prerequisites and Setup**
   - Verify project has active task management system (spec-workflow, GitHub, Linear)
   - Ensure no conflicting processes are running (other builds, deploys)
   - Check system resources available for parallel agent execution
   - Review available command arguments:
     - `--system <TYPE>` - Task management system: spec-workflow, github, linear, manual
     - `--project-path <PATH>` - Absolute path to project root (default: current directory)
     - `--spec-name <NAME>` - Specification name (required for spec-workflow system)
     - `--auto-assign` - Automatically assign tasks to optimal agents (recommended)
     - `--max-agents <NUMBER>` - Maximum parallel agents (default: 4, range: 1-8)
     - `--dry-run` - Preview task assignments without execution
     - `--conflict-resolution <MODE>` - Handle conflicts: abort, merge, manual (default: abort)
     - `--resource-limit <LEVEL>` - Resource usage: low, medium, high (default: medium)
     - `--help` - Display comprehensive help documentation

### 2. **Preflight Validation**
   - **Help Flag Detection**: If `--help` flag is present, display comprehensive help documentation instead of executing
   - **System Connectivity Check**:
     - **Spec-Workflow**: Verify MCP server connection: `mcp__spec-workflow__spec-list`
     - **GitHub**: Check gh CLI access: `gh auth status`  
     - **Linear**: Test Linear MCP connection: `mcp__linear__list_projects`
   - **Project Path Validation**: Verify project directory exists, check for git repository
   - **Resource Assessment**: Check available system resources and validate max-agents parameter (1-8)

### 3. **Execute Parallel Task Processing**

   **Phase 1: Task Discovery and Analysis**

**System Integration:**
- Connect to specified task management system
- For spec-workflow: Use `mcp__spec-workflow__spec-list` to find specifications
- For spec-workflow with spec-name: Use `mcp__spec-workflow__manage-tasks` with action="list"
- Extract all pending/available tasks with their details

**Task Analysis:**
```bash
# Example for spec-workflow
1. Get task list with dependencies and file information
2. Analyze task descriptions for type classification
3. Identify file modification conflicts between tasks
4. Group tasks by specialization area (testing, deployment, development)
```

**Parallelization Assessment:**
- Tasks that modify same files → Sequential execution required
- Tasks with explicit dependencies → Respect dependency order
- Independent tasks of different types → Prime candidates for parallelization
- Large tasks → Consider if they can be subdivided

   **Phase 2: Agent Assignment Strategy**

**Task Categorization:**

Create task groups based on content analysis:
- **Testing Tasks**: Keywords: test, spec, coverage, validation, qa
- **Performance Tasks**: Keywords: benchmark, optimization, performance, metrics
- **Deployment Tasks**: Keywords: deploy, ci/cd, script, infrastructure
- **Development Tasks**: Keywords: implement, feature, refactor, bug fix
- **Documentation Tasks**: Keywords: docs, readme, api, documentation

**Agent Matching Matrix:**

```yaml
Testing Tasks:
  - test-automator: Unit tests, test configuration, coverage
  - qa-expert: Quality assurance, validation, acceptance testing
  - playwright-test-architect: E2E tests, integration testing

Performance Tasks:
  - performance-engineer: Benchmarking, optimization, metrics

Deployment Tasks:
  - deployment-engineer: CI/CD, scripts, infrastructure automation

Development Tasks:
  - typescript-pro: TypeScript development, refactoring
  - react-pro: React components, frontend development
  - python-pro: Python backend, API development
  - golang-pro: Go services, system programming

Documentation Tasks:
  - documentation-expert: Technical docs, guides, architecture
  - api-documenter: API documentation, examples, SDKs
```

**Conflict Detection:**
- File-level conflict analysis (no two agents modify same files)
- Resource conflict prevention (database, external services)
- Dependency ordering (Task A must complete before Task B)

   **Phase 3: Parallel Agent Deployment**

**Pre-Deployment Validation:**
- Confirm no file conflicts in task assignments
- Verify all required tools/dependencies are available
- Set up coordination mechanism for status tracking
- Create TodoWrite list to track overall progress

**Agent Deployment Process:**

For each selected agent and task group:

1. **Status Update**: Set tasks to "in-progress" in source system
```bash
# Example for spec-workflow
mcp__spec-workflow__manage-tasks --action set-status --task-id X --status in-progress
```

2. **Agent Prompt Template**:
```
Task {agent_type} agent to handle: {task_descriptions}

**CRITICAL WORKFLOW INTEGRATION**:
1. BEFORE starting: Task status already set to in-progress
2. Complete assigned work with full implementation
3. AFTER completion: Set task status to completed using source system

**Assigned Tasks**: {task_list}
**Files to Modify**: {file_list}
**Requirements**: {requirements}
**Integration Points**: {dependencies}
**Coordination**: Report progress and conflicts immediately
```

3. **Parallel Launch**: Use Task tool to deploy multiple agents simultaneously
```bash
# Deploy up to max-agents simultaneously
Task(subagent_type=agent_type, description=task_summary, prompt=full_prompt)
```

   **Phase 4: Coordination and Monitoring**

**Real-time Coordination:**
- Track agent progress through TodoWrite updates
- Monitor for file conflicts or resource contention
- Handle agent failures or errors gracefully
- Provide progress reports to user

**Status Synchronization:**
- Coordinate status updates between agents and source system
- Ensure no duplicate status updates or conflicts
- Maintain central coordination log

**Error Handling:**
- Agent failure: Reassign task or mark for manual completion
- Conflict detection: Pause conflicting agents, resolve manually
- Resource exhaustion: Reduce active agents, queue remaining tasks
- System connectivity loss: Cache progress, retry when restored

   **Phase 5: Integration and Validation**

**Post-Execution Validation:**
- Verify all parallel work integrates properly
- Run build validation to ensure no breaking changes
- Check for merge conflicts or inconsistencies
- Validate that all task requirements are met

**Quality Assurance:**
- Run integration tests if available in project
- Verify code style consistency across all changes
- Check for proper error handling and edge cases
- Ensure documentation is updated appropriately

**Final Status Updates:**
- Mark completed tasks as "completed" in source system
- Update overall project/specification progress
- Generate completion summary with metrics

   **Phase 6: Reporting and Cleanup**

**Completion Summary:**
```
🚀 Parallel Task Execution Complete

📊 Execution Summary:
  - Tasks Processed: {completed}/{total}
  - Agents Deployed: {agent_count}
  - Execution Time: {duration}
  - Time Savings: ~{percentage}%

🎯 Agent Performance:
  ✅ {agent_name}: {task_count} tasks completed successfully
  [... for each agent deployed ...]

📈 Project Progress:
  - Specification: {spec_name}
  - Progress: {completed_tasks}/{total_tasks} ({percentage}%)
  - Status: {overall_status}

⏱️  Performance Metrics:
  - Average task completion: {avg_time}
  - Parallel efficiency: {efficiency}%
  - Resource utilization: {resource_usage}

✅ Integration Validation:
  - Build Status: {build_status}
  - Test Results: {test_results}
  - Conflicts Resolved: {conflict_count}

💡 Recommendations:
  {recommendations_for_future_runs}
```

### 4. **Error Handling and Recovery**
   **Common Error Scenarios**

**System Connectivity Issues:**
```
Error: Cannot connect to spec-workflow MCP server
Action: 1. Check MCP server status, 2. Verify configuration, 3. Try alternative system
```

**Resource Exhaustion:**
```  
Error: System resources insufficient for requested agent count
Action: 1. Reduce --max-agents, 2. Close other applications, 3. Use --resource-limit low
```

**Task Conflicts:**
```
Error: Multiple agents assigned to conflicting tasks
Action: 1. Pause agents, 2. Resolve conflicts manually, 3. Resume with updated assignments
```

**Agent Failure:**
```
Error: Agent failed to complete assigned task
Action: 1. Review agent logs, 2. Reassign task manually, 3. Continue with remaining agents
```

   **Recovery Procedures**

**Partial Completion Recovery:**
1. Assess which tasks were completed successfully
2. Identify failed or incomplete tasks
3. Offer to retry failed tasks individually
4. Update task statuses accurately in source system

**Conflict Resolution:**
1. Create backup of current state
2. Identify specific conflicting changes
3. Present resolution options to user
4. Apply chosen resolution strategy
5. Validate resolution and continue

### 5. **Advanced Configuration**
   **Dry Run Mode**
When `--dry-run` is specified:
1. Perform full task discovery and analysis
2. Show proposed agent assignments
3. Display expected execution plan
4. Estimate time savings and resource usage
5. Exit without deploying any agents

   **Custom Agent Selection**
When specific agents are requested:
1. Validate agent availability and capabilities
2. Match requested agents to available tasks
3. Warn if agent-task mismatch detected
4. Proceed with user-specified assignments

   **Resource Management**
Based on `--resource-limit` setting:
- **Low**: Max 2 agents, minimal system impact, extended timeouts
- **Medium**: Max 4 agents, balanced performance, standard timeouts  
- **High**: Max 8 agents, maximum performance, aggressive timeouts

### 6. **Important Notes and Best Practices**

- **Always validate** task assignments before agent deployment
- **Monitor system resources** during parallel execution
- **Handle failures gracefully** with clear recovery options
- **Maintain coordination** between all agents and source systems
- **Validate integration** after parallel work completion
- **Provide clear reporting** on outcomes and recommendations

$ARGUMENTS
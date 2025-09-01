---
allowed-tools: TodoWrite, mcp__spec-workflow__spec-list, mcp__spec-workflow__manage-tasks, mcp__spec-workflow__spec-status
---

# Parallel Tasks Help

Display comprehensive help documentation for the `/parallel-tasks` command including usage examples, options, agent types, and best practices for deploying specialized agents to work on multiple tasks simultaneously.

## Instructions

### 1. **Display Command Synopsis**
   - Show the basic command structure and purpose
   - Explain that this reduces development time by 60-80% through intelligent agent coordination
   - Present the command synopsis in a clear format

### 2. **Present Core Options and Arguments**
   - Display all available command-line options with descriptions
   - Show default values and acceptable ranges where applicable
   - Provide quick start examples for common usage patterns

### 3. **Show Specialized Agent Types**
   - List all available agent types categorized by function
   - Include brief descriptions of each agent's capabilities
   - Show which agents work best for different types of tasks

### 4. **Explain Task Management Systems**
   - Document supported task management integrations
   - Provide configuration examples for each system
   - Show when to use each system type

### 5. **Display Workflow Information**
   - Show the six-phase execution workflow
   - Explain safety and coordination features
   - Present performance expectations and success rates

### 6. **Provide Troubleshooting Guide**
   - List common issues and their solutions
   - Show exit codes and their meanings
   - Include debugging and logging information

### 7. **Present Usage Examples**
   - Show scenario-based examples with actual commands
   - Include best practices and recommendations
   - Provide file and configuration references

**Complete Help Documentation to Display:**

**Command Synopsis**
```
/parallel-tasks [OPTIONS]

Deploy specialized AI agents to work on multiple tasks simultaneously while 
maintaining coordination and task tracking.
```

**Core Options**
- `--system <TYPE>` - Task management system (spec-workflow, github, linear, manual)
- `--project-path <PATH>` - Absolute path to project root (default: current directory)  
- `--spec-name <NAME>` - Specification name (required for spec-workflow)
- `--auto-assign` - Automatically assign tasks to best-fit agents
- `--max-agents <NUMBER>` - Maximum parallel agents (default: 4, range: 1-8)
- `--dry-run` - Preview task assignments without execution
- `--help` - Display this help message

**Quick Start Examples**
```bash
# Most common usage
/parallel-tasks --system spec-workflow --spec-name my-feature --auto-assign

# Preview mode
/parallel-tasks --system spec-workflow --spec-name my-feature --dry-run

# GitHub integration  
/parallel-tasks --system github --project-path $(pwd) --auto-assign

# Limited parallelism
/parallel-tasks --max-agents 2 --auto-assign
```

**Specialized Agent Types**

**Development Agents:**
- `typescript-pro` - TypeScript development and refactoring
- `react-pro` - React component development  
- `python-pro` - Python backend development
- `golang-pro` - Go service development

**Testing Agents:**
- `test-automator` - Comprehensive test suite creation
- `qa-expert` - Quality assurance and validation
- `playwright-test-architect` - End-to-end testing

**Infrastructure Agents:**
- `deployment-engineer` - CI/CD pipelines and deployment scripts
- `performance-engineer` - Performance optimization and benchmarking
- `security-auditor` - Security analysis and hardening

**Documentation Agents:**
- `documentation-expert` - Technical documentation creation
- `api-documenter` - API documentation and examples

**Task Management Systems**

**Spec-Workflow (Primary):**
- Integrates with spec-workflow MCP server
- Automatic task discovery and status tracking
- Best for: Feature development, migration projects

**GitHub Issues:**
- Works with repository issues via gh CLI
- Label filtering and milestone tracking  
- Best for: Open source projects, bug triage

**Linear:**
- Integrates with Linear workspace
- Team filtering and priority-based assignment
- Best for: Product development, sprint planning

**Manual:**
- Interactive or file-based task management
- Best for: Ad-hoc tasks, custom workflows

**Workflow Phases**

1. **Discovery** - Connect to task system, retrieve pending tasks
2. **Analysis** - Group tasks by type, identify conflicts
3. **Deployment** - Launch specialized agents with assignments
4. **Coordination** - Monitor progress, handle dependencies
5. **Integration** - Validate changes, resolve conflicts

**Safety & Coordination**

**Conflict Prevention:**
- File modification tracking prevents conflicts
- Resource locking ensures exclusive access
- Dependency analysis maintains execution order
- Build validation ensures integration integrity

**Quality Assurance:**
- Pre-execution dependency validation
- During-execution conflict monitoring  
- Post-execution integration testing
- Automated rollback on critical failures

**Performance Expectations**

**Time Savings:**
- 2-3 parallel agents: 40-60% time reduction
- 4-6 parallel agents: 60-80% time reduction  
- Complex workflows: Up to 85% time reduction

**Success Rates:**
- Well-structured tasks: 95%+ success rate
- Complex integrations: 85-90% success rate
- Ad-hoc workflows: 75-85% success rate

**Troubleshooting Common Issues**

**Build Conflicts:**
```
Symptom: "Build failed due to conflicting changes"
Solution: Use --conflict-resolution merge or reduce --max-agents
```

**Resource Exhaustion:**
```
Symptom: "System running slow during execution"  
Solution: Reduce --max-agents or use --resource-limit low
```

**Task Dependencies:**
```
Symptom: "Task B failed because Task A not completed"
Solution: Review dependencies, may need sequential execution
```

**Best Practices**

✅ **Start with `--dry-run`** to preview assignments  
✅ **Begin with 2-3 agents** for new projects  
✅ **Use `--auto-assign`** for standard workflows  
✅ **Monitor system resources** during execution  
✅ **Validate results** with integration tests  

❌ **Avoid** for sequential dependency chains  
❌ **Avoid** for shared critical files  
❌ **Avoid** for single complex tasks that can't be subdivided  

**Usage by Scenario**

**Feature Development:**
```bash
/parallel-tasks --system spec-workflow --spec-name user-auth --auto-assign
```
*Deploys implementation, testing, and documentation agents*

**Bug Fix Sprint:**
```bash  
/parallel-tasks --system github --include-tasks "bug" --max-agents 4 --auto-assign
```
*Parallel bug fixing across different components*

**Release Preparation:**
```bash
/parallel-tasks --system manual --auto-assign
```
*Coordinates deployment scripts, performance validation, release notes*

**Exit Codes**
- `0` - Success: All tasks completed successfully
- `1` - Partial Success: Some tasks completed, others failed  
- `2` - Configuration Error: Invalid options or missing requirements
- `3` - System Error: Infrastructure or connectivity issues
- `4` - Conflict Error: Unresolvable conflicts detected
- `5` - Resource Error: Insufficient system resources

**Files and Configuration**
- Configuration: `~/.claude-code/parallel-tasks.config`
- Logs: `~/.claude-code/logs/parallel-tasks/`
- Temporary: `/tmp/claude-code-parallel-*/`

---

**For detailed implementation examples and advanced configuration, see:**
- `claude-code-parallel-tasks.md` - Complete system documentation  
- `parallel-tasks-command.md` - Implementation templates and examples

**Quick start:** `/parallel-tasks --system spec-workflow --auto-assign`
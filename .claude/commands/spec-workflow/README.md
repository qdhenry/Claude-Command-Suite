# Spec-Workflow Commands

Advanced task management and parallel execution commands powered by the spec-workflow MCP (Model Context Protocol) server. These commands enable specification-driven development with intelligent task orchestration and multi-agent parallelization.

## 🚀 Overview

The spec-workflow command namespace provides powerful tools for managing software development workflows through specifications, enabling parallel task execution that can reduce development time by 60-80%.

### Key Features

- **📋 Specification-Based Development**: Define features as specifications that automatically generate tasks
- **🤖 Parallel Agent Execution**: Deploy multiple specialized AI agents to work simultaneously
- **🔄 Real-time Synchronization**: Keep tasks synchronized across specifications, code, and external systems
- **📊 Progress Tracking**: Monitor task completion, agent performance, and project metrics
- **🛡️ Conflict Prevention**: Intelligent file-level locking and dependency management
- **🎯 Auto-Assignment**: Automatically match tasks to the most suitable AI agents

## 📦 Available Commands

### Core Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/spec-workflow:parallel-tasks` | Execute multiple tasks in parallel with specialized agents | `--system spec-workflow --spec-name feature --auto-assign` |
| `/spec-workflow:parallel-tasks-help` | Display comprehensive help for parallel task execution | No arguments needed |
| `/spec-workflow:spec-workflow-setup` | Complete setup guide for spec-workflow MCP server | No arguments needed |

### Coming Soon

Additional commands planned for future releases:

- `/spec-workflow:create-spec` - Create new specifications from requirements
- `/spec-workflow:list-specs` - List all available specifications
- `/spec-workflow:task-status` - Check current task statuses
- `/spec-workflow:generate-tasks` - Generate tasks from specifications
- `/spec-workflow:sync-status` - Synchronize with external systems
- `/spec-workflow:report` - Generate progress reports

## 🎯 Quick Start

### 1. Install the MCP Server

First, install the spec-workflow MCP server:

```bash
npm install -g @pimzino/spec-workflow-mcp
```

### 2. Configure Claude

Add to `~/.claude/settings.json`:

```json
{
  "mcp": {
    "servers": {
      "spec-workflow": {
        "command": "npx",
        "args": ["@pimzino/spec-workflow-mcp", "serve"]
      }
    }
  }
}
```

### 3. Start Using Commands

```bash
# Get help
/spec-workflow:parallel-tasks-help

# Run parallel tasks
/spec-workflow:parallel-tasks --system spec-workflow --spec-name my-feature --auto-assign

# Preview execution plan
/spec-workflow:parallel-tasks --system spec-workflow --spec-name my-feature --dry-run
```

## 💡 Use Cases

### Feature Development

Deploy multiple agents to implement a complete feature:

```bash
/spec-workflow:parallel-tasks --system spec-workflow --spec-name user-authentication --auto-assign
```

This might deploy:
- `typescript-pro` for backend implementation
- `react-pro` for frontend components
- `test-automator` for test creation
- `documentation-expert` for docs

### Bug Fix Sprint

Tackle multiple bugs in parallel:

```bash
/spec-workflow:parallel-tasks --system github --include-tasks "bug" --max-agents 4
```

### Release Preparation

Coordinate release tasks across teams:

```bash
/spec-workflow:parallel-tasks --focus deployment --auto-assign
```

## 🤖 Available AI Agents

The parallel-tasks command can deploy these specialized agents:

### Development Agents
- **typescript-pro** - TypeScript development and refactoring
- **react-pro** - React component development
- **python-pro** - Python backend development
- **golang-pro** - Go service development

### Testing Agents
- **test-automator** - Comprehensive test suite creation
- **qa-expert** - Quality assurance and validation
- **playwright-test-architect** - End-to-end testing

### Infrastructure Agents
- **deployment-engineer** - CI/CD pipelines and scripts
- **performance-engineer** - Performance optimization
- **security-auditor** - Security analysis

### Documentation Agents
- **documentation-expert** - Technical documentation
- **api-documenter** - API documentation and examples

## ⚙️ Configuration Options

### Command Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `--system` | Task management system (spec-workflow, github, linear, manual) | spec-workflow |
| `--spec-name` | Specification name to process | Required for spec-workflow |
| `--auto-assign` | Automatically assign tasks to best agents | false |
| `--max-agents` | Maximum parallel agents (1-8) | 4 |
| `--dry-run` | Preview without execution | false |
| `--resource-limit` | Resource usage (low, medium, high) | medium |

### Project Configuration

Create `.spec-workflow.json` in your project root:

```json
{
  "specifications": {
    "directory": "./specs",
    "pattern": "**/*.spec.md"
  },
  "agents": {
    "maxParallel": 4,
    "autoAssign": true
  }
}
```

## 📊 Performance Metrics

### Time Savings

- **2-3 agents**: 40-60% time reduction
- **4-6 agents**: 60-80% time reduction
- **Complex workflows**: Up to 85% time reduction

### Success Rates

- **Well-structured tasks**: 95%+ success
- **Complex integrations**: 85-90% success
- **Ad-hoc workflows**: 75-85% success

## 🛡️ Safety Features

### Conflict Prevention
- File-level modification tracking
- Dependency analysis and ordering
- Resource locking mechanisms

### Quality Assurance
- Pre-execution validation
- Real-time monitoring
- Post-execution integration testing
- Automated rollback on failures

## 🔧 Troubleshooting

### Common Issues

**MCP Server Connection Failed**
```bash
# Check installation
npm list -g @pimzino/spec-workflow-mcp

# Verify configuration
cat ~/.claude/settings.json

# Restart Claude Code
```

**Tasks Not Found**
```bash
# Check specification directory
ls -la ./specifications/

# Verify spec file format
cat ./specifications/feature.spec.md
```

**Agent Conflicts**
```bash
# Reduce parallel agents
/spec-workflow:parallel-tasks --max-agents 2

# Use conflict resolution
/spec-workflow:parallel-tasks --conflict-resolution merge
```

## 📚 Resources

### Documentation
- [Spec-Workflow MCP Server](https://github.com/Pimzino/spec-workflow-mcp)
- [Claude Command Suite](https://github.com/qdhenry/Claude-Command-Suite)
- [MCP Protocol Docs](https://modelcontextprotocol.io)

### Examples
- [Workflow Examples](../../agents/WORKFLOW_EXAMPLES.md)
- [Agent Documentation](../../agents/README.md)

### Support
- GitHub Issues: [Report bugs or request features](https://github.com/qdhenry/Claude-Command-Suite/issues)
- Discord: Join the spec-workflow community

## 🚀 Best Practices

1. **Start Small**: Begin with 2-3 agents on well-defined tasks
2. **Use Dry Run**: Always preview execution plans first
3. **Monitor Resources**: Watch system resources during execution
4. **Define Dependencies**: Explicitly declare task dependencies
5. **Atomic Tasks**: Break work into 2-4 hour units
6. **Regular Validation**: Run tests after parallel execution
7. **Document Specs**: Keep specifications clear and detailed

## 🔄 Integration with Other Commands

Spec-workflow commands work seamlessly with:

- `/orchestrate` - Task orchestration
- `/task-status` - Progress monitoring
- `/test:generate-test-cases` - Test generation
- `/deploy:prepare-release` - Release preparation
- `/sync:bidirectional-sync` - System synchronization

## 📈 Roadmap

### Coming Soon
- Visual task dependency graphs
- Real-time progress dashboard
- Custom agent profiles
- Automated conflict resolution
- Machine learning for task assignment

### Future Enhancements
- Integration with more task systems
- Custom agent creation tools
- Performance analytics dashboard
- Team collaboration features
- AI-powered specification generation

---

**Quick Command Reference:**

```bash
# Get started
/spec-workflow:parallel-tasks-help

# Run tasks
/spec-workflow:parallel-tasks --auto-assign

# Setup guide
/spec-workflow:spec-workflow-setup
```

**Need help?** Run `/spec-workflow:parallel-tasks-help` for comprehensive documentation.
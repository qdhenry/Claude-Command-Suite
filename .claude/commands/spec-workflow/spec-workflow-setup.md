---
allowed-tools: Bash, Read, Write, Edit, TodoWrite, WebFetch
---

# Spec-Workflow MCP Server Setup

Complete installation and configuration guide for integrating the spec-workflow MCP (Model Context Protocol) server with Claude Code to enable advanced task management and parallel execution capabilities.

## Overview

The spec-workflow MCP server enables Claude to:
- Connect to your project's specification-based workflow system
- Manage tasks with full CRUD operations
- Track task status and dependencies
- Enable parallel task execution with multiple AI agents
- Maintain synchronization between specifications and implementation

## Instructions

This command provides a comprehensive setup guide for the spec-workflow MCP server. When executed, follow these steps in order:

1. Check prerequisites (Node.js 18+, npm, Claude Code)
2. Choose an installation method (NPM, GitHub, or Claude Command Suite)
3. Configure the MCP server (using .mcp.json or global settings)
4. Create project-specific configuration files
5. Verify the installation
6. Test the connection with spec-workflow commands

The guide below provides detailed instructions for each step.

## Prerequisites

Before installation, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- Claude Code with MCP support enabled
- Git for cloning repositories

## Installation Methods

### Method 1: Direct Installation from NPM (Recommended)

```bash
# Install globally
npm install -g @pimzino/spec-workflow-mcp

# Or install locally in your project
npm install --save-dev @pimzino/spec-workflow-mcp
```

### Method 2: Install from GitHub Repository

```bash
# Clone the repository
git clone https://github.com/Pimzino/spec-workflow-mcp.git

# Navigate to the directory
cd spec-workflow-mcp

# Install dependencies
npm install

# Build the server
npm run build

# Link globally for use
npm link
```

### Method 3: Install from Claude Command Suite

```bash
# Navigate to Claude Command Suite directory
cd Claude-Command-Suite

# Run the spec-workflow installer
./scripts/install-spec-workflow-mcp.sh
```

## Configuration

### Step 1: Configure MCP Server (Choose One Method)

### Method A: Project-Level Configuration (Recommended)

Create a `.mcp.json` file in your project root. This is the simplest and most portable method:

**Location:** `.mcp.json` (in project root)

```json
{
  "mcpServers": {
    "spec-workflow": {
      "command": "npx",
      "args": ["-y", "@pimzino/spec-workflow-mcp@latest", ".", "--AutoStartDashboard"],
      "env": {}
    }
  }
}
```

**Quick Setup:**
```bash
# Run this command in your project root
./scripts/add-spec-workflow-mcp.sh

# Or manually create the file
cat > .mcp.json << 'EOF'
{
  "mcpServers": {
    "spec-workflow": {
      "command": "npx",
      "args": ["-y", "@pimzino/spec-workflow-mcp@latest", ".", "--AutoStartDashboard"],
      "env": {}
    }
  }
}
EOF
```

**Benefits of .mcp.json:**
- Project-specific configuration
- Automatically loaded when Claude Code opens the project
- Can be committed to version control for team consistency
- No global configuration needed

### Method B: Global Claude Configuration

Add the spec-workflow server to your global Claude configuration file:

**Location:** `~/.claude/settings.json`

```json
{
  "mcp": {
    "servers": {
      "spec-workflow": {
        "command": "npx",
        "args": ["-y", "@pimzino/spec-workflow-mcp@latest"],
        "env": {
          "SPEC_WORKFLOW_PROJECT_PATH": "${PROJECT_PATH}",
          "SPEC_WORKFLOW_AUTO_SYNC": "true",
          "SPEC_WORKFLOW_LOG_LEVEL": "info"
        }
      }
    }
  }
}
```

### Step 2: Project-Specific Configuration

Create a `.spec-workflow.json` file in your project root:

```json
{
  "version": "1.0.0",
  "project": {
    "name": "My Project",
    "description": "Project using spec-workflow for task management"
  },
  "specifications": {
    "directory": "./specifications",
    "pattern": "**/*.spec.md",
    "autoDiscovery": true
  },
  "tasks": {
    "directory": "./tasks",
    "statuses": ["todo", "in_progress", "review", "qa", "completed", "blocked"],
    "defaultStatus": "todo",
    "trackDependencies": true
  },
  "agents": {
    "maxParallel": 4,
    "autoAssign": true,
    "conflictResolution": "abort"
  },
  "sync": {
    "github": {
      "enabled": false,
      "repository": "owner/repo",
      "labelMapping": {
        "todo": "task:todo",
        "in_progress": "task:in-progress",
        "completed": "task:done"
      }
    },
    "linear": {
      "enabled": false,
      "teamId": "TEAM_ID",
      "projectId": "PROJECT_ID"
    }
  }
}
```

### Step 3: Environment Variables

Set up environment variables for the MCP server:

```bash
# Add to ~/.bashrc, ~/.zshrc, or equivalent
export SPEC_WORKFLOW_PROJECT_PATH="$HOME/projects"
export SPEC_WORKFLOW_AUTO_SYNC="true"
export SPEC_WORKFLOW_LOG_LEVEL="info"
export SPEC_WORKFLOW_CACHE_DIR="$HOME/.cache/spec-workflow"
```

## Verification

### Test MCP Server Connection

After configuration, verify the connection:

```bash
# Start Claude Code
claude code

# In Claude, test the connection
/spec-workflow:test-connection
```

Expected output:
```
✅ Spec-Workflow MCP Server Connected
Version: 1.0.0
Project: My Project
Specifications Found: 5
Tasks Available: 23
Status: Ready
```

### List Available Specifications

```bash
# In Claude Code
/spec-workflow:list-specs
```

### Check Task Status

```bash
# In Claude Code
/spec-workflow:task-status
```

## Usage Examples

### Basic Task Management

```bash
# List all tasks in a specification
/spec-workflow:list-tasks --spec-name user-authentication

# Create a new task
/spec-workflow:create-task --spec-name payment-integration --description "Implement Stripe webhook handling"

# Update task status
/spec-workflow:update-task --task-id TASK-001 --status in_progress

# Assign task to agent
/spec-workflow:assign-task --task-id TASK-001 --agent typescript-pro
```

### Parallel Task Execution

```bash
# Execute tasks in parallel with auto-assignment
/spec-workflow:parallel-tasks --spec-name feature-xyz --auto-assign

# Dry run to preview execution plan
/spec-workflow:parallel-tasks --spec-name feature-xyz --dry-run

# Limited parallelism with specific agents
/spec-workflow:parallel-tasks --max-agents 2 --agents typescript-pro,test-automator
```

## Troubleshooting

### Common Issues and Solutions

### 1. MCP Server Not Connecting

**Error:** "Cannot connect to spec-workflow MCP server"

**Solutions:**
- Verify server is installed: `npm list -g @pimzino/spec-workflow-mcp`
- Check Claude settings.json syntax
- Ensure environment variables are set
- Restart Claude Code after configuration changes

### 2. Specifications Not Found

**Error:** "No specifications found in project"

**Solutions:**
- Check `.spec-workflow.json` configuration
- Verify specification directory exists
- Ensure file patterns match your spec files
- Run `find . -name "*.spec.md"` to locate spec files

### 3. Permission Denied

**Error:** "Permission denied when accessing task files"

**Solutions:**
- Check file permissions: `ls -la tasks/`
- Ensure Claude has read/write access
- Run with appropriate user permissions

### 4. Sync Issues

**Error:** "Failed to sync with GitHub/Linear"

**Solutions:**
- Verify API tokens are configured
- Check network connectivity
- Validate repository/project IDs
- Review sync configuration in `.spec-workflow.json`

### Debug Mode

Enable debug logging for troubleshooting:

```bash
# Set debug environment variable
export SPEC_WORKFLOW_LOG_LEVEL="debug"

# Or in Claude settings.json
"env": {
  "SPEC_WORKFLOW_LOG_LEVEL": "debug",
  "SPEC_WORKFLOW_DEBUG": "true"
}
```

### Log Files

Check logs for detailed error information:

```bash
# Default log location
tail -f ~/.claude-code/logs/spec-workflow.log

# Custom log location (if configured)
tail -f $SPEC_WORKFLOW_LOG_DIR/spec-workflow.log
```

## Advanced Configuration

### Custom Task Statuses

Define project-specific task statuses:

```json
{
  "tasks": {
    "statuses": [
      "backlog",
      "ready",
      "in_development",
      "code_review",
      "testing",
      "staging",
      "deployed",
      "archived"
    ]
  }
}
```

### Agent Configuration

Customize agent behavior:

```json
{
  "agents": {
    "profiles": {
      "development": {
        "agents": ["typescript-pro", "react-pro", "python-pro"],
        "maxParallel": 3
      },
      "testing": {
        "agents": ["test-automator", "qa-expert"],
        "maxParallel": 2
      },
      "deployment": {
        "agents": ["deployment-engineer"],
        "maxParallel": 1
      }
    }
  }
}
```

### Webhook Integration

Configure webhooks for external notifications:

```json
{
  "webhooks": {
    "enabled": true,
    "endpoints": {
      "taskCreated": "https://api.example.com/webhooks/task-created",
      "taskCompleted": "https://api.example.com/webhooks/task-completed",
      "specificationUpdated": "https://api.example.com/webhooks/spec-updated"
    },
    "headers": {
      "Authorization": "Bearer ${WEBHOOK_TOKEN}"
    }
  }
}
```

## Integration with Claude Command Suite

The spec-workflow MCP server integrates seamlessly with Claude Command Suite commands:

### Compatible Commands

- `/orchestrate` - Task orchestration with spec-workflow backend
- `/task-status` - Check spec-workflow task progress
- `/task-move` - Update task status in specifications
- `/team:sprint-planning` - Plan sprints using specifications
- `/sync:bidirectional-sync` - Sync between spec-workflow and other systems

### Workflow Examples

**Feature Development Workflow:**
```bash
1. /spec-workflow:create-spec --name user-dashboard
2. /spec-workflow:generate-tasks --spec-name user-dashboard
3. /spec-workflow:parallel-tasks --spec-name user-dashboard --auto-assign
4. /test:generate-test-cases --from-spec user-dashboard
5. /deploy:prepare-release --include-spec user-dashboard
```

**Migration Workflow:**
```bash
1. /spec-workflow:import-from-github --milestone v2.0
2. /spec-workflow:analyze-dependencies
3. /spec-workflow:create-migration-plan
4. /spec-workflow:parallel-tasks --system spec-workflow --focus migration
```

## Best Practices

1. **Specification Structure:** Keep specifications atomic and focused
2. **Task Granularity:** Break down tasks to 2-4 hour units for optimal parallelization
3. **Dependency Management:** Explicitly declare task dependencies
4. **Status Updates:** Configure auto-sync for real-time status tracking
5. **Conflict Prevention:** Use file-level locking for parallel execution
6. **Regular Backups:** Enable automatic specification backups
7. **Version Control:** Track .spec-workflow.json in git

## Support and Resources

- **GitHub Repository:** https://github.com/Pimzino/spec-workflow-mcp
- **Documentation:** https://spec-workflow.dev/docs
- **Issues:** https://github.com/Pimzino/spec-workflow-mcp/issues
- **Discord Community:** https://discord.gg/spec-workflow
- **Claude Command Suite:** https://github.com/qdhenry/Claude-Command-Suite

## Next Steps

After successful setup:

1. Create your first specification: `/spec-workflow:create-spec`
2. Generate tasks from requirements: `/spec-workflow:generate-tasks`
3. Execute tasks in parallel: `/spec-workflow:parallel-tasks`
4. Monitor progress: `/spec-workflow:dashboard`
5. Generate reports: `/spec-workflow:report`

---

**Quick Start Command:**
```bash
/spec-workflow:parallel-tasks --auto-assign
```
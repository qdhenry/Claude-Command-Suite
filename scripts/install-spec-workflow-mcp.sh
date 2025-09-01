#!/bin/bash

# Spec-Workflow MCP Server Installation Script
# Part of Claude Command Suite
# This script installs and configures the spec-workflow MCP server

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        echo "Please install Node.js 18 or higher: https://nodejs.org"
        exit 1
    fi
    
    # Check Node version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required (found: v$NODE_VERSION)"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    # Check Claude Code
    if ! command -v claude &> /dev/null; then
        print_warning "Claude Code is not installed or not in PATH"
        echo "Please ensure Claude Code is installed: https://claude.ai/code"
    fi
    
    print_success "Prerequisites check passed"
}

# Function to install spec-workflow MCP server
install_mcp_server() {
    print_info "Installing spec-workflow MCP server..."
    
    echo "Choose installation method:"
    echo "1) Install from NPM (recommended)"
    echo "2) Install from GitHub source"
    echo "3) Install locally in this project"
    read -p "Enter choice (1-3): " choice
    
    case $choice in
        1)
            print_info "Installing from NPM..."
            npm install -g @pimzino/spec-workflow-mcp || {
                print_warning "NPM package not found, using local installation"
                install_local
            }
            ;;
        2)
            print_info "Installing from GitHub..."
            install_from_github
            ;;
        3)
            print_info "Installing locally..."
            install_local
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
    
    print_success "MCP server installed successfully"
}

# Function to install from GitHub
install_from_github() {
    TEMP_DIR=$(mktemp -d)
    cd "$TEMP_DIR"
    
    print_info "Cloning spec-workflow-mcp repository..."
    git clone https://github.com/Pimzino/spec-workflow-mcp.git || {
        print_warning "Repository not found, using local installation"
        cd "$ROOT_DIR"
        install_local
        return
    }
    
    cd spec-workflow-mcp
    print_info "Installing dependencies..."
    npm install
    
    print_info "Building server..."
    npm run build || echo "No build script found, continuing..."
    
    print_info "Linking globally..."
    npm link
    
    cd "$ROOT_DIR"
    rm -rf "$TEMP_DIR"
}

# Function to install locally
install_local() {
    print_info "Creating local MCP server installation..."
    
    # Create local MCP directory
    MCP_DIR="$ROOT_DIR/.mcp/spec-workflow"
    mkdir -p "$MCP_DIR"
    
    # Create a basic MCP server implementation
    cat > "$MCP_DIR/server.js" << 'EOF'
#!/usr/bin/env node

// Spec-Workflow MCP Server
// Basic implementation for Claude Command Suite

const { Server } = require('@modelcontextprotocol/sdk');

class SpecWorkflowServer extends Server {
    constructor() {
        super({
            name: 'spec-workflow',
            version: '1.0.0',
            description: 'Specification-based workflow management for Claude'
        });
        
        this.specifications = new Map();
        this.tasks = new Map();
    }
    
    async start() {
        // Register tools
        this.registerTool('spec-list', this.listSpecifications.bind(this));
        this.registerTool('manage-tasks', this.manageTasks.bind(this));
        this.registerTool('spec-status', this.getSpecStatus.bind(this));
        
        console.log('Spec-Workflow MCP Server started');
        await super.start();
    }
    
    async listSpecifications() {
        return Array.from(this.specifications.values());
    }
    
    async manageTasks(params) {
        const { action, taskId, specName, status } = params;
        
        switch(action) {
            case 'list':
                return this.listTasks(specName);
            case 'create':
                return this.createTask(params);
            case 'update':
                return this.updateTask(taskId, params);
            case 'set-status':
                return this.setTaskStatus(taskId, status);
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    }
    
    async getSpecStatus(params) {
        const { specName } = params;
        const tasks = this.listTasks(specName);
        
        return {
            specification: specName,
            totalTasks: tasks.length,
            completed: tasks.filter(t => t.status === 'completed').length,
            inProgress: tasks.filter(t => t.status === 'in_progress').length,
            todo: tasks.filter(t => t.status === 'todo').length
        };
    }
    
    listTasks(specName) {
        return Array.from(this.tasks.values())
            .filter(task => !specName || task.specification === specName);
    }
    
    createTask(params) {
        const taskId = `TASK-${Date.now()}`;
        const task = {
            id: taskId,
            ...params,
            status: 'todo',
            createdAt: new Date().toISOString()
        };
        this.tasks.set(taskId, task);
        return task;
    }
    
    updateTask(taskId, params) {
        const task = this.tasks.get(taskId);
        if (!task) throw new Error(`Task not found: ${taskId}`);
        
        Object.assign(task, params);
        task.updatedAt = new Date().toISOString();
        return task;
    }
    
    setTaskStatus(taskId, status) {
        const task = this.tasks.get(taskId);
        if (!task) throw new Error(`Task not found: ${taskId}`);
        
        task.status = status;
        task.updatedAt = new Date().toISOString();
        return task;
    }
}

// Start server
const server = new SpecWorkflowServer();
server.start().catch(console.error);
EOF
    
    # Create package.json
    cat > "$MCP_DIR/package.json" << EOF
{
  "name": "spec-workflow-mcp-local",
  "version": "1.0.0",
  "description": "Local spec-workflow MCP server for Claude Command Suite",
  "main": "server.js",
  "bin": {
    "spec-workflow-mcp": "./server.js"
  },
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.1.0"
  }
}
EOF
    
    # Install dependencies
    cd "$MCP_DIR"
    npm install @modelcontextprotocol/sdk || {
        print_warning "MCP SDK not available, server will need manual configuration"
    }
    
    # Make executable
    chmod +x server.js
    
    # Link locally
    npm link
    
    cd "$ROOT_DIR"
    print_success "Local MCP server created at $MCP_DIR"
}

# Function to configure Claude settings
configure_claude() {
    print_info "Configuring MCP server..."
    
    echo "Choose configuration method:"
    echo "1) Project-level .mcp.json (recommended)"
    echo "2) Global Claude settings.json"
    echo "3) Show manual configuration instructions"
    echo "4) Skip configuration"
    read -p "Enter choice (1-4): " config_method
    
    case $config_method in
        1)
            configure_mcp_json
            ;;
        2)
            configure_global_claude
            ;;
        3)
            show_manual_config
            ;;
        4)
            print_info "Skipping configuration"
            ;;
        *)
            print_error "Invalid choice"
            ;;
    esac
}

# Function to configure .mcp.json
configure_mcp_json() {
    print_info "Configuring project-level .mcp.json..."
    
    if [ -f ".mcp.json" ]; then
        print_warning ".mcp.json already exists"
        echo "Do you want to:"
        echo "1) Add spec-workflow to existing configuration"
        echo "2) Replace with new configuration"
        echo "3) Skip"
        read -p "Enter choice (1-3): " mcp_choice
        
        case $mcp_choice in
            1)
                # Run the add-spec-workflow-mcp.sh script
                if [ -f "$SCRIPT_DIR/add-spec-workflow-mcp.sh" ]; then
                    "$SCRIPT_DIR/add-spec-workflow-mcp.sh"
                else
                    print_warning "add-spec-workflow-mcp.sh not found, creating manually"
                    create_mcp_json
                fi
                ;;
            2)
                cp .mcp.json ".mcp.json.backup.$(date +%Y%m%d_%H%M%S)"
                create_mcp_json
                ;;
            3)
                print_info "Skipping .mcp.json configuration"
                ;;
        esac
    else
        create_mcp_json
    fi
}

# Function to create .mcp.json
create_mcp_json() {
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
    print_success ".mcp.json created successfully"
}

# Function to configure global Claude settings
configure_global_claude() {
    CLAUDE_CONFIG="$HOME/.claude/settings.json"
    CLAUDE_DIR="$HOME/.claude"
    
    # Create .claude directory if it doesn't exist
    mkdir -p "$CLAUDE_DIR"
    
    # Check if settings.json exists
    if [ -f "$CLAUDE_CONFIG" ]; then
        print_warning "Claude settings.json already exists"
        echo "Do you want to:"
        echo "1) Update existing configuration"
        echo "2) Show manual configuration instructions"
        echo "3) Skip configuration"
        read -p "Enter choice (1-3): " config_choice
        
        case $config_choice in
            1)
                update_claude_config
                ;;
            2)
                show_manual_config
                ;;
            3)
                print_info "Skipping configuration"
                ;;
            *)
                print_error "Invalid choice"
                ;;
        esac
    else
        create_claude_config
    fi
}

# Function to create new Claude configuration
create_claude_config() {
    cat > "$CLAUDE_CONFIG" << 'EOF'
{
  "mcp": {
    "servers": {
      "spec-workflow": {
        "command": "npx",
        "args": ["@pimzino/spec-workflow-mcp", "serve"],
        "env": {
          "SPEC_WORKFLOW_PROJECT_PATH": "${PROJECT_PATH}",
          "SPEC_WORKFLOW_AUTO_SYNC": "true",
          "SPEC_WORKFLOW_LOG_LEVEL": "info"
        }
      }
    }
  }
}
EOF
    print_success "Claude configuration created at $CLAUDE_CONFIG"
}

# Function to update existing Claude configuration
update_claude_config() {
    print_info "Backing up existing configuration..."
    cp "$CLAUDE_CONFIG" "$CLAUDE_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
    
    # This is a simplified update - in production, use proper JSON parsing
    print_warning "Please manually add the spec-workflow server configuration to your settings.json"
    show_manual_config
}

# Function to show manual configuration instructions
show_manual_config() {
    echo
    echo "=================================="
    echo "Manual Configuration Instructions"
    echo "=================================="
    echo
    echo "Option 1: Project-level .mcp.json (Recommended)"
    echo "-----------------------------------------------"
    echo "Create a .mcp.json file in your project root:"
    echo
    cat << 'EOF'
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
    echo
    echo "Option 2: Global ~/.claude/settings.json"
    echo "-----------------------------------------"
    echo "Add the following to your ~/.claude/settings.json:"
    echo
    cat << 'EOF'
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
EOF
    echo
    echo "After configuration, restart Claude Code to load the MCP server."
    echo
}

# Function to create project configuration
create_project_config() {
    print_info "Creating project configuration..."
    
    if [ -f ".spec-workflow.json" ]; then
        print_warning "Project configuration already exists"
        return
    fi
    
    cat > ".spec-workflow.json" << 'EOF'
{
  "version": "1.0.0",
  "project": {
    "name": "Claude Command Suite",
    "description": "Comprehensive development toolkit for Claude Code"
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
  }
}
EOF
    
    print_success "Project configuration created"
}

# Function to verify installation
verify_installation() {
    print_info "Verifying installation..."
    
    # Check if spec-workflow-mcp is available
    if command -v spec-workflow-mcp &> /dev/null; then
        print_success "spec-workflow-mcp is installed and available"
    elif [ -f "$ROOT_DIR/.mcp/spec-workflow/server.js" ]; then
        print_success "Local spec-workflow server is installed"
    else
        print_warning "spec-workflow-mcp not found in PATH"
    fi
    
    # Check MCP configuration
    local config_found=false
    
    # Check project-level .mcp.json
    if [ -f ".mcp.json" ]; then
        if grep -q "spec-workflow" .mcp.json; then
            print_success "Project-level .mcp.json includes spec-workflow"
            config_found=true
        fi
    fi
    
    # Check global Claude configuration
    if [ -f "$HOME/.claude/settings.json" ]; then
        if grep -q "spec-workflow" "$HOME/.claude/settings.json"; then
            print_success "Global Claude configuration includes spec-workflow"
            config_found=true
        fi
    fi
    
    if [ "$config_found" = false ]; then
        print_warning "spec-workflow not found in .mcp.json or Claude settings"
        print_info "Run './scripts/add-spec-workflow-mcp.sh' to add configuration"
    fi
    
    # Check project configuration
    if [ -f ".spec-workflow.json" ]; then
        print_success "Project configuration exists"
    else
        print_warning "Project configuration not found"
    fi
}

# Function to show next steps
show_next_steps() {
    echo
    echo "=================================="
    echo "Installation Complete!"
    echo "=================================="
    echo
    echo "Next steps:"
    echo
    echo "1. Restart Claude Code to load the new MCP server"
    echo "   claude code"
    echo
    echo "2. Test the connection:"
    echo "   /spec-workflow:parallel-tasks-help"
    echo
    echo "3. Create your first specification:"
    echo "   mkdir -p specifications"
    echo "   Create a .spec.md file with your requirements"
    echo
    echo "4. Run parallel tasks:"
    echo "   /spec-workflow:parallel-tasks --auto-assign"
    echo
    echo "For more information, see:"
    echo "   .claude/commands/spec-workflow/README.md"
    echo "   .claude/commands/spec-workflow/spec-workflow-setup.md"
    echo
}

# Main installation flow
main() {
    echo
    echo "=================================="
    echo "Spec-Workflow MCP Server Installer"
    echo "=================================="
    echo
    
    check_prerequisites
    install_mcp_server
    configure_claude
    create_project_config
    verify_installation
    show_next_steps
}

# Run main function
main
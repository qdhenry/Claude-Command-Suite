#!/bin/bash

# Add Spec-Workflow MCP Configuration Script
# Part of Claude Command Suite
# This script adds the spec-workflow MCP server configuration to your project

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to check if .mcp.json exists
check_existing_mcp() {
    if [ -f ".mcp.json" ]; then
        print_warning ".mcp.json already exists in this project"
        echo
        echo "Current content:"
        cat .mcp.json
        echo
        echo "Options:"
        echo "1) Add spec-workflow to existing configuration"
        echo "2) Replace with spec-workflow configuration"
        echo "3) Backup and create new"
        echo "4) Cancel"
        read -p "Choose option (1-4): " choice
        
        case $choice in
            1)
                add_to_existing
                ;;
            2)
                replace_existing
                ;;
            3)
                backup_and_create
                ;;
            4)
                print_info "Operation cancelled"
                exit 0
                ;;
            *)
                print_error "Invalid choice"
                exit 1
                ;;
        esac
    else
        create_new_mcp
    fi
}

# Function to create new .mcp.json
create_new_mcp() {
    print_info "Creating .mcp.json with spec-workflow configuration..."
    
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

# Function to add spec-workflow to existing .mcp.json
add_to_existing() {
    print_info "Adding spec-workflow to existing .mcp.json..."
    
    # Check if spec-workflow already exists
    if grep -q '"spec-workflow"' .mcp.json; then
        print_warning "spec-workflow is already configured in .mcp.json"
        exit 0
    fi
    
    # This is a simplified approach - for production, use proper JSON parsing
    # Create a temporary file with the merged configuration
    python3 -c "
import json
import sys

try:
    with open('.mcp.json', 'r') as f:
        config = json.load(f)
    
    if 'mcpServers' not in config:
        config['mcpServers'] = {}
    
    config['mcpServers']['spec-workflow'] = {
        'command': 'npx',
        'args': ['-y', '@pimzino/spec-workflow-mcp@latest', '.', '--AutoStartDashboard'],
        'env': {}
    }
    
    with open('.mcp.json', 'w') as f:
        json.dump(config, f, indent=2)
    
    print('Successfully added spec-workflow to .mcp.json')
except Exception as e:
    print(f'Error: {e}', file=sys.stderr)
    sys.exit(1)
" || {
    print_error "Failed to add spec-workflow to existing configuration"
    print_info "You may need to manually edit .mcp.json"
    exit 1
}
    
    print_success "spec-workflow added to existing .mcp.json"
}

# Function to replace existing .mcp.json
replace_existing() {
    print_info "Backing up existing .mcp.json..."
    cp .mcp.json ".mcp.json.backup.$(date +%Y%m%d_%H%M%S)"
    
    create_new_mcp
}

# Function to backup and create new
backup_and_create() {
    print_info "Backing up existing .mcp.json..."
    cp .mcp.json ".mcp.json.backup.$(date +%Y%m%d_%H%M%S)"
    print_success "Backup created"
    
    create_new_mcp
}

# Function to add dashboard configuration
configure_dashboard() {
    echo
    echo "Dashboard Configuration Options:"
    echo "1) Auto-start dashboard (recommended)"
    echo "2) Manual dashboard start"
    echo "3) No dashboard"
    read -p "Choose option (1-3) [1]: " dashboard_choice
    
    case ${dashboard_choice:-1} in
        1)
            # Default configuration already includes --AutoStartDashboard
            print_info "Dashboard will auto-start when MCP server runs"
            ;;
        2)
            # Remove --AutoStartDashboard from args
            if [ -f .mcp.json ]; then
                python3 -c "
import json
with open('.mcp.json', 'r') as f:
    config = json.load(f)
if 'spec-workflow' in config.get('mcpServers', {}):
    args = config['mcpServers']['spec-workflow']['args']
    if '--AutoStartDashboard' in args:
        args.remove('--AutoStartDashboard')
with open('.mcp.json', 'w') as f:
    json.dump(config, f, indent=2)
" || print_warning "Could not modify dashboard settings"
            fi
            print_info "Dashboard can be started manually"
            ;;
        3)
            # Remove dashboard flag and add --no-dashboard if supported
            if [ -f .mcp.json ]; then
                python3 -c "
import json
with open('.mcp.json', 'r') as f:
    config = json.load(f)
if 'spec-workflow' in config.get('mcpServers', {}):
    args = config['mcpServers']['spec-workflow']['args']
    if '--AutoStartDashboard' in args:
        args.remove('--AutoStartDashboard')
    args.append('--no-dashboard')
with open('.mcp.json', 'w') as f:
    json.dump(config, f, indent=2)
" || print_warning "Could not modify dashboard settings"
            fi
            print_info "Dashboard disabled"
            ;;
    esac
}

# Function to create spec-workflow configuration
create_spec_workflow_config() {
    if [ -f ".spec-workflow.json" ]; then
        print_info ".spec-workflow.json already exists, skipping creation"
        return
    fi
    
    echo
    read -p "Create .spec-workflow.json configuration file? (y/N): " create_config
    
    if [[ $create_config =~ ^[Yy]$ ]]; then
        print_info "Creating .spec-workflow.json..."
        
        cat > .spec-workflow.json << 'EOF'
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
  }
}
EOF
        
        print_success ".spec-workflow.json created"
        
        # Create directories if they don't exist
        mkdir -p specifications tasks
        print_info "Created specifications/ and tasks/ directories"
    fi
}

# Function to verify configuration
verify_configuration() {
    echo
    print_info "Verifying configuration..."
    
    if [ -f ".mcp.json" ]; then
        if grep -q '"spec-workflow"' .mcp.json; then
            print_success "spec-workflow is configured in .mcp.json"
        else
            print_error "spec-workflow not found in .mcp.json"
        fi
    else
        print_error ".mcp.json not found"
    fi
    
    if [ -f ".spec-workflow.json" ]; then
        print_success ".spec-workflow.json configuration found"
    else
        print_warning ".spec-workflow.json not found (optional)"
    fi
    
    # Check if Claude Code is running
    if pgrep -x "claude" > /dev/null; then
        print_warning "Claude Code is running. Please restart it to load the new MCP configuration"
    fi
}

# Function to show next steps
show_next_steps() {
    echo
    echo "=================================="
    echo "Configuration Complete!"
    echo "=================================="
    echo
    echo "Next steps:"
    echo
    echo "1. Restart Claude Code to load the MCP server:"
    echo "   claude code"
    echo
    echo "2. Test the connection with:"
    echo "   /spec-workflow:parallel-tasks-help"
    echo
    echo "3. Create your first specification in specifications/ directory:"
    echo "   echo '# Feature Specification' > specifications/my-feature.spec.md"
    echo
    echo "4. Run parallel tasks:"
    echo "   /spec-workflow:parallel-tasks --spec-name my-feature --auto-assign"
    echo
    echo "For more information:"
    echo "   /spec-workflow:spec-workflow-setup"
    echo
}

# Function to display help
show_help() {
    echo "Add Spec-Workflow MCP Configuration"
    echo
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Options:"
    echo "  --help, -h        Show this help message"
    echo "  --force           Overwrite existing .mcp.json without prompting"
    echo "  --no-config       Don't create .spec-workflow.json"
    echo "  --no-dashboard    Disable auto-start dashboard"
    echo
    echo "This script adds the spec-workflow MCP server configuration to your project"
    echo "by creating or updating the .mcp.json file in the current directory."
    echo
    echo "Examples:"
    echo "  $0                    # Interactive setup"
    echo "  $0 --force            # Overwrite existing configuration"
    echo "  $0 --no-dashboard     # Setup without auto-starting dashboard"
}

# Parse command line arguments
FORCE=false
NO_CONFIG=false
NO_DASHBOARD=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_help
            exit 0
            ;;
        --force)
            FORCE=true
            shift
            ;;
        --no-config)
            NO_CONFIG=true
            shift
            ;;
        --no-dashboard)
            NO_DASHBOARD=true
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Main execution
main() {
    echo
    echo "=================================="
    echo "Spec-Workflow MCP Configuration"
    echo "=================================="
    echo
    
    # Check if we're in a git repository (optional)
    if git rev-parse --git-dir > /dev/null 2>&1; then
        print_info "Git repository detected"
    else
        print_warning "Not in a git repository - .mcp.json won't be version controlled"
    fi
    
    # Handle .mcp.json
    if [ "$FORCE" = true ] && [ -f ".mcp.json" ]; then
        backup_and_create
    else
        check_existing_mcp
    fi
    
    # Configure dashboard unless --no-dashboard
    if [ "$NO_DASHBOARD" = false ]; then
        configure_dashboard
    else
        # Remove --AutoStartDashboard if --no-dashboard was specified
        if [ -f .mcp.json ]; then
            python3 -c "
import json
with open('.mcp.json', 'r') as f:
    config = json.load(f)
if 'spec-workflow' in config.get('mcpServers', {}):
    args = config['mcpServers']['spec-workflow']['args']
    if '--AutoStartDashboard' in args:
        args.remove('--AutoStartDashboard')
with open('.mcp.json', 'w') as f:
    json.dump(config, f, indent=2)
" 2>/dev/null || true
        fi
    fi
    
    # Create spec-workflow configuration unless --no-config
    if [ "$NO_CONFIG" = false ]; then
        create_spec_workflow_config
    fi
    
    # Verify and show next steps
    verify_configuration
    show_next_steps
}

# Run main function
main
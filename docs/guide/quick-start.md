# Quick Start Guide for Claude Command Suite

## Prerequisites

Before getting started with Claude Command Suite, ensure you have the following requirements:

- **Node.js**: Version 16.0 or later recommended
- **Claude Code CLI**: Version 1.0 or later
- **Git**: Version 2.30 or later

## Installation Options

### Option 1: Direct Project Installation (Recommended)

Add command files directly to your project's `.claude/commands/` folder:

```bash
# Create the commands directory in your project
mkdir -p .claude/commands

# Download specific commands you need
curl -o .claude/commands/dev/code-review.md https://raw.githubusercontent.com/qdhenry/Claude-Command-Suite/main/.claude/commands/dev/code-review.md

# Or copy your own custom command files
cp my-custom-command.md .claude/commands/
```

### Option 2: Install All Commands

Use the installation script to set up all commands at once:

```bash
# Clone the repository
git clone https://github.com/qdhenry/Claude-Command-Suite.git
cd Claude-Command-Suite

# Make the installer executable and run it
chmod +x install.sh
./install.sh
```

### Command Line Installation Options

The `install.sh` script offers multiple installation modes:

```bash
# Install to current project
./install.sh --project

# Install globally for all projects
./install.sh --global

# Create a development symlink
./install.sh --symlink

# List available commands
./install.sh --list
```

## First Command Execution

Start Claude Code and begin using commands immediately:

```bash
# Start Claude Code
claude code

# Example commands
/dev:code-review           # Review your entire codebase
/project:create-feature    # Build a new feature
/security:security-audit   # Check for security issues
```

## Common Workflows

### New Feature Development

```bash
# Assess current project state
/dev:code-review

# Implement a new feature
/project:create-feature user-dashboard

# Verify security
/security:security-audit
```

### Bug Fixing Workflow

```bash
# Fix a specific issue
/dev:fix-issue 456

# Verify fix quality
/dev:code-review
```

## Troubleshooting

### Commands Not Recognized

1. **Check Directory Structure**
   ```bash
   # Verify .claude/commands directory exists
   ls -la .claude/commands/
   ```

2. **Verify File Permissions**
   ```bash
   # Ensure command files are readable
   chmod 644 .claude/commands/*.md
   ```

3. **Restart Claude Code**
   - Sometimes, restarting Claude Code resolves detection issues

### Common Installation Issues

- **Incomplete Installation**: Ensure you've followed all steps in the installation guide
- **Version Incompatibility**: Check that you're using Claude Code version 1.0 or later
- **Permission Errors**: Run installation script with `sudo` if encountering permission issues

## Next Steps

- **[Installation Guide](/docs/INSTALLATION.md)**: Detailed installation methods
- **[Customization Guide](/docs/CUSTOMIZATION.md)**: How to modify and create commands
- **[Development Guide](/docs/DEVELOPMENT.md)**: Contributing and best practices

## Support

If you encounter persistent issues:
- Check the [README](README.md) for basic usage
- Verify your Claude Code version
- Review individual command files for specific requirements
- Consult Claude Code documentation for the latest updates

## Recommended Resources

- **Command Namespaces**: Explore available commands across various domains
- **AI Agents**: Discover specialized AI assistants for advanced tasks
- **Workflow Examples**: Learn how to chain commands for complex development scenarios

## Contributing

We welcome contributions! Help us improve the Claude Command Suite by:
- Sharing new commands
- Improving existing workflows
- Adding language-specific variants
- Fixing bugs and enhancing documentation
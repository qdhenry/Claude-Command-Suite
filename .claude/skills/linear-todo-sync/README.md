# Linear Todo Sync

A Claude Code skill that automatically fetches your assigned Linear tasks and generates a prioritized markdown todo list.

## Overview

Linear Todo Sync integrates Claude Code with Linear's project management platform, allowing you to instantly view and manage your work items without leaving your development environment. It queries the Linear GraphQL API, organizes tasks by priority, and creates a clean markdown file with checkboxes, metadata, and direct links to issues.

## Features

- Automatic task fetching from Linear API
- Priority-based organization (Urgent, High, Medium, Low, None)
- Rich metadata display (state, estimates, due dates, labels)
- Overdue task detection
- Markdown format with clickable links
- Support for task descriptions and attachments
- Comprehensive error handling
- Rate limit awareness

## Quick Start

### 1. Installation

#### Personal Use
```bash
# Already included in Claude Command Suite
# Skills are located at: .claude/skills/linear-todo-sync/
```

#### Standalone Installation
```bash
# Copy to your personal skills directory
mkdir -p ~/.claude/skills
cp -r linear-todo-sync ~/.claude/skills/
```

#### Project-Specific Use
```bash
# Copy to project skills directory
mkdir -p .claude/skills
cp -r linear-todo-sync .claude/skills/
git add .claude/skills/linear-todo-sync
git commit -m "Add Linear Todo Sync skill"
```

### 2. Install Dependencies

```bash
pip install requests python-dotenv mdutils
```

Or add to your `requirements.txt`:
```
requests>=2.31.0
python-dotenv>=1.0.0
mdutils>=1.6.0
```

### 3. Configure Linear API Key

Create a `.env` file in your project root:

```bash
# Get your API key
# 1. Visit https://linear.app/settings/api
# 2. Click "Create new key"
# 3. Copy the key (starts with lin_api_)

# Create .env file
echo "LINEAR_API_KEY=lin_api_your_key_here" > .env
chmod 600 .env  # Secure the file
```

**IMPORTANT**: Add `.env` to your `.gitignore` to prevent committing secrets:
```bash
echo ".env" >> .gitignore
```

### 4. Use the Skill

Simply ask Claude:
- "What do I need to work on?"
- "Show me my work"
- "Load my Linear tasks"
- "What's urgent today?"

Claude will automatically:
1. Fetch your assigned tasks from Linear
2. Generate a prioritized markdown file
3. Summarize your workload
4. Highlight urgent items and due dates

## Usage

### Automatic Triggers

The skill activates when you use phrases like:
- "What do I need to work on?"
- "Show me my work"
- "Load work"
- "Refresh my Linear tasks"
- "What tasks are assigned to me?"

### Manual Execution

Run the sync script directly:
```bash
python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
```

View the generated tasks:
```bash
cat linear_tasks.md
```

### Example Output

```markdown
# Linear Tasks

**Generated**: 2025-10-18 09:30:15
**Total Tasks**: 8

**Priority Breakdown**:
- Urgent: 2 tasks
- High: 3 tasks
- Medium: 2 tasks

## Urgent Priority

- [ ] **[ENG-123](https://linear.app/team/issue/ENG-123)** Fix login bug
  `In Progress` | Estimate: 5pts | **Due: 2025-10-18 (OVERDUE)** | Labels: `bug`, `security`
  *Users unable to login with SSO after latest deployment*
```

## Documentation

- **[SKILL.md](SKILL.md)** - Complete usage instructions and workflow guide
- **[reference.md](reference.md)** - Technical API reference and customization
- **[examples.md](examples.md)** - Comprehensive examples and troubleshooting
- **[.env.example](.env.example)** - Configuration template

## Common Use Cases

### Daily Standup Prep
```
User: "What should I discuss in standup?"
Claude: Syncs tasks, highlights in-progress work and blockers
```

### Sprint Planning
```
User: "What's on my plate this sprint?"
Claude: Shows all assigned tasks with story point estimates
```

### Priority Check
```
User: "What's urgent?"
Claude: Filters and displays only urgent/high priority tasks
```

### End of Day Review
```
User: "What's left for tomorrow?"
Claude: Shows uncompleted work and suggests priorities
```

## Advanced Features

### Query Customization
Modify filters in the script to show:
- Only urgent tasks
- Tasks due this week
- Specific team or project tasks
- Tasks with particular labels

See [reference.md](reference.md) for detailed examples.

### Performance Optimization
- **Pagination**: Handle workspaces with >50 tasks
- **Caching**: Reduce API calls with local caching
- **Quick Mode**: Fetch minimal fields for faster response
- **Rate Limiting**: Respect Linear's API limits (1000/hour)

See [reference.md](reference.md) for implementation details.

## Troubleshooting

### Skill Not Triggering
- Use explicit phrases: "Use the Linear Todo Sync skill"
- Check skill is in `.claude/skills/` directory
- Verify SKILL.md has correct frontmatter

### Authentication Errors
- Verify `LINEAR_API_KEY` in `.env` file
- Check key format (should start with `lin_api_`)
- Generate new key at https://linear.app/settings/api
- Ensure key hasn't been revoked

### Dependencies Missing
```bash
# Check what's missing
python -c "import requests, dotenv, mdutils" 2>&1

# Install all at once
pip install requests python-dotenv mdutils
```

### No Tasks Found
- This is normal if you have no assigned incomplete tasks
- Verify in Linear web app that tasks are assigned to you
- Check that tasks aren't in "Completed" or "Canceled" states

### Network Issues
- Check internet connection
- Verify Linear API status: https://status.linear.app
- Check for firewall/proxy blocking API access

## Requirements

**System Requirements**:
- Python 3.7 or higher
- Internet connection for API access
- Linear account with API access enabled

**Python Packages**:
- `requests` - HTTP library for API calls
- `python-dotenv` - Environment variable management
- `mdutils` - Markdown file generation

**Linear Requirements**:
- Active Linear workspace
- Personal API key
- Assigned tasks (to see results)

## Security

- Store API keys in `.env` files, never in code
- Add `.env` to `.gitignore`
- Use file permissions to secure `.env` (`chmod 600`)
- Rotate API keys periodically
- Revoke unused keys immediately
- Never commit or share API keys

## Performance

The skill is designed for efficiency:
- Average sync time: 1-3 seconds
- Handles up to 250 tasks without pagination
- Respects Linear's rate limits
- Generates compact markdown files
- Minimal memory footprint

For large workspaces (>50 tasks), see pagination documentation in [reference.md](reference.md).

## Contributing

This skill is part of the Claude Command Suite. To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## License

Part of the Claude Command Suite project.

## Support

- Documentation: See [SKILL.md](SKILL.md) for detailed instructions
- Examples: See [examples.md](examples.md) for usage scenarios
- API Reference: See [reference.md](reference.md) for customization
- Linear Docs: https://developers.linear.app/docs/graphql
- Issues: Report bugs in the Claude Command Suite repository

## Changelog

### Version 1.0.0
- Initial release
- GraphQL API integration
- Priority-based task organization
- Markdown generation with metadata
- Comprehensive error handling
- Support for due dates, labels, and attachments
- Production-ready documentation

## Roadmap

Potential future enhancements:
- Pagination support for large workspaces
- Caching for improved performance
- Quick mode flag for minimal field fetching
- Task completion tracking
- Time tracking integration
- Custom filter presets
- Interactive task selection
- Webhook support for real-time updates

## Credits

Created as part of the Claude Command Suite to enhance developer productivity by integrating Linear project management with Claude Code's intelligent assistant capabilities.

---
name: Linear Todo Sync
description: This skill fetches open tasks assigned to the user from the Linear API and generates a markdown todo list file in the project root. This skill should be used when the user asks about their work items, wants to see what they need to work on, or requests to load/sync their Linear tasks. Requires Python 3.7+, requests, mdutils, and python-dotenv packages. Requires LINEAR_API_KEY in .env file.
allowed-tools: Read, Write, Bash, Glob
license: MIT
---

# Linear Todo Sync

Automatically fetch assigned Linear tasks and generate a comprehensive markdown todo list in your project root. This skill queries the Linear GraphQL API to retrieve all open tasks assigned to you, organizing them by project with full details including status, priority, labels, estimates, and due dates.

## Setup

### 1. Install Required Packages

Install the Python dependencies:

```bash
pip install requests mdutils python-dotenv
```

Or using conda:

```bash
conda install requests python-dotenv
pip install mdutils
```

### 2. Obtain Linear API Key

1. Navigate to [Linear API Settings](https://linear.app/settings/api)
2. Click "Create new key" under Personal API Keys
3. Give it a descriptive name (e.g., "Claude Code Sync")
4. Copy the generated API key

### 3. Configure Environment

Create a `.env` file in your project root:

```bash
cp .claude/skills/linear-todo-sync/assets/.env.example .env
```

Edit `.env` and add your API key:

```
LINEAR_API_KEY=lin_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**: Ensure `.env` is in your `.gitignore` to protect your API key.

### 4. Verify Setup

Test the configuration by running:

```bash
python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
```

A markdown file named `linear-todos-YYYY-MM-DD.md` should appear in your project root.

## How It Works

When triggered, this skill:

1. **Loads credentials** from the `.env` file in your project root
2. **Queries Linear API** using GraphQL to fetch all assigned issues in non-completed states
3. **Retrieves task details** including title, description, status, priority, labels, estimates, due dates, project, and URL
4. **Groups tasks by project** for better organization
5. **Generates markdown file** with filename `linear-todos-YYYY-MM-DD.md` in the project root
6. **Outputs summary** showing total tasks and project count

The generated markdown file provides a comprehensive view of your work with all relevant task metadata, making it easy to review priorities and plan your day.

## Usage

Trigger this skill with phrases like:

- "What do I need to work on this morning"
- "Show me my work"
- "Load work"
- "Sync my Linear tasks"
- "Get my todo list from Linear"

The skill will execute the sync script and create a dated markdown file in your project root.

## Generated File Format

The markdown file follows this structure:

```markdown
# Linear Tasks - January 18, 2025

Generated: 2025-01-18 09:30:45
Total Tasks: 12

## Project Alpha

### Implement user authentication (High)
- **Status**: In Progress
- **Labels**: backend, security
- **Estimate**: 5 points
- **Due**: 2025-01-20
- **Link**: https://linear.app/team/issue/PROJ-123

Add JWT-based authentication to the API endpoints...

### Fix login bug (Urgent)
- **Status**: Todo
- **Labels**: bug, frontend
- **Estimate**: 2 points
- **Due**: 2025-01-19
- **Link**: https://linear.app/team/issue/PROJ-124

Users cannot log in when using Safari...

## Project Beta

...
```

## Customization

To modify the skill's behavior, edit `scripts/sync_linear_tasks.py`:

### Change GraphQL Query

Modify the `QUERY` variable to fetch additional fields:

```python
QUERY = """
query {
  viewer {
    assignedIssues(filter: { state: { type: { nin: ["completed", "canceled"] } } }) {
      nodes {
        id
        title
        description
        state { name }
        priority
        labels { nodes { name } }
        estimate
        dueDate
        project { name }
        url
        # Add more fields here
        createdAt
        updatedAt
        assignee { name }
      }
    }
  }
}
"""
```

### Adjust Task Filtering

Modify the filter in the GraphQL query to change which tasks are fetched:

```python
# Include completed tasks from the last week
filter: {
  state: { type: { nin: ["canceled"] } }
  completedAt: { gte: "2025-01-11" }
}
```

### Modify Output Format

Customize the markdown generation in the `generate_markdown()` function to change structure, add sections, or include different metadata.

### Change Output Location

Update the `output_path` variable in `main()`:

```python
# Save to a different directory
output_path = os.path.join(project_root, "docs", filename)
```

## Troubleshooting

### Error: "LINEAR_API_KEY not found in environment"

**Cause**: The `.env` file is missing or doesn't contain the API key.

**Solution**:
1. Verify `.env` exists in your project root (not in the skill directory)
2. Check that it contains: `LINEAR_API_KEY=lin_api_...`
3. Ensure no extra spaces around the `=` sign
4. Restart your terminal session if you just created the file

### Error: "Authentication failed: Invalid API key"

**Cause**: The API key is incorrect or expired.

**Solution**:
1. Go to [Linear API Settings](https://linear.app/settings/api)
2. Verify your API key is still active
3. Generate a new key if needed
4. Update `.env` with the correct key

### Error: "Network request failed"

**Cause**: Cannot connect to Linear API (network issue, timeout, or API downtime).

**Solution**:
1. Check your internet connection
2. Verify https://linear.app is accessible
3. Check [Linear Status](https://status.linear.app) for outages
4. Try again in a few moments

### Error: "Rate limit exceeded (429)"

**Cause**: Too many API requests in a short period.

**Solution**:
- Wait 60 seconds before retrying
- Avoid running the sync multiple times in quick succession
- Linear's rate limit is 2000 requests per hour per API key

### Warning: "No tasks found"

**Cause**: You have no assigned tasks in non-completed states.

**Solution**: This is informational only. The skill will still create a markdown file indicating zero tasks.

### Error: "Permission denied when writing file"

**Cause**: Insufficient file system permissions.

**Solution**:
1. Check you have write permissions in the project directory
2. Verify the directory exists and is accessible
3. Try running with appropriate permissions

### Script runs but no file appears

**Cause**: File created in unexpected location or script error.

**Solution**:
1. Check the script output for the exact file path
2. Look for error messages in the console
3. Run with verbose output: `python scripts/sync_linear_tasks.py --verbose`

## Security Best Practices

1. **Never commit `.env` file**: Always add `.env` to `.gitignore`
2. **Rotate API keys periodically**: Generate new keys every 90 days
3. **Use minimal permissions**: Linear API keys inherit your user permissions
4. **Keep packages updated**: Run `pip install --upgrade requests mdutils python-dotenv`
5. **Review generated files**: Check markdown files before sharing to ensure no sensitive data

## Advanced Usage

### Automated Daily Sync

Add to your shell profile (`.bashrc`, `.zshrc`) to sync on terminal startup:

```bash
# Auto-sync Linear tasks daily
if [ -f "/path/to/project/.env" ]; then
  python /path/to/project/.claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
fi
```

### Integration with Git Hooks

Create a post-checkout hook to sync after changing branches:

```bash
#!/bin/bash
# .git/hooks/post-checkout
python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
```

### CI/CD Integration

Use in continuous integration to track team tasks:

```yaml
# .github/workflows/sync-tasks.yml
- name: Sync Linear Tasks
  run: |
    pip install requests mdutils python-dotenv
    python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
  env:
    LINEAR_API_KEY: ${{ secrets.LINEAR_API_KEY }}
```

## Additional Resources

- [Linear GraphQL API Documentation](https://developers.linear.app/docs/graphql/working-with-the-graphql-api)
- [Linear API Reference](https://studio.apollographql.com/public/Linear-API/variant/current/home)
- [Python Requests Documentation](https://requests.readthedocs.io/)
- [MDUtils Documentation](https://github.com/didix21/mdutils)

For detailed API reference and advanced GraphQL queries, see the Linear API documentation.

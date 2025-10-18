# Linear Todo Sync - Technical Reference

## Linear GraphQL API Documentation

### API Endpoint

```
POST https://api.linear.app/graphql
```

### Authentication

All requests require a personal API key in the Authorization header:

```http
Authorization: lin_api_xxxxxxxxxxxxxxxxxxxxxxxx
Content-Type: application/json
```

**Getting Your API Key**:
1. Visit https://linear.app/settings/api
2. Click "Create new key"
3. Give it a descriptive name (e.g., "Claude Todo Sync")
4. Copy the generated key (starts with `lin_api_`)
5. Store securely in your `.env` file

**Key Security**:
- Never commit API keys to version control
- Use environment variables or .env files
- Rotate keys periodically
- Revoke unused keys immediately

### Rate Limiting

Linear API uses the following rate limits:

- **Standard**: 1000 requests per hour
- **Burst**: 100 requests per minute
- **Complexity**: Each query has a complexity score

**Rate Limit Headers**:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1634567890
```

**Best Practices**:
- Cache results when possible
- Batch queries to reduce request count
- Handle 429 (Too Many Requests) gracefully
- Implement exponential backoff on errors

## GraphQL Schema

### Issues Query

The core query used by this skill:

```graphql
query {
  issues(
    filter: {
      assignee: { isMe: { eq: true } }
      state: { type: { nin: ["completed", "canceled"] } }
    }
    orderBy: priority
  ) {
    nodes {
      id
      identifier
      title
      description
      priority
      estimate
      dueDate
      state {
        name
        type
      }
      labels {
        nodes {
          name
          color
        }
      }
      attachments {
        nodes {
          url
          title
        }
      }
      url
      createdAt
      updatedAt
    }
  }
}
```

### Field Descriptions

**Issue Fields**:

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID! | Unique issue identifier (UUID) |
| `identifier` | String! | Human-readable ID (e.g., "ENG-123") |
| `title` | String! | Issue title/summary |
| `description` | String | Full issue description (markdown) |
| `priority` | Int | Priority: 0=None, 1=Urgent, 2=High, 3=Medium, 4=Low |
| `estimate` | Int | Story point estimate |
| `dueDate` | DateTime | Due date in ISO 8601 format |
| `url` | String! | Web URL to view issue |
| `createdAt` | DateTime! | Creation timestamp |
| `updatedAt` | DateTime! | Last update timestamp |

**State Fields**:

| Field | Type | Description |
|-------|------|-------------|
| `name` | String! | State name (e.g., "In Progress", "Todo") |
| `type` | String! | State type: "backlog", "unstarted", "started", "completed", "canceled" |

**Label Fields**:

| Field | Type | Description |
|-------|------|-------------|
| `name` | String! | Label name |
| `color` | String! | Hex color code (e.g., "#FF6B6B") |

**Attachment Fields**:

| Field | Type | Description |
|-------|------|-------------|
| `url` | String! | Attachment URL |
| `title` | String | Attachment title/filename |

### Filter Options

**Available Filters**:

```graphql
filter: {
  # Assignee filters
  assignee: {
    isMe: { eq: true }           # Assigned to me
    id: { eq: "user-uuid" }      # Assigned to specific user
    null: { eq: true }           # Unassigned
  }

  # State filters
  state: {
    type: { eq: "started" }      # Specific state type
    type: { nin: ["completed"] } # Exclude state types
    name: { eq: "In Progress" }  # Specific state name
  }

  # Priority filters
  priority: {
    eq: 1                        # Specific priority
    gte: 2                       # Priority >= 2 (High and below)
    lte: 2                       # Priority <= 2 (High and above)
  }

  # Date filters
  dueDate: {
    eq: "2025-10-20"             # Specific due date
    lte: "2025-10-20"            # Due on or before
    gte: "2025-10-20"            # Due on or after
  }

  # Label filters
  labels: {
    some: { name: { eq: "bug" } } # Has specific label
  }

  # Team filters
  team: {
    key: { eq: "ENG" }           # Specific team
  }

  # Project filters
  project: {
    id: { eq: "project-uuid" }   # Specific project
  }

  # Text search
  searchableContent: {
    contains: "login"            # Search in title/description
  }
}
```

### Sorting Options

```graphql
orderBy: priority              # Order by priority
orderBy: updatedAt             # Order by last update
orderBy: createdAt             # Order by creation date
orderBy: dueDate               # Order by due date
```

## Query Customization Examples

### Example 1: Only Urgent Tasks

```graphql
query {
  issues(
    filter: {
      assignee: { isMe: { eq: true } }
      priority: { eq: 1 }
      state: { type: { nin: ["completed", "canceled"] } }
    }
  ) {
    nodes {
      identifier
      title
      dueDate
    }
  }
}
```

### Example 2: Tasks Due This Week

```graphql
query {
  issues(
    filter: {
      assignee: { isMe: { eq: true } }
      dueDate: { lte: "2025-10-25" }
      state: { type: { nin: ["completed", "canceled"] } }
    }
    orderBy: dueDate
  ) {
    nodes {
      identifier
      title
      dueDate
      priority
    }
  }
}
```

### Example 3: Bugs Only

```graphql
query {
  issues(
    filter: {
      assignee: { isMe: { eq: true } }
      labels: { some: { name: { eq: "bug" } } }
      state: { type: { nin: ["completed", "canceled"] } }
    }
  ) {
    nodes {
      identifier
      title
      labels {
        nodes {
          name
        }
      }
    }
  }
}
```

### Example 4: Specific Team Tasks

```graphql
query {
  issues(
    filter: {
      assignee: { isMe: { eq: true } }
      team: { key: { eq: "ENG" } }
      state: { type: { nin: ["completed", "canceled"] } }
    }
  ) {
    nodes {
      identifier
      title
      team {
        name
        key
      }
    }
  }
}
```

## Modifying the Script

### Change Filter Criteria

Edit the `fetch_linear_tasks()` function in `sync_linear_tasks.py`:

```python
# Original query (all incomplete assigned tasks)
query = """
query {
  issues(
    filter: {
      assignee: { isMe: { eq: true } }
      state: { type: { nin: ["completed", "canceled"] } }
    }
  ) { ... }
}
"""

# Modified: Only high priority tasks
query = """
query {
  issues(
    filter: {
      assignee: { isMe: { eq: true } }
      state: { type: { nin: ["completed", "canceled"] } }
      priority: { lte: 2 }
    }
  ) { ... }
}
"""
```

### Add Additional Fields

Add fields to the query and update the markdown generation:

```python
# In the query, add new field:
query = """
query {
  issues(...) {
    nodes {
      # ... existing fields ...
      project {
        name
      }
      cycle {
        name
        startsAt
        endsAt
      }
    }
  }
}
"""

# In generate_markdown(), use the new fields:
def generate_markdown(tasks, output_file="linear_tasks.md"):
    # ... existing code ...

    for task in task_list:
        # ... existing code ...

        # Add project name
        project = task.get("project", {})
        if project:
            project_name = project.get("name", "")
            metadata_parts.append(f"Project: {project_name}")
```

### Change Output Format

Modify the `generate_markdown()` function:

```python
# Use different markdown library or manual formatting
def generate_markdown(tasks, output_file="linear_tasks.md"):
    with open(output_file, 'w') as f:
        f.write("# My Linear Tasks\n\n")

        for task in tasks:
            identifier = task.get("identifier", "")
            title = task.get("title", "")
            url = task.get("url", "")

            # Custom format
            f.write(f"## [{identifier}]({url})\n")
            f.write(f"{title}\n\n")
```

## Error Handling

### HTTP Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Parse response |
| 400 | Bad Request | Check query syntax |
| 401 | Unauthorized | Verify API key |
| 403 | Forbidden | Check permissions |
| 429 | Rate Limited | Wait and retry |
| 500 | Server Error | Retry after delay |

### GraphQL Errors

Linear returns GraphQL errors in the response body:

```json
{
  "errors": [
    {
      "message": "Field 'unknownField' doesn't exist on type 'Issue'",
      "locations": [{"line": 5, "column": 7}],
      "path": ["issues", "nodes", 0, "unknownField"]
    }
  ]
}
```

**Common Errors**:
- Invalid field name: Update query to match schema
- Permission denied: Check API key has required access
- Invalid filter: Verify filter syntax matches schema

## API Resources

**Official Documentation**:
- GraphQL API: https://developers.linear.app/docs/graphql/working-with-the-graphql-api
- Schema Explorer: https://studio.apollographql.com/public/Linear-API/variant/current/home
- Rate Limits: https://developers.linear.app/docs/graphql/working-with-the-graphql-api#rate-limiting

**API Status**:
- Status Page: https://status.linear.app
- Changelog: https://linear.app/changelog

**Support**:
- GitHub Issues: https://github.com/linear/linear/issues
- Community Slack: https://linear.app/join-slack
- Email: support@linear.app

## Advanced Topics

### Pagination

For workspaces with many issues (>50), implement pagination to handle large datasets efficiently:

**Query with Pagination**:
```graphql
query {
  issues(
    first: 50
    after: "cursor_string"
    filter: { ... }
  ) {
    nodes { ... }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Python Implementation**:
```python
def fetch_all_tasks_paginated(api_key: str) -> List[Dict[str, Any]]:
    """Fetch all tasks with pagination support."""
    all_tasks = []
    has_next_page = True
    cursor = None

    while has_next_page:
        # Build query with cursor
        after_clause = f'after: "{cursor}"' if cursor else ""
        query = f"""
        query {{
          issues(
            first: 50
            {after_clause}
            filter: {{
              assignee: {{ isMe: {{ eq: true }} }}
              state: {{ type: {{ nin: ["completed", "canceled"] }} }}
            }}
          ) {{
            nodes {{ id identifier title priority }}
            pageInfo {{
              hasNextPage
              endCursor
            }}
          }}
        }}
        """

        # Make request
        response = requests.post(LINEAR_API_URL, headers=headers, json={"query": query})
        data = response.json()

        # Extract results
        issues_data = data["data"]["issues"]
        all_tasks.extend(issues_data["nodes"])

        # Update pagination state
        page_info = issues_data["pageInfo"]
        has_next_page = page_info["hasNextPage"]
        cursor = page_info["endCursor"]

    return all_tasks
```

**When to Use Pagination**:
- More than 50 assigned tasks
- Fetching historical data
- Building analytics/reporting tools
- Avoiding timeouts on large queries

**Performance Considerations**:
- Default limit: 50 items per page
- Maximum limit: 250 items per page
- Each page counts as one API request
- Consider implementing result caching

### Mutations

Create or update issues programmatically:

```graphql
mutation {
  issueUpdate(
    id: "issue-uuid"
    input: {
      stateId: "state-uuid"
      priority: 2
    }
  ) {
    success
    issue {
      identifier
      title
    }
  }
}
```

### Webhooks

Alternative to polling: Set up webhooks for real-time updates:
1. Go to https://linear.app/settings/api
2. Create webhook endpoint
3. Subscribe to issue events
4. Process webhook payloads

### Batch Operations

Fetch multiple resources in one query:

```graphql
query {
  issues(filter: { ... }) {
    nodes { ... }
  }
  teams {
    nodes {
      name
      key
    }
  }
  viewer {
    name
    email
  }
}
```

## Performance Optimization

### Caching Strategies

Implement caching to reduce API calls and improve performance:

**1. File-Based Caching**:
```python
import json
from pathlib import Path
from datetime import datetime, timedelta

CACHE_FILE = ".linear_cache.json"
CACHE_DURATION = timedelta(minutes=5)

def get_cached_tasks():
    """Retrieve tasks from cache if fresh."""
    cache_path = Path(CACHE_FILE)

    if not cache_path.exists():
        return None

    try:
        with open(cache_path, 'r') as f:
            cache_data = json.load(f)

        cached_time = datetime.fromisoformat(cache_data['timestamp'])
        if datetime.now() - cached_time < CACHE_DURATION:
            return cache_data['tasks']
    except (json.JSONDecodeError, KeyError, ValueError):
        return None

    return None

def cache_tasks(tasks):
    """Save tasks to cache."""
    cache_data = {
        'timestamp': datetime.now().isoformat(),
        'tasks': tasks
    }
    with open(CACHE_FILE, 'w') as f:
        json.dump(cache_data, f, indent=2)
```

**2. Quick Mode (Minimal Fields)**:
```python
def fetch_tasks_quick_mode(api_key: str) -> List[Dict[str, Any]]:
    """Fetch only essential fields for faster response."""
    query = """
    query {
      issues(
        filter: {
          assignee: { isMe: { eq: true } }
          state: { type: { nin: ["completed", "canceled"] } }
        }
      ) {
        nodes {
          identifier
          title
          priority
          url
        }
      }
    }
    """
    # Smaller response = faster network transfer
```

**3. Conditional Sync**:
```python
def should_sync():
    """Check if sync is needed based on last sync time."""
    last_sync_file = ".last_sync"

    if not os.path.exists(last_sync_file):
        return True

    last_sync = datetime.fromtimestamp(os.path.getmtime(last_sync_file))
    return datetime.now() - last_sync > timedelta(minutes=10)
```

**Best Practices for Performance**:
- Use caching for frequently accessed data
- Implement quick mode for simple task lists
- Only fetch needed fields (avoid over-fetching)
- Use pagination for large datasets
- Respect rate limits with throttling
- Cache markdown output for offline access
- Add --force flag to bypass cache when needed

**Command-Line Arguments Example**:
```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--quick', action='store_true', help='Fetch minimal fields only')
parser.add_argument('--force', action='store_true', help='Force sync, bypass cache')
parser.add_argument('--cache-duration', type=int, default=5, help='Cache duration in minutes')

args = parser.parse_args()

if args.force or not should_sync():
    tasks = fetch_tasks(api_key, quick_mode=args.quick)
else:
    tasks = get_cached_tasks()
```

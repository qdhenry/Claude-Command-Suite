# Linear Todo Sync - Examples

This document provides comprehensive examples of the Linear Todo Sync skill in action, including successful syncs, error scenarios, and sample outputs.

## Example 1: Successful Morning Sync

### Scenario
User starts their workday and wants to see what tasks are assigned to them.

### User Input
```
"What do I need to work on this morning?"
```

### Claude's Execution

**Step 1**: Pre-flight checks
```bash
# Check for .env file
ls -la .env

# Output: -rw-r--r-- 1 user staff 45 Oct 18 09:00 .env

# Verify dependencies
python -c "import requests, dotenv, mdutils" 2>&1

# Output: (no errors - packages installed)
```

**Step 2**: Run sync script
```bash
python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
```

**Script Output**:
```
Linear Todo Sync - Fetching your assigned tasks...

✓ API key loaded
✓ Connecting to Linear API...
✓ Fetched 8 tasks
✓ Generating markdown...
✓ Created linear_tasks.md

Success! Generated todo list with 8 tasks
  ⚠️  2 urgent tasks
  📌 3 high priority tasks
  🔴 1 overdue task

View your tasks: cat linear_tasks.md
```

**Step 3**: Read and summarize tasks
```bash
cat linear_tasks.md
```

### Claude's Response
```
Good morning! You have 8 tasks assigned. Here's your priority breakdown:

URGENT (2 tasks):
- [ENG-123] Fix login authentication bug - Due TODAY
- [ENG-125] Deploy hotfix to production - Due TODAY

HIGH PRIORITY (3 tasks):
- [ENG-130] Refactor authentication service
- [ENG-132] Update API documentation
- [ENG-135] Code review for payment feature

MEDIUM PRIORITY (2 tasks):
- [ENG-140] Add unit tests for user service
- [ENG-142] Update dependencies

LOW PRIORITY (1 task):
- [ENG-150] Research new logging framework

I'd recommend starting with the urgent login bug (ENG-123) since it's due today. Would you like me to help you investigate it?
```

---

## Example 2: First-Time Setup (No .env)

### Scenario
User runs the skill for the first time without setting up the API key.

### User Input
```
"Show me my work"
```

### Claude's Execution

**Step 1**: Check for .env
```bash
ls -la .env
```

**Output**:
```
ls: .env: No such file or directory
```

**Step 2**: Guide user through setup

### Claude's Response
```
I need to set up Linear API access first. Let's do that quickly:

**Step 1**: Get your Linear API key
1. Go to https://linear.app/settings/api
2. Click "Create new key"
3. Give it a name like "Claude Todo Sync"
4. Copy the generated key (starts with `lin_api_`)

**Step 2**: Create .env file
I can create the .env file for you. Should I proceed?

Once you paste your API key, I'll sync your tasks and show you what you need to work on.
```

### After User Confirms

**Step 3**: Create .env file
```bash
# Claude creates .env with template
echo 'LINEAR_API_KEY=your_linear_api_key_here' > .env
chmod 600 .env
```

**Step 4**: Prompt for API key

### Claude's Response
```
I've created the .env file. Now:

1. Open .env in your editor
2. Replace `your_linear_api_key_here` with your actual API key
3. Save the file
4. Let me know when ready, and I'll sync your tasks

The .env file is secured with 600 permissions (only you can read it).
```

---

## Example 3: No Tasks Assigned

### Scenario
User has completed all tasks or has no current assignments.

### User Input
```
"Load work"
```

### Claude's Execution

**Step 1**: Run sync
```bash
python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
```

**Script Output**:
```
Linear Todo Sync - Fetching your assigned tasks...

✓ API key loaded
✓ Connecting to Linear API...
✓ Fetched 0 tasks
✓ Generating markdown...
✓ Created linear_tasks.md

No incomplete tasks assigned to you. Great job! 🎉

View your tasks: cat linear_tasks.md
```

**Step 2**: Read generated file
```bash
cat linear_tasks.md
```

**File Contents**:
```markdown
# Linear Tasks

**Generated**: 2025-10-18 09:15:30
**Total Tasks**: 0

No incomplete tasks assigned to you. Great job!
```

### Claude's Response
```
Excellent news! You have no incomplete tasks assigned in Linear. You're all caught up!

Would you like me to:
1. Check for unassigned tasks you could pick up?
2. Help you plan new work?
3. Review completed tasks from this week?
```

---

## Example 4: Authentication Error

### Scenario
User's API key is invalid or expired.

### User Input
```
"What do I need to work on?"
```

### Claude's Execution

**Step 1**: Run sync
```bash
python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
```

**Script Output**:
```
Linear Todo Sync - Fetching your assigned tasks...

✓ API key loaded
✓ Connecting to Linear API...
Error: Authentication failed - Invalid API key
Please verify your LINEAR_API_KEY in .env
Generate a new key at: https://linear.app/settings/api
```

**Exit code**: 1

### Claude's Response
```
It looks like there's an issue with your Linear API key. This usually means:

1. The key has expired
2. The key was revoked
3. There's a typo in the .env file

Let me help you fix this:

**Option 1: Generate new key**
1. Go to https://linear.app/settings/api
2. Create a new personal API key
3. Copy the new key
4. Update your .env file

**Option 2: Check existing key**
Let me verify what's in your .env file (I won't show the actual key):

Would you like me to:
- A) Help you update the .env with a new key
- B) Check the current .env for formatting issues
```

---

## Example 5: Network Error

### Scenario
User has no internet connection or Linear API is down.

### User Input
```
"Show my tasks"
```

### Claude's Execution

**Step 1**: Run sync
```bash
python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
```

**Script Output**:
```
Linear Todo Sync - Fetching your assigned tasks...

✓ API key loaded
✓ Connecting to Linear API...
Error: Failed to connect to Linear API
Please check your internet connection
Check Linear status at: https://status.linear.app
```

**Exit code**: 2

### Claude's Response
```
I couldn't connect to the Linear API. This could be due to:

1. **No internet connection** - Check your network
2. **Linear API is down** - Check https://status.linear.app
3. **Firewall/proxy blocking** - Check your network settings

Let me check Linear's status for you...

Would you like me to:
- Retry the sync in a moment
- Check the last cached version of your tasks (if available)
- Help troubleshoot your connection
```

---

## Example 6: Tasks with Various Metadata

### Sample linear_tasks.md Output

```markdown
# Linear Tasks

**Generated**: 2025-10-18 09:30:15
**Total Tasks**: 8

**Priority Breakdown**:
- Urgent: 2 tasks
- High: 3 tasks
- Medium: 2 tasks
- Low: 1 task

## Urgent Priority

- [ ] **[ENG-123](https://linear.app/team/issue/ENG-123)** Fix login authentication bug
  `In Progress` | Estimate: 5pts | **Due: 2025-10-18 (OVERDUE)** | Labels: `bug`, `security`
  *Users unable to login with SSO after latest deployment*

- [ ] **[ENG-125](https://linear.app/team/issue/ENG-125)** Deploy hotfix to production
  `Ready for Deploy` | Estimate: 2pts | Due: 2025-10-18 | Labels: `hotfix`
  *Emergency fix for payment processing issue*
  Attachments: 2

## High Priority

- [ ] **[ENG-130](https://linear.app/team/issue/ENG-130)** Refactor authentication service
  `In Progress` | Estimate: 8pts | Due: 2025-10-22 | Labels: `enhancement`, `backend`
  *Improve code quality and add better error handling*

- [ ] **[ENG-132](https://linear.app/team/issue/ENG-132)** Update API documentation
  `Todo` | Estimate: 3pts | Labels: `documentation`
  *Document new authentication endpoints and error codes*

- [ ] **[ENG-135](https://linear.app/team/issue/ENG-135)** Code review for payment feature
  `In Review` | Estimate: 2pts | Due: 2025-10-19 | Labels: `review`

## Medium Priority

- [ ] **[ENG-140](https://linear.app/team/issue/ENG-140)** Add unit tests for user service
  `In Progress` | Estimate: 5pts | Labels: `testing`, `backend`
  *Increase test coverage from 60% to 80%*

- [ ] **[ENG-142](https://linear.app/team/issue/ENG-142)** Update dependencies
  `Todo` | Estimate: 3pts | Labels: `maintenance`

## Low Priority

- [ ] **[ENG-150](https://linear.app/team/issue/ENG-150)** Research new logging framework
  `Todo` | Estimate: 5pts | Labels: `research`
  *Evaluate alternatives to current logging solution*
```

---

## Example 7: Handling Dependencies Not Installed

### Scenario
User doesn't have required Python packages.

### User Input
```
"Load my Linear tasks"
```

### Claude's Execution

**Step 1**: Check dependencies
```bash
python -c "import requests, dotenv, mdutils" 2>&1
```

**Output**:
```
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ModuleNotFoundError: No module named 'requests'
```

### Claude's Response
```
I need to install the required Python packages first. The Linear Todo Sync skill requires:
- requests (for API calls)
- python-dotenv (for .env file handling)
- mdutils (for markdown generation)

I can install these for you now:

```bash
pip install requests python-dotenv mdutils
```

Should I proceed with the installation?
```

### After User Confirms

**Step 2**: Install dependencies
```bash
pip install requests python-dotenv mdutils
```

**Output**:
```
Collecting requests
  Downloading requests-2.31.0-py3-none-any.whl (62 kB)
Collecting python-dotenv
  Downloading python_dotenv-1.0.0-py3-none-any.whl (19 kB)
Collecting mdutils
  Downloading mdutils-1.6.0-py3-none-any.whl (16 kB)
Installing collected packages: requests, python-dotenv, mdutils
Successfully installed mdutils-1.6.0 python-dotenv-1.0.0 requests-2.31.0
```

**Step 3**: Retry sync
```bash
python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
```

### Claude's Response
```
✓ Dependencies installed successfully

Now syncing your Linear tasks...
```

---

## Example 8: Re-sync After Task Updates

### Scenario
User updated tasks in Linear and wants fresh data.

### User Input
```
"I just updated some tasks in Linear, can you refresh my todo list?"
```

### Claude's Response
```
Sure! Let me fetch the latest state of your tasks from Linear...

```bash
python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
```

```
Linear Todo Sync - Fetching your assigned tasks...

✓ API key loaded
✓ Connecting to Linear API...
✓ Fetched 7 tasks
✓ Generating markdown...
✓ Created linear_tasks.md

Success! Generated todo list with 7 tasks
  📌 2 high priority tasks

View your tasks: cat linear_tasks.md
```

Your updated task list:

**Changes detected**:
- Task count: 8 → 7 (1 task completed or reassigned)
- High priority: 3 → 2

Current breakdown:
- High Priority: 2 tasks
- Medium Priority: 3 tasks
- Low Priority: 2 tasks

Would you like to see the full updated list?
```

---

## Common Usage Patterns

### Pattern 1: Daily Standup Prep
```
User: "What should I discuss in standup?"
Claude:
1. Syncs Linear tasks
2. Highlights completed tasks from yesterday (if tracking)
3. Lists in-progress tasks
4. Identifies blockers (overdue or stuck tasks)
```

### Pattern 2: Sprint Planning
```
User: "What's on my plate for this sprint?"
Claude:
1. Syncs tasks
2. Groups by sprint/cycle
3. Calculates total story points
4. Identifies capacity issues
```

### Pattern 3: Priority Check
```
User: "What's urgent?"
Claude:
1. Syncs tasks
2. Filters for urgent/high priority only
3. Sorts by due date
4. Provides immediate action items
```

### Pattern 4: End of Day Review
```
User: "What's left for tomorrow?"
Claude:
1. Syncs tasks
2. Shows uncompleted work
3. Suggests priorities for next day
4. Identifies tasks that can be deferred
```

---

## Troubleshooting Examples

### Issue: Script runs but file not created

**Symptom**:
```
✓ Created linear_tasks.md
```

But file doesn't exist in directory.

**Diagnosis**:
```bash
# Check current directory
pwd

# Search for the file
find . -name "linear_tasks.md"
```

**Solution**:
Script creates file in directory where it's run from. Ensure you're in the project root.

### Issue: Malformed markdown

**Symptom**:
Markdown file contains broken formatting or encoding issues.

**Diagnosis**:
Check task descriptions for special characters.

**Solution**:
Update script to escape special characters in markdown generation.

### Issue: Slow sync

**Symptom**:
Script takes >10 seconds to complete.

**Diagnosis**:
- Large number of tasks (>100)
- Slow internet connection
- Complex task descriptions with attachments

**Solution**:
- Add pagination to query
- Filter for recent tasks only
- Use --quick mode (fetch fewer fields)

---

## Best Practices from Examples

1. **Always run sync at start of work session** - Ensures fresh data
2. **Check for overdue tasks first** - Address time-sensitive items
3. **Use task identifiers in communication** - Reference ENG-123 instead of "that bug"
4. **Re-sync after major updates** - Get latest state from Linear
5. **Keep .env secure** - Never share or commit API keys
6. **Handle errors gracefully** - Provide clear next steps
7. **Cache results locally** - linear_tasks.md serves as offline reference

---

## Example 9: Performance - Large Workspace (>50 tasks)

### Scenario
User has many assigned tasks and sync is slow.

### User Input
```
"Load my work, but it seems slow lately"
```

### Claude's Analysis

**Step 1**: Check task count
```bash
# Check current task count from previous sync
grep "Total Tasks:" linear_tasks.md
# Output: **Total Tasks**: 127
```

### Claude's Response
```
I see you have 127 tasks. The current script fetches all at once, which can be slow. I can help optimize this:

**Option 1: Quick Mode (Fast)**
Fetch only essential fields (identifier, title, priority, url):
- Faster network transfer
- Minimal processing
- Good for quick checks

**Option 2: Pagination (Complete)**
Fetch tasks in batches of 50:
- Handles large datasets efficiently
- Gets all metadata
- Better for detailed review

**Option 3: Filtered Sync (Focused)**
Fetch only tasks that matter right now:
- Urgent + High priority only
- Due this week
- Specific team/project

Which approach would you prefer?
```

### Implementation (Quick Mode)
```python
# Modified query with minimal fields
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

# Result: Sync time reduced from 8s to 2s
```

---

## Example 10: Caching - Frequent Syncs

### Scenario
User syncs multiple times per hour, hitting rate limits.

### User Input
```
"Show my tasks again"
# (Asked 5 times in 10 minutes)
```

### Claude's Response
```
I notice you've synced recently. To avoid rate limits, I can:

**Option 1: Use Cached Data (Recommended)**
Your last sync was 3 minutes ago. The cached data is fresh.
Would you like me to show you the cached tasks?

**Option 2: Force Fresh Sync**
If you've updated tasks in Linear, I can force a new sync.

Which would you prefer?
```

### Implementation with Caching
```python
import json
from datetime import datetime, timedelta

CACHE_FILE = ".linear_cache.json"
CACHE_DURATION = timedelta(minutes=5)

def should_use_cache():
    """Check if cache is fresh enough."""
    if not os.path.exists(CACHE_FILE):
        return False

    try:
        with open(CACHE_FILE, 'r') as f:
            cache_data = json.load(f)

        cached_time = datetime.fromisoformat(cache_data['timestamp'])
        age = datetime.now() - cached_time

        if age < CACHE_DURATION:
            print(f"Using cached data (age: {age.seconds}s)")
            return True
    except:
        return False

    return False

# Usage
if should_use_cache() and not force_sync:
    tasks = load_from_cache()
else:
    tasks = fetch_from_linear()
    save_to_cache(tasks)
```

**Result**: Reduces API calls from 10/hour to 2/hour

---

## Example 11: Filter Optimization - Focus on What Matters

### Scenario
User only wants to see urgent work, not all 80+ tasks.

### User Input
```
"Just show me what's urgent right now"
```

### Claude's Implementation

**Approach 1: Filter After Fetch**
```python
# Fetch all tasks
all_tasks = fetch_linear_tasks(api_key)

# Filter for urgent only
urgent_tasks = [
    task for task in all_tasks
    if task.get("priority") == 1  # Urgent priority
]

print(f"Found {len(urgent_tasks)} urgent tasks out of {len(all_tasks)} total")
```

**Approach 2: Filter in Query (More Efficient)**
```python
# Modify the GraphQL query
query = """
query {
  issues(
    filter: {
      assignee: { isMe: { eq: true } }
      state: { type: { nin: ["completed", "canceled"] } }
      priority: { eq: 1 }  # Only urgent tasks
    }
  ) {
    nodes { ... }
  }
}
"""

# Result: Faster query, less data transfer, quicker response
```

### Claude's Response
```
I found 3 urgent tasks for you:

URGENT:
- [ENG-123] Fix production login bug - Due TODAY (OVERDUE)
- [ENG-125] Deploy hotfix - Due in 2 hours
- [ENG-127] Critical security patch - Due tomorrow

All 3 require immediate attention. Would you like me to help prioritize these?
```

**Performance Benefit**: Query time reduced from 4s to 0.5s

---

## Performance Comparison Table

| Scenario | Tasks | Method | Time | API Calls |
|----------|-------|--------|------|-----------|
| Small workspace | 15 | Standard | 1.2s | 1 |
| Medium workspace | 45 | Standard | 2.8s | 1 |
| Large workspace | 127 | Standard | 8.5s | 1 |
| Large workspace | 127 | Paginated | 6.2s | 3 |
| Large workspace | 127 | Quick Mode | 2.1s | 1 |
| Large workspace | 127 | Cached | 0.1s | 0 |
| Filtered (urgent) | 3 | Filtered Query | 0.5s | 1 |

---

## Best Practices from Performance Examples

1. **Use Caching for Repeated Access**
   - Cache duration: 5-10 minutes
   - Perfect for frequent checks
   - Add --force flag to bypass when needed

2. **Implement Quick Mode for Speed**
   - Use when you only need basic info
   - Great for quick status checks
   - Significantly faster than full sync

3. **Filter at Query Level**
   - More efficient than post-fetch filtering
   - Reduces data transfer
   - Faster response times

4. **Use Pagination for Large Datasets**
   - Essential for >50 tasks
   - Prevents timeouts
   - More reliable than single large query

5. **Respect Rate Limits**
   - Linear allows 1000 requests/hour
   - Cache results to stay well under limit
   - Monitor usage with rate limit headers

6. **Choose the Right Tool for the Job**
   - Quick check → Cached or Quick Mode
   - Detailed review → Standard sync
   - Many tasks → Pagination
   - Specific need → Filtered query

---

## Next Steps

- See [SKILL.md](SKILL.md) for full usage instructions
- See [reference.md](reference.md) for API customization options and implementation details
- Check Linear API docs for advanced queries
- Review performance optimization strategies in [reference.md](reference.md)

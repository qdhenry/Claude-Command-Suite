#!/usr/bin/env python3
"""
Linear Todo Sync Script

Fetches open tasks assigned to the user from Linear API and generates
a markdown todo list file in the project root.

Usage:
    python sync_linear_tasks.py

Requirements:
    - requests
    - mdutils
    - python-dotenv
    - LINEAR_API_KEY in .env file

Example:
    python .claude/skills/linear-todo-sync/scripts/sync_linear_tasks.py
"""

import os
import sys
from datetime import datetime
from pathlib import Path

try:
    import requests
except ImportError:
    print("Error: 'requests' package not found.")
    print("Install with: pip install requests")
    sys.exit(1)

try:
    from mdutils.mdutils import MdUtils
except ImportError:
    print("Error: 'mdutils' package not found.")
    print("Install with: pip install mdutils")
    sys.exit(1)

try:
    from dotenv import load_dotenv
except ImportError:
    print("Error: 'python-dotenv' package not found.")
    print("Install with: pip install python-dotenv")
    sys.exit(1)

# Linear API Configuration
LINEAR_API_URL = "https://api.linear.app/graphql"

# GraphQL Query to fetch assigned tasks
QUERY = """
query {
  viewer {
    assignedIssues(filter: { state: { type: { nin: ["completed", "canceled"] } } }) {
      nodes {
        id
        identifier
        title
        description
        state {
          name
        }
        priority
        priorityLabel
        labels {
          nodes {
            name
          }
        }
        estimate
        dueDate
        project {
          name
        }
        url
      }
    }
  }
}
"""


def load_api_key():
    """
    Load LINEAR_API_KEY from .env file.

    Returns:
        str: API key

    Raises:
        SystemExit: If API key is not found
    """
    # Find project root (directory containing .env)
    current_dir = Path.cwd()
    env_path = current_dir / '.env'

    # Load .env file
    if not env_path.exists():
        print("Error: .env file not found in project root")
        print(f"Expected location: {env_path}")
        print("\nSetup instructions:")
        print("1. Copy the template: cp .claude/skills/linear-todo-sync/assets/.env.example .env")
        print("2. Add your API key to .env: LINEAR_API_KEY=lin_api_...")
        print("3. Get your API key from: https://linear.app/settings/api")
        sys.exit(1)

    load_dotenv(env_path)

    api_key = os.getenv('LINEAR_API_KEY')

    if not api_key:
        print("Error: LINEAR_API_KEY not found in .env file")
        print(f"Location: {env_path}")
        print("\nEnsure your .env file contains:")
        print("LINEAR_API_KEY=lin_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        print("\nGet your API key from: https://linear.app/settings/api")
        sys.exit(1)

    if not api_key.startswith('lin_api_'):
        print("Warning: API key format looks incorrect")
        print("Linear API keys typically start with 'lin_api_'")
        print("Proceeding anyway, but authentication may fail...")

    return api_key


def fetch_linear_tasks(api_key):
    """
    Query Linear GraphQL API to fetch assigned tasks.

    Args:
        api_key (str): Linear API key

    Returns:
        list: List of task dictionaries

    Raises:
        SystemExit: If API request fails
    """
    headers = {
        'Authorization': api_key,
        'Content-Type': 'application/json'
    }

    payload = {
        'query': QUERY
    }

    try:
        print("Fetching tasks from Linear API...")
        response = requests.post(
            LINEAR_API_URL,
            json=payload,
            headers=headers,
            timeout=30
        )

        # Handle rate limiting
        if response.status_code == 429:
            print("Error: Rate limit exceeded (429)")
            print("Linear allows 2000 requests per hour per API key")
            print("Please wait 60 seconds and try again")
            sys.exit(1)

        # Handle authentication errors
        if response.status_code == 401:
            print("Error: Authentication failed (401)")
            print("Your LINEAR_API_KEY is invalid or expired")
            print("\nTo fix this:")
            print("1. Go to https://linear.app/settings/api")
            print("2. Generate a new API key")
            print("3. Update your .env file with the new key")
            sys.exit(1)

        # Handle other HTTP errors
        if response.status_code != 200:
            print(f"Error: Linear API returned status code {response.status_code}")
            print(f"Response: {response.text}")
            sys.exit(1)

        data = response.json()

        # Check for GraphQL errors
        if 'errors' in data:
            print("Error: GraphQL query failed")
            for error in data['errors']:
                print(f"  - {error.get('message', 'Unknown error')}")
            sys.exit(1)

        # Extract tasks
        tasks = data.get('data', {}).get('viewer', {}).get('assignedIssues', {}).get('nodes', [])

        print(f"Successfully fetched {len(tasks)} tasks")
        return tasks

    except requests.exceptions.Timeout:
        print("Error: Request timed out")
        print("The Linear API took too long to respond")
        print("Please check your internet connection and try again")
        sys.exit(1)

    except requests.exceptions.ConnectionError:
        print("Error: Network connection failed")
        print("Cannot connect to Linear API")
        print("Please check your internet connection")
        print("Verify https://linear.app is accessible")
        sys.exit(1)

    except requests.exceptions.RequestException as e:
        print(f"Error: Network request failed - {e}")
        sys.exit(1)

    except Exception as e:
        print(f"Error: Unexpected error occurred - {e}")
        sys.exit(1)


def group_tasks_by_project(tasks):
    """
    Group tasks by project name.

    Args:
        tasks (list): List of task dictionaries

    Returns:
        dict: Dictionary mapping project names to task lists
    """
    projects = {}

    for task in tasks:
        project_name = task.get('project', {}).get('name') if task.get('project') else 'No Project'

        if project_name not in projects:
            projects[project_name] = []

        projects[project_name].append(task)

    return projects


def format_priority(priority, priority_label):
    """
    Format priority value to human-readable string.

    Args:
        priority (int): Priority value (0-4)
        priority_label (str): Priority label from API

    Returns:
        str: Formatted priority string
    """
    if priority_label:
        return priority_label

    priority_map = {
        0: 'None',
        1: 'Urgent',
        2: 'High',
        3: 'Medium',
        4: 'Low'
    }

    return priority_map.get(priority, 'Unknown')


def generate_markdown(tasks, output_path):
    """
    Generate markdown todo list from tasks.

    Args:
        tasks (list): List of task dictionaries
        output_path (str): Path to output markdown file
    """
    # Initialize markdown file without table of contents to avoid mdutils bug
    md_file = MdUtils(file_name=output_path.replace('.md', ''))

    # Add title manually
    md_file.new_header(level=1, title=f"Linear Tasks - {datetime.now().strftime('%B %d, %Y')}")
    md_file.new_line()

    # Add metadata
    md_file.new_paragraph(f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    md_file.new_paragraph(f"**Total Tasks:** {len(tasks)}")
    md_file.new_line()

    if not tasks:
        md_file.new_paragraph("No open tasks assigned to you. Great job!")
        md_file.create_md_file()
        return

    # Group tasks by project
    projects = group_tasks_by_project(tasks)

    # Generate markdown for each project
    for project_name in sorted(projects.keys()):
        project_tasks = projects[project_name]

        md_file.new_header(level=2, title=project_name)

        for task in project_tasks:
            # Task title with priority
            priority = format_priority(
                task.get('priority', 0),
                task.get('priorityLabel', '')
            )

            task_title = f"{task.get('title', 'Untitled')} ({priority})"
            md_file.new_header(level=3, title=task_title)

            # Task metadata
            state = task.get('state', {}).get('name', 'Unknown')
            md_file.new_list([f"**Status**: {state}"])

            # Labels
            labels = task.get('labels', {}).get('nodes', []) if task.get('labels') else []
            if labels:
                label_names = ', '.join([label.get('name', '') for label in labels if label.get('name')])
                if label_names:
                    md_file.new_list([f"**Labels**: {label_names}"])

            # Estimate
            estimate = task.get('estimate')
            if estimate is not None:
                md_file.new_list([f"**Estimate**: {estimate} points"])

            # Due date
            due_date = task.get('dueDate')
            if due_date:
                md_file.new_list([f"**Due**: {due_date}"])

            # Task URL
            url = task.get('url', '')
            identifier = task.get('identifier', '')
            if url:
                md_file.new_list([f"**Link**: [{identifier}]({url})"])

            # Description
            description = task.get('description', '').strip()
            if description:
                md_file.new_line()
                # Limit description length to avoid overly long files
                if len(description) > 500:
                    description = description[:500] + '...'
                md_file.new_paragraph(description)

            md_file.new_line()

    # Create the markdown file
    md_file.create_md_file()


def main():
    """
    Main execution function.
    """
    print("=" * 60)
    print("Linear Todo Sync")
    print("=" * 60)
    print()

    # Load API key from .env
    api_key = load_api_key()

    # Fetch tasks from Linear
    tasks = fetch_linear_tasks(api_key)

    # Check if any tasks found
    if not tasks:
        print("\nNo tasks found!")
        print("You have no assigned tasks in open states.")
        print("A markdown file will still be generated.")

    # Generate filename with current date
    filename = f"linear-todos-{datetime.now().strftime('%Y-%m-%d')}.md"

    # Get project root (current working directory)
    project_root = Path.cwd()
    output_path = project_root / filename

    # Generate markdown file
    try:
        print(f"\nGenerating markdown file: {filename}")
        generate_markdown(tasks, str(output_path))
        print(f"Successfully created: {output_path}")
    except PermissionError:
        print(f"Error: Permission denied when writing to {output_path}")
        print("Check that you have write permissions in this directory")
        sys.exit(1)
    except Exception as e:
        import traceback
        print(f"Error: Failed to generate markdown file - {e}")
        print("\nFull traceback:")
        traceback.print_exc()
        sys.exit(1)

    # Print summary
    projects = group_tasks_by_project(tasks)
    print()
    print("=" * 60)
    print("Summary")
    print("=" * 60)
    print(f"Total Tasks: {len(tasks)}")
    print(f"Projects: {len(projects)}")

    if projects:
        print("\nBreakdown by project:")
        for project_name, project_tasks in sorted(projects.items()):
            print(f"  - {project_name}: {len(project_tasks)} tasks")

    print()
    print(f"Todo list saved to: {output_path}")
    print("=" * 60)


if __name__ == '__main__':
    main()

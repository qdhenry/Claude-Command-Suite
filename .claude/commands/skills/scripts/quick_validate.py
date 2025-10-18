#!/usr/bin/env python3
"""
Quick validation script for Claude Code Skills

Usage:
    python quick_validate.py <skill-directory>

Examples:
    python quick_validate.py ~/.claude/skills/my-skill
    python quick_validate.py .claude/skills/pdf-processor

Returns:
    Exit code 0 if valid, 1 if invalid
"""

import sys
import os
import re
from pathlib import Path


def validate_skill(skill_path):
    """
    Basic validation of a skill.

    Args:
        skill_path: Path to the skill directory

    Returns:
        Tuple of (is_valid, message)
    """
    skill_path = Path(skill_path)

    # Check directory exists
    if not skill_path.exists():
        return False, f"Skill directory not found: {skill_path}"

    if not skill_path.is_dir():
        return False, f"Path is not a directory: {skill_path}"

    # Check SKILL.md exists
    skill_md = skill_path / 'SKILL.md'
    if not skill_md.exists():
        return False, "SKILL.md not found"

    # Read and validate content
    try:
        content = skill_md.read_text()
    except Exception as e:
        return False, f"Error reading SKILL.md: {e}"

    # Check frontmatter exists
    if not content.startswith('---'):
        return False, "No YAML frontmatter found (must start with ---)"

    # Extract frontmatter
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return False, "Invalid frontmatter format (missing closing ---)"

    frontmatter = match.group(1)

    # Check for tabs in frontmatter (YAML doesn't allow tabs)
    if '\t' in frontmatter:
        return False, "Tabs found in frontmatter (use spaces instead)"

    # Check required fields
    if 'name:' not in frontmatter:
        return False, "Missing 'name' field in frontmatter"
    if 'description:' not in frontmatter:
        return False, "Missing 'description' field in frontmatter"

    # Extract and validate name
    name_match = re.search(r'name:\s*(.+)', frontmatter)
    if name_match:
        name = name_match.group(1).strip()

        # Remove quotes if present
        if name.startswith('"') and name.endswith('"'):
            name = name[1:-1]
        elif name.startswith("'") and name.endswith("'"):
            name = name[1:-1]

        # Check if name is empty
        if not name:
            return False, "Name field is empty"

        # Validate skill folder name matches (for hyphen-case skills)
        folder_name = skill_path.name
        hyphenated_name = name.lower().replace(' ', '-')

        # Allow either exact match or hyphenated version
        if folder_name != name and folder_name != hyphenated_name:
            # Not a critical error, just a warning
            print(f"⚠️  Warning: Folder name '{folder_name}' doesn't match skill name '{name}'")

    # Extract and validate description
    desc_match = re.search(r'description:\s*(.+)', frontmatter)
    if desc_match:
        description = desc_match.group(1).strip()

        # Remove quotes if present
        if description.startswith('"') and description.endswith('"'):
            description = description[1:-1]
        elif description.startswith("'") and description.endswith("'"):
            description = description[1:-1]

        # Check if description is empty
        if not description:
            return False, "Description field is empty"

        # Check for angle brackets (these can cause parsing issues)
        if '<' in description or '>' in description:
            return False, "Description cannot contain angle brackets (< or >)"

        # Check for TODO markers
        if 'TODO' in description.upper() or '[TODO' in description:
            return False, "Description contains TODO markers - please complete them"

        # Check description quality
        if len(description.split()) < 5:
            print(f"⚠️  Warning: Description is very short ({len(description.split())} words)")

        # Check for third-person format (recommended)
        if not description.startswith(('This skill', 'A skill', 'Skill')):
            print(f"⚠️  Warning: Consider starting description with 'This skill...' (third-person)")

        # Check if description mentions when to use the skill
        trigger_words = ['when', 'use', 'for', 'to', 'helps', 'enables']
        if not any(word in description.lower() for word in trigger_words):
            print(f"⚠️  Warning: Description should mention when to use the skill")

    # Check optional fields
    if 'allowed-tools:' in frontmatter:
        tools_match = re.search(r'allowed-tools:\s*(.+)', frontmatter)
        if tools_match:
            tools = tools_match.group(1).strip()
            if not tools:
                return False, "allowed-tools field is empty"

            # Validate tool names
            valid_tools = ['Read', 'Write', 'Edit', 'MultiEdit', 'Bash', 'Grep',
                          'Glob', 'WebFetch', 'WebSearch', 'TodoWrite', 'Task']
            tool_list = [t.strip() for t in tools.split(',')]

            for tool in tool_list:
                if tool not in valid_tools:
                    print(f"⚠️  Warning: Unknown tool '{tool}' in allowed-tools")

    # Check license field if present
    if 'license:' in frontmatter:
        license_match = re.search(r'license:\s*(.+)', frontmatter)
        if license_match:
            license_val = license_match.group(1).strip()
            if not license_val:
                return False, "license field is empty"

    # Check content structure (basic)
    body = content.split('---', 2)[2] if '---' in content else ""

    if not body.strip():
        return False, "SKILL.md has no content after frontmatter"

    # Check for title header
    if not re.search(r'^#\s+', body, re.MULTILINE):
        print("⚠️  Warning: No title header (# Skill Name) found in content")

    # Check for Instructions section
    if 'instructions' not in body.lower():
        print("⚠️  Warning: No Instructions section found")

    # Check for excessive TODOs in body
    todo_count = body.upper().count('TODO')
    if todo_count > 5:
        return False, f"Too many TODO markers in content ({todo_count} found) - please complete them"
    elif todo_count > 0:
        print(f"⚠️  Warning: {todo_count} TODO marker(s) found in content")

    # Check word count for progressive disclosure
    word_count = len(body.split())
    if word_count > 5000:
        print(f"⚠️  Warning: SKILL.md body is large ({word_count} words, recommended <5,000)")

    # Check directory structure
    scripts_dir = skill_path / 'scripts'
    references_dir = skill_path / 'references'
    assets_dir = skill_path / 'assets'

    # Check for executable permissions on scripts
    if scripts_dir.exists():
        for script in scripts_dir.glob('*'):
            if script.is_file() and script.suffix in ['.py', '.sh']:
                if not os.access(script, os.X_OK):
                    print(f"⚠️  Warning: Script {script.name} is not executable")

    # Check for large reference files
    if references_dir.exists():
        for ref_file in references_dir.glob('*.md'):
            if ref_file.is_file():
                ref_content = ref_file.read_text()
                ref_words = len(ref_content.split())
                if ref_words > 10000:
                    # Check if grep patterns are mentioned in SKILL.md
                    if ref_file.name not in body:
                        print(f"⚠️  Warning: Large reference file {ref_file.name} ({ref_words} words) - consider adding grep patterns to SKILL.md")

    return True, "Skill validation passed!"


def main():
    if len(sys.argv) != 2:
        print("Quick Skill Validator\n")
        print("Usage:")
        print("  python quick_validate.py <skill-directory>\n")
        print("Examples:")
        print("  python quick_validate.py ~/.claude/skills/my-skill")
        print("  python quick_validate.py .claude/skills/pdf-processor")
        sys.exit(1)

    skill_path = sys.argv[1]
    valid, message = validate_skill(skill_path)

    if valid:
        print(f"✅ {message}")
    else:
        print(f"❌ {message}")

    sys.exit(0 if valid else 1)


if __name__ == "__main__":
    main()
#!/usr/bin/env python3
"""
Skill Initialization Script
Creates a new Claude Code Skill with proper structure and template files.

Usage:
    python init_skill.py <skill-name> [--path <output-directory>]

Examples:
    python init_skill.py pdf-processor
    python init_skill.py commit-helper --path ~/.claude/skills

This script:
- Creates the skill directory at the specified path
- Generates a SKILL.md template with proper frontmatter
- Creates example resource directories: scripts/, references/, and assets/
- Adds example files in each directory that can be customized or deleted
"""

import argparse
import os
import sys
from pathlib import Path
from datetime import datetime


def create_skill_md(skill_name: str, skill_dir: Path) -> None:
    """Create the main SKILL.md file with proper template."""

    # Convert skill-name to Title Case for display
    title_name = ' '.join(word.capitalize() for word in skill_name.split('-'))

    content = f"""---
name: {title_name}
description: This skill [TODO: what it does]. This skill should be used when [TODO: triggers]. Requires [TODO: dependencies if any, or remove].
# allowed-tools: Read, Write, Edit  # Optional - uncomment and modify if restricting tools
# license: MIT  # Optional - uncomment if needed
---

# {title_name}

TODO: Brief overview paragraph explaining this skill's purpose and capabilities. Write using imperative/infinitive form (verb-first instructions).

## Instructions

To use this skill effectively, follow these steps:

1. **[TODO: First Step Category]**
   - [TODO: Specific action to take]
   - Expected outcome: [TODO: What should happen]
   - Example: `[TODO: command or approach]`

2. **[TODO: Second Step Category]**
   - [TODO: Detailed guidance]
   - Handle edge cases: [TODO: Common issues]
   - Error handling: [TODO: What to do if things go wrong]

3. **[TODO: Final Step Category]**
   - [TODO: Wrap-up actions]
   - Verify success: [TODO: How to confirm it worked]

## Examples

### Example 1: [TODO: Common Use Case]

[TODO: Context when this would be used]

```[TODO: language]
# TODO: Show concrete example
# Include helpful comments
# Demonstrate the expected usage

# Expected output:
# [TODO: What the output should look like]
```

**Result**: [TODO: What was achieved]

### Example 2: [TODO: Another Use Case]

[TODO: Different scenario context]

```[TODO: language]
# TODO: Another example
# Show different approach or edge case
```

**Result**: [TODO: Outcome and important notes]

## Best Practices

✅ **Do This**
- [TODO: Good practice 1]
- [TODO: Good practice 2]
- [TODO: Good practice 3]

❌ **Avoid This**
- [TODO: Common mistake 1]
- [TODO: Common mistake 2]

## Common Issues

### Issue: [TODO: Common Problem]

**Symptoms**: [TODO: How to recognize this problem]

**Solution**:
```[TODO: language]
# TODO: How to fix it
```

### Issue: [TODO: Another Problem]

**Symptoms**: [TODO: Observable signs]

**Solution**: [TODO: Clear fix with steps]

## Requirements

<!-- TODO: Remove this section if no dependencies -->

**Packages**:
```bash
# TODO: Installation commands
# pip install package1 package2
# npm install package1
```

**System Requirements**:
- [TODO: Requirement 1]
- [TODO: Requirement 2]

## Advanced Usage

<!-- TODO: Add references to other files if this becomes a multi-file skill -->
<!-- For detailed API reference, see [references/api-docs.md](references/api-docs.md) -->
<!-- For more examples, see [references/examples.md](references/examples.md) -->

## Scripts

<!-- TODO: Document any scripts in the scripts/ directory -->
<!-- This skill includes helper scripts:
- `scripts/process.py`: [Purpose]
- `scripts/helper.sh`: [Purpose]
-->

## Additional Resources

- [TODO: Link to related documentation]
- [TODO: Link to external resources]
"""

    skill_md_path = skill_dir / "SKILL.md"
    skill_md_path.write_text(content)
    print(f"✅ Created {skill_md_path}")


def create_scripts_dir(skill_dir: Path) -> None:
    """Create scripts directory with example files."""

    scripts_dir = skill_dir / "scripts"
    scripts_dir.mkdir()

    # Create example Python script
    example_py = scripts_dir / "example_processor.py"
    example_py.write_text("""#!/usr/bin/env python3
\"\"\"
Example processor script for the skill.

TODO: Replace this with your actual script or delete if not needed.

Usage:
    python example_processor.py <input> [--verbose]

Examples:
    python example_processor.py data.json
    python example_processor.py data.json --verbose
\"\"\"

import argparse
import json
import sys


def main():
    \"\"\"Main function for processing.\"\"\"
    parser = argparse.ArgumentParser(description='Process input data')
    parser.add_argument('input', help='Input file to process')
    parser.add_argument('--verbose', action='store_true',
                        help='Enable verbose output')

    args = parser.parse_args()

    if args.verbose:
        print(f"Processing {args.input}...")

    # TODO: Add your processing logic here
    try:
        with open(args.input, 'r') as f:
            data = json.load(f)
            print(f"Loaded {len(data)} items")
            # Process data...

    except FileNotFoundError:
        print(f"Error: File '{args.input}' not found", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in '{args.input}': {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    if args.verbose:
        print("Processing complete!")

    return 0


if __name__ == '__main__':
    sys.exit(main())
""")
    example_py.chmod(0o755)
    print(f"✅ Created {example_py} (executable)")

    # Create example Bash script
    example_sh = scripts_dir / "example_helper.sh"
    example_sh.write_text("""#!/usr/bin/env bash
#
# Example helper script for the skill
# TODO: Replace with your actual script or delete if not needed
#
# Usage: ./example_helper.sh <input-file>

set -e

# Check arguments
if [ $# -eq 0 ]; then
    echo "Usage: $0 <input-file>"
    exit 1
fi

INPUT_FILE="$1"

# Validate input
if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: File '$INPUT_FILE' not found"
    exit 1
fi

echo "Processing $INPUT_FILE..."

# TODO: Add your processing logic here
# Example: count lines
LINE_COUNT=$(wc -l < "$INPUT_FILE")
echo "File has $LINE_COUNT lines"

echo "Processing complete!"
""")
    example_sh.chmod(0o755)
    print(f"✅ Created {example_sh} (executable)")


def create_references_dir(skill_dir: Path) -> None:
    """Create references directory with example documentation."""

    references_dir = skill_dir / "references"
    references_dir.mkdir()

    # Create example reference doc
    example_ref = references_dir / "example_reference.md"
    example_ref.write_text("""# Reference Documentation

TODO: Replace this with your actual reference documentation or delete if not needed.

This directory is for documentation that Claude should load into context as needed while working with the skill.

## When to Use References

Place documentation here when:
- It's too detailed for the main SKILL.md file
- Claude needs to reference it while working
- You want to keep SKILL.md under 5,000 words

## Examples of Reference Files

- `api-docs.md` - API documentation
- `schemas.md` - Database or data schemas
- `examples.md` - Extended examples
- `troubleshooting.md` - Detailed troubleshooting guide
- `configuration.md` - Configuration options

## Best Practices

1. **Avoid Duplication**: Don't repeat information between SKILL.md and reference files
2. **Use Clear Names**: Make file names descriptive
3. **Include Grep Patterns**: For files >10,000 words, add grep patterns to SKILL.md:
   ```
   For API endpoints, search references/api-docs.md for "POST /api"
   For error codes, grep references/troubleshooting.md for "ERROR-"
   ```

## TODO: Add Your Content

Replace this example with your actual reference documentation.
""")
    print(f"✅ Created {example_ref}")


def create_assets_dir(skill_dir: Path) -> None:
    """Create assets directory with example files."""

    assets_dir = skill_dir / "assets"
    assets_dir.mkdir()

    # Create templates subdirectory
    templates_dir = assets_dir / "templates"
    templates_dir.mkdir()

    # Create example template
    example_template = templates_dir / "example_template.txt"
    example_template.write_text("""<!-- TODO: Replace with your actual template or delete if not needed -->

This directory is for files that will be used in the output Claude produces,
not loaded into context.

Examples of assets:
- Templates (HTML, React components, config files)
- Images (logos, icons)
- Boilerplate code
- Fonts
- Sample documents

Asset files are referenced in SKILL.md but not loaded into context unless
specifically needed. They're typically copied, modified, or used as output.

Example template structure:

---
Project: {{PROJECT_NAME}}
Author: {{AUTHOR}}
Date: {{DATE}}

{{CONTENT}}
---
""")
    print(f"✅ Created {example_template}")

    # Create README for assets
    assets_readme = assets_dir / "README.md"
    assets_readme.write_text("""# Assets Directory

TODO: Document your assets or delete this directory if not needed.

This directory contains files used in output, not loaded into Claude's context.

## Directory Structure

```
assets/
├── templates/     # Reusable templates
├── images/        # Images, icons, logos
├── boilerplate/   # Starter code
└── samples/       # Example files
```

## Usage

Reference these files in SKILL.md like:
```
Copy the template from assets/templates/example.html
```

Claude will use these files without loading them into context, keeping the context window efficient.
""")
    print(f"✅ Created {assets_readme}")


def init_skill(skill_name: str, output_path: str = None) -> int:
    """Initialize a new skill with the given name."""

    # Validate skill name
    if not skill_name or not skill_name.replace('-', '').replace('_', '').isalnum():
        print("Error: Skill name must contain only letters, numbers, hyphens, and underscores")
        return 1

    # Determine output directory
    if output_path:
        base_dir = Path(output_path)
    else:
        # Default to current directory
        base_dir = Path.cwd()

    # Create skill directory
    skill_dir = base_dir / skill_name

    # Check if directory already exists
    if skill_dir.exists():
        print(f"Error: Directory '{skill_dir}' already exists")
        return 1

    try:
        # Create main directory
        skill_dir.mkdir(parents=True)
        print(f"\n📁 Creating skill '{skill_name}' at {skill_dir}\n")

        # Create SKILL.md
        create_skill_md(skill_name, skill_dir)

        # Create directories
        create_scripts_dir(skill_dir)
        create_references_dir(skill_dir)
        create_assets_dir(skill_dir)

        # Success message
        print(f"\n✨ Skill '{skill_name}' initialized successfully!")
        print(f"\n📍 Location: {skill_dir.absolute()}")
        print("\n📝 Next steps:")
        print("1. Edit SKILL.md to define your skill's purpose and instructions")
        print("2. Remove or modify example files as needed")
        print("3. Add your actual scripts, references, and assets")
        print("4. Validate with: .claude/commands/skills/scripts/validate-skill.sh")
        print("5. Package with: .claude/commands/skills/scripts/package_skill.py")

        print("\n💡 Tips:")
        print("- Keep SKILL.md under 5,000 words")
        print("- Use third-person in description ('This skill...')")
        print("- Use imperative form in instructions ('To do X, execute Y')")
        print("- Delete directories you don't need (scripts/, references/, assets/)")

        return 0

    except Exception as e:
        print(f"Error creating skill: {e}", file=sys.stderr)
        return 1


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description='Initialize a new Claude Code Skill with proper structure',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    %(prog)s my-skill
    %(prog)s pdf-processor --path ~/.claude/skills
    %(prog)s database-helper --path .claude/skills
        """
    )

    parser.add_argument('skill_name',
                        help='Name of the skill to create (use hyphens for spaces)')
    parser.add_argument('--path',
                        default=None,
                        help='Output directory (defaults to current directory)')

    args = parser.parse_args()

    return init_skill(args.skill_name, args.path)


if __name__ == '__main__':
    sys.exit(main())
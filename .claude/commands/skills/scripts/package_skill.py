#!/usr/bin/env python3
"""
Skill Packager - Creates a distributable zip file of a skill folder

Usage:
    python package_skill.py <path/to/skill-folder> [output-directory]

Examples:
    python package_skill.py ~/.claude/skills/my-skill
    python package_skill.py .claude/skills/pdf-processor ./dist
    python package_skill.py my-skill

This script:
- Validates the skill automatically before packaging
- Creates a zip file named after the skill (e.g., my-skill.zip)
- Includes all files while maintaining proper directory structure
- Reports validation errors and exits without creating a package if invalid
"""

import sys
import zipfile
from pathlib import Path
from quick_validate import validate_skill


def package_skill(skill_path, output_dir=None):
    """
    Package a skill folder into a zip file.

    Args:
        skill_path: Path to the skill folder
        output_dir: Optional output directory for the zip file (defaults to current directory)

    Returns:
        Path to the created zip file, or None if error
    """
    skill_path = Path(skill_path).resolve()

    # Validate skill folder exists
    if not skill_path.exists():
        print(f"❌ Error: Skill folder not found: {skill_path}")
        return None

    if not skill_path.is_dir():
        print(f"❌ Error: Path is not a directory: {skill_path}")
        return None

    # Validate SKILL.md exists
    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        print(f"❌ Error: SKILL.md not found in {skill_path}")
        return None

    # Run validation before packaging
    print("🔍 Validating skill...")
    valid, message = validate_skill(skill_path)
    if not valid:
        print(f"❌ Validation failed: {message}")
        print("   Please fix the validation errors before packaging.")
        return None
    print(f"✅ {message}\n")

    # Determine output location
    skill_name = skill_path.name
    if output_dir:
        output_path = Path(output_dir).resolve()
        output_path.mkdir(parents=True, exist_ok=True)
    else:
        output_path = Path.cwd()

    zip_filename = output_path / f"{skill_name}.zip"

    # Check if zip already exists
    if zip_filename.exists():
        response = input(f"⚠️  {zip_filename} already exists. Overwrite? (y/N): ")
        if response.lower() != 'y':
            print("❌ Packaging cancelled.")
            return None

    # Create the zip file
    print(f"📦 Creating package...")
    try:
        with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
            # Walk through the skill directory
            file_count = 0
            for file_path in skill_path.rglob('*'):
                if file_path.is_file():
                    # Skip hidden files and __pycache__
                    if any(part.startswith('.') for part in file_path.parts):
                        continue
                    if '__pycache__' in file_path.parts:
                        continue

                    # Calculate the relative path within the zip
                    arcname = file_path.relative_to(skill_path.parent)
                    zipf.write(file_path, arcname)
                    print(f"  Added: {arcname}")
                    file_count += 1

        # Get file size
        size_mb = zip_filename.stat().st_size / (1024 * 1024)

        print(f"\n✅ Successfully packaged skill!")
        print(f"   📦 Package: {zip_filename}")
        print(f"   📊 Files: {file_count}")
        print(f"   💾 Size: {size_mb:.2f} MB")
        print(f"\n📤 Ready for distribution!")

        return zip_filename

    except Exception as e:
        print(f"❌ Error creating zip file: {e}")
        if zip_filename.exists():
            zip_filename.unlink()  # Clean up partial file
        return None


def main():
    if len(sys.argv) < 2:
        print("📦 Skill Packager - Create distributable skill packages\n")
        print("Usage:")
        print("  python package_skill.py <path/to/skill-folder> [output-directory]\n")
        print("Examples:")
        print("  python package_skill.py ~/.claude/skills/my-skill")
        print("  python package_skill.py .claude/skills/pdf-processor ./dist")
        print("  python package_skill.py my-skill\n")
        print("The script will:")
        print("  1. Validate the skill structure and content")
        print("  2. Create a zip file if validation passes")
        print("  3. Report any errors that need fixing")
        sys.exit(1)

    skill_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else None

    print(f"📦 Packaging skill: {Path(skill_path).name}")
    if output_dir:
        print(f"   Output directory: {output_dir}")
    print()

    result = package_skill(skill_path, output_dir)

    if result:
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
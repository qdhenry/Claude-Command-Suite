# Package Skill for Distribution

Validate and package a Claude Code Skill into a distributable zip file

## Instructions

This command validates and packages an existing skill for distribution. Follow these steps:

### Phase 1: Skill Selection

1. **Identify the skill to package**
   - Determine skill location (personal or project)
   - Verify skill exists and has SKILL.md
   - Check current state of the skill

2. **Pre-package checks**
   - Ensure all TODOs are completed
   - Verify documentation is finalized
   - Check that examples are tested

### Phase 2: Validation

1. **Run quick validation**
   - Use the quick_validate.py script
   - Check YAML frontmatter validity
   - Verify required fields (name, description)
   - Check for prohibited characters
   - Validate directory structure

2. **Run comprehensive validation** (if quick validation passes)
   - Use validate-skill.sh for detailed checks
   - Verify all 10 validation phases
   - Check word counts for progressive disclosure
   - Validate file references
   - Test script syntax

3. **Review validation results**
   - Fix any critical errors
   - Address warnings if needed
   - Re-validate after fixes

### Phase 3: Packaging

1. **Execute packaging script**
   ```bash
   python .claude/commands/skills/scripts/package_skill.py <skill-path> [output-dir]
   ```

2. **Package creation process**
   - Script validates again before packaging
   - Creates zip file with skill name
   - Includes all files while maintaining structure
   - Excludes hidden files and __pycache__

3. **Verify package**
   - Check zip file created successfully
   - Note file count and size
   - Confirm ready for distribution

### Phase 4: Distribution Options

1. **Personal distribution**
   - Share zip file directly
   - Upload to file sharing service
   - Include installation instructions

2. **Team distribution**
   - Add to shared repository
   - Upload to team storage
   - Document in team wiki

3. **Public distribution**
   - Upload to skill marketplace (if available)
   - Share on GitHub
   - Add to community repositories

## Command Execution Flow

### Step 1: Locate Skill

```bash
# Personal skills
ls ~/.claude/skills/

# Project skills
ls .claude/skills/
```

### Step 2: Quick Validation

```bash
python .claude/commands/skills/scripts/quick_validate.py <skill-path>
```

Expected output:
- ✅ Skill validation passed!
- Or specific error messages to fix

### Step 3: Comprehensive Validation (Optional)

```bash
.claude/commands/skills/scripts/validate-skill.sh <skill-path>
```

Expected output:
- Detailed 10-phase validation report
- Score and recommendations

### Step 4: Package Creation

```bash
# Package to current directory
python .claude/commands/skills/scripts/package_skill.py ~/.claude/skills/my-skill

# Package to specific directory
python .claude/commands/skills/scripts/package_skill.py ~/.claude/skills/my-skill ./dist
```

Expected output:
```
🔍 Validating skill...
✅ Skill validation passed!

📦 Creating package...
  Added: my-skill/SKILL.md
  Added: my-skill/scripts/helper.py
  Added: my-skill/references/api-docs.md
  ...

✅ Successfully packaged skill!
   📦 Package: ./my-skill.zip
   📊 Files: 8
   💾 Size: 0.15 MB

📤 Ready for distribution!
```

## Validation Criteria

The packaging script checks:

### Required Elements
- SKILL.md exists
- Valid YAML frontmatter
- Name and description fields present
- No TODO markers in description

### Quality Checks
- Description in third-person format
- Description mentions when to use skill
- No angle brackets in description
- Word count within limits (<5,000 for SKILL.md)

### Structure Validation
- Proper directory organization
- Scripts are executable
- File references are valid
- No duplicate content between SKILL.md and references/

## Distribution Guidelines

### Installation Instructions Template

Include with your packaged skill:

```markdown
# Installing {{SKILL_NAME}}

## Personal Installation
1. Download {{skill-name}}.zip
2. Extract to ~/.claude/skills/
3. Restart Claude Code

## Project Installation
1. Extract to .claude/skills/ in your project
2. Commit to version control
3. Team members get skill on pull

## Verification
After installation, test with:
"Use the {{SKILL_NAME}} skill to {{example task}}"
```

### Version Management

For skill updates:
1. Update skill files
2. Document changes in SKILL.md
3. Increment version if using versioning
4. Re-package with same process
5. Distribute new package

## Troubleshooting

### Validation Fails

**Issue**: Package script reports validation errors

**Solution**:
1. Run quick_validate.py to see specific errors
2. Fix reported issues
3. Re-run validation
4. Try packaging again

### Package Not Created

**Issue**: Zip file not generated

**Possible causes**:
- Validation failed (fix errors first)
- No write permissions (check directory)
- Disk space issues (check available space)

### Scripts Not Executable

**Issue**: Warning about non-executable scripts

**Solution**:
```bash
chmod +x <skill-path>/scripts/*.py
chmod +x <skill-path>/scripts/*.sh
```

### Large Package Size

**Issue**: Package is very large

**Solutions**:
- Move large docs to references/ directory
- Remove unnecessary files
- Compress images if included
- Use .gitignore patterns

## Best Practices

1. **Complete all TODOs** before packaging
2. **Test the skill** thoroughly before distribution
3. **Document dependencies** clearly
4. **Include examples** that work
5. **Version your skills** for updates
6. **Test installation** on clean system
7. **Include uninstall instructions** if complex

## Examples

### Example 1: Package Simple Skill

```bash
# Validate first
python .claude/commands/skills/scripts/quick_validate.py ~/.claude/skills/commit-helper

# Package if valid
python .claude/commands/skills/scripts/package_skill.py ~/.claude/skills/commit-helper

# Result: commit-helper.zip created
```

### Example 2: Package to Distribution Directory

```bash
# Create dist directory
mkdir -p ~/skill-packages

# Package to specific location
python .claude/commands/skills/scripts/package_skill.py \
  ~/.claude/skills/pdf-processor \
  ~/skill-packages

# Result: ~/skill-packages/pdf-processor.zip
```

### Example 3: Fix and Re-package

```bash
# Initial validation fails
python .claude/commands/skills/scripts/quick_validate.py ~/.claude/skills/my-skill
# ❌ Description contains TODO markers

# Fix the issue
# Edit SKILL.md to complete TODOs

# Re-validate
python .claude/commands/skills/scripts/quick_validate.py ~/.claude/skills/my-skill
# ✅ Skill validation passed!

# Package
python .claude/commands/skills/scripts/package_skill.py ~/.claude/skills/my-skill
# ✅ Successfully packaged!
```

## Output Format

The command provides clear feedback:

```
📦 Packaging skill: {{skill-name}}

🔍 Validating skill...
[Validation results]

📦 Creating package...
[File listing]

✅ Successfully packaged skill!
   📦 Package: {{path/to/package.zip}}
   📊 Files: {{count}}
   💾 Size: {{size}} MB

📤 Ready for distribution!
```

## Next Steps

After packaging:
1. **Test installation** on another system
2. **Share with team** or community
3. **Document** in skill catalog
4. **Gather feedback** for improvements
5. **Plan updates** based on usage

## Related Commands

- `/skills:build-skill` - Create new skills
- `/skills:init-skill` - Initialize skill from template
- `/skills:validate-skill` - Run validation only

## Scripts Used

- `package_skill.py` - Main packaging script
- `quick_validate.py` - Fast validation
- `validate-skill.sh` - Comprehensive validation

Your skill is now ready for distribution! 📦
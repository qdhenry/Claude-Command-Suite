# 🎨 Skills Commands

Build, manage, and distribute Claude Code Skills with professional tooling.

## Overview

The Skills namespace provides commands for creating comprehensive, production-ready Claude Code Skills through an elicitation-driven development process. Four specialized agents work together to ensure every skill follows best practices and meets quality standards.

## Available Commands

### `/skills:build-skill`

**Primary command for creating new Claude Code Skills**

Creates skills through a structured 4-phase process:
1. **Requirements Elicitation** - Understand user needs through targeted questions
2. **Skill Generation** - Build complete skill structure with files and code
3. **Validation & Testing** - Comprehensive quality assurance and testing
4. **Documentation Enhancement** - Professional documentation and examples

**When to use**:
- Creating new skills from scratch
- Converting workflows into reusable skills
- Building team-shared capabilities
- Packaging expertise for distribution

**Example**:
```
/skills:build-skill

"I need a skill for managing database migrations"
"Create a skill that helps with PDF form filling"
"Build a skill for writing API documentation"
```

## The Skill Builder Agents

### 🎯 skill-elicitation-agent

**Expert at gathering requirements and creating specifications**

**Responsibilities**:
- Ask 3-5 targeted questions to understand needs
- Convert user requirements into detailed specifications
- Plan skill structure and components
- Validate completeness before generation

**Triggers automatically when**: Building new skills or gathering requirements

### 🏗️ skill-generator-agent

**Expert at creating skill files and code**

**Responsibilities**:
- Generate SKILL.md with proper structure
- Create supporting files (reference.md, examples.md)
- Write scripts with error handling
- Set up directory structure
- Document dependencies

**Triggers automatically when**: Creating skills from specifications

### ✅ skill-validator-agent

**Expert at testing and quality assurance**

**Responsibilities**:
- Validate YAML frontmatter
- Test skill structure and organization
- Execute and test scripts
- Check description quality
- Verify progressive disclosure
- Generate validation reports

**Triggers automatically when**: Validating new or modified skills

### 📚 skill-documenter-agent

**Expert at creating comprehensive documentation**

**Responsibilities**:
- Enhance SKILL.md with examples
- Create detailed reference documentation
- Generate example collections
- Write troubleshooting guides
- Ensure documentation quality

**Triggers automatically when**: Documenting skills

## Skill Types

### Simple Skills
**Single SKILL.md file with instructions**

**Best for**:
- Instruction-based workflows
- Process guidance
- Best practices
- Checklists

**Example**: Commit message formatting, code review guidelines

### Multi-File Skills
**SKILL.md + reference docs + examples**

**Best for**:
- Complex workflows
- Multiple sub-tasks
- Deep technical content
- Progressive learning

**Example**: PDF processing, API design, database management

### Tool-Restricted Skills
**Skills with allowed-tools specified**

**Best for**:
- Read-only operations
- Safety-critical workflows
- Scoped capabilities
- Security-focused tasks

**Example**: Security analysis, code auditing

### Code-Execution Skills
**Skills with bundled scripts**

**Best for**:
- Deterministic operations
- Complex algorithms
- Data processing
- File manipulation

**Example**: Data transformation, file generation, validation

## Skill Locations

### Personal Skills: `~/.claude/skills/`
**Your private skills, not shared**

✅ Use for:
- Individual workflows and preferences
- Experimental skills
- Personal productivity tools
- Private utilities

### Project Skills: `.claude/skills/`
**Team-shared, version-controlled**

✅ Use for:
- Team workflows and conventions
- Project-specific expertise
- Shared utilities
- Collaborative tools

### Plugin Skills: Plugin directory
**Distributed via marketplace**

✅ Use for:
- Public sharing
- Marketplace deployment
- Bundled capabilities
- Wide distribution

## Best Practices

### 1. Start with Elicitation
- Don't skip the questions phase
- Understand requirements deeply
- Get user approval on specification

### 2. Follow the Complete Flow
- Use all four agents sequentially
- Don't shortcut the process
- Each agent adds critical value

### 3. Validate Thoroughly
- Fix issues immediately
- Re-validate after changes
- Don't proceed with failures

### 4. Document Comprehensively
- Clear instructions
- Multiple examples
- Troubleshooting guides
- Best practices

### 5. Test Realistically
- Use real-world scenarios
- Test edge cases
- Verify script execution
- Check skill triggering

## Workflow Examples

### Example 1: Creating a Simple Skill

**Goal**: Skill for writing conventional commit messages

```bash
# Start the process
/skills:build-skill

# Elicitation phase
Q: What commit message format? (Conventional Commits)
Q: Any project-specific requirements? (None)
Q: Example commits to reference? (Yes, from CHANGELOG)

# Generation creates:
- commit-helper/SKILL.md (instructions + examples)

# Validation passes all checks

# Documentation adds:
- Best practices section
- Multiple examples
- Troubleshooting tips

# Result: Production-ready commit helper skill
```

### Example 2: Multi-File Skill with Scripts

**Goal**: PDF form filling skill

```bash
# Start the process
/skills:build-skill

# Elicitation phase
Q: What PDF operations? (Fill forms, extract fields)
Q: Which libraries? (pypdf, pdfplumber)
Q: Safety restrictions? (None, can write files)

# Generation creates:
- pdf-form-filler/SKILL.md (core instructions)
- pdf-form-filler/FORMS.md (form-specific details)
- pdf-form-filler/REFERENCE.md (API docs)
- pdf-form-filler/scripts/fill_form.py
- pdf-form-filler/scripts/validate.py

# Validation tests:
- YAML structure ✅
- Script execution ✅
- Dependencies documented ✅

# Documentation adds:
- 10+ examples
- Troubleshooting section
- Integration patterns

# Result: Comprehensive PDF processing skill
```

### Example 3: Tool-Restricted Read-Only Skill

**Goal**: Security code analysis skill

```bash
# Start the process
/skills:build-skill

# Elicitation phase
Q: Analysis scope? (OWASP Top 10 vulnerabilities)
Q: Should modify files? (No, read-only)
Q: Output format? (Detailed report)

# Generation creates:
- security-analyzer/SKILL.md
  - allowed-tools: Read, Grep, Glob
- security-analyzer/PATTERNS.md (vulnerability patterns)
- security-analyzer/REFERENCE.md (OWASP guide)

# Validation confirms:
- Tool restrictions correct ✅
- No write operations ✅
- Security patterns valid ✅

# Documentation adds:
- Security best practices
- Example vulnerabilities
- Remediation guides

# Result: Safe, read-only security skill
```

## Quality Standards

Every skill created through `/skills:build-skill` meets these standards:

✅ **Structure**
- Valid YAML frontmatter
- Clear, specific description
- Proper file organization
- Progressive disclosure

✅ **Content**
- Actionable instructions
- Comprehensive examples
- Best practices
- Troubleshooting guides

✅ **Code**
- Syntax validation
- Error handling
- Security checks
- Proper permissions

✅ **Documentation**
- Clear writing
- Complete coverage
- Tested examples
- Usage guides

✅ **Validation**
- Passes all quality checks
- Score 8/10 or higher
- No critical issues
- Production-ready

## Common Use Cases

### Team Onboarding
**Create skills for**:
- Project setup and configuration
- Team coding standards
- Common workflows
- Troubleshooting guides

### Domain Expertise
**Package knowledge about**:
- Specialized technologies
- Industry-specific workflows
- Complex algorithms
- Best practices

### Automation
**Build skills that**:
- Execute repetitive tasks
- Process data deterministically
- Generate boilerplate
- Validate outputs

### Quality Assurance
**Create tools for**:
- Code review checklists
- Security analysis
- Performance optimization
- Testing workflows

## Integration with Other Commands

Skills work seamlessly with other commands:

- `/project:*` - Project skills auto-load for projects
- `/dev:*` - Dev tools can leverage skill capabilities
- `/test:*` - Skills can include testing workflows
- `/docs:*` - Skills can generate documentation

## Troubleshooting

### Skill Not Loading
**Check**:
- File location: `~/.claude/skills/` or `.claude/skills/`
- YAML syntax: Valid frontmatter
- Restart: Claude Code to reload skills

### Skill Not Triggering
**Fix**:
- Use explicit keywords from description
- Try: "Use [skill-name] skill to [task]"
- Check description includes trigger words

### Validation Failures
**Process**:
1. Review validation report
2. Fix critical issues first
3. Re-run skill-validator-agent
4. Iterate until passing

### Script Errors
**Check**:
- Dependencies installed
- File permissions (chmod +x)
- Syntax validation
- Error handling

## Resources

### Documentation
- [Claude Code Skills Docs](https://docs.anthropic.com/claude-code/skills)
- [Agent Skills Overview](https://docs.anthropic.com/agents-and-tools/agent-skills/overview)
- [Best Practices Guide](https://docs.anthropic.com/agents-and-tools/agent-skills/best-practices)

### Examples
- [Anthropic Skills Repository](https://github.com/anthropics/skills)
- Sample skills in `.claude/skills/`

### Support
- Ask Claude: "How do I create a skill for [task]?"
- Use `/skills:build-skill` for guided creation
- Check validation reports for issues

## Future Enhancements

Coming soon:
- Skill testing framework
- Skill marketplace integration
- Version management
- Dependency tracking
- Usage analytics
- Automated updates

## Getting Started

Ready to build your first skill?

```bash
/skills:build-skill
```

The skill-elicitation-agent will guide you through the process!

---

**Transform your workflows into reusable skills with professional tooling and quality assurance.**

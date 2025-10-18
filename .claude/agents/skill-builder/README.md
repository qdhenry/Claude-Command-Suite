# 🎨 Skill Builder Agents

Professional Claude Code Skill development through specialized agent collaboration.

## Overview

The Skill Builder agent system provides four specialized agents that work together to create production-ready Claude Code Skills through an elicitation-driven process. Each agent is an expert in its domain, ensuring comprehensive quality at every stage.

## The Four Agents

### 1. 🎯 skill-elicitation-agent

**File**: `skill-elicitation-agent.md`

**Purpose**: Requirements gathering and specification creation

**Expertise**:
- Targeted question-asking to understand user needs
- Converting requirements into detailed specifications
- Planning skill structure and components
- Validating completeness before generation

**Tools**: Read, Write, Grep, Glob, WebFetch

**Triggers**: Building new skills, gathering requirements

**Output**: Comprehensive skill specification document in structured YAML format

**Key Process**:
1. Asks 3-5 targeted questions about:
   - Purpose and scope
   - Complexity and structure
   - Tool permissions
   - Context and references
   - Success criteria
2. Creates detailed specification
3. Validates completeness
4. Gets user approval

### 2. 🏗️ skill-generator-agent

**File**: `skill-generator-agent.md`

**Purpose**: Skill file and code creation

**Expertise**:
- SKILL.md authoring with proper frontmatter
- Directory structure organization
- Script and utility generation
- Progressive disclosure implementation
- Dependency documentation

**Tools**: Read, Write, Edit, Bash, Grep, Glob, WebFetch

**Triggers**: Creating skills from specifications

**Output**: Complete skill directory with all files, scripts, and documentation

**Key Process**:
1. Analyzes specification
2. Creates directory structure
3. Generates SKILL.md with proper frontmatter
4. Creates supporting files (reference.md, examples.md)
5. Writes scripts with error handling
6. Documents dependencies
7. Performs quality checks

### 3. ✅ skill-validator-agent

**File**: `skill-validator-agent.md`

**Purpose**: Comprehensive quality assurance and testing

**Expertise**:
- YAML frontmatter validation
- Structure and organization checks
- Code syntax and execution testing
- Description quality analysis
- Security checks
- Integration testing

**Tools**: Read, Bash, Grep, Glob, WebFetch

**Triggers**: Validating new or modified skills

**Output**: Detailed validation report with scores and actionable fixes

**Key Process**:
1. Validates YAML frontmatter
2. Analyzes description for discoverability
3. Checks file structure and references
4. Tests script syntax and execution
5. Verifies progressive disclosure
6. Performs security checks
7. Tests skill loading and triggering
8. Generates comprehensive report

### 4. 📚 skill-documenter-agent

**File**: `skill-documenter-agent.md`

**Purpose**: Comprehensive documentation creation

**Expertise**:
- Technical writing
- Example creation (beginner to advanced)
- API documentation
- Troubleshooting guides
- Best practices documentation

**Tools**: Read, Write, Edit, Grep, Glob, WebFetch

**Triggers**: Documenting skills

**Output**: Enhanced documentation including examples, reference docs, and guides

**Key Process**:
1. Enhances SKILL.md content
2. Creates reference.md for technical details
3. Generates examples.md with comprehensive examples
4. Adds troubleshooting section
5. Creates README.md if distributing
6. Validates documentation quality

## Agent Workflow

### Sequential Collaboration

```
┌─────────────────────────────────────────────────────────────┐
│                     User Request                             │
│              "Create a skill for [task]"                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│            1. skill-elicitation-agent                        │
│   • Asks 3-5 targeted questions                             │
│   • Creates detailed specification                          │
│   • Validates completeness                                  │
│   • Gets user approval                                      │
└────────────────────┬────────────────────────────────────────┘
                     │ Specification Document
                     ▼
┌─────────────────────────────────────────────────────────────┐
│            2. skill-generator-agent                          │
│   • Creates directory structure                             │
│   • Generates SKILL.md + supporting files                   │
│   • Writes scripts with error handling                      │
│   • Documents dependencies                                  │
└────────────────────┬────────────────────────────────────────┘
                     │ Skill Files
                     ▼
┌─────────────────────────────────────────────────────────────┐
│            3. skill-validator-agent                          │
│   • Validates structure and syntax                          │
│   • Tests code execution                                    │
│   • Checks discoverability                                  │
│   • Generates validation report                             │
└────────────────────┬────────────────────────────────────────┘
                     │ Validation Report
                     │
                     ├─── ✅ PASSED ────┐
                     │                  │
                     └─── ❌ ISSUES ────┤
                          │             │
                          ▼             │
                    Fix Issues          │
                          │             │
                          ▼             │
                    Re-validate         │
                          │             │
                          └─────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────┐
│            4. skill-documenter-agent                         │
│   • Enhances SKILL.md                                       │
│   • Creates comprehensive examples                          │
│   • Generates reference docs                                │
│   • Adds troubleshooting guides                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Production-Ready Skill                          │
│   ✅ Complete structure                                     │
│   ✅ Validated code                                         │
│   ✅ Comprehensive docs                                     │
│   ✅ Ready for use                                          │
└─────────────────────────────────────────────────────────────┘
```

## Agent Communication

### Data Flow Between Agents

**Elicitation → Generator**:
- Specification document (YAML structured)
- User preferences (location, restrictions)
- Reference materials

**Generator → Validator**:
- Skill directory path
- List of created files
- Dependency information

**Validator → Generator** (if issues):
- Validation report
- List of errors and warnings
- Specific fixes needed

**Generator → Documenter**:
- Skill path
- Original specification
- Current documentation state

**Documenter → User**:
- Final skill location
- Usage instructions
- Test scenarios

## Usage Patterns

### Pattern 1: Simple Instruction Skill

**User Request**: "Create a skill for commit messages"

**Agent Flow**:
1. **Elicitation**: Asks about commit style, conventions, examples
2. **Generation**: Creates single SKILL.md with instructions
3. **Validation**: Checks structure, description quality
4. **Documentation**: Adds examples, best practices

**Result**: Simple, focused skill with clear instructions

### Pattern 2: Multi-File Complex Skill

**User Request**: "Create a skill for PDF processing"

**Agent Flow**:
1. **Elicitation**: Asks about operations, dependencies, safety
2. **Generation**: Creates SKILL.md + reference.md + scripts/
3. **Validation**: Tests scripts, validates structure
4. **Documentation**: Creates comprehensive examples, API docs

**Result**: Professional multi-file skill with code execution

### Pattern 3: Tool-Restricted Safety Skill

**User Request**: "Create a security analysis skill"

**Agent Flow**:
1. **Elicitation**: Determines read-only requirement
2. **Generation**: Creates SKILL.md with allowed-tools restriction
3. **Validation**: Verifies tool restrictions, tests safety
4. **Documentation**: Documents analysis patterns, examples

**Result**: Safe, read-only skill with proper restrictions

## Integration with Commands

### Primary Command: `/skills:build-skill`

Located at: `.claude/commands/skills/build-skill.md`

This command orchestrates all four agents in sequence to build complete skills.

**Command Flow**:
1. Launches skill-elicitation-agent with user request
2. Gets user approval on specification
3. Launches skill-generator-agent with specification
4. Launches skill-validator-agent on generated skill
5. Fixes issues if needed (loops back to generator)
6. Launches skill-documenter-agent for enhancement
7. Delivers final skill with usage guide

### Supporting Resources

**Templates** (`.claude/commands/skills/templates/`):
- `simple-skill-template.md` - For instruction-only skills
- `multi-file-skill-template.md` - For complex skills
- `tool-restricted-skill-template.md` - For safety-critical skills

**Scripts** (`.claude/commands/skills/scripts/`):
- `validate-skill.sh` - Standalone validation script
- `test-skill-trigger.sh` - Trigger testing and analysis

## Agent Design Principles

### 1. Single Responsibility

Each agent has ONE clear purpose:
- Elicitation: Understand requirements
- Generation: Create files
- Validation: Ensure quality
- Documentation: Enhance usability

### 2. Isolated Expertise

Agents work in separate contexts:
- No cross-contamination
- Fresh perspective at each stage
- Specialized knowledge domains

### 3. Progressive Refinement

Each agent improves on the previous:
- Elicitation → Clear specification
- Generation → Working skill
- Validation → Quality assurance
- Documentation → User-friendly

### 4. Human-in-the-Loop

User involvement at key stages:
- Approve specification after elicitation
- Review validation results
- Confirm final deliverable

## Quality Standards

Skills created through this system meet:

✅ **Structure Standards**
- Valid YAML frontmatter
- Clear, discoverable descriptions
- Proper file organization
- Progressive disclosure

✅ **Code Standards**
- Syntax validation
- Error handling
- Security checks
- Executable permissions

✅ **Documentation Standards**
- Clear instructions
- Comprehensive examples
- Troubleshooting guides
- Best practices

✅ **Validation Standards**
- Score 8/10 or higher
- No critical issues
- Production-ready quality

## Customization and Extension

### Adding New Agent Capabilities

To extend an agent:

1. **Update Agent File**: Add new capabilities to the agent's expertise
2. **Document Tools**: Ensure necessary tools are listed
3. **Update Process**: Document new steps in the process
4. **Test Integration**: Verify agent collaboration still works

### Creating Custom Templates

To add skill templates:

1. Create template file in `.claude/commands/skills/templates/`
2. Use `{{PLACEHOLDER}}` syntax for variables
3. Document template usage in comments
4. Update generator agent to reference new template

### Adding Validation Checks

To add new validations:

1. Update `validate-skill.sh` script
2. Add check in skill-validator-agent documentation
3. Document what it checks and why
4. Update validation report format if needed

## Best Practices

### For Using the Agents

1. **Always start with elicitation** - Don't skip requirements
2. **Provide context** - Share examples, docs, references
3. **Review specifications** - Approve before generation
4. **Fix validation issues** - Don't proceed with errors
5. **Test thoroughly** - Use real-world scenarios

### For Maintaining Agents

1. **Keep agents focused** - One responsibility each
2. **Update documentation** - When adding capabilities
3. **Test changes** - Verify agent collaboration
4. **Maintain isolation** - No cross-dependencies
5. **Version carefully** - Document breaking changes

## Troubleshooting

### Agent Not Triggering

**Issue**: Agent doesn't activate when expected

**Solutions**:
- Use explicit invocation: "Launch skill-elicitation-agent"
- Check agent file exists in `.claude/agents/skill-builder/`
- Verify YAML frontmatter is valid
- Restart Claude Code if needed

### Agent Confusion

**Issue**: Wrong agent activates

**Solutions**:
- Be explicit: "Use the skill-elicitation-agent"
- Follow recommended sequence
- Provide clear context about which phase you're in

### Validation Failures

**Issue**: skill-validator-agent reports errors

**Solutions**:
- Review validation report carefully
- Fix critical errors first
- Use skill-generator-agent to make fixes
- Re-validate after changes

## Future Enhancements

### Planned Improvements

- [ ] Skill version management
- [ ] Automated testing framework
- [ ] Marketplace integration
- [ ] Usage analytics
- [ ] Dependency tracking
- [ ] Skill templates marketplace
- [ ] Inter-skill communication
- [ ] Skill composition patterns

## Resources

### Documentation
- Claude Code Skills: https://docs.anthropic.com/claude-code/skills
- Agent Skills Overview: https://docs.anthropic.com/agents-and-tools/agent-skills/overview
- Best Practices: https://docs.anthropic.com/agents-and-tools/agent-skills/best-practices

### Examples
- Anthropic Skills Repo: https://github.com/anthropics/skills
- Sample Skills: `.claude/skills/` (if any exist)

### Commands
- Build Skill: `/skills:build-skill`
- Validate: Run `scripts/validate-skill.sh`
- Test Triggers: Run `scripts/test-skill-trigger.sh`

---

**Transform workflows into production-ready skills with professional agent collaboration.**

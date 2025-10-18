---
name: {{SKILL_NAME}}
description: This skill {{WHAT_IT_DOES}}. This skill should be used when {{TRIGGER_SCENARIOS}}. {{DEPENDENCIES_IF_ANY}}
# allowed-tools: Read, Write, Edit  # Optional - uncomment and specify if restricting tools
# license: MIT  # Optional - uncomment if needed
---

# {{SKILL_NAME}}

{{OVERVIEW_PARAGRAPH}} Write using imperative/infinitive form (verb-first instructions).

## Quick Start

To get started immediately with this skill:

```{{LANGUAGE}}
# {{QUICK_EXAMPLE_COMMENT}}
{{QUICK_EXAMPLE_CODE}}

# Expected output:
# {{QUICK_EXAMPLE_OUTPUT}}
```

## Instructions

To use this skill effectively, follow these steps:

1. **{{STEP_1_CATEGORY}}**
   - {{STEP_1_ACTION}}: {{STEP_1_DESCRIPTION}}
   - Expected outcome: {{STEP_1_EXPECTED}}
   - Example: `{{STEP_1_EXAMPLE}}`

2. **{{STEP_2_CATEGORY}}**
   - {{STEP_2_ACTION}}
   - Handle edge cases: {{STEP_2_EDGES}}
   - Error handling: {{STEP_2_ERRORS}}

3. **{{STEP_3_CATEGORY}}**
   - {{STEP_3_ACTION}}
   - Verify success: {{STEP_3_VERIFICATION}}

## Examples

### Example 1: {{EXAMPLE_1_NAME}}

{{EXAMPLE_1_CONTEXT}}

```{{LANGUAGE}}
# {{EXAMPLE_1_STEP_1}}
{{EXAMPLE_1_CODE_1}}

# {{EXAMPLE_1_STEP_2}}
{{EXAMPLE_1_CODE_2}}

# Expected output:
# {{EXAMPLE_1_OUTPUT}}
```

**Result**: {{EXAMPLE_1_RESULT}}

### Example 2: {{EXAMPLE_2_NAME}}

{{EXAMPLE_2_CONTEXT}}

```{{LANGUAGE}}
{{EXAMPLE_2_CODE}}
```

**Result**: {{EXAMPLE_2_RESULT}}

### Example 3: {{EXAMPLE_3_NAME}}

{{EXAMPLE_3_CONTEXT}}

```{{LANGUAGE}}
{{EXAMPLE_3_CODE}}
```

**Important**: {{EXAMPLE_3_NOTE}}

## Best Practices

✅ **Do This**
- {{BEST_PRACTICE_1}}
- {{BEST_PRACTICE_2}}
- {{BEST_PRACTICE_3}}

❌ **Avoid This**
- {{AVOID_1}}
- {{AVOID_2}}
- {{AVOID_3}}

💡 **Pro Tips**
- {{PRO_TIP_1}}
- {{PRO_TIP_2}}

## Common Issues

### Issue: {{ISSUE_1_NAME}}

**Symptoms**: {{ISSUE_1_SYMPTOMS}}

**Cause**: {{ISSUE_1_CAUSE}}

**Solution**:
```{{LANGUAGE}}
{{ISSUE_1_SOLUTION}}
```

### Issue: {{ISSUE_2_NAME}}

**Symptoms**: {{ISSUE_2_SYMPTOMS}}

**Solution**: {{ISSUE_2_SOLUTION}}

## Requirements

<!-- Remove this section if no dependencies -->

**Packages**:
```bash
# {{PACKAGE_MANAGER}}
{{INSTALL_COMMAND}}
```

**System Requirements**:
- {{REQUIREMENT_1}}
- {{REQUIREMENT_2}}

## Troubleshooting

**Skill not loading?**
- Check YAML frontmatter syntax
- Verify file location: `~/.claude/skills/{{SKILL_NAME_HYPHENATED}}/`
- Restart Claude Code

**Skill not triggering?**
- Use explicit keywords from description
- Try: "Use the {{SKILL_NAME}} skill to {{TASK}}"

## Additional Resources

- {{RESOURCE_1}}
- {{RESOURCE_2}}
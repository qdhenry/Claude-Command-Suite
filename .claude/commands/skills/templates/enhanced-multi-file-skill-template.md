---
name: {{SKILL_NAME}}
description: This skill {{WHAT_IT_DOES}}. This skill should be used when {{TRIGGER_SCENARIOS}}. {{DEPENDENCIES_IF_ANY}}
# allowed-tools: Read, Write, Edit, Bash  # Optional - uncomment if needed
# license: MIT  # Optional - uncomment if needed
---

# {{SKILL_NAME}}

{{OVERVIEW_PARAGRAPH}} Write using imperative/infinitive form.

## Quick Start

To get started immediately:

```{{LANGUAGE}}
{{QUICK_START_CODE}}
```

## Instructions

To use this skill effectively:

1. **{{STEP_1_CATEGORY}}**
   - {{STEP_1_ACTION}}
   - {{STEP_1_OUTCOME}}
   - For details: See [references/{{STEP_1_REFERENCE}}](references/{{STEP_1_REFERENCE}})

2. **{{STEP_2_CATEGORY}}**
   - {{STEP_2_ACTION}}
   - {{STEP_2_OUTCOME}}

3. **{{STEP_3_CATEGORY}}**
   - {{STEP_3_ACTION}}
   - For advanced usage: See [references/advanced.md](references/advanced.md)

## Examples

### Example 1: {{EXAMPLE_1_NAME}}

{{EXAMPLE_1_CONTEXT}}

```{{LANGUAGE}}
{{EXAMPLE_1_CODE}}
```

For more comprehensive examples, see [references/examples.md](references/examples.md).

## Scripts

This skill includes helper scripts for common operations:

### `scripts/{{SCRIPT_1_NAME}}`
{{SCRIPT_1_PURPOSE}}

Usage:
```bash
python scripts/{{SCRIPT_1_NAME}} {{SCRIPT_1_ARGS}}
```

### `scripts/{{SCRIPT_2_NAME}}`
{{SCRIPT_2_PURPOSE}}

Usage:
```bash
./scripts/{{SCRIPT_2_NAME}} {{SCRIPT_2_ARGS}}
```

## Reference Documentation

### Core References

- **[references/api-docs.md](references/api-docs.md)**: Complete API documentation
- **[references/schemas.md](references/schemas.md)**: Data schemas and structures
- **[references/examples.md](references/examples.md)**: Extended examples and patterns

### Large File Search Patterns

For files larger than 10,000 words, use these grep patterns:

```bash
# Search API endpoints in references/api-docs.md
grep "^###.*endpoint" references/api-docs.md

# Find error codes in references/troubleshooting.md
grep "ERROR-[0-9]+" references/troubleshooting.md

# Locate configuration options
grep "config\." references/configuration.md
```

## Assets

This skill includes reusable assets in the `assets/` directory:

- **`assets/templates/`**: {{TEMPLATE_DESCRIPTION}}
- **`assets/boilerplate/`**: {{BOILERPLATE_DESCRIPTION}}
- **`assets/images/`**: {{IMAGES_DESCRIPTION}}

These files are used in output but not loaded into context unless specifically needed.

## Requirements

{{REQUIREMENTS_SECTION}}

## Best Practices

{{BEST_PRACTICES}}

## Troubleshooting

{{TROUBLESHOOTING_SECTION}}

## Advanced Usage

For advanced patterns and workflows, consult:
- [references/advanced-patterns.md](references/advanced-patterns.md)
- [references/performance-tuning.md](references/performance-tuning.md)

## Additional Resources

- {{RESOURCE_1}}
- {{RESOURCE_2}}
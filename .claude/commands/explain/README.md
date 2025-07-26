# Explanation Commands

Commands focused on making AI decision-making transparent and understandable.

## Trust Through Clarity

These commands implement Franck Hoffmann's principle that "trust isn't abstract—it's built on structure," specifically through clarity: "Do I understand what just happened, and why?"

## Available Commands

### `/explain:command-trace`
Show detailed execution trace and reasoning for any command or system action.

**Use when:**
- You need to understand how a command executed
- Debugging unexpected behavior  
- Building trust in system reliability
- Learning system decision patterns

**Example:**
```bash
/explain:command-trace /project:code-review auth-module
```

### `/explain:decision-reasoning`
Explain why specific actions, choices, or recommendations were made by the system.

**Use when:**
- Understanding AI recommendation logic
- Evaluating whether to trust a suggestion
- Learning system decision criteria
- Building mental models of AI behavior

**Example:**
```bash
/explain:decision-reasoning "Why recommend React over Vue?"
```

## Design Principles

### Transparency Over Perfection
- Show reasoning even when uncertain
- Admit limitations and assumptions
- Make confidence levels visible
- Explain both logical and intuitive factors

### Understanding Over Information
- Focus on building user mental models
- Provide context and background
- Use analogies and examples
- Enable follow-up questions

### Agency Preservation
- Help users make informed decisions
- Show alternative interpretations
- Enable meaningful disagreement
- Maintain user control over final choices

## Integration with Trust Framework

These commands work with:
- **Trust Builder Agent**: Documents explanation success stories
- **Agency Guardian**: Ensures explanations preserve user control
- **All other agents**: Enhanced to provide reasoning by default

## Usage Patterns

### Learning Mode
Use explanation commands to understand system behavior:
```bash
/project:security-audit
/explain:command-trace (to understand the audit process)
/explain:decision-reasoning (to understand findings)
```

### Trust Calibration
Build appropriate confidence in system capabilities:
```bash
/explain:decision-reasoning "Why confidence level 8.5/10?"
```

### Debugging and Improvement
Understand unexpected results:
```bash
/explain:command-trace unexpected-result
```

---

*These commands implement AI-era design principles focused on building trust through radical transparency and user understanding.*
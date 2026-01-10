# Rust Commands

Commands for Rust development, clean architecture auditing, and Tauri application development.

**Author:** Quintin Henry (https://github.com/qdhenry/)

## Clean Architecture Audit Commands

| Command | Description |
|---------|-------------|
| `/rust:audit-clean-arch` | Comprehensive audit of Rust codebase against Clean Architecture principles |
| `/rust:audit-dependencies` | Deep-dive audit of dependency direction (Dependency Rule compliance) |
| `/rust:audit-layer-boundaries` | Analyze layer boundary definitions and identify mixed responsibilities |
| `/rust:audit-ports-adapters` | Audit Ports & Adapters (Hexagonal) pattern implementation |
| `/rust:suggest-refactor` | Actionable refactoring suggestions with prioritized recommendations |

## Setup Commands

| Command | Description |
|---------|-------------|
| `/rust:setup-tauri-mcp` | Install and configure the tauri-mcp MCP server for Claude Code |

## Usage

### Full Architecture Audit
```bash
# Run comprehensive clean architecture audit
/rust:audit-clean-arch

# Focus on specific path
/rust:audit-clean-arch src/core/
```

### Dependency Analysis
```bash
# Audit all dependencies for Dependency Rule violations
/rust:audit-dependencies

# Focus on application layer
/rust:audit-dependencies src/application/
```

### Layer Boundary Check
```bash
# Check layer separation and mixed responsibilities
/rust:audit-layer-boundaries
```

### Ports & Adapters Pattern
```bash
# Audit hexagonal architecture implementation
/rust:audit-ports-adapters repositories
```

### Get Refactoring Suggestions
```bash
# All suggestions
/rust:suggest-refactor

# Only critical issues
/rust:suggest-refactor --critical
```

## Clean Architecture Reference

```
Infrastructure → Adapters → Application → Domain
     ↓              ↓            ↓           ↓
   May use      May use      May use    Uses NOTHING
   anything    App+Domain    Domain      external
```

**The Dependency Rule:** Dependencies may only point INWARD toward the domain layer.

## Related Commands

- `/tauri:*` - Tauri desktop application interaction commands

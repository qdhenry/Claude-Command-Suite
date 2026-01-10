---
name: rust:audit-clean-arch
description: Comprehensive audit of Rust codebase against Clean Architecture principles, identifying violations and improvement opportunities
allowed-tools: Read, Grep, Glob, Bash
author: Quintin Henry (https://github.com/qdhenry/)
---

# Audit Clean Architecture Compliance

Perform a comprehensive audit of a Rust codebase against Clean Architecture principles, identifying violations, anti-patterns, and improvement opportunities.

## Instructions

Audit the Rust codebase for clean architecture compliance: **$ARGUMENTS**

> **Note:** `$ARGUMENTS` can specify a path, specific concerns, or be empty for full audit.
> Examples:
> - `/rust:audit-clean-arch` - Full audit of current directory
> - `/rust:audit-clean-arch src/` - Audit specific path
> - `/rust:audit-clean-arch --focus dependencies` - Focus on dependency violations

---

## Clean Architecture Reference

```
┌─────────────────────────────────────────────────────────────┐
│                     Infrastructure                          │
│  (Setup, Config, DB Pools, Environment, Third-party Deps)  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    Adapters                           │  │
│  │  (HTTP Handlers, Persistence Impl, Crypto, Gateways)  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │               Application                        │  │  │
│  │  │  (Use Cases, Ports/Traits, App Errors)          │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │              Domain                        │  │  │  │
│  │  │  │  (Entities, Domain Services, Value Objs)  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

THE DEPENDENCY RULE: Dependencies may only point INWARD
- Domain depends on NOTHING external
- Application depends only on Domain
- Adapters depend on Application (and implement its ports)
- Infrastructure depends on all inner layers (for wiring)
```

---

## Phase 1: Structure Discovery

### 1.1 Identify Project Layout

First, map the codebase structure to identify layers:

```bash
# Find all Rust source files
find . -name "*.rs" -type f | head -50

# Look for common clean architecture patterns
ls -la src/

# Check for layer directories
for dir in domain application adapters infrastructure core lib api handlers services; do
  [ -d "src/$dir" ] && echo "Found: src/$dir"
done
```

### 1.2 Identify Layer Mapping

Map discovered directories to architectural layers:

| Layer | Common Directory Names |
|-------|----------------------|
| **Domain** | `domain/`, `entities/`, `models/`, `core/domain/` |
| **Application** | `application/`, `use_cases/`, `usecases/`, `services/` (business), `core/` |
| **Adapters** | `adapters/`, `api/`, `handlers/`, `controllers/`, `repositories/`, `persistence/`, `http/`, `grpc/` |
| **Infrastructure** | `infrastructure/`, `infra/`, `config/`, `db/`, `main.rs` setup code |

**Document the mapping:**
```markdown
## Layer Mapping for This Codebase

- Domain: `src/???`
- Application: `src/???`
- Adapters: `src/???`
- Infrastructure: `src/???`
- Unclear/Mixed: `src/???`
```

---

## Phase 2: Dependency Direction Audit

### 2.1 Analyze Module Dependencies

For each layer, check what it imports:

```bash
# Check domain layer imports (should be minimal)
grep -rn "^use " src/domain/ 2>/dev/null | grep -v "use crate::domain" | grep -v "use std::" | grep -v "use uuid::"

# Check application layer imports (should only use domain)
grep -rn "^use crate::" src/application/ 2>/dev/null

# Check adapters imports (should use application, not domain directly for business logic)
grep -rn "^use crate::" src/adapters/ 2>/dev/null
```

### 2.2 Dependency Violation Checklist

**CRITICAL VIOLATIONS (Red Flags):**

| Violation | Pattern to Find | Severity |
|-----------|-----------------|----------|
| Domain imports adapters | `use crate::adapters` in domain/ | CRITICAL |
| Domain imports infrastructure | `use crate::infrastructure` in domain/ | CRITICAL |
| Domain imports application | `use crate::application` in domain/ | CRITICAL |
| Application imports adapters | `use crate::adapters` in application/ | HIGH |
| Application imports infrastructure | `use crate::infrastructure` in application/ | HIGH |
| Domain depends on web framework | `use axum`, `use actix`, `use rocket` in domain/ | CRITICAL |
| Domain depends on DB | `use sqlx`, `use diesel`, `use sea_orm` in domain/ | CRITICAL |

### 2.3 Cargo.toml Analysis

Check if dependencies are properly scoped:

```bash
# Review Cargo.toml for dependency placement
cat Cargo.toml

# Check for feature flags that might isolate dependencies
grep -A5 "\[features\]" Cargo.toml
```

**Ideal Dependency Separation:**
- Domain crate: Only `uuid`, `chrono`, `thiserror` (minimal)
- Application crate: Domain + `async-trait`
- Adapters crate: Application + framework deps (`axum`, `sqlx`, `serde`)
- Infrastructure: All dependencies for wiring

---

## Phase 3: Ports & Adapters Pattern Audit

### 3.1 Port Trait Detection

Look for traits that define boundaries (ports):

```bash
# Find async traits (common for repository ports)
grep -rn "async_trait" src/

# Find trait definitions in application layer
grep -rn "^pub trait" src/application/ 2>/dev/null

# Find trait implementations in adapters
grep -rn "impl.*for" src/adapters/ 2>/dev/null
```

### 3.2 Port Compliance Checklist

| Criteria | Status | Notes |
|----------|--------|-------|
| Repository traits defined in application layer | | |
| External service traits defined in application layer | | |
| Adapters implement application-layer traits | | |
| Use cases depend on trait objects, not concrete types | | |
| Dependency injection via constructor | | |

### 3.3 Anti-Pattern Detection

**Common Anti-Patterns:**

```rust
// ANTI-PATTERN: Use case directly using concrete adapter
pub struct RegisterUser {
    repo: PostgresUserRepository,  // BAD: Concrete type
}

// CORRECT: Use case depending on trait
pub struct RegisterUser {
    repo: Arc<dyn UserRepository>,  // GOOD: Trait object
}
```

**Search for violations:**
```bash
# Look for concrete DB types in use cases
grep -rn "Postgres\|Mysql\|Sqlite\|Pool" src/application/ 2>/dev/null

# Look for framework types in application layer
grep -rn "axum::\|actix::\|rocket::" src/application/ 2>/dev/null
```

---

## Phase 4: Entity & Domain Logic Audit

### 4.1 Domain Entity Analysis

Check domain entities for purity:

```bash
# Find structs in domain layer
grep -rn "^pub struct" src/domain/ 2>/dev/null

# Check for framework derives on domain entities
grep -rn "#\[derive" src/domain/ 2>/dev/null
```

### 4.2 Domain Purity Checklist

| Criteria | Status | Notes |
|----------|--------|-------|
| Entities have no framework dependencies | | |
| Entities encapsulate business rules | | |
| Value objects are immutable | | |
| Domain services contain cross-entity logic | | |
| No serialization concerns in domain | | |

**Acceptable Domain Derives:**
```rust
#[derive(Debug, Clone, PartialEq, Eq, Hash)]  // OK
```

**Problematic Domain Derives:**
```rust
#[derive(Serialize, Deserialize)]  // BAD: Serialization is adapter concern
#[derive(sqlx::FromRow)]           // BAD: DB concern
#[derive(Validate)]                // QUESTIONABLE: Depends on context
```

### 4.3 Business Logic Placement

Check where business logic lives:

```bash
# Look for business logic in wrong places
grep -rn "if.*&&\|match\|fn.*validate\|fn.*calculate" src/adapters/ 2>/dev/null
```

**Business logic should be in:**
- Domain entities (entity-specific rules)
- Domain services (cross-entity rules)
- Application use cases (orchestration)

**NOT in:**
- HTTP handlers
- Database repositories
- Serializers/deserializers

---

## Phase 5: Use Case Analysis

### 5.1 Use Case Structure Audit

```bash
# Find use case definitions
grep -rn "pub struct.*UseCase\|pub struct.*Service\|pub async fn execute" src/application/ 2>/dev/null
```

### 5.2 Use Case Checklist

| Criteria | Status | Notes |
|----------|--------|-------|
| Use cases are single-purpose | | |
| Use cases accept trait dependencies | | |
| Use cases return domain types or app errors | | |
| No HTTP/serialization concerns in use cases | | |
| Use cases are testable in isolation | | |

### 5.3 Use Case Anti-Patterns

```rust
// ANTI-PATTERN: Use case with HTTP concerns
pub async fn execute(&self, req: HttpRequest) -> HttpResponse { ... }

// CORRECT: Use case with domain types
pub async fn execute(&self, username: String, password: String) -> Result<User, AppError> { ... }
```

---

## Phase 6: Error Handling Audit

### 6.1 Error Type Analysis

```bash
# Find error definitions
grep -rn "enum.*Error\|struct.*Error" src/ | grep -v target/
```

### 6.2 Error Layering Checklist

| Layer | Error Type | Converts To |
|-------|-----------|-------------|
| Domain | `DomainError` | - |
| Application | `AppError` | Contains domain errors |
| Adapters | `AdapterError` → HTTP Status | Converts from AppError |

**Check for proper error conversion:**
```bash
# Look for From implementations
grep -rn "impl From<.*Error>" src/
```

---

## Phase 7: Generate Audit Report

### 7.1 Report Template

```markdown
# Clean Architecture Audit Report

**Project:** [Name]
**Date:** [Date]
**Auditor:** Claude

## Executive Summary

- **Overall Compliance:** [Score/10]
- **Critical Violations:** [Count]
- **High Priority Issues:** [Count]
- **Improvement Opportunities:** [Count]

## Layer Mapping

| Layer | Directory | Compliance |
|-------|-----------|------------|
| Domain | `src/???` | |
| Application | `src/???` | |
| Adapters | `src/???` | |
| Infrastructure | `src/???` | |

## Dependency Violations

### Critical
1. [File:Line] - [Description]

### High Priority
1. [File:Line] - [Description]

## Port/Adapter Issues

1. [Issue description]

## Domain Purity Issues

1. [Issue description]

## Recommendations

### Immediate Actions
1. [Action]

### Short-term Improvements
1. [Action]

### Long-term Refactoring
1. [Action]

## Code Examples

### Current (Anti-pattern)
```rust
// problematic code
```

### Recommended
```rust
// improved code
```
```

---

## Quick Reference: Violation Severity

| Severity | Description | Action |
|----------|-------------|--------|
| **CRITICAL** | Domain depends on outer layers | Fix immediately |
| **HIGH** | Application depends on adapters/infra | Fix soon |
| **MEDIUM** | Missing port abstraction | Plan refactor |
| **LOW** | Impure domain derives | Consider cleanup |
| **INFO** | Style/organization suggestions | Optional |

---

## Usage Examples

```bash
# Full audit
/rust:audit-clean-arch

# Audit specific path
/rust:audit-clean-arch src/core/

# Focus on specific concern
/rust:audit-clean-arch --focus dependencies
/rust:audit-clean-arch --focus ports
/rust:audit-clean-arch --focus domain-purity
```

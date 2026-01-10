---
name: rust:audit-layer-boundaries
description: Analyze layer boundary definitions in Rust codebases, identifying mixed responsibilities and violations
allowed-tools: Read, Grep, Glob, Bash
author: Quintin Henry (https://github.com/qdhenry/)
---

# Audit Layer Boundaries

Analyze how well-defined the architectural layer boundaries are in a Rust codebase, identifying mixed responsibilities, unclear separation, and boundary violations.

## Instructions

Audit layer boundaries in the codebase: **$ARGUMENTS**

> **Note:** `$ARGUMENTS` can specify a path or focus area.
> Examples:
> - `/rust:audit-layer-boundaries` - Full boundary audit
> - `/rust:audit-layer-boundaries src/core/` - Focus on specific path

---

## Layer Responsibility Reference

| Layer | Responsibility | Should NOT Contain |
|-------|---------------|-------------------|
| **Domain** | Entities, value objects, domain services, business rules | Serialization, HTTP, DB queries, config |
| **Application** | Use cases, orchestration, port definitions, app errors | HTTP handlers, DB implementations, framework types |
| **Adapters** | HTTP handlers, DB repositories, external API clients, serialization | Business logic, configuration setup |
| **Infrastructure** | App startup, config loading, DB pools, dependency wiring | Business logic, HTTP handling |

---

## Phase 1: Identify Layer Structure

### 1.1 Discover Project Organization

```bash
# List top-level source structure
ls -la src/

# Find all modules
find src -name "mod.rs" -o -name "lib.rs" | head -20

# Check for layer-like directories
for pattern in domain application adapters infrastructure core lib api handlers services controllers repositories; do
  found=$(find src -type d -name "$pattern" 2>/dev/null)
  [ -n "$found" ] && echo "Layer candidate: $found"
done
```

### 1.2 Document Layer Mapping

```markdown
## Current Layer Structure

| Identified Directory | Mapped Layer | Confidence |
|---------------------|--------------|------------|
| `src/???` | Domain | High/Medium/Low |
| `src/???` | Application | High/Medium/Low |
| `src/???` | Adapters | High/Medium/Low |
| `src/???` | Infrastructure | High/Medium/Low |
| `src/???` | UNCLEAR | - |
```

---

## Phase 2: Domain Layer Boundary Audit

### 2.1 Domain Purity Check

The domain should contain ONLY business logic.

```bash
# Find all files in domain layer
find src/domain -name "*.rs" 2>/dev/null

# Check each file for boundary violations
for file in $(find src/domain -name "*.rs" 2>/dev/null); do
  echo "=== $file ==="

  # Check for HTTP concerns
  grep -n "HttpResponse\|StatusCode\|axum::\|actix::\|Request\|Response" "$file"

  # Check for DB concerns
  grep -n "sqlx::\|diesel::\|query!\|execute\|Pool\|Connection" "$file"

  # Check for serialization in struct definitions
  grep -n "Serialize\|Deserialize\|Json<" "$file"
done
```

### 2.2 Domain Should Contain

```rust
// GOOD: Domain content
pub struct User { ... }              // Entities
pub struct Email(String);            // Value objects
pub fn validate_email(s: &str) -> bool { ... }  // Domain rules
pub trait DomainService { ... }      // Domain services
pub enum DomainError { ... }         // Domain errors
```

### 2.3 Domain Should NOT Contain

```rust
// BAD: HTTP in domain
#[derive(Deserialize)]               // Serialization concern
pub struct CreateUserRequest { ... }

// BAD: DB in domain
#[derive(sqlx::FromRow)]             // Persistence concern
pub struct User { ... }

// BAD: Framework types in domain
pub fn handler(req: HttpRequest) { ... }
```

---

## Phase 3: Application Layer Boundary Audit

### 3.1 Application Layer Content Check

```bash
# Find application layer files
find src/application -name "*.rs" 2>/dev/null

# Check for misplaced responsibilities
for file in $(find src/application -name "*.rs" 2>/dev/null); do
  echo "=== $file ==="

  # HTTP concerns (should be in adapters)
  grep -n "HttpResponse\|StatusCode\|Json<\|Path<\|Query<" "$file"

  # Direct DB queries (should use repository trait)
  grep -n "sqlx::query\|diesel::\|\.execute(\|\.fetch" "$file"

  # Framework routing
  grep -n "Router\|route\|get\|post\|put\|delete" "$file"
done
```

### 3.2 Application Should Contain

```rust
// GOOD: Application content
pub struct RegisterUser { ... }      // Use cases
pub trait UserRepository { ... }     // Port traits
pub enum AppError { ... }            // Application errors
pub async fn execute(&self) { ... }  // Use case execution
```

### 3.3 Application Should NOT Contain

```rust
// BAD: HTTP handlers in application
pub async fn register_handler(Json(body): Json<...>) -> impl IntoResponse { ... }

// BAD: Direct DB access
let user = sqlx::query!("SELECT * FROM users").fetch_one(&pool).await?;

// BAD: Concrete adapter types
pub struct RegisterUser {
    db: PgPool,  // Should be trait object
}
```

---

## Phase 4: Adapters Layer Boundary Audit

### 4.1 Adapter Content Check

```bash
# Find adapter layer files
find src/adapters -name "*.rs" 2>/dev/null

# Check for business logic leakage
for file in $(find src/adapters -name "*.rs" 2>/dev/null); do
  echo "=== $file ==="

  # Complex business logic (should be in application/domain)
  grep -n "if.*&&.*&&\|match.*=>" "$file" | head -5

  # Business validation (should be in domain)
  grep -n "validate\|is_valid\|check_" "$file"
done
```

### 4.2 Adapters Should Contain

```rust
// GOOD: Adapter content
impl UserRepository for PostgresUserRepository { ... }  // Port implementations
pub async fn register_handler(...) -> impl IntoResponse { ... }  // HTTP handlers
pub fn app_error_to_response(e: AppError) -> Response { ... }  // Error conversion
pub struct CreateUserDto { ... }     // DTOs with serialization
```

### 4.3 Adapters Should NOT Contain

```rust
// BAD: Business logic in adapter
pub async fn register_handler(...) {
    // Business rules should be in use case
    if password.len() < 8 { return Err(...) }
    if !email.contains('@') { return Err(...) }
    // ...
}

// BAD: Multiple responsibilities
pub async fn create_user_and_send_email_and_log(...) { ... }
```

---

## Phase 5: Infrastructure Layer Boundary Audit

### 5.1 Infrastructure Content Check

```bash
# Find infrastructure/main.rs
cat src/main.rs 2>/dev/null | head -100
find src/infrastructure -name "*.rs" 2>/dev/null
```

### 5.2 Infrastructure Should Contain

```rust
// GOOD: Infrastructure content
fn main() { ... }                    // Entry point
pub fn load_config() { ... }         // Configuration
pub async fn create_pool() { ... }   // Database setup
pub fn create_app_state() { ... }    // Dependency injection
tracing_subscriber::init();          // Telemetry setup
```

### 5.3 Infrastructure Should NOT Contain

```rust
// BAD: Business logic in main.rs
fn main() {
    // Business rules don't belong here
    if user.is_admin() { ... }
}

// BAD: HTTP handlers in infrastructure
pub async fn health_check() -> &'static str { "OK" }  // Should be in adapters
```

---

## Phase 6: Cross-Cutting Concern Analysis

### 6.1 Check for Mixed Files

Files that mix multiple layers are red flags:

```bash
# Look for files with both HTTP and DB
for file in $(find src -name "*.rs"); do
  has_http=$(grep -l "axum::\|actix::\|HttpResponse" "$file" 2>/dev/null)
  has_db=$(grep -l "sqlx::\|diesel::\|query!" "$file" 2>/dev/null)

  if [ -n "$has_http" ] && [ -n "$has_db" ]; then
    echo "MIXED CONCERNS: $file"
  fi
done
```

### 6.2 Check Module Cohesion

```bash
# Files with too many imports from different layers
for file in $(find src -name "*.rs"); do
  layer_count=0
  grep -q "crate::domain" "$file" && ((layer_count++))
  grep -q "crate::application" "$file" && ((layer_count++))
  grep -q "crate::adapters" "$file" && ((layer_count++))
  grep -q "crate::infrastructure" "$file" && ((layer_count++))

  if [ $layer_count -gt 2 ]; then
    echo "HIGH COUPLING: $file imports $layer_count layers"
  fi
done
```

---

## Phase 7: Generate Boundary Report

### 7.1 Report Template

```markdown
# Layer Boundary Audit Report

**Project:** [Name]
**Date:** [Date]

## Layer Identification

| Directory | Layer | Clarity Score |
|-----------|-------|---------------|
| `src/domain/` | Domain | 8/10 |
| `src/application/` | Application | 7/10 |
| `src/adapters/` | Adapters | 6/10 |
| `src/main.rs` | Infrastructure | 9/10 |

## Boundary Violations

### Domain Layer
- [ ] Contains serialization derives: `src/domain/user.rs:5`
- [ ] Contains DB attributes: (none found)

### Application Layer
- [ ] Contains HTTP types: `src/application/register.rs:12`
- [ ] Contains direct DB access: (none found)

### Adapters Layer
- [ ] Contains business logic: `src/adapters/http/handlers.rs:45-60`

### Infrastructure Layer
- [ ] Contains handlers: (none found)

## Recommendations

1. Move serialization derives from domain to adapter DTOs
2. Extract business logic from handler to use case
3. Define port trait for external service

## Boundary Clarity Score: 7/10
```

---

## Quick Boundary Check Commands

```bash
# Domain purity
echo "=== Domain HTTP/DB violations ===" && \
grep -rn "axum::\|sqlx::\|Serialize\|Deserialize" src/domain/ 2>/dev/null

# Application purity
echo "=== Application HTTP violations ===" && \
grep -rn "axum::\|actix::\|Json<\|HttpResponse" src/application/ 2>/dev/null

# Business logic in adapters
echo "=== Potential logic in adapters ===" && \
grep -rn "if.*validate\|match.*Error" src/adapters/ 2>/dev/null | head -10
```

---

## Usage

```bash
/rust:audit-layer-boundaries
/rust:audit-layer-boundaries src/
```

---
name: rust:audit-ports-adapters
description: Audit Ports and Adapters (Hexagonal Architecture) pattern implementation in Rust codebases
allowed-tools: Read, Grep, Glob, Bash
author: Quintin Henry (https://github.com/qdhenry/)
---

# Audit Ports & Adapters Pattern

Analyze the implementation of the Ports & Adapters (Hexagonal Architecture) pattern in a Rust codebase, checking for proper trait definitions, dependency inversion, and adapter implementations.

## Instructions

Audit ports and adapters implementation: **$ARGUMENTS**

> **Note:** `$ARGUMENTS` can specify focus areas.
> Examples:
> - `/rust:audit-ports-adapters` - Full audit
> - `/rust:audit-ports-adapters repositories` - Focus on repository ports

---

## Ports & Adapters Concept

```
                    ┌─────────────────────┐
                    │     Application     │
                    │                     │
    ┌───────────────┤  ┌─────────────┐   ├───────────────┐
    │               │  │  Use Cases  │   │               │
    │   Driving     │  │             │   │    Driven     │
    │   Adapters    │  │  ┌───────┐  │   │    Adapters   │
    │               │  │  │ Ports │  │   │               │
    │  (HTTP, CLI,  │──│──│(traits)│──│───│  (DB, APIs,  │
    │   gRPC, etc.) │  │  └───────┘  │   │   Email, etc.)│
    │               │  │             │   │               │
    └───────────────┤  └─────────────┘   ├───────────────┘
                    │                     │
                    └─────────────────────┘

Ports = Trait definitions in Application layer
Adapters = Implementations of those traits
```

**Key Principle:** Use cases depend on PORT TRAITS, not concrete adapters.

---

## Phase 1: Port Discovery

### 1.1 Find Port Trait Definitions

Ports should be defined in the application layer:

```bash
# Find async traits (common for ports)
grep -rn "#\[async_trait\]" src/ --include="*.rs"

# Find trait definitions in application layer
grep -rn "^pub trait\|^trait" src/application/ 2>/dev/null

# Common port naming patterns
grep -rn "trait.*Repository\|trait.*Service\|trait.*Port\|trait.*Gateway" src/ --include="*.rs"
```

### 1.2 Port Location Audit

**Ports MUST be defined in the application layer, NOT in adapters:**

```bash
# CORRECT: Ports in application
grep -rn "^pub trait" src/application/ 2>/dev/null

# VIOLATION: Ports defined in adapters
grep -rn "^pub trait" src/adapters/ 2>/dev/null
```

### 1.3 Document Discovered Ports

```markdown
## Discovered Ports

| Port Trait | Location | Purpose | Status |
|------------|----------|---------|--------|
| `UserRepository` | `src/application/ports/` | User persistence | ✓ Correct |
| `PasswordHasher` | `src/application/ports/` | Cryptography | ✓ Correct |
| `EmailService` | `src/adapters/email/` | Email sending | Wrong location |
```

---

## Phase 2: Port Quality Analysis

### 2.1 Check Port Trait Design

Good ports should:
- Use domain types in signatures
- Be async for I/O operations
- Have clear, focused responsibilities

```bash
# Extract port trait definitions
grep -A20 "^pub trait.*Repository\|^pub trait.*Service\|^pub trait.*Port" src/application/ 2>/dev/null
```

### 2.2 Port Design Checklist

| Criteria | Status | Notes |
|----------|--------|-------|
| Uses domain types (not DTOs) | | |
| Async for I/O operations | | |
| Single responsibility | | |
| No framework types in signature | | |
| Error types are domain/app errors | | |

### 2.3 Good vs Bad Port Examples

```rust
// GOOD PORT: Uses domain types, async, focused
#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn save(&self, user: &User) -> Result<(), RepositoryError>;
    async fn find_by_id(&self, id: Uuid) -> Result<Option<User>, RepositoryError>;
}

// BAD PORT: Framework types, too broad
pub trait UserRepository {
    fn save(&self, pool: &PgPool, user: Json<UserDto>) -> HttpResult<()>;  // Framework leakage!
    fn find_by_id(&self, ...) -> ...;
    fn delete(&self, ...) -> ...;
    fn update(&self, ...) -> ...;
    fn list_all(&self, ...) -> ...;  // Too many responsibilities?
}
```

---

## Phase 3: Adapter Discovery

### 3.1 Find Adapter Implementations

```bash
# Find trait implementations in adapters
grep -rn "impl.*for" src/adapters/ 2>/dev/null

# Specifically find port implementations
grep -rn "impl.*Repository.*for\|impl.*Service.*for\|impl.*Port.*for\|impl.*Gateway.*for" src/adapters/ 2>/dev/null
```

### 3.2 Map Ports to Adapters

```markdown
## Port-Adapter Mapping

| Port | Adapter(s) | Location | Status |
|------|-----------|----------|--------|
| `UserRepository` | `PostgresUserRepository` | `src/adapters/persistence/` | ✓ |
| `UserRepository` | `InMemoryUserRepository` | `src/adapters/persistence/` | ✓ (testing) |
| `PasswordHasher` | `Argon2Hasher` | `src/adapters/crypto/` | ✓ |
| `EmailService` | ??? | ??? | No adapter found |
```

### 3.3 Check Adapter Completeness

```bash
# For each port, verify an adapter exists
for port in $(grep -roh "trait \w*Repository\|trait \w*Service\|trait \w*Port" src/application/ 2>/dev/null | cut -d' ' -f2); do
  echo "Port: $port"
  impl_count=$(grep -rn "impl.*$port.*for" src/adapters/ 2>/dev/null | wc -l)
  echo "  Implementations found: $impl_count"
done
```

---

## Phase 4: Dependency Inversion Check

### 4.1 Use Case Dependency Analysis

Use cases should depend on trait objects, not concrete types:

```bash
# Find use case structs
grep -A10 "^pub struct.*UseCase\|^pub struct.*Service\|^struct.*UseCase" src/application/ 2>/dev/null

# Look for Arc<dyn Trait> patterns (good)
grep -rn "Arc<dyn" src/application/ 2>/dev/null

# Look for concrete adapter types (bad)
grep -rn "Postgres\|Mysql\|Redis\|Argon2\|Bcrypt" src/application/ 2>/dev/null
```

### 4.2 Dependency Inversion Checklist

| Use Case | Dependencies | Inverted? |
|----------|-------------|-----------|
| `RegisterUser` | `Arc<dyn UserRepository>` | ✓ Yes |
| `LoginUser` | `PostgresUserRepository` | No - concrete! |

### 4.3 Good vs Bad Dependency Injection

```rust
// GOOD: Depends on trait, injected via constructor
pub struct RegisterUser {
    user_repo: Arc<dyn UserRepository>,
    hasher: Arc<dyn PasswordHasher>,
}

impl RegisterUser {
    pub fn new(
        user_repo: Arc<dyn UserRepository>,
        hasher: Arc<dyn PasswordHasher>,
    ) -> Self {
        Self { user_repo, hasher }
    }
}

// BAD: Depends on concrete type
pub struct RegisterUser {
    user_repo: PostgresUserRepository,  // Concrete!
    hasher: Argon2Hasher,               // Concrete!
}

// BAD: Creates dependencies internally
pub struct RegisterUser {
    pool: PgPool,
}

impl RegisterUser {
    pub async fn execute(&self, ...) {
        let repo = PostgresUserRepository::new(self.pool.clone());  // Creates internally!
        // ...
    }
}
```

---

## Phase 5: Testability Analysis

### 5.1 Check for Test Mocks

Proper ports & adapters enables easy testing with mocks:

```bash
# Find mock implementations
grep -rn "Mock\|mock\|Fake\|fake\|InMemory\|Stub" src/ tests/ 2>/dev/null | grep -i "impl\|struct"

# Check if tests use mocks
grep -rn "Mock\|InMemory" tests/ 2>/dev/null
```

### 5.2 Testability Score

| Aspect | Score | Notes |
|--------|-------|-------|
| Mock implementations exist | /10 | |
| Use cases have unit tests | /10 | |
| Tests don't require DB | /10 | |
| Tests are fast | /10 | |

### 5.3 Test Example Verification

```bash
# Check if use case tests mock dependencies
grep -A30 "#\[tokio::test\]\|#\[test\]" src/application/ 2>/dev/null
```

---

## Phase 6: Driving Adapters Analysis

### 6.1 Find Driving Adapters (Inbound)

Driving adapters call INTO the application (HTTP handlers, CLI, etc.):

```bash
# HTTP handlers
find src -path "*adapters*" -name "*.rs" -exec grep -l "async fn.*handler\|async fn.*route\|Router" {} \;

# Check they call use cases
grep -rn "use_case\|UseCase\|Service" src/adapters/http/ 2>/dev/null
```

### 6.2 Driving Adapter Checklist

| Adapter | Calls Use Case? | Handles Conversion? |
|---------|-----------------|---------------------|
| HTTP handlers | | |
| CLI commands | | |
| gRPC handlers | | |

### 6.3 Good Driving Adapter Pattern

```rust
// GOOD: Handler calls use case, converts types
pub async fn register_handler(
    State(state): State<AppState>,
    Json(dto): Json<RegisterDto>,
) -> impl IntoResponse {
    // Convert DTO to domain types
    let result = state.register_user
        .execute(dto.username, dto.password)
        .await;

    // Convert result to HTTP response
    match result {
        Ok(user) => (StatusCode::CREATED, Json(UserResponse::from(user))),
        Err(e) => e.into_response(),
    }
}
```

---

## Phase 7: Generate Audit Report

### 7.1 Report Template

```markdown
# Ports & Adapters Audit Report

**Project:** [Name]
**Date:** [Date]

## Port Inventory

| Port | Location | Methods | Status |
|------|----------|---------|--------|
| `UserRepository` | application/ports | 3 | ✓ |
| `PasswordHasher` | application/ports | 2 | ✓ |

## Adapter Inventory

| Port | Adapter | Type | Status |
|------|---------|------|--------|
| `UserRepository` | `PostgresUserRepository` | Driven | ✓ |
| `UserRepository` | `MockUserRepository` | Test | ✓ |
| `PasswordHasher` | `Argon2Hasher` | Driven | ✓ |

## Dependency Inversion

| Use Case | Properly Inverted? |
|----------|--------------------|
| `RegisterUser` | ✓ Yes |
| `LoginUser` | Partial |

## Issues Found

### HIGH
1. `EmailService` port has no adapter implementation
2. `LoginUser` depends on concrete `PostgresUserRepository`

### MEDIUM
1. `UserRepository` port defined in adapters, should be in application

## Testability Score: 7/10

## Recommendations

1. Move port definitions to application layer
2. Replace concrete dependencies with trait objects
3. Add mock implementations for testing
```

---

## Quick Audit Commands

```bash
# Find all ports
echo "=== PORTS ===" && \
grep -rn "^pub trait.*:\s*Send\|#\[async_trait\]" src/application/ 2>/dev/null

# Find all adapter implementations
echo "=== ADAPTERS ===" && \
grep -rn "impl.*for.*{" src/adapters/ 2>/dev/null | head -20

# Check dependency inversion
echo "=== DEPENDENCY INVERSION ===" && \
grep -rn "Arc<dyn" src/application/ 2>/dev/null
```

---

## Usage

```bash
/rust:audit-ports-adapters
/rust:audit-ports-adapters repositories
```

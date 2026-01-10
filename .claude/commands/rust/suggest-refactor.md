---
name: rust:suggest-refactor
description: Actionable refactoring suggestions for improving clean architecture compliance in Rust projects
allowed-tools: Read, Grep, Glob, Bash, Edit
author: Quintin Henry (https://github.com/qdhenry/)
---

# Suggest Clean Architecture Refactoring

Analyze a Rust codebase and provide actionable refactoring suggestions to improve clean architecture compliance, with prioritized recommendations and code examples.

## Instructions

Suggest refactoring improvements for: **$ARGUMENTS**

> **Note:** `$ARGUMENTS` can specify focus areas or severity.
> Examples:
> - `/rust:suggest-refactor` - All suggestions
> - `/rust:suggest-refactor --critical` - Only critical issues
> - `/rust:suggest-refactor src/application/` - Focus on specific path

---

## Refactoring Priority Framework

| Priority | Description | When to Fix |
|----------|-------------|-------------|
| **P0 - Critical** | Architecture violations blocking testability/maintainability | Immediately |
| **P1 - High** | Dependency rule violations | This sprint |
| **P2 - Medium** | Missing abstractions, unclear boundaries | Next sprint |
| **P3 - Low** | Style, organization improvements | When touching code |

---

## Phase 1: Identify Current Issues

### 1.1 Run Quick Audit

```bash
# Domain violations
DOMAIN_VIOLATIONS=$(grep -rn "use crate::adapters\|use crate::infrastructure\|use axum\|use sqlx" src/domain/ 2>/dev/null | wc -l)

# Application violations
APP_VIOLATIONS=$(grep -rn "use crate::adapters\|use crate::infrastructure\|use axum\|use sqlx" src/application/ 2>/dev/null | wc -l)

# Missing ports (concrete types in use cases)
CONCRETE_DEPS=$(grep -rn "Postgres\|Mysql\|Redis\|Pool" src/application/ 2>/dev/null | wc -l)

echo "Domain violations: $DOMAIN_VIOLATIONS"
echo "Application violations: $APP_VIOLATIONS"
echo "Concrete dependencies: $CONCRETE_DEPS"
```

### 1.2 Categorize Findings

Group issues by type for prioritized remediation.

---

## Phase 2: P0 - Critical Refactorings

### 2.1 Domain Layer Depends on Outer Layers

**Problem:** Domain imports adapters/infrastructure

**Detection:**
```bash
grep -rn "use crate::adapters\|use crate::infrastructure" src/domain/ 2>/dev/null
```

**Before:**
```rust
// src/domain/user.rs
use crate::adapters::db::UserRow;  // VIOLATION

pub struct User {
    // ...
}

impl From<UserRow> for User {
    fn from(row: UserRow) -> Self {
        // Conversion logic
    }
}
```

**After:**
```rust
// src/domain/user.rs
pub struct User {
    // Pure domain entity
}

// Move conversion to adapter
// src/adapters/persistence/user_mapper.rs
use crate::domain::User;

pub fn row_to_user(row: UserRow) -> User {
    User { /* ... */ }
}
```

**Refactoring Steps:**
1. Remove adapter imports from domain
2. Move conversion logic to adapter layer
3. Ensure domain only has inward dependencies

---

### 2.2 Application Layer Depends on Concrete Adapters

**Problem:** Use cases depend on concrete implementations instead of traits

**Detection:**
```bash
grep -rn "PostgresUserRepository\|Argon2Hasher\|RedisCache" src/application/ 2>/dev/null
```

**Before:**
```rust
// src/application/use_cases/register_user.rs
use crate::adapters::persistence::PostgresUserRepository;
use crate::adapters::crypto::Argon2Hasher;

pub struct RegisterUser {
    repo: PostgresUserRepository,  // Concrete!
    hasher: Argon2Hasher,          // Concrete!
}
```

**After:**
```rust
// src/application/ports/mod.rs
#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn save(&self, user: &User) -> Result<(), RepositoryError>;
    async fn find_by_username(&self, username: &str) -> Result<Option<User>, RepositoryError>;
}

pub trait PasswordHasher: Send + Sync {
    fn hash(&self, password: &str) -> Result<String, HashError>;
}

// src/application/use_cases/register_user.rs
use crate::application::ports::{UserRepository, PasswordHasher};

pub struct RegisterUser {
    repo: Arc<dyn UserRepository>,    // Trait object!
    hasher: Arc<dyn PasswordHasher>,  // Trait object!
}
```

**Refactoring Steps:**
1. Define port traits in `application/ports/`
2. Update use case to depend on `Arc<dyn Trait>`
3. Update adapter to `impl Trait for ConcreteType`
4. Wire dependencies in infrastructure

---

### 2.3 Framework Types in Application Layer

**Problem:** HTTP/DB types leaked into use cases

**Detection:**
```bash
grep -rn "Json<\|HttpResponse\|StatusCode\|Query<\|Path<\|PgPool" src/application/ 2>/dev/null
```

**Before:**
```rust
// src/application/use_cases/register_user.rs
use axum::Json;
use sqlx::PgPool;

pub async fn execute(pool: &PgPool, input: Json<RegisterInput>) -> Result<Json<UserResponse>, Error> {
    // ...
}
```

**After:**
```rust
// src/application/use_cases/register_user.rs
use crate::domain::User;
use crate::application::{AppError, ports::UserRepository};

impl RegisterUser {
    pub async fn execute(&self, username: String, password: String) -> Result<User, AppError> {
        // Pure application logic
    }
}

// Move HTTP concerns to adapter
// src/adapters/http/handlers.rs
pub async fn register_handler(
    State(state): State<AppState>,
    Json(dto): Json<RegisterDto>,
) -> impl IntoResponse {
    match state.register_user.execute(dto.username, dto.password).await {
        Ok(user) => (StatusCode::CREATED, Json(UserResponse::from(user))),
        Err(e) => e.into_response(),
    }
}
```

**Refactoring Steps:**
1. Remove framework imports from application layer
2. Use primitive/domain types in use case signatures
3. Create DTOs in adapter layer
4. Handle conversion in HTTP handlers

---

## Phase 3: P1 - High Priority Refactorings

### 3.1 Missing Port Abstraction

**Problem:** Direct external service calls without trait abstraction

**Detection:**
```bash
grep -rn "reqwest::\|lettre::\|aws_sdk" src/application/ 2>/dev/null
```

**Before:**
```rust
// src/application/use_cases/send_notification.rs
use reqwest::Client;

pub struct SendNotification {
    client: Client,
}

impl SendNotification {
    pub async fn execute(&self, user_id: Uuid, message: &str) -> Result<(), Error> {
        self.client.post("https://api.notifications.com/send")
            .json(&json!({ "user": user_id, "message": message }))
            .send()
            .await?;
        Ok(())
    }
}
```

**After:**
```rust
// src/application/ports/notification_service.rs
#[async_trait]
pub trait NotificationService: Send + Sync {
    async fn send(&self, user_id: Uuid, message: &str) -> Result<(), NotificationError>;
}

// src/application/use_cases/send_notification.rs
pub struct SendNotification {
    notifier: Arc<dyn NotificationService>,
}

// src/adapters/notifications/http_notification_service.rs
pub struct HttpNotificationService {
    client: Client,
    base_url: String,
}

#[async_trait]
impl NotificationService for HttpNotificationService {
    async fn send(&self, user_id: Uuid, message: &str) -> Result<(), NotificationError> {
        // HTTP implementation
    }
}
```

**Refactoring Steps:**
1. Define trait in application/ports
2. Update use case to depend on trait
3. Create adapter implementing the trait
4. Wire in infrastructure

---

### 3.2 Business Logic in Adapters

**Problem:** Validation/business rules in HTTP handlers

**Detection:**
```bash
grep -rn "if.*validate\|if.*len()\|if.*contains\|if.*<.*>" src/adapters/ 2>/dev/null
```

**Before:**
```rust
// src/adapters/http/handlers.rs
pub async fn register_handler(Json(dto): Json<RegisterDto>) -> impl IntoResponse {
    // Business logic in handler!
    if dto.password.len() < 8 {
        return (StatusCode::BAD_REQUEST, "Password too short");
    }
    if !dto.email.contains('@') {
        return (StatusCode::BAD_REQUEST, "Invalid email");
    }
    // ...
}
```

**After:**
```rust
// src/domain/value_objects/email.rs
pub struct Email(String);

impl Email {
    pub fn new(value: &str) -> Result<Self, DomainError> {
        if !value.contains('@') {
            return Err(DomainError::InvalidEmail);
        }
        Ok(Self(value.to_string()))
    }
}

// src/application/use_cases/register_user.rs
impl RegisterUser {
    pub async fn execute(&self, username: String, password: String, email: String) -> Result<User, AppError> {
        // Validation happens here or in domain
        let email = Email::new(&email)?;
        if password.len() < 8 {
            return Err(AppError::PasswordTooShort);
        }
        // ...
    }
}

// src/adapters/http/handlers.rs
pub async fn register_handler(Json(dto): Json<RegisterDto>) -> impl IntoResponse {
    // Handler just delegates
    match state.register_user.execute(dto.username, dto.password, dto.email).await {
        Ok(user) => (StatusCode::CREATED, Json(user.into())),
        Err(e) => e.into_response(),
    }
}
```

---

## Phase 4: P2 - Medium Priority Refactorings

### 4.1 Serialization in Domain Entities

**Problem:** `Serialize`/`Deserialize` derives on domain types

**Detection:**
```bash
grep -rn "#\[derive.*Serialize\|#\[derive.*Deserialize" src/domain/ 2>/dev/null
```

**Before:**
```rust
// src/domain/entities/user.rs
#[derive(Debug, Clone, Serialize, Deserialize)]  // Serialization in domain!
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub password_hash: String,
}
```

**After:**
```rust
// src/domain/entities/user.rs
#[derive(Debug, Clone)]  // Pure domain
pub struct User {
    id: Uuid,
    username: String,
    password_hash: String,
}

// src/adapters/http/dto.rs
#[derive(Serialize)]
pub struct UserResponse {
    pub id: Uuid,
    pub username: String,
    // No password_hash exposed!
}

impl From<User> for UserResponse {
    fn from(user: User) -> Self {
        Self {
            id: user.id(),
            username: user.username().to_string(),
        }
    }
}
```

---

### 4.2 Missing Error Type Layering

**Problem:** Single error type used across all layers

**Detection:**
```bash
grep -rn "pub enum.*Error" src/ | wc -l
# If only 1-2 error types exist, layering may be missing
```

**Recommended Error Structure:**
```rust
// src/domain/errors.rs
pub enum DomainError {
    InvalidEmail,
    InvalidPassword,
}

// src/application/errors.rs
pub enum AppError {
    Domain(DomainError),
    UserNotFound,
    UserAlreadyExists,
    Repository(RepositoryError),
}

// src/adapters/http/error_response.rs
impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        match self {
            AppError::UserNotFound => StatusCode::NOT_FOUND,
            AppError::UserAlreadyExists => StatusCode::CONFLICT,
            // ...
        }
    }
}
```

---

## Phase 5: P3 - Low Priority Improvements

### 5.1 Module Organization

**Suggestion:** Organize by feature within layers

```
src/
├── domain/
│   ├── entities/
│   │   ├── user.rs
│   │   └── order.rs
│   └── services/
├── application/
│   ├── use_cases/
│   │   ├── users/         # Feature grouping
│   │   │   ├── register.rs
│   │   │   └── login.rs
│   │   └── orders/
│   └── ports/
├── adapters/
│   ├── http/
│   │   ├── users/         # Mirror feature grouping
│   │   └── orders/
│   └── persistence/
└── infrastructure/
```

### 5.2 Add Test Infrastructure

**Suggestion:** Create test utilities for mocking

```rust
// src/application/ports/mod.rs
#[cfg(test)]
pub mod mocks {
    pub struct MockUserRepository { /* ... */ }
    pub struct MockPasswordHasher { /* ... */ }
}
```

---

## Phase 6: Generate Refactoring Plan

### 6.1 Prioritized Task List

```markdown
# Clean Architecture Refactoring Plan

## P0 - Critical (Do First)
- [ ] Remove adapter imports from `src/domain/user.rs`
- [ ] Replace `PostgresUserRepository` with trait in `RegisterUser`
- [ ] Remove `axum::Json` from application layer

## P1 - High (This Sprint)
- [ ] Create `NotificationService` port
- [ ] Move validation from handlers to use cases

## P2 - Medium (Next Sprint)
- [ ] Remove `Serialize` from domain entities
- [ ] Add layered error types

## P3 - Low (When Convenient)
- [ ] Reorganize modules by feature
- [ ] Add mock infrastructure
```

---

## Quick Suggestion Commands

```bash
# Find all concrete adapter dependencies in application
echo "=== Replace with traits ===" && \
grep -rn "Postgres\|Redis\|Mysql\|Argon2\|reqwest::" src/application/ 2>/dev/null

# Find framework types in application
echo "=== Move to adapters ===" && \
grep -rn "axum::\|actix::\|Json<\|HttpResponse" src/application/ 2>/dev/null

# Find business logic in adapters
echo "=== Move to application/domain ===" && \
grep -rn "if.*validate\|if.*len()\s*[<>]" src/adapters/ 2>/dev/null
```

---

## Usage

```bash
/rust:suggest-refactor
/rust:suggest-refactor --critical
/rust:suggest-refactor src/application/
```

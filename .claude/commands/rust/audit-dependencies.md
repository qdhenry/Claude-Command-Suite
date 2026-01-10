---
name: rust:audit-dependencies
description: Deep-dive audit of dependency direction ensuring the Dependency Rule is followed in Rust projects
allowed-tools: Read, Grep, Glob, Bash
author: Quintin Henry (https://github.com/qdhenry/)
---

# Audit Dependency Direction

Deep-dive audit of dependency flow in a Rust codebase, ensuring the Dependency Rule is followed: dependencies must only point inward toward the domain layer.

## Instructions

Audit dependency direction in the codebase: **$ARGUMENTS**

> **Note:** `$ARGUMENTS` can specify a path or module to focus on.
> Examples:
> - `/rust:audit-dependencies` - Audit all dependencies
> - `/rust:audit-dependencies src/application/` - Focus on application layer

---

## The Dependency Rule

```
OUTER → INNER (Allowed)
INNER → OUTER (VIOLATION!)

Infrastructure → Adapters → Application → Domain
     ↓              ↓            ↓           ↓
   May use      May use      May use    Uses NOTHING
   anything    App+Domain    Domain      external
```

**Control flow vs Dependency direction:**
- Control flow (runtime): Can go in any direction
- Dependency direction (compile-time): Must point inward ONLY

---

## Phase 1: Map Dependencies

### 1.1 Extract All `use` Statements

```bash
# Extract all crate-internal imports
grep -rhn "^use crate::" src/ --include="*.rs" | sort

# Extract all external imports
grep -rhn "^use [a-z]" src/ --include="*.rs" | grep -v "use crate::" | grep -v "use std::" | grep -v "use self::" | grep -v "use super::" | sort
```

### 1.2 Build Dependency Matrix

Create a matrix showing what each layer imports:

```markdown
## Dependency Matrix

|              | Domain | Application | Adapters | Infrastructure | External |
|--------------|--------|-------------|----------|----------------|----------|
| **Domain**       | ✓      | VIOLATION | VIOLATION | VIOLATION | minimal  |
| **Application**  | ✓      | ✓           | VIOLATION | VIOLATION | limited  |
| **Adapters**     | ✓      | ✓           | ✓            | aware     | yes      |
| **Infrastructure** | ✓    | ✓           | ✓            | ✓            | yes      |
```

---

## Phase 2: Domain Layer Analysis

### 2.1 Domain Dependencies (Should Be Minimal)

The domain layer should have near-zero external dependencies.

```bash
# Find domain directory (common names)
DOMAIN_DIR=$(find src -type d \( -name "domain" -o -name "entities" -o -name "core" \) | head -1)

# All imports in domain
grep -rhn "^use " $DOMAIN_DIR --include="*.rs" 2>/dev/null
```

### 2.2 Acceptable Domain Imports

```rust
// ACCEPTABLE in domain layer
use std::{...};           // Standard library
use uuid::Uuid;           // Value types
use chrono::{...};        // Date/time types
use thiserror::Error;     // Error derives
use derive_more::{...};   // Derive macros

// NEVER ACCEPTABLE in domain layer
use axum::{...};          // Web frameworks
use sqlx::{...};          // Database
use serde::{...};         // Serialization (debatable)
use crate::adapters::{...};  // Outer layers
use crate::infrastructure::{...};
```

### 2.3 Domain Violation Detection

```bash
# CRITICAL: Domain importing outer layers
grep -rn "use crate::adapters\|use crate::infrastructure\|use crate::application" src/domain/ 2>/dev/null

# CRITICAL: Domain importing frameworks
grep -rn "use axum\|use actix\|use rocket\|use warp" src/domain/ 2>/dev/null

# CRITICAL: Domain importing database
grep -rn "use sqlx\|use diesel\|use sea_orm\|use rusqlite" src/domain/ 2>/dev/null

# WARNING: Domain importing serialization
grep -rn "use serde" src/domain/ 2>/dev/null
```

---

## Phase 3: Application Layer Analysis

### 3.1 Application Dependencies

The application layer should only depend on the domain layer.

```bash
# Find application directory
APP_DIR=$(find src -type d \( -name "application" -o -name "use_cases" -o -name "usecases" -o -name "services" \) | head -1)

# All crate imports in application
grep -rhn "^use crate::" $APP_DIR --include="*.rs" 2>/dev/null
```

### 2.2 Acceptable Application Imports

```rust
// ACCEPTABLE in application layer
use crate::domain::{...};    // Domain types
use std::{...};              // Standard library
use async_trait::async_trait; // Async traits for ports
use thiserror::Error;        // Error types

// NEVER ACCEPTABLE in application layer
use crate::adapters::{...};  // Adapter implementations
use crate::infrastructure::{...}; // Infrastructure
use axum::{...};             // Web framework
use sqlx::{...};             // Database
```

### 3.3 Application Violation Detection

```bash
# HIGH: Application importing adapters
grep -rn "use crate::adapters" src/application/ 2>/dev/null

# HIGH: Application importing infrastructure
grep -rn "use crate::infrastructure" src/application/ 2>/dev/null

# HIGH: Application importing frameworks
grep -rn "use axum\|use actix\|use rocket" src/application/ 2>/dev/null

# HIGH: Application importing DB directly
grep -rn "use sqlx\|use diesel\|use sea_orm" src/application/ 2>/dev/null
```

---

## Phase 4: Adapters Layer Analysis

### 4.1 Adapter Dependencies

Adapters should depend on the application layer (implementing its ports) and can use external frameworks.

```bash
# Find adapter directory
ADAPTER_DIR=$(find src -type d \( -name "adapters" -o -name "handlers" -o -name "api" -o -name "controllers" \) | head -1)

# All crate imports in adapters
grep -rhn "^use crate::" $ADAPTER_DIR --include="*.rs" 2>/dev/null
```

### 4.2 Adapter Import Analysis

```rust
// ACCEPTABLE in adapters layer
use crate::application::{...};  // Ports, use cases, app errors
use crate::domain::{...};       // Domain types (for conversion)
use axum::{...};                // Web framework
use sqlx::{...};                // Database
use serde::{...};               // Serialization

// PATTERN: Adapters implement application ports
impl UserRepository for PostgresUserRepository { ... }
```

### 4.3 Check Adapter-Port Implementation

```bash
# Find trait implementations in adapters
grep -rn "impl.*for" src/adapters/ 2>/dev/null

# Verify they implement application-layer traits
grep -rn "impl.*Repository.*for\|impl.*Service.*for\|impl.*Port.*for" src/adapters/ 2>/dev/null
```

---

## Phase 5: Cargo.toml Analysis

### 5.1 Dependency Audit

```bash
# Review all dependencies
cat Cargo.toml | grep -A100 "\[dependencies\]" | grep -B100 "\[dev-dependencies\]" 2>/dev/null || cat Cargo.toml
```

### 5.2 Workspace Analysis (Multi-Crate)

For workspace projects, check inter-crate dependencies:

```bash
# Find workspace members
grep -A10 "\[workspace\]" Cargo.toml 2>/dev/null

# Check each member's dependencies
for toml in */Cargo.toml; do
  echo "=== $toml ==="
  grep -A50 "\[dependencies\]" "$toml" | head -30
done
```

### 5.3 Ideal Dependency Structure

**Single-Crate Project:**
```toml
[dependencies]
# Domain-safe
uuid = "1.0"
chrono = "0.4"
thiserror = "1.0"

# Application-safe
async-trait = "0.1"

# Adapter/Infrastructure only
axum = "0.7"
sqlx = "0.7"
serde = "1.0"
tokio = "1.0"
```

**Multi-Crate Workspace (Ideal):**
```
my-project/
├── domain/           # uuid, chrono only
├── application/      # domain + async-trait
├── adapters/         # application + frameworks
└── infrastructure/   # all dependencies
```

---

## Phase 6: Generate Violation Report

### 6.1 Violation Categories

```markdown
## Dependency Violations Report

### CRITICAL (Layer Boundary Violations)

| File | Line | Import | Issue |
|------|------|--------|-------|
| src/domain/user.rs | 5 | `use crate::adapters::...` | Domain → Adapters |

### HIGH (Framework Leakage)

| File | Line | Import | Issue |
|------|------|--------|-------|
| src/application/register.rs | 3 | `use axum::...` | Framework in app layer |

### MEDIUM (Potential Issues)

| File | Line | Import | Notes |
|------|------|--------|-------|
| src/domain/user.rs | 2 | `use serde::...` | Serialization in domain |

### INFO (Observations)

- [Observation]
```

### 6.2 Dependency Graph Visualization

```
Domain
  └── (external: uuid, chrono)

Application
  ├── Domain ✓
  └── (external: async-trait)

Adapters
  ├── Application ✓
  ├── Domain ✓ (for type conversion)
  └── (external: axum, sqlx, serde)

Infrastructure
  ├── Adapters ✓
  ├── Application ✓
  └── Domain ✓
```

---

## Quick Commands

```bash
# Find all violations at once
echo "=== CRITICAL: Domain importing outer ===" && \
grep -rn "use crate::adapters\|use crate::infrastructure\|use crate::application" src/domain/ 2>/dev/null

echo "=== HIGH: Application importing adapters/infra ===" && \
grep -rn "use crate::adapters\|use crate::infrastructure" src/application/ 2>/dev/null

echo "=== HIGH: Framework in wrong layer ===" && \
grep -rn "use axum\|use actix\|use sqlx\|use diesel" src/domain/ src/application/ 2>/dev/null
```

---

## Remediation Guide

### Violation: Domain imports outer layer

**Before:**
```rust
// src/domain/user.rs
use crate::adapters::db::UserRow;  // VIOLATION
```

**After:**
```rust
// src/domain/user.rs
// Domain knows nothing about persistence
// Conversion happens in adapter layer
```

### Violation: Application imports adapters

**Before:**
```rust
// src/application/register_user.rs
use crate::adapters::PostgresUserRepo;  // VIOLATION

pub struct RegisterUser {
    repo: PostgresUserRepo,
}
```

**After:**
```rust
// src/application/register_user.rs
use crate::application::ports::UserRepository;  // Port trait

pub struct RegisterUser {
    repo: Arc<dyn UserRepository>,  // Trait object
}
```

### Violation: Framework in application layer

**Before:**
```rust
// src/application/register_user.rs
use axum::Json;  // VIOLATION

pub async fn execute(&self, input: Json<Input>) { ... }
```

**After:**
```rust
// src/application/register_user.rs
// No framework types

pub async fn execute(&self, username: String, password: String) { ... }
```

---

## Usage

```bash
/rust:audit-dependencies
/rust:audit-dependencies src/application/
```

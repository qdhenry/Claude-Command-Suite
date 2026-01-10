---
name: spec-elicitation
model: opus
description: Interview-driven spec development that transforms vague ideas into battle-ready specifications through structured, exhaustive questioning. Use when starting any non-trivial feature to ensure complete understanding before writing code.
author: Quintin Henry (https://github.com/qdhenry/)
---

# Spec Elicitation: Interview-Driven Specification Development

Transform vague ideas into comprehensive, battle-ready specifications through deep, structured interviewing. This command implements "spec-first, interview-driven development" - extracting clarity before writing any code.

## Arguments

- `$ARGUMENTS` - Path to spec file (optional, defaults to `spec.md`)

## The Core Principle

> Most bad implementations don't come from bad code.
> They come from under-specified ideas.

Instead of asking an AI to build, ask it to interview you until your idea is complete.

## Role

You are a senior product manager and technical architect combined. Your job is to interview the user exhaustively until every aspect of their idea is specified. You are:

- **Skeptical** - Don't accept vague answers; push for specifics
- **Thorough** - Cover technical, UX, edge cases, scale, and failure modes
- **Persistent** - Don't stop until the spec is complete
- **Non-obvious** - Ask questions that surface hidden complexity

## Workflow

### Phase 1: Initialization

1. Check if a spec file exists at the provided path (or `spec.md` default)
2. If exists, read the current spec content
3. If not exists, create a minimal placeholder
4. Assess the completeness of the current spec

### Phase 2: Deep Interview

Using AskUserQuestion, systematically explore ALL of these dimensions:

#### Target & Scope
- **User Scale** - Who is this for? Hobbyists, professionals, enterprise?
- **Volume** - How many users/transactions/records at launch? At scale?
- **Geographic Scope** - Single region or global? Regulatory implications?

#### Technical Architecture
- **Data Model** - What entities? Relationships? Constraints?
- **Integration Points** - External APIs? Third-party services? Webhooks?
- **State Management** - Where does state live? How does it synchronize?
- **Persistence** - What must be stored? Retention policies? Backup needs?

#### User Experience
- **Primary Workflows** - What are the 3 most important user journeys?
- **Access Patterns** - How do users discover and navigate features?
- **Notifications** - What events require user attention? Channels?
- **Error States** - How should failures be communicated?

#### Business Logic
- **Rules & Constraints** - What are the business rules? Who enforces them?
- **Edge Cases** - What happens at boundaries? Zero state? Maximum load?
- **Automation Boundaries** - What's automated vs manual? Why?
- **Rollback & Recovery** - How do you undo mistakes?

#### Performance & Reliability
- **Latency Expectations** - What response times are acceptable?
- **Availability Requirements** - 99.9%? Can it have maintenance windows?
- **Degradation Strategy** - What fails gracefully? What's critical path?
- **Observability** - What metrics matter? What logs are essential?

#### Security & Compliance
- **Authentication** - Who can access? How do they prove identity?
- **Authorization** - What can each role do? Principle of least privilege?
- **Data Sensitivity** - PII? Financial? Health data? Encryption needs?
- **Audit Requirements** - What actions need logging? Retention?

#### Future Considerations
- **Extension Points** - Where might this grow? Design for flexibility?
- **Migration Path** - If requirements change, how do you evolve?
- **Deprecation Strategy** - How would you retire this?

### Phase 3: Iterative Refinement

After each answer:
1. Identify follow-up questions surfaced by the response
2. Challenge assumptions - "What if X happened?"
3. Look for contradictions with previous answers
4. Ask "What happens when this goes wrong?"

**CRITICAL: Do NOT stop early.** Continue asking questions until:
- Every dimension above has been explored
- All follow-ups have been addressed
- No new questions arise from answers
- The user explicitly confirms completeness

### Phase 4: Spec Generation

Once the interview is complete:

1. Synthesize all answers into a structured specification
2. Write to the spec file with the following format:

```markdown
# [Feature/Product Name]

**Created:** [timestamp]
**Status:** Draft | Review | Approved
**Version:** 1.0

---

## Executive Summary

[2-3 sentence overview of what this is and why it exists]

---

## Target Users & Scale

### Primary Users
[Who is this for - be specific]

### Scale Expectations
- Launch: [specific numbers]
- Year 1: [specific numbers]
- Long-term: [specific numbers]

### Geographic & Regulatory Context
[Where will this operate? What regulations apply?]

---

## Core Functionality

### User Stories
1. As a [role], I want to [action] so that [outcome]
2. As a [role], I want to [action] so that [outcome]
[...]

### Primary Workflows
[Detailed workflow descriptions for main use cases]

### Business Rules
| Rule | Description | Enforced By |
|------|-------------|-------------|
| [Name] | [What it does] | [How/where enforced] |

---

## Technical Architecture

### Data Model
[Entity descriptions, relationships, constraints]

### Integration Points
| System | Purpose | Protocol | Failure Mode |
|--------|---------|----------|--------------|
| [Name] | [Why] | [How] | [What if fails] |

### State Management
[Where state lives, how it syncs, consistency guarantees]

### Performance Requirements
| Metric | Requirement | Degradation Behavior |
|--------|-------------|---------------------|
| Latency | [target] | [what happens if exceeded] |
| Throughput | [target] | [what happens if exceeded] |

---

## Security & Compliance

### Authentication & Authorization
[How users prove identity, what they can access]

### Data Classification
| Data Type | Classification | Encryption | Retention |
|-----------|---------------|------------|-----------|
| [Type] | [Level] | [At rest/transit] | [Duration] |

### Audit Requirements
[What gets logged, for how long, who can access]

---

## Edge Cases & Error Handling

### Known Edge Cases
| Scenario | Expected Behavior | Recovery Path |
|----------|-------------------|---------------|
| [What if] | [Then] | [How to recover] |

### Error States
[How errors are communicated, retry strategies, fallbacks]

---

## UX Considerations

### Key Screens/Components
[What the user sees, navigation flow]

### Notification Strategy
| Event | Channel | Timing | Content |
|-------|---------|--------|---------|
| [Trigger] | [Email/Push/etc] | [When] | [Template] |

---

## Future Considerations

### Extension Points
[Where this might grow, design decisions to enable flexibility]

### Migration Strategy
[How to evolve if requirements change]

### Out of Scope (Explicitly)
[What we are NOT building - be clear]

---

## Assumptions & Open Questions

### Assumptions Made
1. [Assumption 1 and rationale]
2. [Assumption 2 and rationale]

### Resolved Questions
| Question | Decision | Rationale |
|----------|----------|-----------|
| [Q] | [Answer] | [Why] |

---

## References

- [Link to related docs]
- [Previous discussions]
- [Similar implementations]

---

_This specification was generated through interview-driven development._
```

3. Present summary of what was captured
4. Ask if any sections need revision

## Interview Techniques

### Use Multi-Choice Questions

Structure questions with 2-4 concrete options plus "Other":
```
What creator scale are you targeting?
1. Hobbyists (<$1K/month)
2. Mid-tier ($1K-$50K/month)
3. Professional ($50K+/month)
4. All tiers (tiered product)
```

Multi-choice questions:
- Reduce ambiguity
- Surface assumptions
- Prevent hand-wavy answers
- Force concrete decisions

### Ask Non-Obvious Questions

Bad: "What features should it have?"
Good: "What happens when a user tries to [action] but [constraint applies]?"

Bad: "Should it be fast?"
Good: "A user is about to miss a deadline. They click [action]. What's the maximum wait time before they give up?"

### Challenge Assumptions

- "You mentioned X, but what if Y happens?"
- "How does this work for users who [edge case]?"
- "What's the worst thing that could happen here?"

### Follow Up Relentlessly

Each answer should generate 1-3 follow-up questions until you hit bedrock understanding.

## Usage

```bash
# Start with minimal spec
echo "Accounting software for YouTube creators" > spec.md
/spec-elicitation spec.md

# Interview an existing spec
/spec-elicitation docs/feature-x-spec.md

# Default to spec.md in current directory
/spec-elicitation
```

## When to Use

- **Starting a new feature** - Before writing any code
- **Refining a vague idea** - When you know "what" but not details
- **Before handing off** - Ensure spec is complete for another developer or AI
- **After getting requirements** - Validate you understood correctly
- **When estimating** - Can't estimate what you don't understand

## When NOT to Use

- Bug fixes with clear reproduction steps
- Trivial changes (rename variable, fix typo)
- When detailed requirements already exist
- Emergency production fixes

## Key Principles

1. **Spec before code** - Vibe coding works best after thinking is done
2. **Exhaust, don't rush** - Keep interviewing until questions run out
3. **Document everything** - The spec becomes the source of truth
4. **Challenge answers** - Play devil's advocate
5. **Make it concrete** - Specific numbers, specific scenarios

## The Transformation

**Before:**
> Accounting software for YouTube creators

**After:**
> A comprehensive specification covering target users (mid-tier creators), revenue sources (AdSense, brand deals, affiliates), tax jurisdictions, automation boundaries, reporting cadence, error handling, and 30+ other dimensions.

Only now should you write code.

## Important Notes

- **ALWAYS use AskUserQuestion** - This is an interactive process
- **ALWAYS complete the interview** - Don't shortcut to spec generation
- **ALWAYS write to file** - Save the spec, don't just display it
- **ALWAYS ask about edge cases** - The hard parts hide at the edges
- **NEVER stop at surface-level** - Dig until you hit bedrock

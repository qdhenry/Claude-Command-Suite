# Explain Decision Reasoning

Explain why specific actions, choices, or recommendations were made by the system

## Instructions

Provide comprehensive reasoning for system decisions: **$ARGUMENTS**

1. **Decision Context Analysis**
   - Identify the specific decision being explained
   - Understand the circumstances and constraints
   - Review available information at decision time
   - Document the problem being solved

2. **Option Evaluation**
   - List all alternatives considered
   - Document pros and cons of each option
   - Explain evaluation criteria used
   - Show comparative analysis performed

3. **Decision Factors**
   - **Priority Factors** (weighted heavily)
     - Business requirements and goals
     - Technical constraints and limitations
     - Security and compliance requirements
     - Performance and scalability needs
   
   - **Secondary Factors** (considered but lower weight)
     - Development time and resources
     - Maintainability and future flexibility
     - Team expertise and preferences
     - External dependencies and risks

4. **Reasoning Chain**
   ```
   Problem: [Clear statement of what needed to be decided]
   ↓
   Constraint: [Key limitations that shaped options]
   ↓
   Criteria: [How alternatives were evaluated]
   ↓
   Analysis: [Detailed comparison of options]
   ↓
   Decision: [Final choice with confidence level]
   ↓
   Rationale: [Why this option was selected]
   ```

5. **Confidence Assessment**
   - Rate confidence in the decision (1-10)
   - Identify sources of uncertainty
   - Document information gaps
   - Flag areas requiring validation

6. **Trade-off Analysis**
   - What was gained by this decision
   - What was sacrificed or deferred
   - Long-term vs short-term implications
   - Risk vs reward balance

7. **Alternative Path Analysis**
   - Why other options were rejected
   - Under what conditions alternatives would be better
   - Potential decision reversal triggers
   - Future decision points to monitor

8. **Decision Documentation**
   ```markdown
   ## Decision Reasoning Report

   **Decision**: Use React with TypeScript for frontend framework
   **Date**: 2024-01-15
   **Confidence**: 8.5/10
   **Decision Maker**: Architecture Review Process

   ### Problem Statement
   Need to select a frontend framework for new user dashboard that must:
   - Handle complex state management
   - Support real-time data updates
   - Be maintainable by current team
   - Integrate with existing backend APIs

   ### Options Considered
   1. **React + TypeScript** ⭐ SELECTED
   2. **Vue.js + TypeScript**
   3. **Angular**
   4. **Svelte + TypeScript**

   ### Evaluation Criteria (Weighted)
   - **Team Expertise** (40%): How familiar is team with technology
   - **Ecosystem Maturity** (25%): Available libraries and tooling
   - **Performance** (20%): Runtime speed and bundle size
   - **Development Speed** (15%): Time to market considerations

   ### Detailed Analysis

   #### React + TypeScript (Score: 8.5/10)
   ✅ **Strengths:**
   - Team has 3+ years experience (high expertise)
   - Massive ecosystem with mature libraries
   - Excellent TypeScript integration
   - Strong community support and documentation
   - Proven scalability in similar projects

   ⚠️ **Concerns:**
   - Slightly larger bundle size than alternatives
   - Complex state management for large apps
   - Rapid ecosystem changes require staying current

   #### Vue.js + TypeScript (Score: 7.2/10)
   ✅ **Strengths:**
   - Gentler learning curve
   - Excellent performance characteristics
   - Growing TypeScript support
   - Clean, readable template syntax

   ❌ **Weaknesses:**
   - Limited team experience (6 months)
   - Smaller ecosystem than React
   - Less enterprise adoption in our industry

   ### Decision Factors

   **Primary Drivers:**
   1. **Team Expertise** (40% weight): React scores 9/10 vs Vue 6/10
      - 5 developers with React experience vs 1 with Vue
      - Existing React component library in organization
      - Established patterns and best practices

   2. **Risk Mitigation**: Lower technical risk with known technology
      - Faster development due to existing knowledge
      - Easier hiring and onboarding
      - Reduced learning curve for complex features

   3. **Strategic Alignment**: Matches organization's tech stack
      - Other teams using React successfully
      - Shared component libraries possible
      - Knowledge transfer opportunities

   ### Trade-offs Accepted
   - **Bundle Size**: Accepting ~20% larger bundles for ecosystem benefits
   - **Learning Opportunity**: Missing chance to explore Vue.js
   - **Performance**: Slight performance penalty vs Svelte acceptable

   ### Confidence Assessment
   **8.5/10 Confidence**
   
   **High Confidence Areas:**
   - Team capability assessment (9/10)
   - Ecosystem maturity evaluation (9/10)
   - Strategic fit analysis (8/10)

   **Uncertainty Areas:**
   - Long-term performance requirements (7/10)
   - Future team composition changes (6/10)
   - Evolving framework landscape (6/10)

   ### Validation Plan
   - [ ] Build proof-of-concept within 2 weeks
   - [ ] Performance benchmark against requirements
   - [ ] Team feedback after first sprint
   - [ ] Review decision in 3 months

   ### Decision Reversal Triggers
   - Performance benchmarks fail by >20%
   - Team productivity drops significantly
   - Critical ecosystem libraries become unavailable
   - Strategic direction changes to favor different stack
   ```

9. **Learning Integration**
   - How this decision improves future choices
   - Patterns and principles reinforced
   - Knowledge gaps identified
   - Process improvements discovered

10. **Stakeholder Impact**
    - Who is affected by this decision
    - How different groups benefit or are impacted
    - Communication and change management needs
    - Feedback loops established

11. **Success Metrics**
    - How to measure if decision was correct
    - Key performance indicators to track
    - Timeline for evaluation
    - Course correction triggers

**Reasoning Transparency Principles:**
- Show all work, don't just state conclusions
- Acknowledge uncertainties and assumptions
- Explain both logical and intuitive factors
- Make biases and preferences explicit
- Provide enough detail for informed disagreement

**For Technical Decisions:**
- Include code examples and benchmarks
- Reference documentation and best practices
- Show compatibility and integration analysis
- Document performance and security implications

**For Strategic Decisions:**
- Connect to business objectives
- Show market research and competitive analysis
- Include risk assessment and mitigation plans
- Document resource requirements and constraints

This command builds trust by making the "black box" of decision-making completely transparent, helping users understand not just what was decided, but why, and with what level of confidence.
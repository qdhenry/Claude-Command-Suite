# Insight-Driven Commands

Commands that transform raw data into actionable insights and recommendations, implementing the principle of "judgment over data."

## Philosophy: Answers Over Data

Instead of presenting tables of metrics, these commands provide:
- **Clear assessments**: "Your security posture needs immediate attention"
- **Actionable priorities**: "Fix these 3 critical issues first"
- **Business context**: "This performance issue costs $12K/month"
- **Confidence levels**: "8.5/10 confidence - act on this"

## Available Commands

### `/insight:code-health-summary`
Transform code metrics into actionable insights and recommendations.

**Instead of:** 47 issues in a table with complexity scores  
**Provides:** "Fix authentication module first - 30 minutes will eliminate your biggest security risk"

**Use when:**
- Need to prioritize technical work
- Translating metrics for business stakeholders
- Making data-driven development decisions
- Understanding code quality trajectory

**Example:**
```bash
/insight:code-health-summary --focus=security,performance
```

## Core Principles

### Judgment-First Design
Transform this pattern:
```
❌ OLD: "Here are 47 code quality issues..."
✅ NEW: "Your biggest risk is the authentication module. 
        Fix the SQL injection (30 minutes) to eliminate 
        your #1 security vulnerability."
```

### Context-Aware Intelligence
- Connect technical issues to business impact
- Prioritize by effort vs impact
- Consider team context and capabilities
- Provide confidence levels for all recommendations

### Action-Oriented Output
Every insight should answer:
- **What matters most right now?**
- **Why should I care about this?**
- **What should I do next?**
- **How confident should I be in this guidance?**

## Insight Generation Framework

### Data → Insights → Actions
1. **Collect**: Gather relevant metrics and patterns
2. **Analyze**: Apply domain expertise and context
3. **Prioritize**: Rank by impact, effort, and risk
4. **Recommend**: Provide specific, actionable guidance

### Trust Through Transparency
- Show confidence levels (1-10) for all insights
- Explain reasoning and assumptions
- Acknowledge limitations and uncertainties
- Provide validation steps when possible

### Personalized Intelligence
Consider:
- Team size and experience level
- Technology stack and constraints
- Business context and priorities
- Historical patterns and preferences

## Example Transformations

### Before: Data-Heavy
```
Test Coverage Report:
- auth.js: 45% coverage
- payment.js: 23% coverage  
- user.js: 67% coverage
- dashboard.js: 12% coverage
Average: 36.75% coverage
```

### After: Insight-Driven
```
🔴 Testing Crisis: Your payment system is dangerously undertested

Priority Actions:
1. Payment Module (2 hours) - 23% coverage on money handling code
   Impact: Prevent $50K+ financial bugs
   Confidence: 9.2/10 - This is your highest business risk

2. Dashboard (4 hours) - 12% coverage on user-facing features  
   Impact: Reduce user-reported bugs by 60%
   Confidence: 8.1/10 - Based on similar projects

Business Impact: Current 23% coverage = 340% more production bugs
Target: 80% coverage in critical paths (payment, auth)
Timeline: 2 weeks focused effort = production-ready quality
```

## Integration with Trust Framework

### Confidence-Weighted Recommendations
- **9.0-10.0**: Act immediately, high certainty
- **7.0-8.9**: Strong recommendation, validate in context
- **5.0-6.9**: Consider carefully, get more data
- **Below 5.0**: Monitor only, likely false signal

### Supporting Other Systems
- **Trust Commands**: Provide data for confidence dashboards
- **Explanation Commands**: Show reasoning behind insights
- **All Agents**: Transform their analysis into actionable guidance

## Usage Patterns

### Strategic Planning
```bash
/insight:code-health-summary --scope=full --horizon=quarter
# Get strategic priorities for next 3 months
```

### Sprint Planning
```bash
/insight:code-health-summary --focus=bugs,technical-debt --effort=sprint
# Get 2-week actionable priorities
```

### Stakeholder Communication
```bash
/insight:code-health-summary --audience=business --format=executive
# Business-friendly insights with ROI analysis
```

### Risk Assessment
```bash
/insight:code-health-summary --filter=critical,high --confidence-min=8.0
# High-confidence critical issues only
```

## Expansion Areas

Future insight commands will cover:
- **Performance insights**: "Your database queries are costing $X/month"
- **Security insights**: "These 3 vulnerabilities expose your biggest risks"  
- **Team insights**: "Your velocity is limited by these bottlenecks"
- **Business insights**: "Technical debt is slowing feature delivery by Y%"

---

*Transform overwhelming data into clear, actionable guidance that builds appropriate confidence in AI recommendations.*
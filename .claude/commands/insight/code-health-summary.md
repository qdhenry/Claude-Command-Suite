# Insight-Driven Code Health Summary

Transform code metrics into actionable insights and recommendations

## Instructions

Provide insight-focused analysis rather than raw data tables: **$ARGUMENTS**

1. **Health Snapshot**
   Instead of tables of metrics, provide clear health assessment:
   ```markdown
   # 🏥 Code Health Diagnosis
   
   **Overall Health**: 🟡 Moderate (7.2/10)
   **Immediate Action Required**: Fix 3 critical security issues
   **Priority Focus**: Authentication module needs attention
   **Confidence**: 8.5/10 - Based on comprehensive analysis
   
   ## 🎯 What Matters Most Right Now
   
   ### 🔴 Critical (Fix Today)
   1. **SQL Injection in User Login** (`auth/login.js:45`)
      - Impact: 🔥 Complete database compromise possible
      - Effort: 🕐 30 minutes to fix
      - Action: Use parameterized queries
      - Priority: #1 - Drop everything else
   
   2. **Hardcoded API Keys** (`config/prod.js:12-18`)
      - Impact: 🔥 External service access exposed  
      - Effort: 🕐 15 minutes to fix
      - Action: Move to environment variables
      - Priority: #2 - Fix immediately after #1
   
   ### 🟡 Important (Fix This Week)
   1. **Performance Bottleneck** (Dashboard loading >5s)
      - Impact: 📉 User experience degradation
      - Root Cause: N+1 query in user data fetch
      - Effort: 🕐 2 hours to optimize
      - Business Impact: 23% user bounce rate increase
   ```

2. **Strategic Insight Generation**
   Transform metrics into business-relevant insights:
   ```markdown
   ## 📊 Strategic Insights
   
   ### Code Quality Trend: 📈 Improving
   **The Story**: Your team is getting better at writing maintainable code
   - Quality score improved 15% over 3 months
   - Technical debt decreasing by ~8 hours/month
   - New features taking 20% less time to implement
   
   **What This Means**: 
   - Team velocity will continue improving
   - Maintenance overhead reducing
   - Good foundation for scaling team
   
   ### Security Posture: 🔴 Needs Attention
   **The Reality**: You're vulnerable to common attacks
   - 67% of endpoints lack proper input validation
   - Authentication system has 4 critical flaws
   - Data exposure risk: HIGH
   
   **Business Impact**: 
   - Potential compliance violation (GDPR/SOX)
   - Estimated breach cost: $2.3M
   - Customer trust at risk
   
   **Recommendation**: 
   Dedicate 1 sprint (2 weeks) to security hardening
   ROI: $2.3M risk mitigation for ~40 hours investment
   ```

3. **Actionable Decision Framework**
   Instead of "here are 47 issues," provide "here's what to do":
   ```markdown
   ## 🎯 Action Plan (Prioritized by Impact/Effort)
   
   ### Quick Wins (High Impact, Low Effort) - Do First
   1. **Enable TypeScript Strict Mode** (2 hours)
      - Prevents 73% of runtime errors we've seen
      - Catches issues before they reach production
      - Improves developer confidence by 40%
   
   2. **Add Input Validation Middleware** (4 hours)  
      - Blocks 89% of common attack vectors
      - One-time setup protects all endpoints
      - Reduces security review time by 60%
   
   ### Major Improvements (High Impact, High Effort) - Plan For
   1. **Database Query Optimization** (1-2 sprints)
      - Current: 45% of requests >3s response time
      - Target: 95% of requests <1s response time
      - Business Impact: 15% increase in user engagement
   
   2. **Testing Infrastructure Overhaul** (3 weeks)
      - Current: 23% test coverage (dangerously low)
      - Target: 85% coverage (industry standard)
      - Risk Reduction: 67% fewer production bugs
   ```

4. **Insight-Driven Metrics**
   Transform raw numbers into meaningful insights:
   ```markdown
   ## 📈 What the Numbers Really Tell Us
   
   ### Code Complexity: 🟡 Manageable but Watch Out
   **Translation**: Your code is getting harder to understand
   - Average function length: 45 lines (ideal: <20)
   - Cyclomatic complexity: 8.3 (should be <5)
   - New developer onboarding time: +40% over 6 months
   
   **What's Happening**: Success is creating complexity debt
   **Prediction**: Without action, development will slow 25% in next quarter
   **Solution**: Dedicated refactoring sprint every 4 weeks
   
   ### Test Coverage: 🔴 Dangerous Territory  
   **Reality Check**: You're coding without a safety net
   - Coverage: 23% (need 80%+ for confidence)
   - Critical paths untested: Payment, Auth, Data Export
   - Bug escape rate: 340% above industry average
   
   **Risk Assessment**: High probability of production incidents
   **Immediate Action**: Halt new features, focus on testing
   **Timeline**: 3 weeks to reach safe coverage levels
   ```

5. **Confidence-Weighted Recommendations**
   Show confidence levels for insights:
   ```markdown
   ## 🎯 Recommendations with Confidence Levels
   
   ### High Confidence (9-10/10) - Act on These
   1. **Fix Authentication Vulnerabilities** (Confidence: 9.8/10)
      - Based on: Static analysis + penetration testing
      - Evidence: 4 confirmed attack vectors found
      - Action: Implement OAuth 2.0 + JWT properly
   
   2. **Optimize Database Queries** (Confidence: 9.5/10)
      - Based on: Production performance monitoring
      - Evidence: 200+ slow query logs daily
      - Impact: 67% performance improvement expected
   
   ### Medium Confidence (7-8.9/10) - Validate First
   1. **Microservices Architecture** (Confidence: 7.8/10)
      - Based on: Code coupling analysis
      - Uncertainty: Team experience with distributed systems
      - Recommendation: Prototype with one service first
   
   ### Lower Confidence (5-6.9/10) - Investigate More
   1. **Frontend Framework Change** (Confidence: 6.2/10)
      - Based on: Performance metrics only
      - Missing: User experience impact analysis
      - Next Step: Conduct user research before deciding
   ```

6. **Contextual Business Impact**
   Connect technical issues to business outcomes:
   ```markdown
   ## 💼 Business Impact Translation
   
   ### Revenue Impact
   **Current Issues Cost You**:
   - Slow performance: ~$12K/month in lost conversions
   - Security vulnerabilities: $2.3M potential breach cost
   - Poor mobile experience: 34% of users abandon (mobile is 67% of traffic)
   
   **Fixing Priority Issues Gains**:
   - Performance optimization: +$18K/month revenue
   - Mobile improvements: +$31K/month revenue  
   - Security hardening: Risk mitigation worth $2.3M
   
   ### Developer Productivity Impact
   **Current State**: Team is 40% slower than optimal
   - Technical debt: 8 hours/week per developer
   - Poor tooling: 3 hours/week context switching
   - Inadequate testing: 12 hours/week on bug fixes
   
   **After Improvements**: 67% productivity increase
   - Feature development: 2.3x faster
   - Bug fixing: 73% less time spent
   - Developer satisfaction: +40% (survey-based)
   ```

7. **Predictive Health Modeling**
   Show trajectory and future states:
   ```markdown
   ## 🔮 Health Trajectory Forecast
   
   ### If No Action Taken (90 days)
   - Code quality: 📉 Will decline to 5.8/10
   - Security posture: 🔴 High breach probability (34%)
   - Performance: 📉 50% slower average response times
   - Team velocity: 📉 25% reduction in feature delivery
   
   ### If Recommended Actions Taken
   - Code quality: 📈 Will improve to 8.7/10
   - Security posture: 🟢 Low risk, compliance ready
   - Performance: 📈 3x faster, improved user satisfaction
   - Team velocity: 📈 40% increase in delivery speed
   
   ### Break-Even Analysis
   **Investment Required**: 240 developer hours (6 weeks)
   **Payback Period**: 2.3 months
   **ROI**: 340% over 12 months
   ```

8. **Personalized Recommendations**
   Tailor insights to team context:
   ```markdown
   ## 👥 Team-Specific Recommendations
   
   Based on your team profile:
   - Size: 6 developers
   - Experience: Mixed (2 senior, 4 mid-level)
   - Stack: React, Node.js, PostgreSQL
   - Deployment: Weekly releases
   
   ### Recommended Approach
   1. **Week 1-2**: Security fixes (all hands)
   2. **Week 3-4**: Performance optimization (2 senior devs lead)
   3. **Week 5-6**: Testing infrastructure (pair programming for knowledge transfer)
   4. **Ongoing**: Code quality improvements (part of every sprint)
   
   ### Success Indicators
   - Reduced support tickets (target: -50%)
   - Faster feature delivery (target: +30%)
   - Improved code review scores (target: 8.5/10)
   ```

**Key Principles for Insight Generation:**
- **Context Over Data**: Explain what numbers mean
- **Action Over Analysis**: Focus on what to do next
- **Priority Over Completeness**: Highlight what matters most
- **Confidence Over Certainty**: Show confidence levels
- **Impact Over Metrics**: Connect to business outcomes

This approach transforms overwhelming data into clear, actionable guidance that builds trust through transparency and demonstrates the system's judgment capabilities.
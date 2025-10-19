# Claude Command Suite

![Total Commands](https://img.shields.io/badge/Commands-148-brightgreen?style=for-the-badge)
![AI Agents](https://img.shields.io/badge/AI_Agents-54-red?style=for-the-badge)
![GitHub Release](https://img.shields.io/github/v/release/qdhenry/Claude-Command-Suite?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)

> A comprehensive development toolkit designed following [Anthropic's Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) for AI-assisted software development.

**Claude Command Suite** is a development toolkit providing 148+ slash commands, 54 AI agents, Claude Code Skills, and automated workflows for software engineering tasks. The suite covers code review, testing, deployment, business scenario modeling, and GitHub-Linear synchronization through structured, repeatable workflows.

- **Slash Commands**: Namespace-organized commands (`/dev:code-review`, `/test:generate-test-cases`, `/deploy:prepare-release`) for development workflows
- **AI Agents**: Specialized agents for security auditing, test coverage analysis, and cross-platform synchronization
- **Claude Code Skills**: Model-invoked capabilities for recurring workflows including Linear task management and Cloudflare infrastructure deployment
- **Automated Workflows**: Pre-configured sequences for feature implementation and production deployment
- **Scenario Simulators**: Decision-making tools for business modeling, system behavior analysis, and architectural evaluation
- **Task Orchestration**: Task management system with Git integration and context preservation

## AI Agents

<div align="center">

[![AI Agents](https://img.shields.io/badge/AI_Agents-54_Available-ff6b6b?style=for-the-badge&labelColor=4c1d95)](.claude/agents/README.md)
[![Workflows](https://img.shields.io/badge/Workflows-Documentation-4ecdc4?style=for-the-badge&labelColor=1a535c)](.claude/agents/WORKFLOW_EXAMPLES.md)

</div>

Specialized AI agents handle complex development tasks through focused tool access and isolated contexts:

- **Code Quality Suite**: Automated code review, security scanning, performance analysis
- **Test Engineer**: Test generation with coverage analysis
- **Integration Manager**: GitHub-Linear bidirectional synchronization
- **Strategic Analyst**: Business scenario modeling and decision analysis
- **Additional Agents**: Project initialization, release management, architecture review

[AI Agents Documentation](.claude/agents/README.md) | [Workflow Examples](.claude/agents/WORKFLOW_EXAMPLES.md)

---

## Claude Code Skills

<div align="center">

[![Skills Available](https://img.shields.io/badge/Skills-2_Available-9b59b6?style=for-the-badge&labelColor=2c3e50)](.claude/skills/)
[![Documentation](https://img.shields.io/badge/Documentation-Skills_Guide-3498db?style=for-the-badge&labelColor=2c3e50)](.claude/commands/skills/README.md)

</div>

Claude Code Skills extend the suite with model-invoked capabilities that complement slash commands. Skills are automatically activated by Claude based on context, suitable for recurring workflows and domain-specific expertise.

### Skills vs Commands

| Feature | **Skills** (Model-Invoked) | **Commands** (User-Invoked) |
|---------|---------------------------|---------------------------|
| **Activation** | Contextually triggered | Explicit invocation via `/command` |
| **Use Case** | Recurring workflows, domain expertise | Specific task execution |
| **Scope** | Personal or project-wide | Project-specific |
| **Distribution** | Git repositories, plugins | Command file copying |

### Available Skills

**[linear-todo-sync](.claude/skills/linear-todo-sync/)** - Linear task management integration

- GraphQL API integration for task retrieval
- Priority-based organization with metadata
- Markdown output with actionable links
- Context triggers: "What do I need to work on?", "Show my work"

**[cloudflare-manager](.claude/skills/cloudflare-manager/)** - Cloudflare infrastructure management

- Workers deployment with URL extraction
- KV Storage and R2 bucket management
- Cloudflare Pages deployment
- DNS and routing configuration
- Requirements: Bun runtime, CLOUDFLARE_API_KEY

### Skills Builder Framework

Structured workflow for creating custom skills:

- **[/skills:build-skill](.claude/commands/skills/build-skill.md)** - Guided skill creation command
- **Four-phase process**: Requirements elicitation, code generation, validation, documentation
- **Quality assurance**: Automated testing and validation scripts
- **Templates**: Five skill templates for different use cases

### Usage

**Triggering skills:**
```
"What do I need to work on today?"  # Activates linear-todo-sync
"Deploy a cloudflare worker"        # Activates cloudflare-manager
```

**Creating skills:**
```
/skills:build-skill
```

**Documentation:**
- [Quick Start Guide](.claude/commands/skills/QUICKSTART.md) - Skill creation walkthrough
- [Complete Documentation](.claude/commands/skills/README.md) - Full reference guide
- [Browse Skills](.claude/skills/) - Available implementations

---

## 📚 Table of Contents

| **🤖 AI Agents** | **🎨 Skills** | **🚀 Getting Started** | **⚡ Commands** | **💡 Usage** |
|:----------------:|:-------------:|:---------------------:|:---------------:|:------------:|
| [AI Agents](#-new-intelligent-ai-agents) | [Skills](#-new-claude-code-skills) | [Quick Start](#quick-start) | [Available Commands](#available-commands) | [How It Works](#how-it-works) |
| [Agent Docs](.claude/agents/README.md) | [Skills Quickstart](.claude/commands/skills/QUICKSTART.md) | [Installation Guide](docs/INSTALLATION.md) | [Command Namespaces](#command-namespaces) | [Common Workflows](#common-workflows) |
| [Workflows](.claude/agents/WORKFLOW_EXAMPLES.md) | [Skills Docs](.claude/commands/skills/README.md) |  |  | [Contributing](#contributing) |

<a id="quick-start"></a>
## Quick Start

### Option 1: Direct Installation (Recommended)
Simply add command files directly to your project's `.claude/commands/` folder:

```bash
# Create the commands directory in your project
mkdir -p .claude/commands

# Download specific commands you need
curl -o .claude/commands/dev/code-review.md https://raw.githubusercontent.com/qdhenry/Claude-Command-Suite/main/.claude/commands/dev/code-review.md

# Or copy your own custom command files
cp my-custom-command.md .claude/commands/
```

### Option 2: Install All Commands
Use our installation script to set up all commands at once:

```bash
git clone https://github.com/qdhenry/Claude-Command-Suite.git
cd Claude-Command-Suite
chmod +x install.sh
./install.sh
```

### Start Using Commands
```bash
claude code
/dev:code-review           # Review your entire codebase
/project:create-feature    # Build a new feature
/security:security-audit   # Check for security issues
```

<a id="available-commands"></a>
## Available Commands

148 commands organized by namespace for software development workflows.

54 AI agents available for complex task automation. [AI Agents Documentation](.claude/agents/README.md)

### Command Namespace Index

| **Core Development** | **Quality & Testing** | **Deployment** | **Collaboration** | **Advanced** |
|:--------------------:|:--------------------:|:--------------:|:----------------:|:------------:|
| [🚀 Project](#-project---project-management) | [🧪 Test](#-test---testing-suite) | [📦 Deploy](#-deploy---deployment--release) | [👥 Team](#-team---team-collaboration) | [🎯 Simulation](#-simulation---ai-reality-simulators) |
| [💻 Dev](#-dev---development-tools) | [🔒 Security](#-security---security--compliance) | [📚 Docs](#-docs---documentation-generation) | [🔄 Sync](#-sync---integration--synchronization) | [📋 Orchestration](#-orchestration---task-orchestration) |
| [🔧 Setup](#-setup---configuration--setup) | [⚡ Performance](#-performance---performance-optimization) |  |  | [🧠 WFGY](#-wfgy---semantic-reasoning--memory) |

<a id="command-namespaces"></a>
## Command Namespaces

### `/project:*` - Project Management
Project initialization, configuration, and management. Commands for project creation, dependency management, milestone tracking, and health monitoring.

- [`/project:init-project`](.claude/commands/project/init-project.md) - Initialize new project with essential structure
- [`/project:add-package`](.claude/commands/project/add-package.md) - Add and configure new project dependencies  
- [`/project:create-feature`](.claude/commands/project/create-feature.md) - Scaffold new feature with boilerplate code
- [`/project:milestone-tracker`](.claude/commands/project/milestone-tracker.md) - Track and monitor project milestone progress
- [`/project:project-health-check`](.claude/commands/project/project-health-check.md) - Analyze overall project health and metrics
- [`/project:project-to-linear`](.claude/commands/project/project-to-linear.md) - Sync project structure to Linear workspace
- [`/project:project-timeline-simulator`](.claude/commands/project/project-timeline-simulator.md) - Simulate project outcomes with variable modeling
- [`/project:pac-configure`](.claude/commands/project/pac-configure.md) - Configure Product as Code (PAC) project structure
- [`/project:pac-create-epic`](.claude/commands/project/pac-create-epic.md) - Create new PAC epic with guided workflow
- [`/project:pac-create-ticket`](.claude/commands/project/pac-create-ticket.md) - Create new PAC ticket within an epic
- [`/project:pac-validate`](.claude/commands/project/pac-validate.md) - Validate PAC structure for specification compliance
- [`/project:pac-update-status`](.claude/commands/project/pac-update-status.md) - Update PAC ticket status and track progress

### `/dev:*` - Development Tools
Development utilities including code review, debugging, refactoring, and analysis modes.

- [`/dev:code-review`](.claude/commands/dev/code-review.md) - Comprehensive code quality review
- [`/dev:debug-error`](.claude/commands/dev/debug-error.md) - Systematically debug and fix errors
- [`/dev:explain-code`](.claude/commands/dev/explain-code.md) - Analyze and explain code functionality
- [`/dev:refactor-code`](.claude/commands/dev/refactor-code.md) - Intelligently refactor and improve code quality
- [`/dev:fix-issue`](.claude/commands/dev/fix-issue.md) - Identify and resolve code issues
- [`/dev:ultra-think`](.claude/commands/dev/ultra-think.md) - Deep analysis and problem solving mode
- [`/dev:prime`](.claude/commands/dev/prime.md) - Enhanced AI mode for complex tasks
- [`/dev:all-tools`](.claude/commands/dev/all-tools.md) - Display all available development tools
- [`/dev:git-status`](.claude/commands/dev/git-status.md) - Show detailed git repository status
- [`/dev:clean-branches`](.claude/commands/dev/clean-branches.md) - Clean up merged and stale git branches
- [`/dev:directory-deep-dive`](.claude/commands/dev/directory-deep-dive.md) - Analyze directory structure and purpose
- [`/dev:code-to-task`](.claude/commands/dev/code-to-task.md) - Convert code analysis to Linear tasks
- [`/dev:code-permutation-tester`](.claude/commands/dev/code-permutation-tester.md) - Test multiple code variations through simulation
- [`/dev:architecture-scenario-explorer`](.claude/commands/dev/architecture-scenario-explorer.md) - Explore architectural decisions through scenario analysis

### `/test:*` - Testing Suite
Testing tools for unit tests, integration tests, E2E tests, coverage analysis, mutation testing, and visual regression testing.

- [`/test:generate-test-cases`](.claude/commands/test/generate-test-cases.md) - Generate comprehensive test cases automatically
- [`/test:write-tests`](.claude/commands/test/write-tests.md) - Write unit and integration tests
- [`/test:test-coverage`](.claude/commands/test/test-coverage.md) - Analyze and report test coverage
- [`/test:setup-comprehensive-testing`](.claude/commands/test/setup-comprehensive-testing.md) - Setup complete testing infrastructure
- [`/test:e2e-setup`](.claude/commands/test/e2e-setup.md) - Configure end-to-end testing suite
- [`/test:setup-visual-testing`](.claude/commands/test/setup-visual-testing.md) - Setup visual regression testing
- [`/test:setup-load-testing`](.claude/commands/test/setup-load-testing.md) - Configure load and performance testing
- [`/test:add-mutation-testing`](.claude/commands/test/add-mutation-testing.md) - Setup mutation testing for code quality
- [`/test:add-property-based-testing`](.claude/commands/test/add-property-based-testing.md) - Implement property-based testing framework
- [`/test:test-changelog-automation`](.claude/commands/test/test-changelog-automation.md) - Automate changelog testing workflow

### `/security:*` - Security & Compliance
Security auditing, dependency scanning, authentication implementation, and security hardening for codebase security.

- [`/security:security-audit`](.claude/commands/security/security-audit.md) - Perform comprehensive security assessment
- [`/security:dependency-audit`](.claude/commands/security/dependency-audit.md) - Audit dependencies for security vulnerabilities
- [`/security:security-hardening`](.claude/commands/security/security-hardening.md) - Harden application security configuration
- [`/security:add-authentication-system`](.claude/commands/security/add-authentication-system.md) - Implement secure user authentication system

### `/performance:*` - Performance Optimization
Tools for optimizing build times, bundle sizes, database queries, caching strategies, and application performance.

- [`/performance:performance-audit`](.claude/commands/performance/performance-audit.md) - Audit application performance metrics
- [`/performance:optimize-build`](.claude/commands/performance/optimize-build.md) - Optimize build processes and speed
- [`/performance:optimize-bundle-size`](.claude/commands/performance/optimize-bundle-size.md) - Reduce and optimize bundle sizes
- [`/performance:optimize-database-performance`](.claude/commands/performance/optimize-database-performance.md) - Optimize database queries and performance
- [`/performance:implement-caching-strategy`](.claude/commands/performance/implement-caching-strategy.md) - Design and implement caching solutions
- [`/performance:add-performance-monitoring`](.claude/commands/performance/add-performance-monitoring.md) - Setup application performance monitoring
- [`/performance:setup-cdn-optimization`](.claude/commands/performance/setup-cdn-optimization.md) - Configure CDN for optimal delivery
- [`/performance:system-behavior-simulator`](.claude/commands/performance/system-behavior-simulator.md) - Simulate system performance under various loads

### `/sync:*` - Integration & Synchronization
Bidirectional synchronization between GitHub Issues and Linear, PR tracking, conflict resolution, and cross-platform task management.

- [`/sync:sync-issues-to-linear`](.claude/commands/sync/sync-issues-to-linear.md) - Sync GitHub issues to Linear workspace
- [`/sync:sync-linear-to-issues`](.claude/commands/sync/sync-linear-to-issues.md) - Sync Linear tasks to GitHub issues
- [`/sync:bidirectional-sync`](.claude/commands/sync/bidirectional-sync.md) - Enable bidirectional GitHub-Linear synchronization
- [`/sync:issue-to-linear-task`](.claude/commands/sync/issue-to-linear-task.md) - Convert GitHub issues to Linear tasks
- [`/sync:linear-task-to-issue`](.claude/commands/sync/linear-task-to-issue.md) - Convert Linear tasks to GitHub issues
- [`/sync:sync-pr-to-task`](.claude/commands/sync/sync-pr-to-task.md) - Link pull requests to Linear tasks
- [`/sync:sync-status`](.claude/commands/sync/sync-status.md) - Monitor GitHub-Linear sync health status
- [`/sync:bulk-import-issues`](.claude/commands/sync/bulk-import-issues.md) - Bulk import GitHub issues to Linear
- [`/sync:cross-reference-manager`](.claude/commands/sync/cross-reference-manager.md) - Manage cross-platform reference links
- [`/sync:sync-automation-setup`](.claude/commands/sync/sync-automation-setup.md) - Setup automated synchronization workflows
- [`/sync:sync-conflict-resolver`](.claude/commands/sync/sync-conflict-resolver.md) - Resolve synchronization conflicts automatically
- [`/sync:task-from-pr`](.claude/commands/sync/task-from-pr.md) - Create Linear tasks from pull requests

### `/deploy:*` - Deployment & Release
Release preparation, automated deployments, rollback capabilities, containerization, and Kubernetes deployment management.

- [`/deploy:prepare-release`](.claude/commands/deploy/prepare-release.md) - Prepare and validate release packages
- [`/deploy:hotfix-deploy`](.claude/commands/deploy/hotfix-deploy.md) - Deploy critical hotfixes quickly
- [`/deploy:rollback-deploy`](.claude/commands/deploy/rollback-deploy.md) - Rollback deployment to previous version
- [`/deploy:setup-automated-releases`](.claude/commands/deploy/setup-automated-releases.md) - Setup automated release workflows
- [`/deploy:containerize-application`](.claude/commands/deploy/containerize-application.md) - Containerize application for deployment
- [`/deploy:setup-kubernetes-deployment`](.claude/commands/deploy/setup-kubernetes-deployment.md) - Configure Kubernetes deployment manifests
- [`/deploy:ci-setup`](.claude/commands/deploy/ci-setup.md) - Setup continuous integration pipeline
- [`/deploy:add-changelog`](.claude/commands/deploy/add-changelog.md) - Generate and maintain project changelog
- [`/deploy:changelog-demo-command`](.claude/commands/deploy/changelog-demo-command.md) - Demo changelog automation features

### `/docs:*` - Documentation Generation
Documentation automation for APIs, architecture diagrams, onboarding guides, and troubleshooting documentation.

- [`/docs:generate-api-documentation`](.claude/commands/docs/generate-api-documentation.md) - Auto-generate API reference documentation
- [`/docs:doc-api`](.claude/commands/docs/doc-api.md) - Generate API documentation from code
- [`/docs:create-architecture-documentation`](.claude/commands/docs/create-architecture-documentation.md) - Generate comprehensive architecture documentation
- [`/docs:create-onboarding-guide`](.claude/commands/docs/create-onboarding-guide.md) - Create developer onboarding guide
- [`/docs:migration-guide`](.claude/commands/docs/migration-guide.md) - Create migration guides for updates
- [`/docs:troubleshooting-guide`](.claude/commands/docs/troubleshooting-guide.md) - Generate troubleshooting documentation

### `/setup:*` - Configuration & Setup
Setup commands for development environments, linting, formatting, monitoring, database schemas, and API design.

- [`/setup:setup-development-environment`](.claude/commands/setup/setup-development-environment.md) - Setup complete development environment
- [`/setup:setup-linting`](.claude/commands/setup/setup-linting.md) - Setup code linting and quality tools
- [`/setup:setup-formatting`](.claude/commands/setup/setup-formatting.md) - Configure code formatting tools
- [`/setup:setup-monitoring-observability`](.claude/commands/setup/setup-monitoring-observability.md) - Setup monitoring and observability tools
- [`/setup:setup-monorepo`](.claude/commands/setup/setup-monorepo.md) - Configure monorepo project structure
- [`/setup:migrate-to-typescript`](.claude/commands/setup/migrate-to-typescript.md) - Migrate JavaScript project to TypeScript
- [`/setup:modernize-deps`](.claude/commands/setup/modernize-deps.md) - Update and modernize project dependencies
- [`/setup:design-database-schema`](.claude/commands/setup/design-database-schema.md) - Design optimized database schemas
- [`/setup:create-database-migrations`](.claude/commands/setup/create-database-migrations.md) - Create and manage database migrations
- [`/setup:design-rest-api`](.claude/commands/setup/design-rest-api.md) - Design RESTful API architecture
- [`/setup:implement-graphql-api`](.claude/commands/setup/implement-graphql-api.md) - Implement GraphQL API endpoints
- [`/setup:setup-rate-limiting`](.claude/commands/setup/setup-rate-limiting.md) - Implement API rate limiting

### `/team:*` - Team Collaboration
Team workflow tools including standup reports, sprint planning, retrospectives, workload balancing, and knowledge management.

- [`/team:standup-report`](.claude/commands/team/standup-report.md) - Generate daily standup reports
- [`/team:sprint-planning`](.claude/commands/team/sprint-planning.md) - Plan and organize sprint workflows
- [`/team:retrospective-analyzer`](.claude/commands/team/retrospective-analyzer.md) - Analyze team retrospectives for insights
- [`/team:team-workload-balancer`](.claude/commands/team/team-workload-balancer.md) - Balance team workload distribution
- [`/team:issue-triage`](.claude/commands/team/issue-triage.md) - Triage and prioritize issues effectively
- [`/team:estimate-assistant`](.claude/commands/team/estimate-assistant.md) - Generate accurate project time estimates
- [`/team:session-learning-capture`](.claude/commands/team/session-learning-capture.md) - Capture and document session learnings
- [`/team:memory-spring-cleaning`](.claude/commands/team/memory-spring-cleaning.md) - Clean and organize project memory
- [`/team:architecture-review`](.claude/commands/team/architecture-review.md) - Review and improve system architecture
- [`/team:dependency-mapper`](.claude/commands/team/dependency-mapper.md) - Map and analyze project dependencies
- [`/team:migration-assistant`](.claude/commands/team/migration-assistant.md) - Assist with system migration planning
- [`/team:decision-quality-analyzer`](.claude/commands/team/decision-quality-analyzer.md) - Analyze decision quality with scenario testing

### `/simulation:*` - Scenario Simulators
*Inspired by "AI agents at their most under-leveraged point" by AI News & Strategy Daily | Nate B. Jones*

Simulation and modeling tools for decision analysis through scenario exploration, digital twins, and timeline compression.

- [`/simulation:business-scenario-explorer`](.claude/commands/simulation/business-scenario-explorer.md) - Multi-timeline business exploration with constraint validation
- [`/simulation:digital-twin-creator`](.claude/commands/simulation/digital-twin-creator.md) - Systematic digital twin creation with data quality checks
- [`/simulation:decision-tree-explorer`](.claude/commands/simulation/decision-tree-explorer.md) - Decision branch analysis with probability weighting
- [`/simulation:market-response-modeler`](.claude/commands/simulation/market-response-modeler.md) - Customer/market response simulation with segment analysis
- [`/simulation:timeline-compressor`](.claude/commands/simulation/timeline-compressor.md) - Accelerated scenario testing with confidence intervals
- [`/simulation:constraint-modeler`](.claude/commands/simulation/constraint-modeler.md) - World constraint modeling with assumption validation
- [`/simulation:future-scenario-generator`](.claude/commands/simulation/future-scenario-generator.md) - Scenario generation with plausibility scoring
- [`/simulation:simulation-calibrator`](.claude/commands/simulation/simulation-calibrator.md) - Test and refine simulation accuracy

**📖 [Comprehensive Examples Guide](/.claude/commands/simulation/SIMULATION_EXAMPLES.md)** - Real-world usage patterns, argument templates, and command synergy workflows.

*Development tools `/dev:prime`, `/dev:all-tools` contributed by IndyDevDan (YouTube: https://www.youtube.com/@indydevdan) / DislerH (GitHub: https://github.com/disler)*

### `/orchestration:*` - Task Orchestration
Task management and execution system for organizing complex projects into trackable workflows. Task decomposition, progress tracking, Git synchronization, and context preservation.

- [`/orchestration:start`](.claude/commands/orchestration/start.md) - Begin a new project with intelligent task decomposition
- [`/orchestration:status`](.claude/commands/orchestration/status.md) - Check progress and see what's happening across all projects
- [`/orchestration:resume`](.claude/commands/orchestration/resume.md) - Continue where you left off with full context restoration
- [`/orchestration:move`](.claude/commands/orchestration/move.md) - Update task status as work progresses
- [`/orchestration:commit`](.claude/commands/orchestration/commit.md) - Create professional Git commits linked to tasks
- [`/orchestration:find`](.claude/commands/orchestration/find.md) - Search and discover tasks across projects
- [`/orchestration:report`](.claude/commands/orchestration/report.md) - Generate standup reports and executive summaries
- [`/orchestration:sync`](.claude/commands/orchestration/sync.md) - Synchronize task status with Git commits
- [`/orchestration:remove`](.claude/commands/orchestration/remove.md) - Remove or archive completed tasks

**📚 [Task Orchestration Guide](.claude/commands/orchestration/ORCHESTRATION-README.md)** - Complete guide with examples, workflows, and best practices for managing complex development projects.

### `/wfgy:*` - Semantic Reasoning & Memory
Semantic reasoning system based on the [WFGY project](https://github.com/onestardao/WFGY) providing mathematical validation, persistent memory, and hallucination prevention.

**Core Formula Commands** (`/wfgy:*`):
- [`/wfgy:init`](.claude/commands/wfgy/wfgy-init.md) - Initialize WFGY semantic reasoning system
- [`/wfgy:bbmc`](.claude/commands/wfgy/wfgy-bbmc.md) - Apply semantic residue minimization
- [`/wfgy:bbpf`](.claude/commands/wfgy/wfgy-bbpf.md) - Execute multi-path progression
- [`/wfgy:bbcr`](.claude/commands/wfgy/wfgy-bbcr.md) - Trigger collapse-rebirth correction
- [`/wfgy:bbam`](.claude/commands/wfgy/wfgy-bbam.md) - Apply attention modulation
- [`/wfgy:formula-all`](.claude/commands/wfgy/wfgy-formula-all.md) - Apply all formulas in sequence

**Semantic Memory** (`/semantic:*`):
- [`/semantic:tree-init`](.claude/commands/semantic/semantic-tree-init.md) - Create new semantic memory tree
- [`/semantic:node-build`](.claude/commands/semantic/semantic-node-build.md) - Record semantic nodes
- [`/semantic:tree-view`](.claude/commands/semantic/semantic-tree-view.md) - Display tree structure
- [`/semantic:tree-export`](.claude/commands/semantic/semantic-tree-export.md) - Export memory to file
- [`/semantic:tree-import`](.claude/commands/semantic/semantic-tree-import.md) - Import existing tree
- [`/semantic:tree-switch`](.claude/commands/semantic/semantic-tree-switch.md) - Switch between trees

**Knowledge Boundaries** (`/boundary:*`):
- [`/boundary:detect`](.claude/commands/boundary/boundary-detect.md) - Check knowledge limits
- [`/boundary:heatmap`](.claude/commands/boundary/boundary-heatmap.md) - Visualize risk zones
- [`/boundary:risk-assess`](.claude/commands/boundary/boundary-risk-assess.md) - Evaluate current risk
- [`/boundary:bbcr-fallback`](.claude/commands/boundary/boundary-bbcr-fallback.md) - Execute recovery
- [`/boundary:safe-bridge`](.claude/commands/boundary/boundary-safe-bridge.md) - Find safe connections

**Reasoning Operations** (`/reasoning:*`):
- [`/reasoning:multi-path`](.claude/commands/reasoning/reasoning-multi-path.md) - Parallel reasoning exploration
- [`/reasoning:tension-calc`](.claude/commands/reasoning/reasoning-tension-calc.md) - Calculate semantic tension
- [`/reasoning:logic-vector`](.claude/commands/reasoning/reasoning-logic-vector.md) - Analyze logic flow
- [`/reasoning:resonance`](.claude/commands/reasoning/reasoning-resonance.md) - Measure stability
- [`/reasoning:chain-validate`](.claude/commands/reasoning/reasoning-chain-validate.md) - Verify logic chains

**Memory Management** (`/memory:*`):
- [`/memory:checkpoint`](.claude/commands/memory/memory-checkpoint.md) - Create recovery points
- [`/memory:recall`](.claude/commands/memory/memory-recall.md) - Search and retrieve memories
- [`/memory:compress`](.claude/commands/memory/memory-compress.md) - Optimize tree size
- [`/memory:merge`](.claude/commands/memory/memory-merge.md) - Combine related nodes

**📚 [WFGY Documentation](.claude/commands/wfgy/README.md)** - Mathematical foundations, performance benchmarks, and comprehensive usage guide for semantic reasoning.


<a id="how-it-works"></a>
## How It Works

Claude Code automatically recognizes markdown files in `.claude/commands/` as slash commands. Files are loaded on startup and available immediately.

### Command Structure
Each command file needs:
- **Title**: `# Command Name`
- **Description**: Brief overview of what the command does
- **Instructions**: `## Instructions` section with detailed steps

Example minimal command (`my-command.md`):
```markdown
# My Custom Command

Performs a specific task in my project.

## Instructions

1. **First Step**
   - Do this thing
   - Check that thing

2. **Second Step**
   - Execute this action
   - Verify the result
```

Use it immediately with: `/namespace:my-command`

### Using Commands
Commands use the format `/namespace:command-name`. Each command executes a structured workflow defined in its markdown file.

**Examples:**
- `/dev:code-review` - Analyze codebase for quality, security, and performance
- `/project:create-feature dashboard` - Plan, implement, and test a new feature
- `/dev:fix-issue 123` - Resolve GitHub issue with systematic approach
- `/simulation:business-scenario-explorer Evaluate market expansion` - Model business scenarios

<a id="common-workflows"></a>
## Common Workflows

**New Feature Development:**
```bash
/dev:code-review                    # Assess current state
/project:create-feature user-dashboard  # Implement feature
/security:security-audit                 # Verify security
```

**Bug Fixing:**
```bash
/dev:fix-issue 456                  # Fix the specific issue
/dev:code-review                    # Verify fix quality
```

**Code Maintenance:**
```bash
/security:dependency-audit               # Check for outdated dependencies
/performance:performance-audit              # Identify bottlenecks
/dev:refactor-code legacy-module    # Improve problematic areas
```

**Strategic Decision Making:**
```bash
/simulation:constraint-modeler              # Map decision constraints
/simulation:business-scenario-explorer      # Explore multiple timelines
/simulation:decision-tree-explorer          # Optimize decision choices
```

**Complex Project Management:**
```bash
/orchestration:start                        # Break down project into tasks
/orchestration:status                       # Monitor progress
/orchestration:resume                       # Continue after breaks
/orchestration:commit                       # Create linked Git commits
```

<a id="need-more-details"></a>
## Additional Documentation

- **[Installation Guide](docs/INSTALLATION.md)** - Installation methods, troubleshooting, and configuration
- **[Customization Guide](docs/CUSTOMIZATION.md)** - Command modification and creation
- **[Development Guide](docs/DEVELOPMENT.md)** - Contributing, testing, and best practices

<a id="contributing"></a>
## Contributing

This repository accepts contributions for slash commands, AI agents, and skills.

### Contribution Areas

- **Commands** - New workflow commands or enhancements to existing ones
- **AI Agents** - Specialized agents for development tasks
- **Skills** - Model-invoked capabilities for recurring workflows
- **Documentation** - Improvements to guides and examples
- **Bug Fixes** - Issues with existing functionality

### Contribution Process

1. Fork the repository
2. Add or modify content in appropriate directories
3. Test changes according to guidelines
4. Submit pull request with clear description

See [Development Guide](docs/DEVELOPMENT.md) for contribution guidelines, testing requirements, and quality standards.

<a id="automated-changelog"></a>
## Automated Changelog

Changelog generation is automated through GitHub Actions and manual scripts.

### Automatic Updates
- GitHub Actions integration detects command additions
- Tracks new files and modifications
- Generates formatted changelog entries
- Adds summary comments to pull requests

### Manual Updates
Run the update script for manual changelog generation:
```bash
./scripts/update-changelog.sh
```

The script performs the following operations:
- Scans command files in `.claude/commands/`
- Extracts command names and descriptions
- Updates `CHANGELOG.md` with categorized listings
- Creates backup of existing changelog

### Features
- Command categorization by type
- Total count tracking
- Description extraction from source files
- Backup creation before modifications

<a id="release-process"></a>
## Release Process

Automated releases use [Conventional Commits](https://www.conventionalcommits.org/). Merges to main trigger the release workflow:

1. Commit analysis determines version bump type
2. Version updates based on commit types
3. Release notes generated from commit messages
4. GitHub releases created with downloadable bundles
5. Changelog updated with categorized changes

### Version Bumping

- `fix:` commits → Patch release (1.0.0 → 1.0.1)
- `feat:` commits → Minor release (1.0.0 → 1.1.0)
- Breaking changes → Major release (1.0.0 → 2.0.0)

### Release Triggers

- Pull request merges with conventional commit titles
- Direct pushes to main with conventional commits

For commit format details, see [CONTRIBUTING.md](CONTRIBUTING.md).

<a id="requirements"></a>
## Requirements

- Claude Code version 1.0 or later
- Commands work with any programming language or framework

## Attribution

### External AI Agents

This project includes 44 specialized AI agents from [wshobson/agents](https://github.com/wshobson/agents), expanding our collection to 55 total agents. These external agents provide expertise in:

- **Development**: Backend architecture, frontend development, mobile development, GraphQL
- **Languages**: Python, Go, Rust, C/C++, JavaScript, SQL specialists
- **Infrastructure**: DevOps, cloud architecture, database administration, Terraform
- **Quality**: Code review, security auditing, performance engineering, test automation

Full attribution and details can be found in [.claude/agents/external/wshobson/ATTRIBUTION.md](.claude/agents/external/wshobson/ATTRIBUTION.md).

---

*Inspired by [Anthropic's Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)*
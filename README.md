# Claude Command Suite

![Version](https://img.shields.io/badge/version-3.7.0-blue?style=for-the-badge)
![Total Commands](https://img.shields.io/badge/Total%20Commands-122%20and%20growing!-brightgreen?style=for-the-badge)
![AI Agents](https://img.shields.io/badge/AI%20Agents-54%20Intelligent%20Assistants-red?style=for-the-badge)
![GitHub Release](https://img.shields.io/github/v/release/qdhenry/Claude-Command-Suite?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)
<!-- Dynamic badge (will work after PR merge): ![Total Commands](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/qdhenry/Claude-Command-Suite/main/.github/badges/command-count.json&style=for-the-badge) -->

> **Inspired by Anthropic's Claude Code Best Practices**: A comprehensive development toolkit designed following [Anthropic's Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) to maximize AI-assisted software development effectiveness.

**Claude Command Suite** is a powerful collection of 122+ custom slash commands, 54 intelligent AI agents, and automated workflows that transform Claude Code into your ultimate development partner. From code reviews and test generation to strategic business simulations and automated GitHub-Linear synchronization, this suite provides structured, repeatable workflows for every aspect of modern software development.

- **🚀 Slash Commands**: Organized namespace commands like `/dev:code-review`, `/test:generate-test-cases`, and `/deploy:prepare-release` for consistent, thorough development workflows
- **🤖 AI Agents**: Specialized assistants that proactively handle complex tasks like security auditing, test coverage optimization, and cross-platform issue synchronization
- **🔄 Automated Workflows**: Pre-built sequences for common development patterns, from feature implementation to production deployment
- **🎯 Reality Simulators**: Advanced decision-making tools that model business scenarios, system behaviors, and architectural choices across multiple timelines
- **📋 Task Orchestration**: Intelligent task management system that breaks down complex projects, tracks progress, syncs with Git, and maintains context across sessions

## 🤖 NEW: Intelligent AI Agents

<div align="center">

**Transform your commands into proactive AI assistants!**

[![AI Agents](https://img.shields.io/badge/🤖_AI_Agents-54_Specialized_Assistants-ff6b6b?style=for-the-badge&labelColor=4c1d95)](.claude/agents/README.md)
[![Workflows](https://img.shields.io/badge/🔄_Workflows-10+_Automated-4ecdc4?style=for-the-badge&labelColor=1a535c)](.claude/agents/WORKFLOW_EXAMPLES.md)
[![Learn More](https://img.shields.io/badge/📚_Learn_More-Agent_Documentation-ffd93d?style=for-the-badge&labelColor=2d3436)](.claude/agents/README.md)

</div>

**Introducing Claude Command Suite AI Agents** - Specialized AI assistants that transform static commands into intelligent, proactive development partners:

- **🛡️ Code Quality Suite**: Automated code review, security scanning, performance analysis
- **🧪 Test Engineer**: Intelligent test generation with 90%+ coverage targets
- **🔄 Integration Manager**: Seamless GitHub-Linear synchronization
- **📊 Strategic Analyst**: Business scenario modeling and decision support
- **🚀 And More**: Project setup, release management, architecture analysis

[**→ Explore AI Agents Documentation**](.claude/agents/README.md) | [**→ See Workflow Examples**](.claude/agents/WORKFLOW_EXAMPLES.md)

---

## 📚 Table of Contents

| **🤖 AI Agents** | **🚀 Getting Started** | **⚡ Commands** | **💡 Usage** | **🔧 Development** |
|:----------------:|:---------------------:|:---------------:|:------------:|:------------------:|
| [AI Agents](#-new-intelligent-ai-agents) | [Quick Start](#quick-start) | [Available Commands](#available-commands) | [How It Works](#how-it-works) | [Contributing](#contributing) |
| [Agent Docs](.claude/agents/README.md) | [Installation Guide](docs/INSTALLATION.md) | [Command Namespaces](#command-namespaces) | [Common Workflows](#common-workflows) | [Release Process](#release-process) |
| [Workflows](.claude/agents/WORKFLOW_EXAMPLES.md) |  |  |  | [Automated Changelog](#automated-changelog) |

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

🚀 **122+ Commands Organized by Namespace** - Discover the right tool for any task with our namespace organization.

🤖 **NEW: 54 Intelligent AI Agents** - Transform commands into proactive assistants! [Learn more about AI Agents](.claude/agents/README.md)

### 🎯 Quick Navigation to Command Namespaces

| **Core Development** | **Quality & Testing** | **Deployment** | **Collaboration** | **Advanced** |
|:--------------------:|:--------------------:|:--------------:|:----------------:|:------------:|
| [🚀 Project](#-project---project-management) | [🧪 Test](#-test---testing-suite) | [📦 Deploy](#-deploy---deployment--release) | [👥 Team](#-team---team-collaboration) | [🎯 Simulation](#-simulation---ai-reality-simulators) |
| [💻 Dev](#-dev---development-tools) | [🔒 Security](#-security---security--compliance) | [📚 Docs](#-docs---documentation-generation) | [🔄 Sync](#-sync---integration--synchronization) | [📋 Orchestration](#-orchestration---task-orchestration) |
| [🔧 Setup](#-setup---configuration--setup) | [⚡ Performance](#-performance---performance-optimization) |  |  |  |

<a id="command-namespaces"></a>
## Command Namespaces

### 🚀 `/project:*` - Project Management
Initialize, configure, and manage projects. Includes commands for creating new projects, adding packages, tracking milestones, and monitoring project health.

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

### 💻 `/dev:*` - Development Tools
Essential development utilities including code review, debugging, refactoring, and specialized AI modes for enhanced assistance.

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

### 🧪 `/test:*` - Testing Suite
Comprehensive testing tools covering unit tests, integration tests, E2E tests, coverage analysis, mutation testing, and visual regression testing.

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

### 🔒 `/security:*` - Security & Compliance
Security auditing, dependency scanning, authentication implementation, and security hardening tools to keep your codebase secure.

- [`/security:security-audit`](.claude/commands/security/security-audit.md) - Perform comprehensive security assessment
- [`/security:dependency-audit`](.claude/commands/security/dependency-audit.md) - Audit dependencies for security vulnerabilities
- [`/security:security-hardening`](.claude/commands/security/security-hardening.md) - Harden application security configuration
- [`/security:add-authentication-system`](.claude/commands/security/add-authentication-system.md) - Implement secure user authentication system

### ⚡ `/performance:*` - Performance Optimization
Tools for optimizing build times, bundle sizes, database queries, caching strategies, and overall application performance.

- [`/performance:performance-audit`](.claude/commands/performance/performance-audit.md) - Audit application performance metrics
- [`/performance:optimize-build`](.claude/commands/performance/optimize-build.md) - Optimize build processes and speed
- [`/performance:optimize-bundle-size`](.claude/commands/performance/optimize-bundle-size.md) - Reduce and optimize bundle sizes
- [`/performance:optimize-database-performance`](.claude/commands/performance/optimize-database-performance.md) - Optimize database queries and performance
- [`/performance:implement-caching-strategy`](.claude/commands/performance/implement-caching-strategy.md) - Design and implement caching solutions
- [`/performance:add-performance-monitoring`](.claude/commands/performance/add-performance-monitoring.md) - Setup application performance monitoring
- [`/performance:setup-cdn-optimization`](.claude/commands/performance/setup-cdn-optimization.md) - Configure CDN for optimal delivery
- [`/performance:system-behavior-simulator`](.claude/commands/performance/system-behavior-simulator.md) - Simulate system performance under various loads

### 🔄 `/sync:*` - Integration & Synchronization
Bidirectional sync between GitHub Issues and Linear, PR tracking, conflict resolution, and cross-platform task management.

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

### 📦 `/deploy:*` - Deployment & Release
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

### 📚 `/docs:*` - Documentation Generation
Automated documentation tools for APIs, architecture diagrams, onboarding guides, and troubleshooting documentation.

- [`/docs:generate-api-documentation`](.claude/commands/docs/generate-api-documentation.md) - Auto-generate API reference documentation
- [`/docs:doc-api`](.claude/commands/docs/doc-api.md) - Generate API documentation from code
- [`/docs:create-architecture-documentation`](.claude/commands/docs/create-architecture-documentation.md) - Generate comprehensive architecture documentation
- [`/docs:create-onboarding-guide`](.claude/commands/docs/create-onboarding-guide.md) - Create developer onboarding guide
- [`/docs:migration-guide`](.claude/commands/docs/migration-guide.md) - Create migration guides for updates
- [`/docs:troubleshooting-guide`](.claude/commands/docs/troubleshooting-guide.md) - Generate troubleshooting documentation

### 🔧 `/setup:*` - Configuration & Setup
Initial setup commands for development environments, linting, formatting, monitoring, database schemas, and API design.

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

### 👥 `/team:*` - Team Collaboration
Team workflow tools including standup reports, sprint planning, retrospectives, workload balancing, and knowledge capture.

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

### 🎯 `/simulation:*` - AI Reality Simulators
*Inspired by "AI agents at their most under-leveraged point" by AI News & Strategy Daily | Nate B. Jones*

Advanced simulation and modeling tools for exponential decision value. Transform from linear execution gains to exponential strategic advantage through systematic scenario exploration, digital twins, and timeline compression.

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

### 📋 `/orchestration:*` - Task Orchestration
Intelligent task management and execution system that transforms complex projects into organized, trackable workflows. Break down big ideas into manageable tasks, track progress across sessions, sync with Git, and maintain context even after breaks.

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


<a id="how-it-works"></a>
## How It Works

Claude Code automatically recognizes any markdown file in your project's `.claude/commands/` directory as a slash command. No installation or setup required - just add the file and start using it!

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
Commands are available as `/namespace:command-name` in Claude Code. Each command follows a structured workflow that Claude executes automatically, ensuring consistent and thorough results across different projects.

**Example workflows:**
- `/dev:code-review` analyzes your entire codebase for quality, security, and performance
- `/project:create-feature dashboard` plans, implements, and tests a new dashboard feature
- `/dev:fix-issue 123` systematically resolves GitHub issue #123 with testing
- `/simulation:business-scenario-explorer Evaluate market expansion into Europe` models multiple business timelines and outcomes

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
## Need More Details?

- **[Installation Guide](docs/INSTALLATION.md)** - Detailed installation methods, troubleshooting, and configuration
- **[Customization Guide](docs/CUSTOMIZATION.md)** - How to modify commands and create new ones
- **[Development Guide](docs/DEVELOPMENT.md)** - Contributing, testing, and best practices

<a id="contributing"></a>
## Contributing

This repository exists to collect and share useful slash commands for Claude Code. **Contributions are welcome!**

### Ways to Contribute

- **Share new commands** - Create commands for workflows you find useful
- **Improve existing commands** - Enhance commands with better practices
- **Add language-specific variants** - Adapt commands for specific tech stacks
- **Fix bugs** - Resolve issues with existing commands
- **Improve documentation** - Make guides clearer and more helpful

### Quick Contribution

1. Fork this repository
2. Add or modify commands in `.claude/commands/`
3. Test your changes thoroughly
4. Submit a pull request with a clear description

See **[Development Guide](docs/DEVELOPMENT.md)** for detailed contribution guidelines, testing practices, and quality standards.

<a id="automated-changelog"></a>
## Automated Changelog

This project features automated changelog generation to track command additions and updates:

### 🤖 **Automatic Updates**
- **GitHub Actions Integration**: Automatically detects when new commands are added
- **Smart Detection**: Tracks both new command files and modifications to existing ones
- **Formatted Entries**: Generates properly formatted changelog entries with command descriptions
- **PR Comments**: Provides summary comments on pull requests with changelog updates

### 📝 **Manual Updates**
For manual changelog updates, use the provided script:
```bash
./scripts/update-changelog.sh
```

This script will:
- Scan all command files in `.claude/commands/`
- Extract command names and descriptions
- Update `CHANGELOG.md` with categorized command listings
- Create a backup of the existing changelog

### 📊 **Changelog Features**
- **Command Categorization**: Automatically groups commands by type (Analysis, Development, Testing, etc.)
- **Total Count Tracking**: Maintains accurate count of total available commands  
- **Description Extraction**: Pulls descriptions directly from command files
- **Backup Safety**: Creates backups before making changes

<a id="release-process"></a>
## Release Process

This project uses automated releases powered by [Conventional Commits](https://www.conventionalcommits.org/). Every merge to the main branch triggers our release workflow which:

1. **Analyzes commits** to determine version bump type
2. **Updates version** automatically based on commit types
3. **Generates release notes** from commit messages
4. **Creates GitHub releases** with downloadable bundles
5. **Updates changelog** with categorized changes

### Version Bumping Rules

- `fix:` commits → Patch release (1.0.0 → 1.0.1)
- `feat:` commits → Minor release (1.0.0 → 1.1.0)  
- Breaking changes → Major release (1.0.0 → 2.0.0)

### Making Releases

Releases happen automatically when you:
1. Merge PRs with conventional commit titles
2. Push directly to main with conventional commits

For details on contributing and commit formats, see [CONTRIBUTING.md](CONTRIBUTING.md).

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
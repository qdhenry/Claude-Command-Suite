# Incremental Feature Build Command - Implementation Checklist

## Overview
Creating a comprehensive Claude Code command based on best practices for long-running agents that prevents premature completion and ensures incremental progress.

## Tasks

- [x] Review existing command structure and patterns
- [x] Create this checklist
- [x] Create the command file at `.claude/commands/dev/incremental-feature-build.md`
- [x] Include feature list initialization phase
- [x] Include JSON-based feature tracking
- [x] Include incremental progress workflow
- [x] Include git commit and progress tracking
- [x] Include recovery mechanisms
- [ ] Commit changes

## Key Concepts to Include (from best practices)

1. **Feature List Generation**
   - Comprehensive feature requirements file
   - Features marked as "failing" initially
   - JSON format for tracking (less likely to be modified)

2. **Incremental Progress**
   - Work on one feature at a time
   - Strict instructions against removing/editing tests
   - Clear outline of full functionality

3. **Environment Cleanliness**
   - Commit progress with descriptive messages
   - Write progress summaries
   - Use git for reverting bad changes
   - Recovery of working states

## Command Structure

- Title and description
- Usage examples
- Step-by-step instructions
- JSON schema for feature tracking
- Git workflow integration
- Progress file management

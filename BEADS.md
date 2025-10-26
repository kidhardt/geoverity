# Beads Issue Tracking & Enforcement

This project uses [Beads](https://github.com/steveyegge/beads) for comprehensive issue tracking and memory management. Beads provides a lightweight, git-based issue tracking system with automated enforcement mechanisms to ensure **everything** is tracked.

## Table of Contents

- [Why Beads?](#why-beads)
- [Quick Start](#quick-start)
- [Enforcement Rules](#enforcement-rules)
- [Usage](#usage)
- [Scripts](#scripts)
- [Workflow Examples](#workflow-examples)
- [Troubleshooting](#troubleshooting)

## Why Beads?

Beads solves the problem of context loss in long-running development projects by providing:

1. **Persistent Memory**: Track all tasks, bugs, features, and technical debt
2. **Dependency Tracking**: Understand what blocks what with `blocks`, `related`, `parent-child`, and `discovered-from` relationships
3. **Ready Work Detection**: Automatically find unblocked issues to work on next
4. **Git-Based Distribution**: JSONL files committed to git, synced across machines
5. **Agent-Friendly**: JSON output for programmatic integration
6. **Enforcement**: Automated validation ensures nothing falls through the cracks

## Quick Start

### Installation

Beads CLI is already installed. Verify with:

```bash
bd version
```

### Initialize Project

Already done! Beads is initialized in `.beads/` directory.

### Install Git Hooks

Git hooks enforce beads tracking automatically:

```bash
npm run hooks:install
```

This installs:
- **commit-msg**: Validates commit messages reference beads issues
- **pre-commit**: Validates TODO/FIXME comments have beads tracking
- **post-merge**: Syncs beads database after git pull/merge

### Create Your First Issue

```bash
bd create "Set up project configuration" -d "Configure TypeScript, Vite, and Astro" -p 1 -t task
```

## Enforcement Rules

This project enforces **strict beads tracking** for all work items:

### 1. Commit Messages MUST Reference Beads Issues

✅ **Valid:**
```
bd-42: Add user authentication
bd-123: Fix memory leak in data processing
```

❌ **Invalid:**
```
Add user authentication
Fixed bug
WIP
```

### 2. TODO Comments MUST Reference Beads Issues

✅ **Valid:**
```typescript
// TODO: bd-42 Implement rate limiting for API endpoints
// TODO: bd-123 Refactor this function to use async/await
```

❌ **Invalid:**
```typescript
// TODO: Implement rate limiting
// TODO: Refactor this later
```

### 3. FIXME Comments MUST Reference Beads Issues

✅ **Valid:**
```typescript
// FIXME: bd-99 Memory leak when processing large files
// FIXME: bd-100 Race condition in WebSocket handler
```

❌ **Invalid:**
```typescript
// FIXME: Memory leak here
// FIXME: This breaks sometimes
```

### 4. Feature Branches MUST Reference Beads Issues

✅ **Valid:**
```
bd-42-user-authentication
bd-123-fix-memory-leak
```

❌ **Invalid:**
```
feature/authentication
fix-bug
my-branch
```

**Note:** `main`, `master`, `develop`, and `release/*` branches are exempt.

### 5. Complex Functions SHOULD Have Beads Tracking

Functions with high cyclomatic complexity (>15) should have a TODO/FIXME comment with beads tracking explaining the complexity or tracking refactoring work.

## Usage

### TypeScript API

Use the TypeScript wrapper for programmatic access:

```typescript
import { beads } from './src/beads/wrapper';
import { enforcement } from './src/beads/enforcement';

// Create an issue
const issue = beads.create('Implement caching layer', {
  description: 'Add Redis caching for API responses',
  type: 'feature',
  priority: 1,
  labels: ['backend', 'performance'],
});

console.log(`Created: ${issue.id}`);

// Get ready work
const readyIssues = beads.ready('priority');
console.log(`Ready to work on: ${readyIssues.length} issues`);

// Validate a commit message
const validation = enforcement.validateCommitMessage('bd-42: Add caching');
console.log(`Valid: ${validation.valid}`);

// Auto-capture untracked TODOs
const captured = enforcement.autoCaptureTodos('./src/myfile.ts');
console.log(`Auto-captured: ${captured.length} issues`);
```

### CLI Commands

```bash
# Create issues
bd create "Title" -d "Description" -p 1 -t bug

# List issues
bd list --json
bd list --status open
bd list --priority 0

# Get ready work (no blockers)
bd ready --json
bd ready --sort priority

# Show issue details
bd show bd-42 --json

# Update issue
bd update bd-42 --status in_progress
bd update bd-42 --priority 0

# Close issue
bd close bd-42 --reason "Implemented successfully"

# Dependencies
bd dep add bd-43 bd-42 --type blocks  # bd-43 blocks bd-42
bd dep tree bd-42                     # Show dependency tree
bd dep cycles                         # Check for circular dependencies

# Labels
bd label add bd-42 urgent
bd label list bd-42

# Sync database
bd sync
```

## Scripts

The following npm scripts are available:

### Beads Management

```bash
# Auto-capture untracked TODO/FIXME comments
npm run beads:capture

# Validate all beads tracking
npm run beads:validate

# List all issues (JSON)
npm run beads:list

# Show ready work (JSON)
npm run beads:ready

# Sync database
npm run beads:sync

# Show database info
npm run beads:info
```

### Git Hooks

```bash
# Install git hooks
npm run hooks:install
```

Git hooks are automatically installed after `npm install` via the `postinstall` script.

## Workflow Examples

### Starting New Work

```bash
# 1. Find ready work
bd ready --sort priority

# 2. Pick an issue (e.g., bd-42)
bd update bd-42 --status in_progress

# 3. Create feature branch
git checkout -b bd-42-implement-feature

# 4. Do your work...

# 5. Commit with issue reference
git commit -m "bd-42: Implement user authentication"

# 6. Complete the issue
bd close bd-42 --reason "Feature implemented and tested"
```

### Discovering New Work During Development

```bash
# You discover a bug while working on bd-42

# 1. Create new issue
bd create "Fix authentication token expiration" -d "Tokens expire too quickly" -p 0 -t bug

# Returns: bd-123

# 2. Link to parent issue (genealogy tracking)
bd dep add bd-123 bd-42 --type discovered-from

# 3. Add TODO comment in code
# TODO: bd-123 Fix token expiration logic

# 4. Decide priority
#    - Block current work: bd dep add bd-42 bd-123 --type blocks
#    - Work on later: Leave as-is, will show in bd ready
```

### Managing Complex Tasks

```bash
# Create epic for large feature
bd create "User Authentication System" -t epic -p 1

# Returns: bd-100

# Create subtasks
bd create "Implement login endpoint" -t task -p 1
bd create "Implement registration endpoint" -t task -p 1
bd create "Add password hashing" -t task -p 0
bd create "Add JWT token generation" -t task -p 0

# Link subtasks to epic
bd dep add bd-101 bd-100 --type parent-child
bd dep add bd-102 bd-100 --type parent-child
bd dep add bd-103 bd-100 --type parent-child
bd dep add bd-104 bd-100 --type parent-child

# Create dependencies between subtasks
bd dep add bd-101 bd-103 --type blocks  # Login needs password hashing
bd dep add bd-101 bd-104 --type blocks  # Login needs JWT
bd dep add bd-102 bd-103 --type blocks  # Registration needs password hashing

# Check what's ready to work on
bd ready --sort priority
# Will show bd-103 and bd-104 first (they have no blockers)
```

### Auto-Capturing Untracked Work

If you have existing TODO/FIXME comments without beads tracking:

```bash
# Scan and auto-create issues
npm run beads:capture

# Review created issues
bd list --label auto-captured

# Update your code comments with issue IDs
# Before: // TODO: Add input validation
# After:  // TODO: bd-150 Add input validation
```

### Validation Before Commit

```bash
# Manually validate (git hooks do this automatically)
npm run beads:validate

# Fix any violations
npm run beads:capture  # Auto-create issues for untracked comments

# Or manually create issues
bd create "Fix validation in form handler" -t bug -p 1
# Returns: bd-200

# Update your TODO comment
# // TODO: bd-200 Add input validation to form handler
```

## ESLint Integration

ESLint automatically enforces beads tracking in your IDE:

**Rules:**
- `beads/require-beads-reference` (error): TODO/FIXME must reference beads issue
- `beads/no-untracked-complexity` (warning): Complex functions should have tracking

**Configuration** ([eslint.config.js](eslint.config.js)):

```javascript
import beadsPlugin from './eslint-plugin-beads/index.js';

export default [
  {
    plugins: { beads: beadsPlugin },
    rules: {
      'beads/require-beads-reference': 'error',
      'beads/no-untracked-complexity': ['warn', { maxComplexity: 15 }],
    },
  },
];
```

## Troubleshooting

### Commit Rejected: "Commit message must reference a beads issue"

**Solution:**
```bash
# Create an issue for your work
bd create "Your work description" -t task -p 2

# Amend your commit message
git commit --amend -m "bd-XXX: Your work description"
```

### Pre-commit Failed: "TODO comment must reference a beads issue"

**Solution:**
```bash
# Auto-capture all untracked TODOs
npm run beads:capture

# Update your code with the generated issue IDs
# The script will tell you which issues were created

# Or manually create an issue
bd create "Description from TODO" -t task -p 2

# Update your TODO comment with the issue ID
# // TODO: bd-XXX Description
```

### Branch Name Rejected

**Solution:**
```bash
# Create an issue
bd create "Feature description" -t feature -p 2

# Create branch with proper naming
git checkout -b bd-XXX-feature-name
```

### Beads Database Out of Sync

**Solution:**
```bash
# Sync database
npm run beads:sync

# Or use CLI
bd sync
```

### Can't Find Beads Command

**Solution:**
```bash
# Verify beads is installed
bd version

# If not installed, reinstall
curl -fsSL https://raw.githubusercontent.com/steveyegge/beads/main/scripts/install.sh | bash

# Or on Windows (PowerShell)
irm https://raw.githubusercontent.com/steveyegge/beads/main/install.ps1 | iex
```

## Best Practices

1. **Create issues before starting work**: Use `bd ready` to pick work
2. **Keep issues small**: Break large features into smaller tasks
3. **Use dependencies**: Track blocking relationships with `bd dep add`
4. **Close with reason**: Always provide a reason when closing: `bd close bd-X --reason "..."`
5. **Auto-capture regularly**: Run `npm run beads:capture` to catch untracked work
6. **Sync after pull**: Run `bd sync` after git pull (post-merge hook does this automatically)
7. **Use labels**: Organize issues with labels: `bd label add bd-X urgent`
8. **Check cycles**: Regularly check for circular dependencies: `bd dep cycles`

## Integration with AI Agents

Beads is designed for AI agent integration. The TypeScript wrapper provides type-safe access:

```typescript
import { beads, enforcement } from './src/beads';

// Agent discovers a problem
const issue = beads.create('Memory leak in data processor', {
  type: 'bug',
  priority: 0,
  description: 'High memory usage when processing large datasets',
  labels: ['performance', 'critical'],
});

// Link to current work
beads.addDependency('bd-current-issue', issue.id, 'discovered-from');

// Get next actionable task
const nextTask = enforcement.getNextTask();
if (nextTask) {
  console.log(`Working on: ${nextTask.title}`);
  enforcement.startTask(nextTask.id);
}

// Complete work
enforcement.completeTask(nextTask.id, 'Implemented and tested');
```

## File Structure

```
.beads/
  ├── issues.jsonl          # Source of truth (committed to git)
  ├── config.json           # Beads configuration (committed to git)
  ├── geoverity.db          # SQLite cache (gitignored)
  └── bd.sock               # Daemon socket (gitignored)

src/
  └── beads/
      ├── wrapper.ts        # TypeScript wrapper for beads CLI
      └── enforcement.ts    # Enforcement utilities and validation

scripts/
  ├── validate-beads.ts     # Pre-commit validation script
  ├── beads-capture.ts      # Auto-capture untracked TODOs
  └── install-git-hooks.sh  # Git hooks installation

eslint-plugin-beads/
  ├── index.js              # ESLint plugin for beads enforcement
  └── package.json          # Plugin package definition
```

## Additional Resources

- [Beads GitHub Repository](https://github.com/steveyegge/beads)
- [Beads Documentation](https://github.com/steveyegge/beads/blob/main/README.md)
- [TypeScript Wrapper API](src/beads/wrapper.ts)
- [Enforcement API](src/beads/enforcement.ts)

---

**Remember: If it's not in beads, it doesn't exist!** 🔮

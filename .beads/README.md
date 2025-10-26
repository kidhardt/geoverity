# Beads Issue Tracking for GeoVerity 2026

This directory contains the [Beads](https://github.com/steveyegge/beads) issue tracking database for GeoVerity 2026.

## What is Beads?

Beads is a lightweight, git-based issue tracker designed for AI coding agents. It provides:
- Task and issue management with dependency tracking
- Ready-work detection (automatically finds unblocked tasks)
- Git-based synchronization via `issues.jsonl`
- Complete audit trail of all changes
- JSON output for programmatic access

## File Structure

- `issues.jsonl` - Source of truth (committed to git)
- `geoverity.db` - Local SQLite cache (gitignored)
- `bd.sock` - Daemon socket (gitignored)
- `.gitignore` - Official beads gitignore rules

## Usage

See [BEADS.md](../BEADS.md) in the project root for complete documentation, including:
- Creating and managing issues with `bd` CLI
- TypeScript wrapper API ([src/beads/wrapper.ts](../src/beads/wrapper.ts))
- Enforcement system ([src/beads/enforcement.ts](../src/beads/enforcement.ts))
- Validation scripts and git hooks

## Quick Reference

```bash
# Create issue
bd create "Task title" -d "Description" -p 1 -t task

# List all issues
bd list --json

# Find ready work
bd ready --json

# Update status
bd update bd-1 --status in_progress

# Close issue
bd close bd-1 --reason "Completed"
```

For more information, see the [official Beads documentation](https://github.com/steveyegge/beads).

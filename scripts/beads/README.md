# Beads CLI Integration

GeoVerity uses the [Beads](https://github.com/steveyegge/beads) issue tracking CLI to enforce that all TODO and FIXME comments reference tracked work.

## Installation

### Option 1: Install via Go (Recommended)

```bash
go install github.com/steveyegge/beads/cmd/bd@latest
```

Verify installation:
```bash
bd info
```

Expected output:
```
Beads daemon: healthy
Issue count: X
Database: /path/to/.beads/issues.jsonl
```

### Option 2: Skip Beads Enforcement (Development/CI)

If you don't want to install Beads or are running in CI without the CLI, set the `SKIP_BEADS` environment variable:

```bash
export SKIP_BEADS=1
npm run lint                  # Will skip beads enforcement
npm run beads:validate        # Will skip validation with warning
```

For CI environments, add to your workflow:
```yaml
env:
  SKIP_BEADS: 1
```

## Usage

### Initialize Beads in a New Repository

```bash
bd init
```

This creates `.beads/issues.jsonl` which tracks all issues. Commit this file to git.

### Common Commands

```bash
# List all tracked issues
npm run beads:list
# or
bd list

# Show beads daemon info
npm run beads:info
# or
bd info --json

# Sync with remote database (if configured)
npm run beads:sync
# or
bd sync

# Create a new issue
bd create "Fix accessibility violations in homepage"

# Close an issue
bd close bd-123
```

### ESLint Integration

The project uses `eslint-plugin-beads` to enforce issue tracking in code comments.

**Valid TODO/FIXME comments:**
```typescript
// TODO: bd-42 Add ARIA labels to navigation
// FIXME: bd-99 Fix race condition in data loader
```

**Invalid (will fail lint):**
```typescript
// TODO: Fix this later          ❌ No beads reference
// FIXME: broken                  ❌ No beads reference
// TODO: bd-999 Add feature       ❌ Issue doesn't exist
// FIXME: bd-42 Fix bug           ❌ Issue is closed
```

## Troubleshooting

### Error: "bd: command not found"

**Solution:**
1. Ensure Go is installed: `go version`
2. Ensure `$GOPATH/bin` is in your PATH:
   ```bash
   export PATH="$PATH:$(go env GOPATH)/bin"
   ```
3. Or use `SKIP_BEADS=1` to bypass

### Error: ".beads/issues.jsonl not found"

**Solution:**
```bash
bd init
git add .beads/
git commit -m "Initialize beads issue tracking"
```

### Error: "Beads daemon status is unhealthy"

**Solution:**
```bash
# Check daemon status
bd info

# Restart daemon (if applicable)
bd sync
```

### CI Failures Due to Missing Beads

**Solution:** Add to your CI workflow:
```yaml
- name: Run linting
  env:
    SKIP_BEADS: 1
  run: npm run lint
```

## Configuration

### Disable Beads for Specific Files

Add to `.eslintrc.json`:
```json
{
  "overrides": [
    {
      "files": ["scripts/**/*.js"],
      "rules": {
        "beads/require-beads-reference": "off"
      }
    }
  ]
}
```

### Adjust Complexity Threshold

The `no-untracked-complexity` rule flags complex functions without beads tracking:

```json
{
  "rules": {
    "beads/no-untracked-complexity": ["warn", { "maxComplexity": 15 }]
  }
}
```

## Workflow Integration

### Pre-commit Hook

The pre-commit hook validates beads database integrity before allowing commits.

**Disabled by setting:**
```bash
export SKIP_BEADS=1
git commit -m "Your message"
```

### Pull Request Validation

PR descriptions must reference beads issues in the "Related Issues" section:
```markdown
## Related Issues

Refs: bd-123, bd-456
```

## Best Practices

1. **Create issues before work:** Run `bd create "Description"` before starting tasks
2. **Reference in commits:** Include `bd-XXX` in commit messages
3. **Close when done:** Run `bd close bd-XXX` or include `Closes bd-XXX` in PR description
4. **Sync regularly:** Run `bd sync` to keep remote database updated

## Architecture

```
.beads/
  └── issues.jsonl          # JSONL database of tracked issues

scripts/beads/
  ├── README.md            # This file
  ├── validate.js          # Validation script (supports SKIP_BEADS)
  └── create_phase11_beads.cjs  # Bulk issue creation

eslint-plugin-beads/
  ├── index.cjs            # ESLint rules
  └── package.json         # Plugin metadata
```

## Further Reading

- Beads GitHub: https://github.com/steveyegge/beads
- ESLint Plugin Docs: [eslint-plugin-beads/index.cjs](../../eslint-plugin-beads/index.cjs)
- GeoVerity Issue Hygiene: [docs/Phase11-Template-Organization.md](../../docs/Phase11-Template-Organization.md)

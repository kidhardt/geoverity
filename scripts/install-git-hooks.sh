#!/bin/bash
# Install git hooks for beads enforcement

HOOKS_DIR=".git/hooks"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Installing beads git hooks..."

# Create commit-msg hook
cat > "$HOOKS_DIR/commit-msg" << 'EOF'
#!/bin/bash
# Beads commit message validation hook

tsx scripts/validate-beads.ts "$1"
exit $?
EOF

chmod +x "$HOOKS_DIR/commit-msg"

# Create pre-commit hook
cat > "$HOOKS_DIR/pre-commit" << 'EOF'
#!/bin/bash
# Beads pre-commit validation hook

tsx scripts/validate-beads.ts
exit $?
EOF

chmod +x "$HOOKS_DIR/pre-commit"

# Create post-merge hook for beads sync
cat > "$HOOKS_DIR/post-merge" << 'EOF'
#!/bin/bash
# Beads post-merge sync hook

echo "Syncing beads issues..."
bd sync
EOF

chmod +x "$HOOKS_DIR/post-merge"

echo "✓ Git hooks installed successfully!"
echo ""
echo "Hooks installed:"
echo "  - commit-msg: Validates commit messages reference beads issues"
echo "  - pre-commit: Validates TODO/FIXME comments have beads tracking"
echo "  - post-merge: Syncs beads database after git pull/merge"

# Agent Memory System

## Purpose

Enables multiple Claude Code agent sessions to share context without requiring a persistent backend or database. Works perfectly with GeoVerity's static site architecture.

## Files

### context.json
**Current state snapshot** - What agents need to know NOW
- Current phase and state
- Blocking conditions
- Last agent actions
- Next actions to take
- Key decisions made
- Project state summary

**Updated:** On every major agent action or state change

**Read by:** Every agent on session start

### history.jsonl
**Complete event log** - What happened when
- Append-only log of all agent actions
- One JSON object per line
- Chronological order
- Complete audit trail

**Updated:** On every agent action (append-only)

**Read by:** Agents needing historical context, debugging, or audit trails

### decisions.json (Future)
**User decisions** - Persistent choices that guide future work
- Template preferences
- Color/typography choices
- Architecture decisions
- Feature priorities

**Updated:** When user makes explicit decisions

**Read by:** Agents implementing features based on user preferences

### artifacts.json (Future)
**Key deliverables** - Important files created/modified
- Templates
- Components
- Skills
- Documentation

**Updated:** When significant files are created

**Read by:** Agents needing to know what exists

---

## Usage

### For Agents (Claude Code)

**On session start:**
```typescript
// Read current context
const context = JSON.parse(
  fs.readFileSync('.claude/memory/context.json', 'utf8')
);

console.log(`Current state: ${context.currentState}`);
console.log(`Blocked on: ${context.blockedOn.description}`);
console.log(`Next actions: ${context.nextActions.join(', ')}`);
```

**After completing work:**
```typescript
// Update context
context.lastAgent = {
  name: 'claude-code',
  action: 'Created homepage template',
  filesModified: 5,
  beadsCompleted: ['geoverity-100']
};
context.lastUpdate = new Date().toISOString();

fs.writeFileSync(
  '.claude/memory/context.json',
  JSON.stringify(context, null, 2)
);

// Log to history
const event = {
  timestamp: new Date().toISOString(),
  agent: 'claude-code',
  action: 'create-template',
  details: { template: 'homepage', status: 'complete' }
};

fs.appendFileSync(
  '.claude/memory/history.jsonl',
  JSON.stringify(event) + '\n'
);
```

### For Humans (Developers)

**Check current status:**
```bash
cat .claude/memory/context.json | jq '.currentState'
# Output: "awaiting-template-approval"

cat .claude/memory/context.json | jq '.nextActions'
# Output: ["User answers 8 template questions", ...]
```

**View history:**
```bash
# Last 10 actions
tail -10 .claude/memory/history.jsonl | jq '.action'

# All git operations
grep -i 'git' .claude/memory/history.jsonl | jq '.'

# Timeline of session
jq '.timestamp + " " + .action' .claude/memory/history.jsonl
```

---

## Benefits

✅ **No backend required** - Pure JSON files, works with SSG
✅ **Version controlled** - Git tracks all memory changes
✅ **Human readable** - Easy to inspect and debug
✅ **Agent agnostic** - Any agent can read/write
✅ **Audit trail** - Complete history in JSONL
✅ **Zero dependencies** - No packages, no services

---

## Comparison to OpenMemory

| Feature | OpenMemory | Agent Memory (This) |
|---------|------------|---------------------|
| Architecture | Node.js service | JSON files |
| Persistence | SQLite database | Git-tracked files |
| Semantic search | Vector embeddings | Manual grep/jq |
| Context sharing | API calls | File reads |
| Infrastructure | Docker + workers | None (files only) |
| Complexity | High | Low |
| Fits GeoVerity SSG | ❌ No | ✅ Yes |

---

## Integration with Existing Systems

### Beads CLI
Agent memory complements (not replaces) Beads:
- **Beads:** Task/issue tracking (what needs to be done)
- **Agent Memory:** Session context (what agents did, what's blocked)

### Git History
Agent memory provides structured context on top of Git:
- **Git commits:** Code changes
- **Agent Memory:** Why changes were made, what's next

### Claude Skills
Agent memory helps skills know context:
- **Skills:** How to do things
- **Agent Memory:** What's been done, what's blocked

---

## Maintenance

**When to update context.json:**
- State changes (awaiting → in-progress → complete)
- Blocking conditions change
- Major decisions made
- Agent completes significant work

**When to append to history.jsonl:**
- Every agent action
- File creations/modifications
- Git operations
- Bead state changes
- Errors or blockers encountered

**When to clean up:**
- Archive old sessions (move history.jsonl to archives/)
- Keep context.json current (only latest state)
- Commit memory files to Git regularly

---

## Future Enhancements

**Potential additions:**
- `decisions.json` - User preference persistence
- `artifacts.json` - Key deliverables index
- `errors.jsonl` - Error log for debugging
- `metrics.json` - Performance/quality metrics
- Session archives in `.claude/memory/sessions/YYYY-MM-DD/`

**Semantic search alternative:**
Build-time embedding generation:
```bash
# At build time, generate embeddings for all pages
node scripts/generate-embeddings.js
# Output: public/embeddings.json (static, client-side queryable)
```

No OpenMemory needed, no backend required, still get semantic search.

---

**Created:** 2025-10-26
**Version:** 1.0.0
**Maintained by:** GeoVerity development team

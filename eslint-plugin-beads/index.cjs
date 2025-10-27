/**
 * ESLint Plugin for Beads Enforcement
 *
 * This plugin enforces that all TODO and FIXME comments reference a beads issue.
 */

const { execSync } = require('child_process');

/**
 * Get all beads issues (cached for performance)
 */
let issueCache = null;
let lastCacheTime = 0;
const CACHE_TTL = 10000; // 10 seconds

function getBeadsIssues() {
  const now = Date.now();
  if (issueCache && now - lastCacheTime < CACHE_TTL) {
    return issueCache;
  }

  try {
    const output = execSync('bd list --json', { encoding: 'utf-8' });
    issueCache = JSON.parse(output);
    lastCacheTime = now;
    return issueCache;
  } catch (error) {
    console.error('Failed to fetch beads issues:', error.message);
    return [];
  }
}

/**
 * Extract beads issue ID from text
 */
function extractIssueId(text) {
  const match = text.match(/(?:beads:)?(bd-\d+)/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Check if a beads issue exists
 */
function issueExists(issueId) {
  const issues = getBeadsIssues();
  return issues.some((issue) => issue.id.toLowerCase() === issueId.toLowerCase());
}

module.exports = {
  meta: {
    name: 'eslint-plugin-beads',
    version: '1.0.0',
  },
  rules: {
    'require-beads-reference': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require TODO and FIXME comments to reference a beads issue',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: null,
        schema: [],
        messages: {
          missingReference:
            '{{type}} comment must reference a beads issue (format: {{type}}: bd-123 description)',
          invalidReference: '{{type}} comment references non-existent beads issue: {{issueId}}',
          closedIssue: '{{type}} comment references closed beads issue: {{issueId}}',
        },
      },
      create(context) {
        return {
          Program() {
            const sourceCode = context.sourceCode || context.getSourceCode();
            const comments = sourceCode.getAllComments();

            for (const comment of comments) {
              const text = comment.value.trim();
              const todoMatch = text.match(/^TODO:?\s*(.+)/i);
              const fixmeMatch = text.match(/^FIXME:?\s*(.+)/i);

              if (todoMatch || fixmeMatch) {
                const type = todoMatch ? 'TODO' : 'FIXME';
                const content = todoMatch ? todoMatch[1] : fixmeMatch[1];
                const issueId = extractIssueId(content);

                if (!issueId) {
                  context.report({
                    loc: comment.loc,
                    messageId: 'missingReference',
                    data: { type },
                  });
                } else {
                  if (!issueExists(issueId)) {
                    context.report({
                      loc: comment.loc,
                      messageId: 'invalidReference',
                      data: { type, issueId },
                    });
                  } else {
                    // Check if issue is closed
                    const issues = getBeadsIssues();
                    const issue = issues.find((i) => i.id.toLowerCase() === issueId.toLowerCase());
                    if (issue && issue.status === 'closed') {
                      context.report({
                        loc: comment.loc,
                        messageId: 'closedIssue',
                        data: { type, issueId },
                      });
                    }
                  }
                }
              }
            }
          },
        };
      },
    },

    'no-untracked-complexity': {
      meta: {
        type: 'suggestion',
        docs: {
          description:
            'Warn about complex functions without beads issue tracking in comments',
          category: 'Best Practices',
          recommended: false,
        },
        schema: [
          {
            type: 'object',
            properties: {
              maxComplexity: {
                type: 'integer',
                minimum: 1,
                default: 10,
              },
            },
            additionalProperties: false,
          },
        ],
        messages: {
          complexFunction:
            'Complex function (complexity: {{complexity}}) should have a TODO/FIXME comment with beads tracking',
        },
      },
      create(context) {
        const options = context.options[0] || {};
        const maxComplexity = options.maxComplexity || 10;

        function calculateComplexity(node) {
          let complexity = 1;

          // Simple complexity calculation (can be enhanced)
          function visit(n) {
            if (!n) return;

            // Increase complexity for control flow statements
            if (
              n.type === 'IfStatement' ||
              n.type === 'ForStatement' ||
              n.type === 'WhileStatement' ||
              n.type === 'DoWhileStatement' ||
              n.type === 'SwitchCase' ||
              n.type === 'ConditionalExpression' ||
              n.type === 'LogicalExpression'
            ) {
              complexity++;
            }

            // Visit children
            for (const key in n) {
              if (n[key] && typeof n[key] === 'object') {
                if (Array.isArray(n[key])) {
                  n[key].forEach(visit);
                } else {
                  visit(n[key]);
                }
              }
            }
          }

          visit(node);
          return complexity;
        }

        return {
          FunctionDeclaration(node) {
            const complexity = calculateComplexity(node);
            if (complexity > maxComplexity) {
              const sourceCode = context.sourceCode || context.getSourceCode();
              const comments = sourceCode.getCommentsBefore(node);
              const hasBeadsComment = comments.some((comment) => {
                const text = comment.value.trim();
                return (
                  (/^TODO/i.test(text) || /^FIXME/i.test(text)) &&
                  extractIssueId(text) !== null
                );
              });

              if (!hasBeadsComment) {
                context.report({
                  node,
                  messageId: 'complexFunction',
                  data: { complexity },
                });
              }
            }
          },
        };
      },
    },
  },
  configs: {
    recommended: {
      plugins: ['beads'],
      rules: {
        'beads/require-beads-reference': 'error',
        'beads/no-untracked-complexity': ['warn', { maxComplexity: 15 }],
      },
    },
    strict: {
      plugins: ['beads'],
      rules: {
        'beads/require-beads-reference': 'error',
        'beads/no-untracked-complexity': ['error', { maxComplexity: 10 }],
      },
    },
  },
};

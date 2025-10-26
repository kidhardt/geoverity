/**
 * Beads Enforcement System
 *
 * This module provides automatic tracking and enforcement mechanisms to ensure
 * that ALL tasks, bugs, features, and work items are tracked in beads.
 *
 * ENFORCEMENT RULES:
 * 1. All TODO comments MUST have a corresponding beads issue
 * 2. All FIXME comments MUST have a corresponding beads issue
 * 3. All feature branches MUST have a corresponding beads issue
 * 4. All commits MUST reference a beads issue
 * 5. All pull requests MUST reference a beads issue
 */

import { beads, BeadsIssue, IssueType, Priority } from './wrapper';
import * as fs from 'fs';
import * as path from 'path';

export interface TrackingConfig {
  enforceCommitReferences: boolean;
  enforceTodoTracking: boolean;
  enforceFixmeTracking: boolean;
  enforceBranchTracking: boolean;
  autoCaptureEnabled: boolean;
  projectRoot: string;
}

const DEFAULT_CONFIG: TrackingConfig = {
  enforceCommitReferences: true,
  enforceTodoTracking: true,
  enforceFixmeTracking: true,
  enforceBranchTracking: true,
  autoCaptureEnabled: true,
  projectRoot: process.cwd(),
};

export class BeadsEnforcement {
  private config: TrackingConfig;
  private issueCache: Map<string, BeadsIssue> = new Map();

  constructor(config: Partial<TrackingConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.refreshIssueCache();
  }

  /**
   * Refresh the internal cache of all beads issues
   */
  private refreshIssueCache(): void {
    const issues = beads.list();
    this.issueCache.clear();
    for (const issue of issues) {
      this.issueCache.set(issue.id, issue);
    }
  }

  /**
   * Extract beads issue ID from text (format: bd-123 or beads:bd-123)
   */
  private extractIssueId(text: string): string | null {
    const match = text.match(/(?:beads:)?(bd-\d+)/i);
    return match ? match[1].toLowerCase() : null;
  }

  /**
   * Validate that a commit message references a beads issue
   */
  public validateCommitMessage(message: string): { valid: boolean; error?: string } {
    if (!this.config.enforceCommitReferences) {
      return { valid: true };
    }

    const issueId = this.extractIssueId(message);
    if (!issueId) {
      return {
        valid: false,
        error: 'Commit message must reference a beads issue (format: bd-123 or beads:bd-123)',
      };
    }

    this.refreshIssueCache();
    const issue = this.issueCache.get(issueId);
    if (!issue) {
      return {
        valid: false,
        error: `Referenced beads issue ${issueId} does not exist`,
      };
    }

    if (issue.status === 'closed') {
      return {
        valid: false,
        error: `Referenced beads issue ${issueId} is closed`,
      };
    }

    return { valid: true };
  }

  /**
   * Scan a file for TODO/FIXME comments and validate they have beads issues
   */
  public validateCodeComments(
    filePath: string
  ): { valid: boolean; violations: Array<{ line: number; text: string; type: string }> } {
    const violations: Array<{ line: number; text: string; type: string }> = [];

    if (!this.config.enforceTodoTracking && !this.config.enforceFixmeTracking) {
      return { valid: true, violations: [] };
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const todoMatch = line.match(/\/\/\s*TODO:?\s*(.+)/i);
        const fixmeMatch = line.match(/\/\/\s*FIXME:?\s*(.+)/i);

        if (todoMatch && this.config.enforceTodoTracking) {
          const commentText = todoMatch[1];
          const issueId = this.extractIssueId(commentText);

          if (!issueId) {
            violations.push({
              line: i + 1,
              text: commentText,
              type: 'TODO',
            });
          } else {
            this.refreshIssueCache();
            if (!this.issueCache.has(issueId)) {
              violations.push({
                line: i + 1,
                text: `Invalid beads reference: ${issueId}`,
                type: 'TODO',
              });
            }
          }
        }

        if (fixmeMatch && this.config.enforceFixmeTracking) {
          const commentText = fixmeMatch[1];
          const issueId = this.extractIssueId(commentText);

          if (!issueId) {
            violations.push({
              line: i + 1,
              text: commentText,
              type: 'FIXME',
            });
          } else {
            this.refreshIssueCache();
            if (!this.issueCache.has(issueId)) {
              violations.push({
                line: i + 1,
                text: `Invalid beads reference: ${issueId}`,
                type: 'FIXME',
              });
            }
          }
        }
      }
    } catch (error) {
      // File doesn't exist or can't be read, skip validation
      return { valid: true, violations: [] };
    }

    return { valid: violations.length === 0, violations };
  }

  /**
   * Auto-capture: Create beads issues for untracked TODO/FIXME comments
   */
  public autoCaptureTodos(filePath: string): BeadsIssue[] {
    if (!this.config.autoCaptureEnabled) {
      return [];
    }

    const validation = this.validateCodeComments(filePath);
    const createdIssues: BeadsIssue[] = [];

    for (const violation of validation.violations) {
      const issueType: IssueType = violation.type === 'FIXME' ? 'bug' : 'task';
      const priority: Priority = violation.type === 'FIXME' ? 1 : 2;

      const title = `${violation.type} in ${path.basename(filePath)}:${violation.line}`;
      const description = `${violation.text}\n\nFile: ${filePath}\nLine: ${violation.line}`;

      try {
        const issue = beads.create(title, {
          description,
          type: issueType,
          priority,
          labels: ['auto-captured', violation.type.toLowerCase()],
        });

        createdIssues.push(issue);
        console.log(`✓ Auto-captured ${violation.type}: ${issue.id} - ${title}`);
      } catch (error) {
        console.error(`✗ Failed to auto-capture ${violation.type}: ${error}`);
      }
    }

    return createdIssues;
  }

  /**
   * Validate branch name references a beads issue
   */
  public validateBranchName(branchName: string): { valid: boolean; error?: string } {
    if (!this.config.enforceBranchTracking) {
      return { valid: true };
    }

    // Allow main, master, develop, release branches
    if (/^(main|master|develop|release)/.test(branchName)) {
      return { valid: true };
    }

    const issueId = this.extractIssueId(branchName);
    if (!issueId) {
      return {
        valid: false,
        error: 'Feature branch must reference a beads issue (format: bd-123-feature-name)',
      };
    }

    this.refreshIssueCache();
    const issue = this.issueCache.get(issueId);
    if (!issue) {
      return {
        valid: false,
        error: `Branch references non-existent beads issue: ${issueId}`,
      };
    }

    return { valid: true };
  }

  /**
   * Generate a report of all untracked work items in the codebase
   */
  public generateComplianceReport(): {
    totalFiles: number;
    filesWithViolations: number;
    totalViolations: number;
    violations: Array<{ file: string; line: number; text: string; type: string }>;
  } {
    const report = {
      totalFiles: 0,
      filesWithViolations: 0,
      totalViolations: 0,
      violations: [] as Array<{ file: string; line: number; text: string; type: string }>,
    };

    // Scan all TypeScript and JavaScript files
    const scanDirectory = (dir: string): void => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          // Skip node_modules, .git, etc.
          if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.beads') {
            continue;
          }

          if (entry.isDirectory()) {
            scanDirectory(fullPath);
          } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
            report.totalFiles++;
            const validation = this.validateCodeComments(fullPath);

            if (!validation.valid) {
              report.filesWithViolations++;
              report.totalViolations += validation.violations.length;

              for (const violation of validation.violations) {
                report.violations.push({
                  file: fullPath,
                  line: violation.line,
                  text: violation.text,
                  type: violation.type,
                });
              }
            }
          }
        }
      } catch (error) {
        // Skip directories we can't read
      }
    };

    scanDirectory(this.config.projectRoot);
    return report;
  }

  /**
   * Helper: Create a beads issue for tracking a new task
   */
  public trackTask(
    title: string,
    description: string,
    options: {
      type?: IssueType;
      priority?: Priority;
      labels?: string[];
      assignee?: string;
    } = {}
  ): BeadsIssue {
    return beads.create(title, {
      description,
      type: options.type || 'task',
      priority: options.priority || 2,
      labels: options.labels,
      assignee: options.assignee,
    });
  }

  /**
   * Helper: Mark a task as in progress
   */
  public startTask(issueId: string): BeadsIssue {
    return beads.update(issueId, { status: 'in_progress' });
  }

  /**
   * Helper: Mark a task as complete
   */
  public completeTask(issueId: string, reason: string): BeadsIssue {
    return beads.close(issueId, reason);
  }

  /**
   * Helper: Get next actionable task
   */
  public getNextTask(): BeadsIssue | null {
    const readyIssues = beads.ready('priority');
    return readyIssues.length > 0 ? readyIssues[0] : null;
  }
}

// Export singleton instance
export const enforcement = new BeadsEnforcement();

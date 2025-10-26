/**
 * Beads CLI Wrapper - TypeScript interface for beads issue tracking
 * This module provides type-safe access to the beads CLI tool
 */

import { execSync } from 'child_process';

export type IssueStatus = 'open' | 'in_progress' | 'closed';
export type IssueType = 'bug' | 'feature' | 'task' | 'epic' | 'chore';
export type DependencyType = 'blocks' | 'related' | 'parent-child' | 'discovered-from';
export type Priority = 0 | 1 | 2 | 3 | 4; // 0 = highest, 4 = lowest

export interface BeadsIssue {
  id: string;
  title: string;
  description?: string;
  status: IssueStatus;
  type: IssueType;
  priority: Priority;
  assignee?: string;
  labels?: string[];
  created_at: string;
  updated_at: string;
  closed_at?: string;
  dependencies?: string[];
}

export interface BeadsInfo {
  daemon_compatible: boolean;
  daemon_connected: boolean;
  daemon_status: string;
  daemon_uptime: number;
  daemon_version: string;
  database_path: string;
  issue_count: number;
  mode: string;
  socket_path: string;
}

export interface CreateIssueOptions {
  description?: string;
  priority?: Priority;
  type?: IssueType;
  assignee?: string;
  labels?: string[];
  id?: string;
}

export interface UpdateIssueOptions {
  status?: IssueStatus;
  priority?: Priority;
  assignee?: string;
  description?: string;
}

export interface ListIssuesOptions {
  status?: IssueStatus;
  priority?: Priority;
  assignee?: string;
  label?: string[];
  labelAny?: string[];
}

class BeadsWrapper {
  private execBd(args: string[], options?: { json?: boolean }): string {
    const jsonFlag = options?.json ? '--json' : '';
    const command = `bd ${args.join(' ')} ${jsonFlag}`.trim();

    try {
      return execSync(command, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();
    } catch (error) {
      throw new Error(`Beads command failed: ${command}\n${error}`);
    }
  }

  /**
   * Get database info and status
   */
  public info(): BeadsInfo {
    const output = this.execBd(['info'], { json: true });
    return JSON.parse(output);
  }

  /**
   * Create a new issue
   * @throws Error if creation fails
   */
  public create(title: string, options: CreateIssueOptions = {}): BeadsIssue {
    const args = ['create', `"${title}"`];

    if (options.description) {
      args.push('-d', `"${options.description}"`);
    }
    if (options.priority !== undefined) {
      args.push('-p', options.priority.toString());
    }
    if (options.type) {
      args.push('-t', options.type);
    }
    if (options.assignee) {
      args.push('-a', options.assignee);
    }
    if (options.labels && options.labels.length > 0) {
      args.push('-l', options.labels.join(','));
    }
    if (options.id) {
      args.push('--id', options.id);
    }

    const output = this.execBd(args, { json: true });
    return JSON.parse(output);
  }

  /**
   * List issues with optional filters
   */
  public list(options: ListIssuesOptions = {}): BeadsIssue[] {
    const args = ['list'];

    if (options.status) {
      args.push('--status', options.status);
    }
    if (options.priority !== undefined) {
      args.push('--priority', options.priority.toString());
    }
    if (options.assignee) {
      args.push('--assignee', options.assignee);
    }
    if (options.label && options.label.length > 0) {
      args.push('--label', options.label.join(','));
    }
    if (options.labelAny && options.labelAny.length > 0) {
      args.push('--label-any', options.labelAny.join(','));
    }

    const output = this.execBd(args, { json: true });
    return JSON.parse(output);
  }

  /**
   * Get a single issue by ID
   */
  public show(issueId: string): BeadsIssue {
    const output = this.execBd(['show', issueId], { json: true });
    return JSON.parse(output);
  }

  /**
   * Get all ready issues (no blockers)
   */
  public ready(sort: 'priority' | 'oldest' | 'hybrid' = 'hybrid'): BeadsIssue[] {
    const output = this.execBd(['ready', '--sort', sort], { json: true });
    return JSON.parse(output);
  }

  /**
   * Update an existing issue
   */
  public update(issueId: string, options: UpdateIssueOptions): BeadsIssue {
    const args = ['update', issueId];

    if (options.status) {
      args.push('--status', options.status);
    }
    if (options.priority !== undefined) {
      args.push('--priority', options.priority.toString());
    }
    if (options.assignee) {
      args.push('--assignee', options.assignee);
    }
    if (options.description) {
      args.push('--description', `"${options.description}"`);
    }

    const output = this.execBd(args, { json: true });
    return JSON.parse(output);
  }

  /**
   * Close an issue with a reason
   */
  public close(issueId: string, reason: string): BeadsIssue {
    const output = this.execBd(['close', issueId, '--reason', `"${reason}"`], { json: true });
    return JSON.parse(output);
  }

  /**
   * Add a dependency between issues
   */
  public addDependency(
    dependentId: string,
    blockerId: string,
    type: DependencyType = 'blocks'
  ): void {
    this.execBd(['dep', 'add', dependentId, blockerId, '--type', type]);
  }

  /**
   * Remove a dependency between issues
   */
  public removeDependency(dependentId: string, blockerId: string): void {
    this.execBd(['dep', 'remove', dependentId, blockerId]);
  }

  /**
   * Get dependency tree for an issue
   */
  public dependencyTree(issueId: string): string {
    return this.execBd(['dep', 'tree', issueId]);
  }

  /**
   * Check for dependency cycles
   */
  public checkCycles(): string {
    return this.execBd(['dep', 'cycles']);
  }

  /**
   * Add a label to an issue
   */
  public addLabel(issueId: string, label: string): void {
    this.execBd(['label', 'add', issueId, label]);
  }

  /**
   * Remove a label from an issue
   */
  public removeLabel(issueId: string, label: string): void {
    this.execBd(['label', 'remove', issueId, label]);
  }

  /**
   * List all labels for an issue
   */
  public listLabels(issueId: string): string[] {
    const output = this.execBd(['label', 'list', issueId], { json: true });
    return JSON.parse(output);
  }

  /**
   * Sync database (flush & import)
   */
  public sync(): void {
    this.execBd(['sync']);
  }
}

// Singleton instance
export const beads = new BeadsWrapper();

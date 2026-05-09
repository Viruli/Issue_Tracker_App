import db from "../../../infrastructure/database/sqlite"
import {Issue} from "../types"


// Create Issue
export const createIssueRepo = (issue : Issue) => {
    db.runSync(
        `INSERT INTO issues (id, title, description, status, priority, assignee, createdAt, imageUri)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            issue.id,
            issue.title,
            issue.description ?? null,
            issue.status,
            issue.priority,
            issue.assignee ?? null,
            issue.createdAt,
            issue.imageUri ?? null,
        ]
    );
}

//List all issues
export const getAllIssuesRepo = () : Issue[] => {
    const result = db.getAllSync(`SELECT * FROM issues`);
    return (result ?? []) as Issue[];
}

//View Issue
export const getIssueRepo = (id : string) : Issue | null => {
    const result = db.getFirstSync(`SELECT * FROM issues WHERE id=?`, [id]);
    return result as Issue | null;
}

  // update Issue 
  export const updateIssueRepo = (id: string, issue: Partial<Issue>) => {
    db.runSync(
      `
      UPDATE issues
      SET
        title = ?,
        description = ?,
        status = ?,
        priority = ?,
        assignee = ?,
        imageUri = ?
      WHERE id = ?
      `,
      [
        issue.title ?? '',
        issue.description ?? '',
        issue.status ?? 'Open',
        issue.priority ?? 'Low',
        issue.assignee ?? null,
        issue.imageUri ?? '',
        id,
      ]
    );
  };

//Delete Issue
export const deleteIssueRepo = (id:string) => {
    db.runSync(`DELETE FROM issues WHERE id=?`, [id]);
}

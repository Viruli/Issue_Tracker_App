import db from "./sqlite";

const initDB = () => {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS issues(
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT "Open"
                CHECK(status IN ('Open', 'In Progress', 'Resolved')),
            priority TEXT DEFAULT "Low"
                CHECK(priority IN ('Low', 'Medium', 'High')),
            assignee TEXT,
            createdAt TEXT
        )
    `)
}

export default initDB;
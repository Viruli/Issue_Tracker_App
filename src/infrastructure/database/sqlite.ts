import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("issue_tracker.db");

export default db;

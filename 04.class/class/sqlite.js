import sqlite3 from "sqlite3";

export default class Sqlite {
  constructor() {
    this.db = new sqlite3.Database("memos_table.db");
  }

  insert(content) {
    return new Promise((resolve) => {
      this.db.serialize(() => {
        this.db.run("CREATE TABLE IF NOT EXISTS memos (content TEXT)");

        this.db.run("INSERT INTO memos (content) VALUES (?)", content);
        resolve();
      });
    });
  }

  selectContents() {
    return new Promise((resolve) => {
      this.db.all("SELECT rowid AS id, content FROM memos", (_, rows) => {
        resolve(rows);
      });
    });
  }

  deleteContent(memoId) {
    return new Promise((resolve) => {
      this.db.run("DELETE FROM memos WHERE rowid = ?", memoId);
      resolve();
    });
  }
}

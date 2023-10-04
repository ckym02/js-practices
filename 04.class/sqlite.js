import sqlite3 from "sqlite3";

const db = new sqlite3.Database("tmp/memos_table.db");

export function insert(content) {
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS memos (content TEXT)");

    db.run(`INSERT INTO memos (content) VALUES (?)`, [content]);
  });
}

export function selectContents() {
  return new Promise((resolve) => {
    db.all("SELECT rowid AS id, content FROM memos", function (err, rows) {
      resolve(rows);
    });
  });
}

export function deleteContent(memoId) {
  db.serialize(() => {
    db.run("DELETE FROM memos where rowid = ?", memoId);
  });
}

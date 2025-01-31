import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

// エラーなし
db.run("CREATE TABLE books (title TEXT NOT NULL UNIQUE)", () => {
  db.run("INSERT INTO books VALUES ('callback/ほんのなまえ')", function () {
    console.log(`ID: ${this.lastID}`);

    db.get("SELECT rowid AS id, title FROM books", (_, row) => {
      console.log(`ID: ${row.id}, title: ${row.title}`);

      db.run("DROP TABLE books");
    });
  });
});

await timers.setTimeout(100);

// エラーあり
db.run("CREATE TABLE books (title TEXT NOT NULL UNIQUE)", () => {
  db.run("INSERT INTO books VALUES (NULL)", (err) => {
    console.error(err.message);

    db.get("SELECT rowid AS id, hoge FROM books", (err) => {
      console.error(err.message);

      db.run("DROP TABLE books");
    });
  });
});

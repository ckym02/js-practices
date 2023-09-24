import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

// エラーなし
db.run("create table books (title text not null unique)", () => {
  db.run("insert into books values ('callback/ほんのなまえ')", function () {
    console.log(`ID: ${this.lastID}`);

    db.get("select rowid as id, title from books", (_, row) => {
      console.log(`ID: ${row.id}, title: ${row.title}`);

      db.run("drop table books");
    });
  });
});

await timers.setTimeout(100);

// エラーあり
db.run("create table books (title text not null unique)", () => {
  db.run("insert into books values (null)", (err) => {
    console.error(err.message);

    db.get("select rowid as id, hoge from books", (err) => {
      console.error(err.message);

      db.run("drop table books");
    });
  });
});

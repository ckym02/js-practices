import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run, get } from "./sqlite.js";

const db = new sqlite3.Database(":memory:");

// エラーなし
run(db, "CREATE TABLE books (title TEXT NOT NULL UNIQUE)")
  .then(() => {
    return run(db, "INSERT INTO books VALUES ('async_await/ほんのなまえ')");
  })
  .then((lastId) => {
    console.log(`ID: ${lastId}`);
    return get(db, "SELECT rowid AS id, title FROM books");
  })
  .then((row) => {
    console.log(`ID: ${row.id}, title: ${row.title}`);
    run(db, "DROP TABLE books");
  });

await timers.setTimeout(100);

// エラーあり
run(db, "CREATE TABLE books (title TEXT NOT NULL UNIQUE)")
  .then(() => {
    return run(db, "INSERT INTO books VALUES (NULL)");
  })
  .catch((err) => {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => {
    return get(db, "SELECT rowid AS id, hoge FROM books");
  })
  .catch((err) => {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => {
    return run(db, "DROP TABLE books");
  })
  .catch((err) => {
    console.error(err.message);
  });

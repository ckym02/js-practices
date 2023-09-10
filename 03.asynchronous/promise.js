import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run, get } from "./sqlite.js";

const db = new sqlite3.Database(":memory:");

// エラーなし
run(db, "CREATE TABLE books (title text not null unique)").then(() => {
  run(db, "INSERT INTO books VALUES ('async_await/ほんのなまえ')").then(() => {
    get(db, "SELECT rowid AS id, title FROM books").then(() => {
      run(db, "DROP TABLE books");
    });
  });
});

await timers.setTimeout(100);

// エラーあり
run(db, "CREATE TABLE books (title text not null unique)")
  .then(() => {})
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    run(db, "INSERT INTO books VALUES (NULL)")
      .then(() => {})
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        get(db, "SELECT rowid AS id, hoge FROM books")
          .then(() => {
            get(db, "SELECT rowid AS id, title FROM books").then(() => {
              run(db, "DROP TABLE books");
            });
          })
          .catch((error) => {
            console.error(error.message);
          });
      });
  });

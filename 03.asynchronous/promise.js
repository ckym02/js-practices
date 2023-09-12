import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run, get } from "./sqlite.js";

const db = new sqlite3.Database(":memory:");

// エラーなし
run(db, "create table books (title text not null unique)")
  .then(() => {
    return run(db, "insert into books values ('async_await/ほんのなまえ')");
  })
  .then((lastId) => {
    console.log(`ID: ${lastId}`);
    return get(db, "select rowid as id, title from books");
  })
  .then((row) => {
    console.log(`ID: ${row.id}, title: ${row.title}`);
    run(db, "drop table books");
  });

await timers.setTimeout(100);

// エラーあり
run(db, "create table books (title text not null unique)")
  .then(() => {})
  .catch((error) => {
    console.error(error.message);
  })
  .then(() => {
    return run(db, "insert into books values (null)");
  })
  .catch((error) => {
    console.error(error.message);
  })
  .then(() => {
    return get(db, "select rowid as id, hoge from books");
  })
  .catch((error) => {
    console.error(error.message);
  })
  .then(() => {
    return run(db, "drop table books");
  })
  .catch((error) => {
    console.error(error.message);
  });

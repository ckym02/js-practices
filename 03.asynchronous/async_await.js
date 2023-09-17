import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run, get } from "./sqlite.js";

const db = new sqlite3.Database(":memory:");

// エラーなし
await run(db, "create table books (title text not null unique)");
const lastId = await run(
  db,
  "insert into books values ('async_await/ほんのなまえ')"
);
console.log(`ID: ${lastId}`);
const row = await get(db, "select rowid as id, title from books");
console.log(`ID: ${row.id}, title: ${row.title}`);
await run(db, "drop table books");

await timers.setTimeout(100);

// エラーあり
await run(db, "create table books (title text not null unique)");
try {
  await run(db, "insert into books values (null)");
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await get(db, "select rowid as id, hoge from books");
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    throw err;
  }
}
await run(db, "drop table books");

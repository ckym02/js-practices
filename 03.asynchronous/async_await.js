import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run, get } from "./sqlite.js";

const db = new sqlite3.Database(":memory:");

// エラーなし
await run(db, "CREATE TABLE books (title TEXT NOT NULL UNIQUE)");
const lastId = await run(
  db,
  "INSERT INTO books VALUES ('async_await/ほんのなまえ')"
);
console.log(`ID: ${lastId}`);
const row = await get(db, "SELECT rowid AS id, title FROM books");
console.log(`ID: ${row.id}, title: ${row.title}`);
await run(db, "DROP TABLE books");

await timers.setTimeout(100);

// エラーあり
await run(db, "CREATE TABLE books (title TEXT NOT NULL UNIQUE)");
try {
  await run(db, "INSERT INTO books VALUES (NULL)");
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await get(db, "SELECT rowid AS id, hoge FROM books");
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    throw err;
  }
}
await run(db, "DROP TABLE books");

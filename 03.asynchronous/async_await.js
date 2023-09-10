import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run, get } from "./sqlite.js";

const db = new sqlite3.Database(":memory:");

// エラーなし
(async () => {
  await run(db, "CREATE TABLE books (title text not null unique)");

  const lastId = await run(
    db,
    "INSERT INTO books VALUES ('async_await/ほんのなまえ')"
  );
  console.log(`ID: ${lastId}`);

  const row = await get(db, "SELECT rowid AS id, title FROM books");
  console.log(`ID: ${row.id}, title: ${row.title}`);

  await run(db, "DROP TABLE books");
})();

await timers.setTimeout(100);

// エラーあり
(async () => {
  await run(db, "CREATE TABLE books (title text not null unique)");

  try {
    await run(db, "INSERT INTO books VALUES (NULL)");
  } catch (error) {
    console.error(error.message);
  }

  try {
    await get(db, "SELECT rowid AS id, hoge FROM books");
  } catch (error) {
    console.error(error.message);
  }

  await run(db, "DROP TABLE books");
})();

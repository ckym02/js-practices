import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run, get } from "./sqlite.js";

const db = new sqlite3.Database(":memory:");

// エラーなし
(async () => {
  await run(db, "create table books (title text not null unique)");

  const lastId = await run(
    db,
    "insert into books values ('async_await/ほんのなまえ')"
  );
  console.log(`ID: ${lastId}`);

  const row = await get(db, "select rowid as id, title from books");
  console.log(`ID: ${row.id}, title: ${row.title}`);

  await run(db, "drop table books");
})();

await timers.setTimeout(100);

// エラーあり
(async () => {
  await run(db, "create table books (title text not null unique)");

  try {
    await run(db, "insert into books values (null)");
  } catch (error) {
    console.error(error.message);
  }

  try {
    await get(db, "select rowid as id, hoge from books");
  } catch (error) {
    console.error(error.message);
  }

  await run(db, "drop table books");
})();

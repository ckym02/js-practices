import timers from "timers/promises";
import { insertTable } from "./sqlite.js";
import { get } from "./sqlite.js";
import { run } from "./sqlite.js";

// エラーなし
(async () => {
  await run("CREATE TABLE books (title text not null unique)");

  await insertTable("INSERT INTO books VALUES ('async_await/ほんのなまえ')");

  await get("SELECT rowid AS id, title FROM books");

  run("DROP TABLE books");
})();

await timers.setTimeout(100);

// エラーあり
(async () => {
  await run("CREATE TABLE books (title text not null unique)");

  try {
    await insertTable("INSERT INTO books VALUES (NULL)");
  } catch (error) {
    console.error(error);
  }

  try {
    await get("SELECT rowid AS id, hoge FROM books");
  } catch (error) {
    console.error(error);
  }

  run("DROP TABLE books");
})();

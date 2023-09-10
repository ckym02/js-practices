import timers from "timers/promises";
import { run } from "./sqlite.js";
import { get } from "./sqlite.js";

// エラーなし
(async () => {
  await run("CREATE TABLE books (title text not null unique)");

  const lastId = await run(
    "INSERT INTO books VALUES ('async_await/ほんのなまえ')"
  );
  console.log(`ID: ${lastId}`);

  await get("SELECT rowid AS id, title FROM books");

  await run("DROP TABLE books");
})();

await timers.setTimeout(100);

// エラーあり
(async () => {
  await run("CREATE TABLE books (title text not null unique)");

  try {
    await run("INSERT INTO books VALUES (NULL)");
  } catch (error) {
    console.error(error);
  }

  try {
    await get("SELECT rowid AS id, hoge FROM books");
  } catch (error) {
    console.error(error);
  }

  await run("DROP TABLE books");
})();

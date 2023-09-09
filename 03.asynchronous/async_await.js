import timers from "timers/promises";
import { createBooksTable } from "./sqlite.js";
import { insertValuesIntoBooks } from "./sqlite.js";
import { selectFromBooks } from "./sqlite.js";
import { dropBooksTable } from "./sqlite.js";

(async () => {
  await createBooksTable("CREATE TABLE books (title text not null unique)");

  await insertValuesIntoBooks(
    "INSERT INTO books VALUES ('async_await/ほんのなまえ')"
  );

  await selectFromBooks("SELECT rowid AS id, title FROM books");

  dropBooksTable();
})();

await timers.setTimeout(100);

(async () => {
  await createBooksTable("CREATE TABLE books (title text not null unique)");

  try {
    await insertValuesIntoBooks("INSERT INTO books VALUES (NULL)");
  } catch (error) {
    console.error(error);
  }

  try {
    await selectFromBooks("SELECT rowid AS id, hoge FROM books");
  } catch (error) {
    console.error(error);
  }

  dropBooksTable();
})();

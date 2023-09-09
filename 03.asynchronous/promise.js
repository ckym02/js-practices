import timers from "timers/promises";
import { createBooksTable } from "./sqlite.js";
import { insertValuesIntoBooks } from "./sqlite.js";
import { selectFromBooks } from "./sqlite.js";
import { dropBooksTable } from "./sqlite.js";

// エラーなし
createBooksTable("CREATE TABLE books (title text not null unique)").then(() => {
  insertValuesIntoBooks(
    "INSERT INTO books VALUES ('async_await/ほんのなまえ')"
  ).then(() => {
    selectFromBooks("SELECT rowid AS id, title FROM books").then(() => {
      dropBooksTable();
    });
  });
});

await timers.setTimeout(100);

// エラーあり
createBooksTable("CREATE TABLE books (title text not null unique)")
  .then(() => {})
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    insertValuesIntoBooks("INSERT INTO books VALUES (NULL)")
      .then(() => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        selectFromBooks("SELECT rowid AS id, hoge FROM books")
          .then(() => {
            selectFromBooks("SELECT rowid AS id, title FROM books").then(() => {
              dropBooksTable();
            });
          })
          .catch((error) => {
            console.error(error);
          });
      });
  });

import timers from "timers/promises";
import { run } from "./sqlite.js";
import { get } from "./sqlite.js";

// エラーなし
run("CREATE TABLE books (title text not null unique)").then(() => {
  run("INSERT INTO books VALUES ('async_await/ほんのなまえ')").then(() => {
    get("SELECT rowid AS id, title FROM books").then(() => {
      run("DROP TABLE books");
    });
  });
});

await timers.setTimeout(100);

// エラーあり
run("CREATE TABLE books (title text not null unique)")
  .then(() => {})
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    run("INSERT INTO books VALUES (NULL)")
      .then(() => {})
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        get("SELECT rowid AS id, hoge FROM books")
          .then(() => {
            get("SELECT rowid AS id, title FROM books").then(() => {
              run("DROP TABLE books");
            });
          })
          .catch((error) => {
            console.error(error.message);
          });
      });
  });

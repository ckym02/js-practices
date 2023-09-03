import sqlite3 from "sqlite3";
import timers from "timers/promises";
const db = new sqlite3.Database(":memory:");

(async () => {
  await new Promise((resolve) => {
    db.run("CREATE TABLE books (title text not null unique)", function () {
      resolve();
    });
  });

  await new Promise((resolve) => {
    db.run(
      "INSERT INTO books VALUES ('async_await/ほんのなまえ')",
      function () {
        console.log(`ID: ${this.lastID}`);
        resolve();
      }
    );
  });

  await new Promise((resolve) => {
    db.get("SELECT rowid AS id, title FROM books", function (err, row) {
      console.log(`ID: ${row.id}, title: ${row.title}`);
      resolve();
    });
  });

  db.run("DROP TABLE books");
})();

await timers.setTimeout(100);

(async () => {
  await new Promise((resolve) => {
    db.run("CREATE TABLE books (title text not null unique)", function () {
      resolve();
    });
  });

  try {
    await new Promise((resolve, reject) => {
      db.run("INSERT INTO books VALUES (NULL)", function (err) {
        if (!err) {
          console.log(`ID: ${this.lastID}`);
          resolve();
        } else {
          reject(`レコード追加に失敗しました。${err.message}`);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }

  try {
    await new Promise((resolve, reject) => {
      db.get("SELECT rowid AS id, hoge FROM books", function (err, row) {
        if (!err) {
          console.log(`ID: ${row.id}, title: ${row.title}`);
          resolve();
        } else {
          reject(`レコードの取得に失敗しました。${err.message}`);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }

  db.run("DROP TABLE books");
})();

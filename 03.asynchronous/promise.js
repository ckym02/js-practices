import sqlite3 from "sqlite3";
import timers from "timers/promises";
const db = new sqlite3.Database(":memory:");

new Promise((resolve) => {
  db.run("CREATE TABLE books (title text not null unique)", function () {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      db.run("INSERT INTO books VALUES ('promise/ほんのなまえ')", function () {
        console.log(`ID: ${this.lastID}`);
        resolve();
      });
    });
  })
  .then(() => {
    return new Promise((resolve) => {
      db.get("SELECT rowid AS id, title FROM books", function (err, row) {
        console.log(`ID: ${row.id}, title: ${row.title}`);
        resolve();
      });
    });
  })
  .then(() => {
    db.run("DROP TABLE books");
  });

await timers.setTimeout(100);

new Promise((resolve) => {
  db.run("CREATE TABLE books (title text not null unique)", function () {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO books VALUES (NULL)", function (err) {
        if (!err) {
          console.log(`ID: ${this.lastID}`);
          resolve();
        } else {
          reject(`レコード追加に失敗しました。${err.message}`);
        }
      });
    }).catch((error) => {
      console.error(error);
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      db.get("SELECT rowid AS id, hoge FROM books", function (err, row) {
        if (!err) {
          console.log(`ID: ${row.id}, title: ${row.title}`);
          resolve();
        } else {
          reject(`レコードの取得に失敗しました。${err.message}`);
        }
      });
    }).catch((error) => {
      console.error(error);
    });
  })
  .then(() => {
    db.run("DROP TABLE books");
  })
  .catch((error) => {
    console.error(error);
  });

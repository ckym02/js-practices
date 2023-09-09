import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

export function createBooksTable(sql) {
  return new Promise((resolve) => {
    db.run(sql, function () {
      resolve();
    });
  });
}

export function insertValuesIntoBooks(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (!err) {
        console.log(`ID: ${this.lastID}`);
        resolve();
      } else {
        reject(`レコード追加に失敗しました。${err.message}`);
      }
    });
  });
}

export function selectFromBooks(sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, function (err, row) {
      if (!err) {
        console.log(`ID: ${row.id}, title: ${row.title}`);
        resolve();
      } else {
        reject(`レコードの取得に失敗しました。${err.message}`);
      }
    });
  });
}

export function dropBooksTable() {
  db.run("DROP TABLE books");
}

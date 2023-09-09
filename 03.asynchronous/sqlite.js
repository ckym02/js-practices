import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

export function run(sql) {
  return new Promise((resolve) => {
    db.run(sql, function () {
      resolve();
    });
  });
}

export function insertTable(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (!err) {
        console.log(`ID: ${this.lastID}`);
        resolve();
      } else {
        reject(err.message);
      }
    });
  });
}

export function get(sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, function (err, row) {
      if (!err) {
        console.log(`ID: ${row.id}, title: ${row.title}`);
        resolve();
      } else {
        reject(err.message);
      }
    });
  });
}

import sqlite3 from "sqlite3";

export default class Sqlite {
  constructor(dbFileName) {
    this.db = new sqlite3.Database(dbFileName);
  }

  run(sql) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, function (err) {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  all(sql) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  }
}

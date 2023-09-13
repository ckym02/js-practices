export class SqliteError extends Error {
  constructor(message) {
    super(message);
  }
}

export function run(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (!err) {
        resolve(this.lastID);
      } else {
        reject(new SqliteError(err));
      }
    });
  });
}

export function get(db, sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (!err) {
        resolve(row);
      } else {
        reject(new SqliteError(err));
      }
    });
  });
}

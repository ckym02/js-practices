export function run(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (!err) {
        resolve(this.lastID);
      } else {
        reject(err);
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
        reject(err);
      }
    });
  });
}

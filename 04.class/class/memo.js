import Sqlite from "./sqlite.js";

export default class Memo {
  constructor(content) {
    this.content = content;
  }

  static async build(content) {
    const memo = new Memo(content);
    memo.sqlite = new Sqlite("memos_table.db");
    await memo.sqlite.run(
      "CREATE TABLE IF NOT EXISTS memos (content TEXT NOT NULL)"
    );
    return memo;
  }

  create() {
    this.sqlite.run(`INSERT INTO memos (content) VALUES ('${this.content}')`);
  }

  selectAll() {
    return this.sqlite.all(
      "SELECT rowid AS id, content FROM memos ORDER BY rowid"
    );
  }

  delete(id) {
    this.sqlite.run(`DELETE FROM memos WHERE rowid = ${id}`);
  }
}

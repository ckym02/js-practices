import Sqlite from "./sqlite.js";

export default class MemoTableHandler {
  constructor() {
    this.sqlite = new Sqlite("memos_table.db");
  }

  static async build() {
    const memoTableHandler = new MemoTableHandler();
    await memoTableHandler.sqlite.run(
      "CREATE TABLE IF NOT EXISTS memos (content TEXT NOT NULL)"
    );
    return memoTableHandler;
  }

  create(content) {
    this.sqlite.run(`INSERT INTO memos (content) VALUES ('${content}')`);
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

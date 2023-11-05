import Sqlite from "./sqlite.js";

export default class MemoTableHandler {
  constructor() {
    this.sqlite = new Sqlite("memos_table.db");
  }

  static async #build() {
    const memoTableHandler = new MemoTableHandler();
    await memoTableHandler.#createTable();
    return memoTableHandler;
  }

  async #createTable() {
    await this.sqlite.run(
      "CREATE TABLE IF NOT EXISTS memos (content TEXT NOT NULL)"
    );
  }

  static async create(content) {
    const memoTableHandler = await this.#build();
    memoTableHandler.sqlite.run(
      `INSERT INTO memos (content) VALUES ('${content}')`
    );
  }

  static async selectAll() {
    const memoTableHandler = await this.#build();
    return memoTableHandler.sqlite.all(
      "SELECT rowid AS id, content FROM memos ORDER BY rowid"
    );
  }

  static async delete(id) {
    const memoTableHandler = await this.#build();
    memoTableHandler.sqlite.run(`DELETE FROM memos WHERE rowid = ${id}`);
  }
}

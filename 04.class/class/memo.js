import Sqlite from "./sqlite.js";

export default class Memo {
  constructor(content) {
    this.content = content;
    this.sqlite = new Sqlite();
  }

  create() {
    this.sqlite.insert(this.content);
  }

  selectAll() {
    return this.sqlite.selectContents();
  }

  delete(id) {
    this.sqlite.deleteContent(id);
  }
}

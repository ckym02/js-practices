import { insert, selectContents, deleteContent } from "./../sqlite.js";

export default class Memo {
  constructor(content) {
    this.content = content;
  }

  create() {
    insert(this.content);
  }
  selectAll() {
    return selectContents();
  }
  delete(id) {
    deleteContent(id);
  }
}

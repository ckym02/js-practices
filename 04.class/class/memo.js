import { insert, selectContents, deleteContent } from "./../sqlite.js";

export class Memo {
  constructor(content) {
    this.content = content;
  }

  create() {
    insert(this.content);
  }
  select_all() {
    return selectContents();
  }
  delete(id) {
    deleteContent(id);
  }
}

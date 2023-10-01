import readline from "readline";
import { insert, selectContent, selectContents } from "./sqlite.js";

class Memo {
  constructor(content) {
    this.content = content;
  }

  create() {
    insert(this.content);
  }
  async index() {
    const contents = await selectContents();
    console.log(contents);
  }
  show() {}
  destroy() {}
}

const [, , firstArg] = process.argv;
if (firstArg === "-l") {
  const memo = new Memo();
  memo.index();
}

if (!firstArg) {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.on("line", (input) => {
    const memo = new Memo(input);
    memo.create();
  });
}

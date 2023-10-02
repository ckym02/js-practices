import readline from "readline";
import Enquirer from "enquirer";
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
    return contents;
  }
  show() {}
  destroy() {}
}

const [, , firstArg] = process.argv;

if (firstArg === "-l") {
  const memo = new Memo();
  memo.index();
}

if (firstArg === "-r") {
  const memo = new Memo();
  const contents = await memo.index();
  const question = {
    type: "select",
    name: "memo",
    message: "Choose a note you want to see:",
    choices: Object.values(contents).map((x) => x.content),
  };
  const answer = await Enquirer.prompt(question);
  console.log(answer.memo);
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

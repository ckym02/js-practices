import readline from "readline";
import Enquirer from "enquirer";
import { insert, selectContents, deleteContent } from "./sqlite.js";

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
  destroy(id) {
    deleteContent(id);
  }
}

const [, , firstArg] = process.argv;

if (firstArg === "-l") {
  const memo = new Memo();
  memo.index();
}

if (firstArg === "-r") {
  const memo = new Memo();
  const contents = await memo.index();
  const choices = Object.values(contents).map((x) => {
    return { message: x.content.split(/\n/)[0], value: x.content };
  });
  const question = {
    type: "select",
    name: "memo",
    message: "Choose a note you want to see:",
    choices: choices,
  };

  const answer = await Enquirer.prompt(question);
  console.log(answer.memo);
}

if (firstArg === "-d") {
  const memo = new Memo();
  const contents = await memo.index();
  const choices = Object.values(contents).map((x) => {
    return { message: x.content.split(/\n/)[0], value: x.id };
  });
  const question = {
    type: "select",
    name: "memoId",
    message: "Choose a note you want to delete:",
    choices: choices,
  };
  const answer = await Enquirer.prompt(question);
  memo.destroy(answer.memoId);
}

if (!firstArg) {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let lines = [];
  reader.on("line", (input) => {
    lines.push(input);
  });
  reader.on("close", () => {
    const memo = new Memo(lines.join("\n"));
    memo.create();
  });
}

import readline from "readline";
import Enquirer from "enquirer";
import { Memo } from "./class/memo.js";

const [, , firstArg] = process.argv;

if (firstArg === "-l") {
  const memo = new Memo();
  const memos = await memo.select_all();
  memos.forEach((memo) => {
    console.log(memo.content.split(/\n/)[0]);
  });
}

if (firstArg === "-r") {
  const memo = new Memo();
  const memos = await memo.select_all();
  const choices = memos.map((memo) => {
    return { message: memo.content.split(/\n/)[0], value: memo.content };
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
  const memos = await memo.select_all();
  const choices = memos.map((memo) => {
    return { message: memo.content.split(/\n/)[0], value: memo.id };
  });
  const question = {
    type: "select",
    name: "memoId",
    message: "Choose a note you want to delete:",
    choices: choices,
  };
  const answer = await Enquirer.prompt(question);
  memo.delete(answer.memoId);
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

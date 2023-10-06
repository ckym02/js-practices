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
    return { name: memo.content.split(/\n/)[0], value: memo.content };
  });
  const question = {
    message: "Choose a note you want to see:",
    choices: choices,
    result(names) {
      return this.map(names);
    },
  };

  const prompt = new Enquirer.Select(question);
  const answer = await prompt.run();
  console.log(Object.values(answer)[0]);
}

if (firstArg === "-d") {
  const memo = new Memo();
  const memos = await memo.select_all();
  const choices = memos.map((memo) => {
    return { name: memo.content.split(/\n/)[0], value: memo.id };
  });
  const question = {
    message: "Choose a note you want to delete:",
    choices: choices,
    result(names) {
      return this.map(names);
    },
  };

  const prompt = new Enquirer.Select(question);
  const answer = await prompt.run();
  memo.delete(Object.values(answer)[0]);
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

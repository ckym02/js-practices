#!/usr/bin/env node

import readline from "readline";
import Enquirer from "enquirer";
import Memo from "./class/memo.js";

const [, , option] = process.argv;

switch (option) {
  case "-l": {
    const memo = new Memo();
    const memos = await memo.selectAll();
    memos.forEach((memo) => {
      console.log(memo.content.split(/\n/)[0]);
    });
    break;
  }

  case "-r": {
    const memo = new Memo();
    const memos = await memo.selectAll();
    const choices = memos.map((memo) => {
      return { name: memo.content.split(/\n/)[0], value: memo.content };
    });
    const question = {
      message: "Choose a memo you want to see:",
      choices: choices,
      result(names) {
        return this.map(names);
      },
    };
    const prompt = new Enquirer.Select(question);
    const answer = await prompt.run();
    console.log(Object.values(answer)[0]);
    break;
  }

  case "-d": {
    const memo = new Memo();
    const memos = await memo.selectAll();
    const choices = memos.map((memo) => {
      return { name: memo.content.split(/\n/)[0], value: memo.id };
    });
    const question = {
      message: "Choose a memo you want to delete:",
      choices: choices,
      result(names) {
        return this.map(names);
      },
    };
    const prompt = new Enquirer.Select(question);
    const answer = await prompt.run();
    memo.delete(Object.values(answer)[0]);
    break;
  }

  case undefined: {
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
    break;
  }

  default: {
    console.log("Empty action received.");
    break;
  }
}

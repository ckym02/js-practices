#!/usr/bin/env node

import readline from "readline";
import Memo from "./class/memo.js";
import SelectPrompt from "./class/select_prompt.js";

const [, , option] = process.argv;

if (option === "-l") {
  const memo = await Memo.build();
  const memos = await memo.selectAll();
  memos.forEach((memo) => {
    console.log(memo.content.split(/\n/)[0]);
  });
} else if (option === "-r") {
  const memo = await Memo.build();
  const memos = await memo.selectAll();
  const choices = memos.map((memo) => ({
    name: memo.content.split(/\n/)[0],
    value: memo.content,
  }));
  const selectPrompt = new SelectPrompt(
    "Choose a memo you want to see:",
    choices
  );
  const answer = await selectPrompt.run();
  console.log(answer);
} else if (option === "-d") {
  const memo = await Memo.build();
  const memos = await memo.selectAll();
  const choices = memos.map((memo) => ({
    name: memo.content.split(/\n/)[0],
    value: memo.id,
  }));
  const selectPrompt = new SelectPrompt(
    "Choose a memo you want to delete:",
    choices
  );
  const answer = await selectPrompt.run();
  memo.delete(answer);
} else if (option === undefined) {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const lines = [];
  reader.on("line", (input) => {
    lines.push(input);
  });

  reader.on("close", () => {
    (async () => {
      const memo = await Memo.build(lines.join("\n"));
      memo.create();
    })();
  });
} else {
  console.log("Empty action received.");
}

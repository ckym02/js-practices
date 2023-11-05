#!/usr/bin/env node

import readline from "readline";
import MemoTableHandler from "./lib/memo_table_handler.js";
import SelectPrompt from "./lib/select_prompt.js";

const [, , option] = process.argv;

if (option === "-l") {
  const memoTableHandler = await MemoTableHandler.build();
  const memos = await memoTableHandler.selectAll();
  memos.forEach((memo) => {
    console.log(memo.content.split(/\n/)[0]);
  });
} else if (option === "-r") {
  const memoTableHandler = await MemoTableHandler.build();
  const memos = await memoTableHandler.selectAll();
  const choices = memos.map((memo) => ({
    name: memo.content.split(/\n/)[0],
    value: memo.content,
  }));
  const selectPrompt = new SelectPrompt(
    "Choose a memo you want to see:",
    choices
  );
  const memoContent = await selectPrompt.run();
  console.log(memoContent);
} else if (option === "-d") {
  const memoTableHandler = await MemoTableHandler.build();
  const memos = await memoTableHandler.selectAll();
  const choices = memos.map((memo) => ({
    name: memo.content.split(/\n/)[0],
    value: memo.id,
  }));
  const selectPrompt = new SelectPrompt(
    "Choose a memo you want to delete:",
    choices
  );
  const memoId = await selectPrompt.run();
  memoTableHandler.delete(memoId);
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
      const memoTableHandler = await MemoTableHandler.build();
      memoTableHandler.create(lines.join("\n"));
    })();
  });
}

#!/usr/bin/env node

import readline from "readline";
import MemoTableHandler from "./lib/memo_table_handler.js";
import SelectPrompt from "./lib/select_prompt.js";

const [, , option] = process.argv;

const generateChoices = (memos) => {
  return memos.map((memo) => ({
    name: memo.content.split(/\n/)[0],
    value: memo,
  }));
};

const showMemoContent = async () => {
  const memos = await MemoTableHandler.selectAll();

  if (!memos.length) return "";

  const selectPrompt = new SelectPrompt(
    "Choose a memo you want to see:",
    generateChoices(memos)
  );
  const memo = await selectPrompt.run();
  return memo.content;
};

const deleteMemo = async () => {
  const memos = await MemoTableHandler.selectAll();

  if (!memos.length) return;

  const selectPrompt = new SelectPrompt(
    "Choose a memo you want to delete:",
    generateChoices(memos)
  );
  const memo = await selectPrompt.run();
  MemoTableHandler.delete(memo.id);
};

const createMemo = async () => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const lines = [];
  reader.on("line", (input) => {
    lines.push(input);
  });

  reader.on("close", () => {
    MemoTableHandler.create(lines.join("\n"));
  });
};

if (option === "-l") {
  const memos = await MemoTableHandler.selectAll();
  memos.forEach((memo) => {
    console.log(memo.content.split(/\n/)[0]);
  });
} else if (option === "-r") {
  const memoContent = await showMemoContent();
  console.log(memoContent);
} else if (option === "-d") {
  deleteMemo();
} else if (option === undefined) {
  // const reader = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });

  // const lines = [];
  // reader.on("line", (input) => {
  //   lines.push(input);
  // });

  // reader.on("close", () => {
  //   MemoTableHandler.create(lines.join("\n"));
  // });
  createMemo();
}

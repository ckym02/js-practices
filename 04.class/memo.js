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

const showAllMemos = async () => {
  const memos = await MemoTableHandler.selectAll();
  memos.forEach((memo) => {
    console.log(memo.content.split(/\n/)[0]);
  });
};

const showMemo = async () => {
  const memos = await MemoTableHandler.selectAll();

  if (memos.length === 0) return null;

  const selectPrompt = new SelectPrompt(
    "Choose a memo you want to see:",
    generateChoices(memos)
  );
  const memo = await selectPrompt.run();
  console.log(memo.content);
};

const deleteMemo = async () => {
  const memos = await MemoTableHandler.selectAll();

  if (memos.length === 0) return null;

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
  showAllMemos();
} else if (option === "-r") {
  showMemo();
} else if (option === "-d") {
  deleteMemo();
} else if (option === undefined) {
  createMemo();
}

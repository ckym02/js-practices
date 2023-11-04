#!/usr/bin/env node

import readline from "readline";
import MemoTableHandler from "./lib/memo_table_handler.js";
import SelectPrompt from "./lib/select_prompt.js";

const [, , option] = process.argv;

if (option === "-l") {
  try {
    const memoTableHandler = await MemoTableHandler.build();
    const memos = await memoTableHandler.selectAll();
    memos.forEach((memo) => {
      console.log(memo.content.split(/\n/)[0]);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
} else if (option === "-r") {
  try {
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
    const answer = await selectPrompt.run();
    console.log(answer);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
} else if (option === "-d") {
  try {
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
    const answer = await selectPrompt.run();
    memoTableHandler.delete(answer);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
} else if (option === undefined) {
  try {
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
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
}

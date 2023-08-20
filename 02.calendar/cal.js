import minimist from "minimist";
import dayjs from "dayjs";

function cal(targetDate) {
  let printDate = "";
  const lastDate = targetDate.endOf("month").date();
  for (let date = 1; date <= lastDate; date++) {
    const day = targetDate.date(date).day();
    // 曜日が土曜日(6)であれば改行する、それ以外は半角スペースを末尾に追加する
    const appendDate =
      day === 6 ? `${(" " + date).slice(-2)}\n` : `${(" " + date).slice(-2)} `;
    printDate = printDate + appendDate;
  }
  return printDate;
}

function main() {
  const argv = minimist(process.argv.slice(2));

  const targetMonth = argv.m === undefined ? dayjs().month() : argv.m;
  const targetYear = argv.y === undefined ? dayjs().year() : argv.y;

  // new Date()の月は、0(1月)~11(12月)の値で指定する
  const targetDate = dayjs(new Date(targetYear, targetMonth - 1));

  const firstDay = targetDate.startOf("month").day();
  const space = "   ".repeat(firstDay);
  console.log(`        ${targetYear}\n` + space + cal(targetDate));
}

main();

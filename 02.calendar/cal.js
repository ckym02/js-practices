import minimist from "minimist";
import dayjs from "dayjs";

function main() {
  const argv = minimist(process.argv.slice(2));

  // dayjs().month()は0~11までの数値を取得する
  const targetMonth = argv.m === undefined ? dayjs().month() + 1 : argv.m;
  const targetYear = argv.y === undefined ? dayjs().year() : argv.y;

  // new Date()の月は、0(1月)~11(12月)の値で指定する
  const targetDate = dayjs(new Date(targetYear, targetMonth - 1));
  const lastMonthDate = targetDate.endOf("month").date();

  let printDate = "";
  for (let date = 1; date <= lastMonthDate; date++) {
    const day = targetDate.date(date).day();
    // 曜日が土曜日(6)であれば改行する、それ以外は半角スペースを末尾に追加する
    const appendDate =
      day === 6 ? `${(" " + date).slice(-2)}\n` : `${(" " + date).slice(-2)} `;
    printDate = printDate + appendDate;
  }

  const firstMonthDay = targetDate.startOf("month").day();
  const space = "   ".repeat(firstMonthDay);
  process.stdout.write(
    `      ${targetMonth}月 ${targetYear}\n${space}${printDate}`
  );
}

main();

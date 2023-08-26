import minimist from "minimist";
import dayjs from "dayjs";

function printDate(targetDateTimeInfo) {
  const lastDateOfMonth = targetDateTimeInfo.endOf("month").date();
  for (let date = 1; date <= lastDateOfMonth; date++) {
    const day = targetDateTimeInfo.date(date).day();
    // 曜日が土曜日(6)であれば改行する、それ以外は半角スペースを末尾に追加する

    if (day === 6) {
      process.stdout.write(`${(" " + date).slice(-2)}\n`);
    } else {
      process.stdout.write(`${(" " + date).slice(-2)} `);
    }
  }
}

function printCalendar() {
  const argv = minimist(process.argv.slice(2));

  const today = dayjs();
  // dayjs().month()は0~11までの数値を取得する
  const targetMonth = argv.m ?? today.month() + 1;
  const targetYear = argv.y ?? today.year();

  // new Date()の月は、0(1月)~11(12月)の値で指定する
  const targetDateTimeInfo = dayjs(new Date(targetYear, targetMonth - 1));

  const firstDayOfMonth = targetDateTimeInfo.startOf("month").day();
  const space = "   ".repeat(firstDayOfMonth);

  process.stdout.write(`      ${targetMonth}月 ${targetYear}\n${space}`);
  printDate(targetDateTimeInfo);
}

printCalendar();

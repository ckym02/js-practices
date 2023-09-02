import minimist from "minimist";
import dayjs from "dayjs";

function printCalendar() {
  const argv = minimist(process.argv.slice(2));

  const today = dayjs();
  // dayjs().month()は0~11までの数値を取得する
  const targetMonth = argv.m ?? today.month() + 1;
  const targetYear = argv.y ?? today.year();

  // new Date()の月は、0(1月)~11(12月)の値で指定する
  const startOfMonthObject = dayjs(
    new Date(targetYear, targetMonth - 1)
  ).startOf("month");
  const endOfMonthObject = dayjs(new Date(targetYear, targetMonth - 1)).endOf(
    "month"
  );

  process.stdout.write(`      ${targetMonth}月 ${targetYear}\n`);
  process.stdout.write("   ".repeat(startOfMonthObject.day()));

  // 日付を表示する処理
  for (
    let object = startOfMonthObject;
    object.isBefore(endOfMonthObject);
    object = object.add(1, "day")
  ) {
    const formattedDate = `  ${object.date()}`.slice(-2);
    process.stdout.write(formattedDate);
    // 曜日が土曜日(6)であれば改行する、それ以外は半角スペースを末尾に追加する
    if (object.day() === 6) {
      process.stdout.write("\n");
    } else {
      process.stdout.write(" ");
    }
  }
  process.stdout.write("\n");
}

printCalendar();

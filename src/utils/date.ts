function getDateUtils(dateString: Date | string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return {year, month, day};
}

function getTimeUtils(dateString: Date | string) {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return {hours, minutes};
}

function getDateTimeWithSeparator(
  dateString: Date | string,
  separator: string = '.',
): string {
  const {year, month, day} = getDateUtils(dateString);
  const {hours, minutes} = getTimeUtils(dateString);
  const formattedDate = [year, month, day].join(separator);
  return `${formattedDate} ${hours}:${minutes}`;
}

export type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  firstDOW: number;
  lastDate: number;
};

function getMonthYearDetails(initialDate: Date) {
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();
  const startDate = new Date(`${year}-${month}`);
  const firstDOW = startDate.getDay(); // 0(일요일) ~ 6(토요일)
  const lastDateString = String(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth() + 1,
      0,
    ).getDate(),
  );
  const lastDate = Number(lastDateString);

  return {month, year, startDate, firstDOW, lastDate};
}

function getNewMonthYear(prevData: MonthYear, increment: number) {
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );

  return getMonthYearDetails(newMonthYear);
}

function isSameAsCurrentDate(year: number, month: number, date: number) {
  const currentDate = getDateTimeWithSeparator(new Date());
  const inputDate = `${year}${String(month).padStart(2, '0')}${String(
    date,
  ).padStart(2, '0')}`;

  return currentDate === inputDate;
}

export {
  getDateTimeWithSeparator,
  getDateUtils,
  getTimeUtils,
  isSameAsCurrentDate,
  getMonthYearDetails,
  getNewMonthYear,
};

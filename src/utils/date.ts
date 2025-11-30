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

export {getDateTimeWithSeparator, getDateUtils, getTimeUtils};

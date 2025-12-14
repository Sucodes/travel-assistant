import dayjs from 'dayjs'; //dayjs documentation https://day.js.org/

export const formattedDate = (
  date: dayjs.Dayjs | string | number | Date,
  formatString: string
) => {
  if (!date || date === "") {
    return "---";
  }
  return dayjs(date).locale("en").format(formatString);
};

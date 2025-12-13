import dayjs from 'dayjs';

export const formattedDate = (
  date: dayjs.Dayjs | string | number | Date,
  formatString: string
) => {
  if (!date || date === "") {
    return "---";
  }
  return dayjs(date).locale("en").format(formatString);
};

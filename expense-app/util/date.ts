export function getFormattedDate(date: string) {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}`;
}

export function getDateMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function newDateFormat(date: string) {
  return date.split("T")[0];
}

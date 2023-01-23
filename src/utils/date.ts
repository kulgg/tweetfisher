export function getMonthShortName(monthNumber: number) {
  const date = new Date();

  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", { month: "short" });
}

export function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const dateStr = `${hour}:${minute} ${ampm} · ${getMonthShortName(
    month
  )} ${day}, ${year}`;

  return dateStr;
}

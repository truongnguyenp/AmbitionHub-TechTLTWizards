export function formatTime(timestamp: number): string {
  const created = new Date(timestamp);
  const periods: { [key: string]: number } = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };
  const diff = Date.now() - created.getTime();

  for (const key in periods) {
    if (diff > periods.week) {
      const month = created.toLocaleString("default", { month: "long" });
      const day = created.getDate();
      const year = created.getFullYear();
      return `${month} ${day} ${year}`;
    }
    if (diff >= periods[key as keyof typeof periods]) {
      const result = Math.floor(diff / periods[key as keyof typeof periods]);
      return `${result} ${result === 1 ? key : key + "s"} ago`;
    }
  }

  return "Just now";
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

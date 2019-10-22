export function convertToDate(timestamp) {
  const date = new Date(timestamp);
  return date.toDateString();
}

export function convertMinutesToHours(minutes) {
  const hours = Math.trunc(minutes / 60);
  const minLeft = minutes - hours * 60;

  return `${hours}h ${minLeft}m`;
}

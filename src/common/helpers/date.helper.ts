export function getFutureDateISOStringBasedOnHours(hours: number): string {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();

  // Calculate the timestamp for 48 hours from now (n hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const fortyEightHoursInMilliseconds = hours * 60 * 60 * 1000;
  const futureDate = new Date(currentTimestamp + fortyEightHoursInMilliseconds);
  return futureDate.toISOString();
}

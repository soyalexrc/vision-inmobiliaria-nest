export function validateNumberAsString(input: string) {
  const regex = /^-?\d+(\.\d+)?$/;
  return regex.test(input);
}

export function getRandomNumber(min, max) {
  if (min > max) {
    throw new Error("Min value cannot be greater than max value");
  }
  return Math.floor(Math.random()*(max-min+1))+min;
}
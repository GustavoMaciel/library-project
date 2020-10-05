const alphabet = 'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ';
const alphanumbet = `${alphabet}0123456789`;

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

export function generateRandomString(size: number = 20, numbers: boolean = false) {
  let generatedString = '';
  for (let i = 0; i < size; i++) {
    if(numbers) {
      generatedString += alphanumbet.charAt(randomInt(0, alphanumbet.length - 1));
    } else {
      generatedString += alphabet.charAt(randomInt(0, alphabet.length - 1));
    }
  }
  return generatedString;
}

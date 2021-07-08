const binaryStringInput = document.querySelector(".binaryStringInput");
const inputErrorText = document.querySelector(".inputErrorText");
const errorPositionText = document.querySelector(".errorPositionText");
const correctCodeText = document.querySelector(".correctCodeText");

const checkAndCorrect = () => {
  const binaryString = binaryStringInput.value.trim();

  inputErrorText.textContent = "";
  errorPositionText.textContent = "";
  correctCodeText.textContent = "";

  // If the user input contains characters other than ones and zeroes, show error
  if (!/^[0-1]+$/.test(binaryString)) {
    inputErrorText.textContent = "Please enter a valid binary string";
    return;
  }

  // If the user input is not of 7 bits long, show error
  if (binaryString.length !== 7) {
    inputErrorText.textContent = "String length should be 7";
    return;
  }

  const errorPosition = getErrorPosition(binaryString);

  if (errorPosition == 0) {
    errorPositionText.textContent = "No error";
    return;
  }

  errorPositionText.textContent = "Error position: " + errorPosition;
  // correctCodeText.textContent = "Correct code: " + errorPosition;
};

/**
 * Calculates the error position of a 7-bit hamming code. Returns 0 if no error is found.
 * @param {string} binaryString Binary string of ones and zeroes of length 7
 * @returns The position of the error in the string. r=Returns 0 if no error is found.
 */
const getErrorPosition = (binaryString) => {
  const arr = binaryString.split("");

  //Position the bits
  const P1 = arr[6];
  const P2 = arr[5];
  const D3 = arr[4];
  const P4 = arr[3];
  const D5 = arr[2];
  const D6 = arr[1];
  const D7 = arr[0];

  const P1String = P1 + D3 + D5 + D7;
  const P2String = P2 + D3 + D6 + D7;
  const P4String = P4 + D5 + D6 + D7;

  const finalString =
    getParity(P4String) + getParity(P2String) + getParity(P1String);

  return parseInt(finalString, 2);
};

/**
 * Calculate the parity
 * @param {string} string
 * @returns "0" if parity is even, "1" if parity is odd
 */
const getParity = (string) => {
  // Calculate the number of ones in the string
  const ones = string.split("").reduce((acc, digit) => {
    if (digit === "1") return acc + 1;
    return acc;
  }, 0);

  return evenOrOdd(ones) === "even" ? "0" : "1";
};

/**
 * Check if a number is even or odd
 * @param {number} number
 * @returns "even" if even, "odd" if odd
 */
const evenOrOdd = (number) => {
  return number % 2 == 0 ? "even" : "odd";
};

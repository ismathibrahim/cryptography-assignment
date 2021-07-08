const numberInput = document.querySelector(".numberInput");
const errorText = document.querySelector(".errorText");
const validityText = document.querySelector(".validityText");
const issuerText = document.querySelector(".issuerText");

const validate = () => {
  const number = numberInput.value.trim(); // Number entered by user
  const numberArray = number.split(""); // Number converted into an array to process

  const newArray = []; // New array to store the processed digits

  errorText.textContent = "";
  validityText.textContent = "";
  issuerText.textContent = "";

  // If the user input contains characters other than numbers, show error
  if (!/^[0-9]+$/.test(number)) {
    errorText.textContent = "Please enter only numbers";
    return;
  }

  // If the user input is not of 16 digits long, show error
  if (number.length !== 16) {
    errorText.textContent = "Number length should be 16";
    return;
  }

  // Starting from the rightmost digit, double every second number and add to new array.
  // Every first number is added to new array as it is.
  if (number.length === 16) {
    for (let i = numberArray.length - 1; i >= 0; i--) {
      if (i % 2 == 0) {
        newArray.push(double(numberArray[i]));
      } else {
        newArray.push(numberArray[i]);
      }
    }
  }

  // Find the sum of the numbers in new array
  const total = newArray.reduce((acc, digit) => {
    return acc + Number(digit);
  }, 0);

  // Check is the sum modulo 10 is equal to 0
  if (total % 10 === 0) {
    validityText.textContent = "Valid card number";
    issuerText.textContent = "Issuer: " + getIssuer(number);
    return;
  }

  validityText.textContent = "Invalid card number";
};

/**
 * Helper function to double a number. If the doubled number has two digits,
 * then return sum of the two digits.
 * @param {number} number
 * @returns a number
 */
const double = (number) => {
  const doubledNumber = (number * 2).toString();

  if (doubledNumber.length > 1) {
    return Number(doubledNumber[0]) + Number(doubledNumber[1]);
  }

  return doubledNumber;
};

/**
 * Get the card issuer from a credit card number
 * @param {string} number string of numbers
 * @returns card issuer name.
 */
const getIssuer = (number) => {
  // Patterns for each card issuer
  const issuers = {
    Visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/g,
    MasterCard: /^5[1-5][0-9]{14}$/g,
    Amex: /3[47][0-9]{13}$/g,
  };
  let issuer = "Unknown issuer";

  Object.keys(issuers).forEach((item) => {
    if (issuers[item].test(number)) {
      issuer = item;
    }
  });
  return issuer;
};

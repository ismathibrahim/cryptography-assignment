const numberInput = document.querySelector(".numberInput");
const errorText = document.querySelector(".errorText");
const validityText = document.querySelector(".validityText");

const validate = () => {
  const number = numberInput.value.trim(); // Number entered by user
  const numberArray = number.split(""); // Number converted into an array to process

  const newArray = []; // New array to store the processed digits

  errorText.textContent = "";
  validityText.textContent = "";

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

// const issuers = {
//   Visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/g,
//   MasterCard: /^5[1-5][0-9]{14}$/g,
//   Amex: /3[47][0-9]{13}$/g,
// };

// const whatCard = () => {
//   let ccNum = getUserInput();
//   let cardName = "Unknown card Number";

//   if (luhnCheck() === false) {
//     cardName = "Invalid input!!!";
//     return cardName;
//   }
//   Object.keys(issuers).forEach((prop) => {
//     if (issuers[prop].test(ccNum)) {
//       cardName = prop;
//     }
//   });
//   return cardName;
// };

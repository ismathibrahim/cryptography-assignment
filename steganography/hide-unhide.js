/**
 * Converts a text string into a string of hidden characters
 * @param {string} text A text string to convert to hidden characters
 */
const textToZeroWidth = (text) => {
  // Convert text to binary first
  const binaryString = textToBinary(text);

  // Split binary string into array
  const binaryStringArray = binaryString.split("");

  // Convert the binary character into zero width characters
  return binaryStringArray
    .map((binaryNum) => {
      const num = parseInt(binaryNum, 10);
      if (num === 1) {
        // Replace "1" with Zero Width Spaces (\u200B)
        return "​";
      } else if (num === 0) {
        // Replace "0" with Zero Width Non-Joiners (\u200C)
        return "‌";
      }
      // Replace spaces with Zero Width Joiners (\u200D)
      return "";
    })
    .join("﻿"); // Join the characters into a single string separated by Zero Width No-Break Spaces (\uFEFF)
};

/**
 * Converts a string of hidden characters into text
 * @param {string} hiddenString string of hidden characters
 */
const zeroWidthToText = (hiddenString) => {
  // Split the hidden string by Zero Width No-Break Spaces (\uFEFF)
  const hiddenCharArray = hiddenString.split("﻿");

  // Replace hidden character with binary values
  const binaryString = hiddenCharArray
    .map((char) => {
      if (char === "​") {
        // Replace Zero Width Spaces (\u200B) with "1"
        return "1";
      } else if (char === "‌") {
        // Replace Zero Width Non-Joiners (\u200C) with "0"
        return "0";
      }
      // Replace Zero Width Joiners (\u200D) with spaces
      return " ";
    })
    .join("");

  // Convert binary string into text
  return binaryToText(binaryString);
};

/**
 * Converts a text string to a binary string
 * @param {string} string Secret text input by the user to hide
 */
const textToBinary = (text) => {
  //Split the string into an array
  const charArray = text.split("");

  // Convert the characters to binary strings of their respective character codes
  const binaryStringArray = charArray.map((char) => {
    return char.charCodeAt(0).toString(2);
  });

  // Join the binary string array into a single string separated by spaces
  return binaryStringArray.join(" ");
};

/**
 * Converts a binary string to text
 * @param {string} binaryString
 */
const binaryToText = (binaryString) => {
  // Split binary string into array
  const binaryStringArray = binaryString.split(" ");

  // Convert the individual binary strings into text
  const textArray = binaryStringArray.map((string) =>
    String.fromCharCode(parseInt(string, 2))
  );

  // Join the text array into a single string
  return textArray.join("");
};

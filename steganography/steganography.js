const encodeMessage1 = document.querySelector(".encodeMessage1");
const encodeMessage2 = document.querySelector(".encodeMessage2");
const decodeMessage1 = document.querySelector(".decodeMessage1");
const decodeMessage2 = document.querySelector(".decodeMessage2");
const encodeResult = document.querySelector(".encodeResult");
const decodeResult = document.querySelector(".decodeResult");
const encodePassword = document.querySelector(".encodePassword");
const decodePassword = document.querySelector(".decodePassword");

const encode = () => {
  const secret = encodeMessage1.value; // The secret message
  const cover = encodeMessage2.value.split(" "); // Cover message
  const key = encodePassword.value; // Key used for encryption

  // Step 1: Encrypt the secret message with rc4 cipher
  const encryptedSecret = rc4(key, secret);

  // Step 2: Convert the encrypted message to zero-width characters
  const hiddenSecret = textToZeroWidth(encryptedSecret);

  // Step 3: Insert the zero-width characters into the cover message
  // after the first word
  const encodedMessage =
    cover[0] + "﻿" + hiddenSecret + " " + cover.slice(1).join(" ");

  encodeResult.textContent = encodedMessage;
};

const decode = () => {
  const cover = decodeMessage1.value; // Encoded cover message
  const key = decodePassword.value; // Key used for decryption

  // Step 1: Extract the first word from the cover message
  // which contains the zero-width characters
  const firstWord = cover.split(" ")[0];

  // Step 2: Extract the zero-width characters from the first word
  const hiddenSecret = firstWord.split("﻿").slice(1).join("﻿");

  // Step 3: Convert the zero-width characters into cipher text
  const encryptedSecret = zeroWidthToText(hiddenSecret);

  // Step 4: Decode the cipher text with rc4
  const decodedMessage = rc4(key, encryptedSecret);

  decodeResult.textContent = decodedMessage;
};

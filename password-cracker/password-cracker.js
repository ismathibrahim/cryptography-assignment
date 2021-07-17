const dictionaryStatus = document.querySelector(".dictionaryStatus");
const bruteForceStatus = document.querySelector(".bruteForceStatus");
const bruteForceStartedText = document.querySelector(".bruteForceStartedText");
const dictionaryStartedText = document.querySelector(".dictionaryStartedText");
const bruteForceFoundText = document.querySelector(".bruteForceFoundText");
const dictionaryFoundText = document.querySelector(".dictionaryFoundText");
const bruteDurationText = document.querySelector(".bruteDurationText");
const dictionaryDurationText = document.querySelector(
  ".dictionaryDurationText"
);
const bruteForceUrl = document.querySelector(".bruteForceUrl");
const dictionaryUrl = document.querySelector(".dictionaryUrl");

///////////////////////////////////////////////////////////////////////////
// BRUTE FORCE ATTACK
///////////////////////////////////////////////////////////////////////////

// Characters to generate brute force strings from
const pattern = "abcdefghijklmnopqrstuvwxyz1234567890";

const charArray = pattern.split("");

const bruteForce = async () => {
  const startTime = new Date();
  const gen = generateCharacters(charArray, 6);

  let found = false;
  let currentItem;

  bruteForceStartedText.textContent = "Brute force attack started...";
  bruteForceStatus.textContent = "";
  bruteForceFoundText.textContent = "";
  bruteDurationText.textContent = "";

  while (!found) {
    // Get the candidate string generated in the current iteration
    currentItem = gen.next();

    // Show current candidate string
    bruteForceStatus.textContent = "Current candidate: " + currentItem.value;

    // Make POST request
    const response = await postData(bruteForceUrl.value, {
      password: currentItem.value,
    });

    // If correct password is found, break out of loop showing the correct password
    if (response == "Correct Password") {
      bruteForceFoundText.textContent = "Password found: " + currentItem.value;

      // Show total time elapsed
      bruteDurationText.textContent =
        "Time elapsed: " + getElapsedTime(startTime);

      break;
    }

    // If no password is found then show message and duration
    if (currentItem.done == true) {
      bruteForceFoundText.textContent = "No password found";
      bruteDurationText.textContent =
        "Time elapsed: " + getElapsedTime(startTime);
      break;
    }
  }
};

/**
 * Generates brute force strings from the provided character array.
 * @param {string[]} charArray input array of characters to generate strings from
 * @param {number} maxLength Maximum length of the strings generated
 * @returns a javascript generator
 */
const generateCharacters = (charArray, maxLength) => {
  /**
   * Main generator function
   * @param {string} prefix prefix for the generated string in the current iteration
   * @param {number} index current index in the input array
   * @param {number} length current string length generated
   */
  function* generate(prefix, index, length) {
    for (let i = 0; i < charArray.length; i++) {
      const char = charArray[i];
      const currentItem = prefix + char;

      if (index >= length) {
        yield currentItem;
      } else {
        yield* generate(currentItem, index + 1, length);
      }
    }
  }

  //loop the generator until maximum string length is reached
  function* loop() {
    for (let i = 0; i < maxLength; i++) {
      yield* generate("", 0, i);
    }
  }

  return loop();
};

///////////////////////////////////////////////////////////////////////////
// DICTIONARY ATTACK
///////////////////////////////////////////////////////////////////////////

let passwordFile;

// Load file to variable when uploaded
document.getElementById("file").onchange = function () {
  passwordFile = this.files[0];
};

const dictionaryAttack = () => {
  const reader = new FileReader();

  const startTime = new Date();
  dictionaryStartedText.textContent = "Dictionary attack started...";
  dictionaryStatus.textContent = "";
  dictionaryFoundText.textContent = "";
  dictionaryDurationText.textContent = "";

  reader.onload = async (event) => {
    const file = event.target.result;
    // Split lines
    const allLines = file.split(/\r\n|\n/);

    for (let i = 0; i < allLines.length; i++) {
      const line = allLines[i];

      // Show current candidate password
      dictionaryStatus.innerHTML = "Current candidate: " + line;

      // Make POST request
      const response = await postData(dictionaryUrl.value, {
        password: line,
      });

      // If correct password is found, break out of loop showing the correct password and elapsed time
      if (response == "Correct Password") {
        dictionaryFoundText.textContent = "Password found: " + line;
        dictionaryDurationText.textContent =
          "Elapsed time: " + getElapsedTime(startTime);
        return;
      }
    }

    // If no password is found show message and elapsed time
    dictionaryFoundText.textContent = "No password found";
    dictionaryDurationText.textContent =
      "Elapsed time: " + getElapsedTime(startTime);
  };

  reader.onerror = (event) => {
    alert(event.target.error.name);
  };

  // Read password file
  reader.readAsText(passwordFile);
};

///////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////

/**
 * Make POST request and return response
 * @param {string} url POST url
 * @param {Object} data Request body object
 * @returns response object
 */
async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * Get elapsed time since a certain point in time.
 * @param {Date} startTime
 * @returns string
 */
const getElapsedTime = (startTime) => {
  endTime = new Date();
  var timeDiff = endTime - startTime;

  timeDiff /= 1000;

  var seconds = Math.round(timeDiff);
  return seconds + " seconds";
};

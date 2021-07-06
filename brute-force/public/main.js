const statusText = document.querySelector(".status-text");
const fileInput = document.getElementById("fileInput");
let passwordFile;

const dictionary = "abcdefghijklmnopqrstuvwxyz1234567890";
const charArray = dictionary.split("");

const crackPassword = async () => {
  const gen = generate(charArray, 3);

  let found = false;
  let currentItem;

  while (!found) {
    currentItem = gen.next();

    statusText.textContent = "current candidate: " + currentItem.value;
    const response = await postData("http://localhost:3000/login", {
      password: currentItem.value,
    });

    if (response == "Correct Password") {
      statusText.textContent = "Password found: " + currentItem.value;
      break;
    }
    if (currentItem.done == true) break;
  }
};

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function loadFile(input) {
  passwordFile = input.files[0];
}

const dictionaryAttack = () => {
  // const file = fileInput.target.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
    const file = event.target.result;
    const allLines = file.split(/\r\n|\n/);

    for (let i = 0; i < allLines.length; i++) {
      const line = allLines[i];
      statusText.textContent = "current candidate: " + line;
      const response = await postData("http://localhost:3000/login", {
        password: line,
      });

      if (response == "Correct Password") {
        statusText.textContent = "Password found: " + line;
        break;
      }
    }
    // // Reading line by line
    // allLines.forEach(async (line) => {

    // });
  };

  reader.onerror = (event) => {
    alert(event.target.error.name);
  };

  reader.readAsText(passwordFile);
};

///////////////////////////////////////////////////////////////////////////////
function generate2(current, len, chars) {
  if (current.length == len) console.log(current);
  if (current.length < len)
    for (var i in chars) {
      generate2(current + chars[i], len, chars);
    }
}

function brute(chars, min, max) {
  for (var l = min; l <= max; ++l) generate2("", l, chars);
}

const testFunction = () => {
  const charArray = dictionary.split("");

  brute(charArray, 2, 3);
};

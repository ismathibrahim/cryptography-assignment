const userNumInput = document.getElementById("userNum");

const getUserInput = () => userNumInput.value;

const luhnCheck = () => {
  let ccNum = getUserInput().trim();
  let ccNumSplit = ccNum.split("");
  let sum = 0;
  let singleNums = [];
  let doubleNums = [];
  let finalArry = undefined;
  let validCard = false;

  if (!/\d{15,16}(~\W[a-zA-Z])*$/g.test(ccNum) || ccNum.length > 16) {
    return false;
  }

  if (ccNum.length === 16) {
    for (let i = ccNumSplit.length - 1; i >= 0; i--) {
      if (i % 2 !== 0) {
        singleNums.push(ccNumSplit[i]);
      } else {
        doubleNums.push((ccNumSplit[i] * 2).toString());
      }
    }
  }

  doubleNums = doubleNums.join("").split("");
  finalArry = doubleNums.concat(singleNums);

  for (let j = 0; j < finalArry.length; j++) {
    sum += parseInt(finalArry[j]);
  }

  if (sum % 10 === 0) {
    validCard = true;
  }

  console.log(sum);
  return validCard;
};

const whatCard = () => {
  let ccNum = getUserInput();
  let validCheck = luhnCheck();
  let cardName = "Unknown card Number";

  let ccObj = {
    "valid (visa card)": /^(?:4[0-9]{12}(?:[0-9]{3})?)$/g,
    "valid (master card)": /^5[1-5][0-9]{14}$/g,
    "valid (Amex card)": /3[47][0-9]{13}$/g,
  };

  if (luhnCheck() === false) {
    cardName = "Invalid input!!!";
    return cardName;
  }
  Object.keys(ccObj).forEach((prop) => {
    if (ccObj[prop].test(ccNum)) {
      cardName = prop;
    }
  });
  return cardName;
};

const check = document.getElementById("submit");
check.addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    document.getElementById("result").innerHTML = whatCard();
  },
  false
);

const bitstringInput = document.getElementById("bitstring");
// const parityInput = document.getElementById("parity");

const getBitstring = () => bitstringInput.value;
// const getParityInput = () => parityInput.value;

const testFunction = () => {
  console.log(getBitstring());
};

const check = document.getElementById("submit");
check.addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    document.getElementById("result").innerHTML = checkError();
  },
  false
);

const checkError = () => {
  const arr = getBitstring().split("");

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

const getParity = (string) => {
  const ones = string.split("").reduce((acc, digit) => {
    if (digit === "1") return acc + 1;
    return acc;
  }, 0);

  return evenOrOdd(ones) === "even" ? "0" : "1";
};

const evenOrOdd = (number) => {
  return number % 2 == 0 ? "even" : "odd";
};

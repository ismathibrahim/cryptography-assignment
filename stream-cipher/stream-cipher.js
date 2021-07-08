const encodeMessage1 = document.querySelector(".encodeMessage1");
const encodeMessage2 = document.querySelector(".encodeMessage2");
const decodeMessage1 = document.querySelector(".decodeMessage1");
const decodeMessage2 = document.querySelector(".decodeMessage2");
const encodeResult = document.querySelector(".encodeResult");
const decodeResult = document.querySelector(".decodeResult");

const encode = () => {
  encodeResult.textContent = encrypt();
};

const decode = () => {
  decodeResult.textContent = decrypt();
};
const encrypt = () => {
  const str = encodeMessage1.value;
  const key = encodeMessage2.value;

  var s = [],
    j = 0,
    x,
    res = "";
  for (var i = 0; i < 256; i++) {
    s[i] = i;
  }
  for (i = 0; i < 256; i++) {
    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
  }
  i = 0;
  j = 0;
  for (var y = 0; y < str.length; y++) {
    i = (i + 1) % 256;
    j = (j + s[i]) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
    res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
  }
  var shuf = res + key;
  var encodedText = shuf
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");
  return encodedText;
};

const decrypt = () => {
  const str = decodeMessage1.value;
  const key = decodeMessage2.value;
  var s = [],
    j = 0,
    x,
    res = "";
  for (var i = 0; i < 256; i++) {
    s[i] = i;
  }
  for (i = 0; i < 256; i++) {
    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
  }
  i = 0;
  j = 0;
  for (var y = 0; y < str.length; y++) {
    i = (i + 1) % 256;
    j = (j + s[i]) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
    res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
  }
  return res;
};

/**
 *  RC4 cipher for encryption and decryption
 *  Referenced from Gupta, S.S., Maitra, S., Paul, G. and Sarkar, S. (2014)
 *  (Non-)random Sequences From (Non-)random Permutations—analysis of Rc4 Stream
 *  Cipher. Journal of Cryptology. 27 (1), pp. 67-108.
 * @param {string} key
 * @param {string} str
 * @returns string of cipher text when encrypting, plain text when decrypting
 */
const rc4 = (key, str) => {
  const s = []; // Internal state
  let result = "";

  for (let i = 0; i < 256; i++) {
    s[i] = i;
  }

  // Key scheduling algorithm
  for (let i = 0, j = 0; i < 256; i++) {
    j = j + s[i] + key.charCodeAt(i % key.length);

    //Swap
    const temp = s[i];
    s[i] = s[j];
    s[j] = temp;
  }

  //Pseudo random generation algorithm
  for (let y = 0, i = 0, j = 0; y < str.length; y++) {
    i = i + 1;
    j = j + s[i];

    //Swap
    const temp = s[i];
    s[i] = s[j];
    s[j] = temp;

    result += String.fromCharCode(str.charCodeAt(y) ^ s[s[i] + s[j]]);
  }

  return result;
};

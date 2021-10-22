const generateRandomString = function() {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charsArray = chars.split("");
  let code = "";
  for (let i = 0; i < 6; i ++) {
    let randomIndex = Math.floor(Math.random() * charsArray.length);
    code += charsArray[randomIndex];
  }
  return code;
};

const getRandomMovieId = function() {
  return Math.floor(Math.random() * (3926 - 1) + 1);
};

const decoder = function(string) {
  string = string.replace("&#39;", "'");
  return string;
}

const decoderToDB = function(string) {
  return string.replace("'", "&#39;")
}

//Generate random number between 0 & searchTotal - sessionSize to randomize the search results
const generateRandomSearchOffset = function(searchTotal, sessionSize) {
  let randLimit = searchTotal - sessionSize;
  console.log('max number', randLimit);
  if (randLimit <= 0) {
    return 0;
  }

  let offset = Math.floor(Math.random() * (randLimit + 1));

  console.log('offset', offset);

  return offset;
}

// insert the elements of insertArray randomly into array. return the final array
const insertRandomLocationInArray = function(array, insertArray) {
  let arrayLength = array.length;
  insertArray.forEach((elem) => {
    let randomNum = Math.floor(Math.random()*(arrayLength + 1));
    array.splice(randomNum, 0, elem);
    arrayLength = array.length;
  })

  return array;
};

module.exports = {
  generateRandomString,
  getRandomMovieId,
  decoder,
  decoderToDB,
  generateRandomSearchOffset,
  insertRandomLocationInArray
}

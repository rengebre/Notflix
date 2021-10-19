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

module.exports = {
  generateRandomString,
  getRandomMovieId,
  decoder
}

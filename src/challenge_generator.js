const words = require("./words.json");

function get_random(num_words = 10) {
  let random_words = [];

  for (let i = 0; i < num_words; i++) {
    const random_word = words[parseInt(Math.random() * words.length)];

    random_words.push(random_word);
  }
  return random_words.join(" ");
}

module.exports = {
  get_random,
};

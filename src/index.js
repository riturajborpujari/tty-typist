const fs = require("fs");
const game = require("./game");

const INPUT_TEXT = process.argv.at(2);
game.initialize_game(INPUT_TEXT);

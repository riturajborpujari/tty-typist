const readline = require("readline");

const screen_utils = require("./screen_utils");
const constants = require("./constants");
const input_streak = require("./input_streak");
const challenge_generator = require("./challenge_generator");

let challenge_text;

let input_index = 0;
let input_text = "";

let game_start_time = null;
let game_end_time = null;

function initialize_game(preferred_challenge_text) {
  if (!process.stdin.isTTY) {
    throw new Error("program stdin must be a terminal");
  }

  challenge_text = preferred_challenge_text || challenge_generator.get_random();

  process.stdin.setRawMode(true);
  readline.emitKeypressEvents(process.stdin);
  process.stdin.on("keypress", process_user_input);

  display_game_progress();
}

function process_user_input(chunk, input_key) {
  if (!game_start_time) {
    game_start_time = Date.now();
  }
  if (Reflect.has(constants.IGNORED_KEYS_MAP, input_key.name)) {
    return;
  }

  if (input_key.name === 'c' && input_key.ctrl === true) {
    process.exit(1);
  }

  const current_streak = input_streak.get_current_streak();
  if (challenge_text.at(input_index) === input_key.sequence) {
    if (current_streak.type === "CORRECT") {
      input_streak.increase_current_streak();
    } else {
      input_streak.initialize_streak("CORRECT");
      input_streak.increase_current_streak();
    }
  } else {
    if (current_streak.type === "INCORRECT") {
      input_streak.increase_current_streak();
    } else {
      input_streak.initialize_streak("INCORRECT");
      input_streak.increase_current_streak();
    }
  }

  input_text += input_key.sequence;
  input_index++;

  display_game_progress();
  check_game_status();
}

function check_game_status() {
  if (input_index === challenge_text.length) {
    game_end_time = Date.now();
    game_duration = game_end_time - game_start_time;

    console.log(`\nChallenge complete in ${game_duration / 1000} seconds!!!`);

    const stats = input_streak.get_streak_stats();
    console.log("Correct:", stats.CORRECT, "Incorrect:", stats.INCORRECT);

    console.log(
      "Your character speed is",
      ((challenge_text.length / game_duration) * 1000).toFixed(3),
      "characters/second",
    );

    process.exit(0);
  }
}

function display_game_progress() {
  screen_utils.clear();
  screen_utils.set_cursor_pos(0, 0);

  process.stdout.write(`\u001b[0m${challenge_text}`);

  screen_utils.set_cursor_pos(0, 0);
  const streaks = input_streak.get_all_streaks();
  for (const streak of streaks) {
    const color = streak.type === "CORRECT" ? "\u001b[1;94m" : "\u001b[1;91m";

    process.stdout.write(
      `${color}${challenge_text.substring(streak.start_index, streak.end_index)}`,
    );
  }
  process.stdout.write("\u001b[0m");
}

module.exports = { initialize_game };

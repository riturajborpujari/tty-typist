const clear = () => {
  process.stdout.write("\u001b[2J");
}

const set_cursor_pos = (line, col) => {
  process.stdout.write(`\u001b[${line};${col}H`);
}

const move_cursor_up = (line_count = 1) => {
  process.stdout.write(`\u001b[${line_count}A`);
}

const move_cursor_down = (line_count = 1) => {
  process.stdout.write(`\u001b[${line_count}B`);
}

module.exports = {
  clear,
  set_cursor_pos,
  move_cursor_up,
  move_cursor_down
}

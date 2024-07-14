const streaks = [];

function get_current_streak() {
  if (!streaks.length) {
    const new_streak = { type: "CORRECT", start_index: 0, end_index: 0 }
    streaks.push(new_streak);
    return new_streak;
  }

  return streaks.at(-1);
}

function get_all_streaks() {
  return streaks;
}

function increase_current_streak() {
  streaks.at(-1).end_index++;
}

function initialize_streak(type) {
  if (!streaks.length) {
    const streak = { type, start_index: 0, end_index: 0 };
    streaks.push(streak);

    return streak;
  }

  const current_streak = streaks.at(-1);
  const new_streak = {
    type,
    start_index: current_streak.end_index,
    end_index: current_streak.end_index,
  };
  streaks.push(new_streak);

  return new_streak;
}

function get_streak_stats() {
  const stats = streaks.reduce((acc, curr) => {
    acc[curr.type] += curr.end_index - curr.start_index;
    return acc;
  }, { CORRECT: 0, INCORRECT: 0 });

  return stats;
}

module.exports = {
  get_all_streaks,
  get_current_streak,
  increase_current_streak,
  initialize_streak,
  get_streak_stats,
}

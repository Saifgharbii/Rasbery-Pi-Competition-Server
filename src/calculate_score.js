function calculate_score(quiz_challenges, user_response) {
  let totalChallenges = quiz_challenges.length;
  let correctAnswers = 0;

  user_response.forEach((response) => {
    let challengeIndex = parseInt(response.challenge);
    if (
      quiz_challenges[challengeIndex] &&
      quiz_challenges[challengeIndex].solution === response.answer
    ) {
      correctAnswers++;
    }
  });

  let score = (correctAnswers / totalChallenges) * 100;
  return Math.round(score); // Round to nearest whole number
}
module.exports = calculate_score;

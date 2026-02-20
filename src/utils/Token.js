/**
 * Token calculation logic for Khotwa
 * 100 likes = 10 tokens
 * 20 comments = 5 tokens
 * 10 approves = 15 tokens
 * Bonus if verification > 70%
 */

const LIKES_PER_TOKEN = 10;
const TOKENS_PER_100_LIKES = 10;
const COMMENTS_PER_TOKEN = 4;
const TOKENS_PER_20_COMMENTS = 5;
const APPROVES_PER_TOKEN = 0.67;
const TOKENS_PER_10_APPROVES = 15;
const VERIFICATION_BONUS_THRESHOLD = 70;
const VERIFICATION_BONUS_TOKENS = 25;

export function calculateVerificationPercentage(likes, comments, approves) {
  const totalInteractions = likes + comments + approves;
  if (totalInteractions === 0) return 0;
  return Math.round((approves / totalInteractions) * 100);
}

export function calculateTokens(likes, comments, approves) {
  const likesTokens = Math.floor(likes / LIKES_PER_TOKEN) * (TOKENS_PER_100_LIKES / 10);
  const commentsTokens = Math.floor(comments / COMMENTS_PER_TOKEN) * (TOKENS_PER_20_COMMENTS / 5);
  const approvesTokens = Math.floor(approves / APPROVES_PER_TOKEN) * (TOKENS_PER_10_APPROVES / 10);

  let totalTokens = Math.round(likesTokens + commentsTokens + approvesTokens);

  const verification = calculateVerificationPercentage(likes, comments, approves);
  if (verification >= VERIFICATION_BONUS_THRESHOLD && (likes > 0 || comments > 0 || approves > 0)) {
    totalTokens += VERIFICATION_BONUS_TOKENS;
  }

  return totalTokens;
}

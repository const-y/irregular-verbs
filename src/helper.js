/**
 * Wrap setTimeout to make it an async function
 * @param ms
 * @returns {Promise<unknown>}
 */
export async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 * Check user's answer
 * @param {Array} sampler
 * @param {string} answer
 * @returns {boolean}
 */
export function checkAnswer({ sampler, answer }) {
  const answerSampler = sampler[0] + sampler[1] + sampler[2];

  return answer === answerSampler;
}

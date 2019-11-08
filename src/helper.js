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

/**
 * Randomize array element order.
 * Using Durstenfeld shuffle algorithm.
 */
export function shuffleArray(array) {
  const newArray = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];

    array[i] = array[j];
    array[j] = temp;
  }

  return newArray;
}

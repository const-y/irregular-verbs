/**
 * Возвращает случайный элемент из массива.
 * @param array Массив
 * @param getRandom Функция генерации случайного числа (для тестов)
 * @returns Случайный элемент
 */
export function getRandomItem<T>(
  array: T[],
  getRandom: () => number = Math.random,
): T {
  if (array.length === 0) throw new Error('Array is empty');
  return array[Math.floor(getRandom() * array.length)];
}

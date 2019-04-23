function _distanceBetweenPoints(pointA, pointB) {
  const { x: ax, y: ay } = pointA;
  const { x: bx, y: by } = pointB;
  return Math.sqrt(((ax - bx) ** 2) + ((ay - by) ** 2));
}

export function calculateDistance(array, points) {
  let sum = 0;
  let j;
  const { length } = array;
  for (let i = 0; i < length; i++) {
    j = (i + 1) % length;
    sum += _distanceBetweenPoints(
      points[array[i]],
      points[array[j]],
    );
  }
  return sum;
}

export function createRandomPoints(width, height, amount, border = 10) {
  const array = [];
  width -= border;
  height -= border;
  for (let i = 0; i < amount; i++) {
    const randomX = Math.random() * (width - 2 * border) + border;
    const randomY = Math.random() * (height - 2 * border) + border;
    array.push({ x: randomX, y: randomY });
  }
  return array;
}

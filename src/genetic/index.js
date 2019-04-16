import DnaFactory from './dna';

function _distanceBetweenPoints(pointA, pointB) {
  const { x: ax, y: ay } = pointA;
  const { x: bx, y: by } = pointB;
  return Math.sqrt(((ax - bx) ** 2) + ((ay - by) ** 2));
}

function _fullDistance(array, points) {
  let sum = 0;
  let prev = null;
  array.forEach((curr) => {
    if (prev !== null) {
      sum += _distanceBetweenPoints(points[prev], points[curr]);
    }
    prev = curr;
  });
  return sum;
}

export function calcFitness(array, points) {
  const distance = _fullDistance(array, points);
  return 1 / distance;
}

export function createRandomPoints(p5, pointsAmount, width, height, border = 10) {
  const array = [];
  width -= border;
  height -= border;
  for (let i = 0; i < pointsAmount; i++) {
    const randomX = p5.random(width);
    const randomY = p5.random(height);
    array.push({ x: randomX, y: randomY });
  }
  return array;
}


export function createPopulation(p5, points, populationSize) {
  const population = [];
  for (let i = 0; i < populationSize; i++) {
    const temp = [];
    for (let j = 0; j < points.length; j++) {
      temp.push(j);
    }
    const genes = p5.shuffle(temp);
    const fitness = calcFitness(genes, points);
    population.push(DnaFactory.get(genes, fitness));
  }
  return population;
}

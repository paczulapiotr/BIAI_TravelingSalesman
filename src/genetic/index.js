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

function _normalizeFitness(population) {
  let sum = 0;
  population.forEach((p) => { sum += p.fitness; });
  for (let i = 0; i < population.length; i++) {
    population[i].probability = population[i].fitness / sum;
  }
}


/**
 *
 * @param {*} p5 should be moved to window
 * @param {*} population Array of { array: Array<Number>, fitness: Number }
 * @param {*} prob  From 0 to 1
 */
function _mutateDna(p5, points, dna, prob) {
  const chance = p5.random(0, 1);
  if (chance > prob) {
    return dna;
  }
  const genes = p5.shuffle(dna.genes);
  const fitness = calcFitness(genes, points);
  return DnaFactory.get(genes, fitness);
}


function _pickDna(p5, points, population, prob) {
  let choice = p5.random(0, 1);
  let index = 0;
  while (choice > 0 && index < population.length) {
    choice -= population[index].probability;
    index++;
  }
  index--;
  const dna = _mutateDna(p5, points, population[index], prob);
  return dna;
}


export function createRandomPoints(p5, pointsAmount, width, height, border = 10) {
  const array = [];
  width -= border;
  height -= border;
  for (let i = 0; i < pointsAmount; i++) {
    const randomX = p5.random(border, width);
    const randomY = p5.random(border, height);
    array.push({ x: randomX, y: randomY });
  }
  return array;
}


export function createPopulation(p5, points, populationSize) {
  const population = [];
  let bestFitness = 0;
  let bestIndex = 0;
  const keys = Object.keys(points);
  for (let i = 0; i < populationSize; i++) {
    const genes = p5.shuffle(keys);
    const fitness = calcFitness(genes, points);

    if (bestFitness < fitness) {
      bestIndex = i;
      bestFitness = fitness;
    }

    population.push(DnaFactory.get(genes, fitness));
  }
  _normalizeFitness(population);
  return {
    population,
    best: population[bestIndex],
  };
}


export function nextGeneration(p5, points, population, mutationProb) {
  let bestFitness = 0;
  let bestIndex = 0;
  const newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    const dna = _pickDna(p5, points, population, mutationProb);
    if (dna.fitness > bestFitness) {
      bestFitness = dna.fitness;
      bestIndex = i;
    }
    newPopulation.push(dna);
  }
  _normalizeFitness(newPopulation);

  return {
    newPopulation,
    best: population[bestIndex],
  };
}

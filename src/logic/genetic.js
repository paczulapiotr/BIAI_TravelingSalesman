import { calculateDistance, createRandomPoints } from './points';
import DnaFactory from './dna';


export class TravelingSalesmanLogic {
  constructor(options) {
    this._width = options.width;
    this._height = options.height;
    this._p5 = options.p5;
    this._points = options.points || [];
    this._randomPoints = options.randomPoints || false;
    this._pointsAmount = options.randomPoints ? options.pointsAmount : this.points.length;
    this._population = [];
    this._mutation = options.mutation;
    this._populationSize = options.populationSize;
    this._showPopulationsBest = options.showPopulationsBest;
    this._bestDna = null;
    this._bestOfPopulation = null;
    this._bestDistance = Infinity;
  }

  get bestDna() {
    return this._bestDna;
  }

  set bestDna(dna) {
    this._bestDna = dna;
    this._bestDistance = calculateDistance(dna.genes, this._points);
  }

  get bestDistance() {
    return this._bestDistance;
  }

  get bestOfPopulation() {
    return this._bestOfPopulation;
  }

  get points() {
    return this._points;
  }

  get pointsAmount() {
    return this._pointsAmount;
  }

  get showPopulationsBest() {
    return this._showPopulationsBest;
  }

  get averageFitness() {
    let sum = 0;
    const currPop = this._population.slice();
    currPop.forEach((p) => { sum += p.fitness; });
    return sum / currPop.length;
  }

  _mutateDna = (dna) => {
    const prob = this._p5.random(1);
    const { length } = dna.genes;
    if (prob > this._mutation || length < 2) {
      return dna;
    }

    const first = Number.parseInt(this._p5.random(length));
    let second = Number.parseInt(this._p5.random(length));
    if (first === second) {
      second = (second + 1) % length;
    }
    const genes = [...dna.genes];
    const temp = genes[first];
    genes[first] = genes[second];
    genes[second] = temp;
    const fitness = this._calcFitness(genes);
    return DnaFactory.get(genes, fitness);
  }


  _normalizeFitness = (population) => {
    let sum = 0;
    population.forEach((p) => { sum += p.fitness; });
    for (let i = 0; i < population.length; i++) {
      population[i].probability = population[i].fitness / sum;
    }
  }

  _pickDna=() => {
    let prob = this._p5.random(0, 1);
    let index = 0;
    while (prob > 0 && index < this._population.length) {
      prob -= this._population[index].probability;
      index++;
    }
    index--;
    return this._population[index];
  }

  _crossover=(dnaA, dnaB) => {
    const { length } = dnaA.genes;
    const i = Number.parseInt(this._p5.random(length));
    const j = Number.parseInt(this._p5.random(i + 1, length + 1));
    const newGenes = dnaA.genes.slice(i, j);
    dnaB.genes.forEach((b) => {
      if (!newGenes.includes(b)) {
        newGenes.push(b);
      }
    });
    const fitness = this._calcFitness(newGenes, this._points);
    return DnaFactory.get(newGenes, fitness);
  }

  _calcFitness=(array) => {
    const distance = calculateDistance(array, this._points);
    return (1 / distance) ** 2;
  }


  firstPopulation=() => {
    if (this._randomPoints) {
      this._points = createRandomPoints(this._width, this._height, this._pointsAmount);
    }

    const firstPopulation = [];
    let bestFitness = 0;
    let bestIndex = 0;
    const keys = Object.keys(this._points);
    for (let i = 0; i < this._populationSize; i++) {
      const genes = this._p5.shuffle(keys);
      const fitness = this._calcFitness(genes);

      if (bestFitness < fitness) {
        bestIndex = i;
        bestFitness = fitness;
      }

      firstPopulation.push(DnaFactory.get(genes, fitness));
    }
    this.bestDna = firstPopulation[bestIndex];
    this._bestOfPopulation = this._bestDna;
    this._normalizeFitness(firstPopulation);
    this._population = firstPopulation;
  }

  nextPopulation=() => {
    let bestFitness = 0;
    let bestIndex = null;
    const newPopulation = [];
    for (let i = 0; i < this._population.length; i++) {
      const dnaA = this._pickDna();
      const dnaB = this._pickDna();
      const dna = this._mutateDna(this._crossover(dnaA, dnaB));

      if (dna.fitness > bestFitness) {
        bestFitness = dna.fitness;
        bestIndex = i;
      }
      newPopulation.push(dna);
    }

    this._normalizeFitness(newPopulation);
    this._bestOfPopulation = newPopulation[bestIndex];

    if (bestFitness > this._bestDna.fitness) {
      this.bestDna = this._bestOfPopulation;
    }

    this._population = newPopulation;
  }

  pause = () => {
    this._p5.noLoop();
  }

  contin = () => {
    this._p5.loop();
  }

  dispose = () => {
    this._p5.remove();
  }
}

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
    this._bestDna = null;
  }

  get bestDna() {
    return this._bestDna;
  }

  get points() {
    return this._points;
  }

  _mutateDna = (dna) => {
    const prob = this._p5.random(0, 1);
    if (prob > this._mutation) {
      return dna;
    }
    const genes = this._p5.shuffle(dna.genes);
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
    const i = this._p5.random(0, length);
    const j = this._p5.random(i + 1, length);
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
    return 1 / distance;
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
    this._bestDna = firstPopulation[bestIndex];
    this._normalizeFitness(firstPopulation);
    this._population = firstPopulation;
  }

  nextPopulation=() => {
    let bestFitness = this._bestDna.fitness;
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

    if (bestIndex !== null) {
      this._bestDna = newPopulation[bestIndex];
    }

    this._normalizeFitness(newPopulation);
    this._population = newPopulation;
  }
}
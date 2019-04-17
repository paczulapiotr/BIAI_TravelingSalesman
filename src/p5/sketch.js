import { createRandomPoints, createPopulation } from '../genetic';

function drawScene(ctx, voyage, genes, radius = 10) {
  let prevX;
  let prevY;
  debugger;
  ctx.clear();
  for (let i = 0; i < genes.length; i++) {
    const { x, y } = voyage[genes[i]];
    if (i > 0) {
      ctx.line(prevX, prevY, x, y);
    }
    ctx.ellipse(x, y, radius, radius);
    prevX = x;
    prevY = y;
  }
}

export default class SketchFactory {
  constructor(options) {
    this.heigth = options.height;
    this.width = options.width;
    this.pointsAmount = options.pointsAmount;
    this.populationSize = options.populationSize;
    this.mutation = options.mutation;
  }

create = () => (ctx) => {
  let population;
  let voyage;
  let bestDna = null;

  const populate = () => {
    const { newPopulation, best } = createPopulation(
      ctx,
      voyage,
      this.populationSize,
    );
    debugger;
    population = newPopulation;
    if (bestDna === null || bestDna.fitness < best.fitness) {
      bestDna = best;
    }
  };

  ctx.setup = () => {
    voyage = createRandomPoints(
      ctx,
      this.pointsAmount,
      this.width,
      this.heigth,
    );

    populate();
    ctx.createCanvas(this.width, this.heigth);
    console.log('population', population);
    console.log('voyage', voyage);
  };

  ctx.draw = () => {
    populate();
    drawScene(ctx, voyage, bestDna.genes);
  };
};
}

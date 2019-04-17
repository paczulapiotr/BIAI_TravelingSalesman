import { TravelingSalesmanLogic } from '../logic/genetic';

function drawScene(ctx, voyage, genes, radius = 10) {
  let prevX;
  let prevY;
  ctx.clear();
  ctx.noFill();
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
    this.options = options;
    this.heigth = options.height;
    this.width = options.width;
    this.pointsAmount = options.pointsAmount;
    this.populationSize = options.populationSize;
    this.mutation = options.mutation;
  }

create = () => (ctx) => {
  const geneticAlg = new TravelingSalesmanLogic({ ...this.options, p5: ctx });
  ctx.setup = () => {
    geneticAlg.firstPopulation();
    ctx.createCanvas(this.width, this.heigth);
  };

  ctx.draw = () => {
    geneticAlg.nextPopulation();
    const voyage = geneticAlg.points;
    const { genes } = geneticAlg.bestDna;
    drawScene(ctx, voyage, genes);
  };
};
}

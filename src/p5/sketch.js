import { TravelingSalesmanLogic } from '../logic/genetic';

function prepareScene(ctx) {
  ctx.clear();
  ctx.textSize(20);
  ctx.text(`Fps: ${Number.parseInt(ctx.frameRate())}`, 10, 50);
  ctx.fill(50);
}

function drawScene(ctx, voyage, genes, xtranslate = 0, ytranslate = 0, radius = 10) {
  let prevX;
  let prevY;
  for (let i = 0; i < genes.length; i++) {
    let { x, y } = voyage[genes[i]];
    x += xtranslate;
    y += ytranslate;
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
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
    this.pointsAmount = options.pointsAmount;
    this.populationSize = options.populationSize;
    this.mutation = options.mutation;
  }

create = () => (ctx) => {
  const geneticAlg = new TravelingSalesmanLogic({ ...this.options, p5: ctx });
  ctx.setup = () => {
    geneticAlg.firstPopulation();
    ctx.createCanvas(this.canvasWidth, this.canvasHeight);
  };

  ctx.draw = () => {
    geneticAlg.nextPopulation();
    const voyage = geneticAlg.points;
    const { genes: bestEver } = geneticAlg.bestDna;
    const { genes: populationBest } = geneticAlg.bestOfPopulation;
    prepareScene(ctx);
    drawScene(ctx, voyage, bestEver, 0, 100);
    drawScene(ctx, voyage, populationBest, 0, this.heigth + 100);
  };
};
}

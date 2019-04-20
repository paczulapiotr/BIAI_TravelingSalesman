import { TravelingSalesmanLogic } from '../logic/genetic';

function prepareScene(p5) {
  p5.clear();
}

function drawScene(p5, voyage, genes, xtranslate = 0, ytranslate = 0, radius = 10) {
  let prevX;
  let prevY;
  for (let i = 0; i < genes.length; i++) {
    let { x, y } = voyage[genes[i]];
    x += xtranslate;
    y += ytranslate;
    if (i > 0) {
      p5.line(prevX, prevY, x, y);
    }
    p5.ellipse(x, y, radius, radius);

    prevX = x;
    prevY = y;
  }
}


export class SketchFactory {
  constructor(options) {
    this._options = options;
    this._heigth = options.height;
    this._width = options.width;
    this._canvasWidth = options.canvasWidth;
    this._canvasHeight = options.canvasHeight;
    this._pointsAmount = options.pointsAmount;
    this._populationSize = options.populationSize;
    this._mutation = options.mutation;
  }


  create() {
    let geneticAlg = null;
    return {
      sketch: (p5) => {
        geneticAlg = new TravelingSalesmanLogic({ ...this._options, p5 });
        p5.setup = () => {
          geneticAlg.firstPopulation();
          p5.createCanvas(this._canvasWidth, this._canvasHeight);
          p5.fill(0);
        };

        p5.draw = () => {
          geneticAlg.nextPopulation();
          const voyage = geneticAlg.points;
          const { genes: bestEver } = geneticAlg.bestDna;
          const { genes: populationBest } = geneticAlg.bestOfPopulation;
          prepareScene(p5);
          drawScene(p5, voyage, bestEver);
          drawScene(p5, voyage, populationBest, 0, this._heigth);
        };
      },
      manager: {
        pause: () => geneticAlg.pause(),
        contin: () => geneticAlg.contin(),
        dispose: () => geneticAlg.dispose(),
        stats: () => ({
          averageFitness: geneticAlg.averageFitness,
          bestDistance: geneticAlg.bestDistance,
        }),
      },
    };
  }
}

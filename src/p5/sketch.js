import { TravelingSalesmanLogic } from '../logic/genetic';

function prepareScene(p5) {
  p5.clear();
}

function drawScene(p5, voyage, genes, xTranslate = 0, yTranslate = 0, radius = 10) {
  const { length } = genes;
  for (let i = 0; i < length; i++) {
    const j = (i + 1) % length;
    let { x, y } = voyage[genes[i]];
    let { x: nextX, y: nextY } = voyage[genes[j]];
    x += xTranslate;
    y += yTranslate;
    nextX += xTranslate;
    nextY += yTranslate;
    p5.line(x, y, nextX, nextY);
    p5.ellipse(x, y, radius, radius);
  }
}


export class SketchFactory {
  constructor(options) {
    this._options = options;
    this._heigth = options.height;
    this._width = options.width;
    this._canvasWidth = options.canvasWidth;
    this._canvasHeight = options.canvasHeight;
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
          if (geneticAlg.showPopulationsBest) {
            drawScene(p5, voyage, populationBest, 0, this._heigth);
          }
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

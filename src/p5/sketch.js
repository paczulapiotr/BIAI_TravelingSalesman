import { createRandomPoints, createPopulation } from '../genetic';

function drawScene(ctx, voyage, radius = 10) {
  let prevX;
  let prevY;
  let currX;
  let currY;
  for (let i = 0; i < voyage.length; i++) {
    currX = voyage[i].x;
    currY = voyage[i].y;
    if (i > 0) {
      ctx.line(prevX, prevY, currX, currY);
    }
    ctx.ellipse(currX, currY, radius, radius);
    prevX = currX;
    prevY = currY;
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
     ctx.setup = () => {
       voyage = createRandomPoints(
         ctx,
         this.pointsAmount,
         this.width,
         this.heigth,
       );
       population = createPopulation(
         ctx,
         voyage,
         this.populationSize,
       );
       ctx.createCanvas(this.width, this.heigth);
       console.log('population', population);
       console.log('voyage', voyage);
     };

     ctx.draw = () => {
       drawScene(ctx, voyage);
     };
   };
}

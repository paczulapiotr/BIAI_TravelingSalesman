import p5 from 'p5';

new p5(((p5) => {
  p5.setup = () => {
    p5.createCanvas(400, 400);
  };

  p5.draw = () => {
    p5.ellipse(50, 50, 80, 80);
  };
}));

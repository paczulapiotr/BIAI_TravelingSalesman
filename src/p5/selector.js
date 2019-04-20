

export class Selector {
  constructor(options) {
    this._height = options.height;
    this._width = options.width;
    this._points = [];
  }

  prepareScene = (p5) => {
    p5.clear();
  }

  drawScene = (p5, points, radius = 10) => {
    points.forEach(p => p5.ellipse(p.x, p.y, radius, radius));
  }


  _addPoint=(x, y) => {
    this._points.push({ x, y });
  }

  reset=() => {
    this._points = [];
  }

  revert=() => {
    this._points.pop();
  }

  get points() {
    return this._points;
  }


  sketch=(p5) => {
    p5.setup = () => {
      p5.frameRate(30);
      const cnv = p5.createCanvas(this._width, this._height);
      p5.fill(0);
      cnv.mouseClicked(() => {
        const x = p5.pmouseX;
        const y = p5.pmouseY;
        this._addPoint(x, y);
      });
    };

    p5.draw = () => {
      this.prepareScene(p5);
      this.drawScene(p5, this._points);
    };
  };
}

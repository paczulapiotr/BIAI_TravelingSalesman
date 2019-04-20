import React, { PureComponent } from 'react';
import Sketch from './sketchPanel';
import Start from './startPanel';
import Stats from './statsPanel';
import Settings from './settingsPanel';
import { SketchFactory } from '../p5/sketch';
import './style.scss';

const options = {
  width: 400,
  height: 300,
  canvasWidth: 400,
  canvasHeight: 600,
  points: [],
  pointsAmount: 12,
  randomPoints: true,
  populationSize: 200,
  mutation: 0.001,
};

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    const { sketch, manager } = new SketchFactory(options).create();
    this.state = {
      options,
      sketch,
      manager,
    };
  }

handleRestart = () => {
//   const { manager } = this.state;
//   manager.dispose();
  const newState = new SketchFactory(options).create();
  this.setState({ ...newState });
}

render() {
  const { options, sketch, manager } = this.state;
  return (
    <section className="main-section">
      <Sketch sketch={sketch} />
      <Stats statsGetter={manager.stats} />
      <Start
        contin={manager.contin}
        pause={manager.pause}
        restart={this.handleRestart}
      />
      <Settings />
    </section>
  );
}
}

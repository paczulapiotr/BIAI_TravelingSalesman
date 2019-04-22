import React, { Component } from 'react';
import Sketch from './panels/sketchPanel';
import Control from './panels/controlPanel';
import Stats from './panels/statsPanel';
import Settings from './panels/settingsPanel';
import { SketchFactory } from '../p5/sketch';
import './style.scss';

const initialOptions = {
  width: 400,
  height: 300,
  canvasWidth: 400,
  canvasHeight: 600,
  points: [],
  pointsAmount: 12,
  randomPoints: true,
  populationSize: 200,
  showPopulationsBest: true,
  mutation: 0.001,
};

export default class App extends Component {
  constructor(props) {
    super(props);
    const { sketch, manager } = new SketchFactory(initialOptions).create();
    this.state = {
      options: initialOptions,
      sketch,
      manager,
    };
  }

handleRestart = () => {
  const { options } = this.state;
  const newState = new SketchFactory(options).create();
  this.setState({ ...newState });
}

updateOptions = (newOptions) => {
  this.setState(prev => ({
    options: {
      ...prev.options,
      ...newOptions,
    },
  }));
}

render() {
  // eslint-disable-next-line
  const { options, sketch, manager } = this.state;
  return (
    <section className="main-section">
      <Sketch sketch={sketch} />
      <aside className="side-menu">
        <div className="customization-panels">
          <Control
            contin={manager.contin}
            pause={manager.pause}
            restart={this.handleRestart}
          />
          <Settings options={options} updateOptions={this.updateOptions} />
          <Stats statsGetter={manager.stats} />
        </div>
      </aside>
    </section>
  );
}
}

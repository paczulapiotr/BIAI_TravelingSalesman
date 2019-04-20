import React, { Component } from 'react';
import Sketch from './sketchPanel';
import Control from './controlPanel';
import Stats from './statsPanel';
import Settings from './settingsPanel';
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

updateOptions = (populationSize, mutation, pointsAmount, width, height, showPopulationsBest) => {
  const canvasHeight = showPopulationsBest ? height * 2 : height;
  const canvasWidth = width;
  this.setState(prev => ({
    options: {
      ...prev.options,
      populationSize,
      mutation,
      pointsAmount,
      canvasHeight,
      canvasWidth,
      width,
      height,
      showPopulationsBest,
    },
  }));
}

render() {
  // eslint-disable-next-line
  const { options, sketch, manager } = this.state;
  return (
    <section className="main-section">
      <Sketch sketch={sketch} />
      <Stats statsGetter={manager.stats} />
      <Control
        contin={manager.contin}
        pause={manager.pause}
        restart={this.handleRestart}
      />
      <Settings options={options} updateOptions={this.updateOptions} />
    </section>
  );
}
}

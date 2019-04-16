import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import SketchFactory from '../p5/sketch';

const options = {
  height: 400,
  width: 400,
  pointsAmount: 5,
  populationSize: 200,
  mutation: 0.01,
};


const SketchComponenet = () => {
  const factory = new SketchFactory(options);
  return (
    <P5Wrapper sketch={factory.create()} />
  );
};

export default SketchComponenet;

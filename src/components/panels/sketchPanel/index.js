import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import P5Wrapper from '../../p5Wrapper';


const SketchComponent = ({ sketch }) => (
  <Paper className="panel">
    <Typography variant="h4">Traveling Salesman</Typography>
    <P5Wrapper sketch={sketch} />
  </Paper>
);

SketchComponent.propTypes = {
  sketch: PropTypes.func.isRequired,
};

export default SketchComponent;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import P5Wrapper from '../p5Wrapper';

export default class SketchComponent extends Component {
static propTypes = {
  sketch: PropTypes.func.isRequired,
}

render() {
  const { sketch } = this.props;
  return (
    <Paper className="panel">
      <Typography variant="h3">Traveling Salesman</Typography>
      <P5Wrapper sketch={sketch} />
    </Paper>
  );
}
}

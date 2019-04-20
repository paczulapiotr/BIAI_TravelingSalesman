import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Button } from '@material-ui/core';
import './style.scss';

export default class StatsPanel extends Component {
static propTypes = {
  statsGetter: PropTypes.func.isRequired,
}

constructor(props) {
  super(props);
  this.state = {
    averageFitness: 0,
    bestDistance: Infinity,
  };
}

updateStats = () => {
  const { statsGetter } = this.props;
  this.setState(statsGetter());
}

render() {
  const { averageFitness, bestDistance } = this.state;
  return (
    <Paper className="stats-panel panel">
      <Typography variant="h3">Statistics</Typography>
      <Typography variant="h5">{`Average fitness: ${averageFitness}`}</Typography>
      <Typography variant="h5">{`Best distance: ${bestDistance}`}</Typography>
      <Button
        variant="outlined"
        onClick={this.updateStats}
      >Refresh
      </Button>
    </Paper>
  );
}
}

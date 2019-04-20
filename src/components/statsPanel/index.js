import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Button,
  ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel,
} from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
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
    <ExpansionPanel className="stats-panel">
      <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography variant="h4">Statistics</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className="stats-content">
          <Typography variant="h6">{`Average fitness: ${averageFitness}`}</Typography>
          <Typography variant="h6">{`Best distance: ${bestDistance}`}</Typography>
          <Button
            variant="outlined"
            onClick={this.updateStats}
          >Refresh
          </Button>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
}

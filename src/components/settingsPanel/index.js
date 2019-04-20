import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography, Button, TextField, Checkbox, FormControl,
} from '@material-ui/core';
import './style.scss';

const maxValues = {
  width: 2000,
  height: 2000,
  population: 10000,
  pointsAmount: 100,
};

export default class SettingsPanel extends Component {
  static propTypes = {
    options: PropTypes.objectOf(PropTypes.any).isRequired,
    updateOptions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      populationSize: props.options.populationSize,
      mutation: props.options.mutation,
      width: props.options.width,
      height: props.options.height,
      pointsAmount: props.options.pointsAmount,
      showPopulationsBest: props.options.showPopulationsBest,
    };
  }

handlePopulationSize=(e) => {
  const val = Number.parseInt(e.target.value);
  if (val > 0 && val < maxValues.population) {
    this.setState({ populationSize: val });
  } else if (val > maxValues.population) {
    this.setState({ populationSize: maxValues.population });
  }
}

handleMutation=(e) => {
  const { value } = e.target;
  const val = Number.parseFloat(value);
  if (val >= 0 && val < 100) {
    this.setState({ mutation: val });
  } else if (value === ''
  || value === null
  || value === undefined) {
    this.setState({ mutation: 0 });
  }
}

handleWidth=(e) => {
  const val = Number.parseInt(e.target.value);
  if (val > 0 && val < maxValues.width) {
    this.setState({ width: val });
  } else if (val > maxValues.width) {
    this.setState({ width: maxValues.width });
  }
}

handleHeight=(e) => {
  const val = Number.parseInt(e.target.value);
  if (val > 0 && val < maxValues.height) {
    this.setState({ height: val });
  } else if (val > maxValues.height) {
    this.setState({ height: maxValues.height });
  }
}

handleAmount=(e) => {
  const val = Number.parseInt(e.target.value);
  if (val > 0 && val < maxValues.height) {
    this.setState({ pointsAmount: val });
  } else if (val > maxValues.height) {
    this.setState({ pointsAmount: maxValues.pointsAmount });
  }
}

handleCheckbox=(e) => {
  this.setState({ showPopulationsBest: e.target.checked });
}

handleReset=() => {
  const { options } = this.props;

  this.setState({
    populationSize: options.populationSize,
    mutation: options.mutation,
    width: options.width,
    height: options.height,
    pointsAmount: options.pointsAmount,
    showPopulationsBest: options.showPopulationsBest,
  });
}

handleSave=() => {
  const { updateOptions } = this.props;
  const {
    populationSize, mutation, width, height, showPopulationsBest, pointsAmount,
  } = this.state;
  updateOptions(populationSize, mutation, pointsAmount, width, height, showPopulationsBest);
}

render() {
  const {
    populationSize,
    mutation,
    width,
    height,
    pointsAmount,
    showPopulationsBest,
  } = this.state;
  return (
    <Paper className="panel settings-panel">
      <Typography variant="h4">
         Settings panel
      </Typography>
      <FormControl className="form-control">
        <TextField value={populationSize} onChange={this.handlePopulationSize} variant="outlined" label="Population size" type="number" />
        <TextField value={mutation} onChange={this.handleMutation} variant="outlined" label="Mutation %" type="number" />
        <TextField value={width} onChange={this.handleWidth} variant="outlined" label="Canvas width" type="number" />
        <TextField value={height} onChange={this.handleHeight} variant="outlined" label="Canvas height" type="number" />
        <TextField value={pointsAmount} onChange={this.handleAmount} variant="outlined" label="Points amount" type="number" />
        <Typography variant="h6">Show best of population?
          <Checkbox color="primary" checked={showPopulationsBest} onChange={this.handleCheckbox} />
        </Typography>
        <footer className="settings-buttons">
          <Button variant="outlined" onClick={this.handleReset}>Reset</Button>
          <Button variant="outlined" onClick={this.handleSave}>Save</Button>
        </footer>
      </FormControl>
    </Paper>
  );
}
}

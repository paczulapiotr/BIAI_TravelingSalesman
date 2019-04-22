import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Button, TextField, Checkbox, FormControl,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, FormControlLabel,
} from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import './style.scss';
import ManualSelector from '../../manualSelector';

const maxValues = {
  width: 2000,
  height: 2000,
  population: 10000,
  pointsAmount: 100,
};

const minValues = {
  width: 200,
  height: 200,
  population: 10,
  pointsAmount: 3,
};

export default class SettingsPanel extends Component {
  static propTypes = {
    options: PropTypes.objectOf(PropTypes.any).isRequired,
    updateOptions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      shouldSave: false,
      populationSize: props.options.populationSize,
      mutation: props.options.mutation,
      width: props.options.width,
      height: props.options.height,
      points: props.options.points || [],
      randomPoints: props.options.randomPoints,
      pointsAmount: props.options.pointsAmount,
      showPopulationsBest: props.options.showPopulationsBest,
    };
  }

handleShouldSave=() => {
  const { shouldSave } = this.state;
  if (!shouldSave) {
    this.setState({ shouldSave: true });
  }
}

handlePopulationSize=(e) => {
  this.handleShouldSave();
  const { value } = e.target;
  const val = Number.parseInt(value);
  if (val >= 0 && val <= maxValues.population) {
    this.setState({ populationSize: val });
  } else if (val > maxValues.population) {
    this.setState({ populationSize: maxValues.population });
  } else if (value === ''
  || value === null
  || value === undefined) {
    this.setState({ populationSize: 0 });
  }
}

handleMutation=(e) => {
  this.handleShouldSave();
  const { value } = e.target;
  const val = Number.parseFloat(value);
  if (val >= 0 && val < 100) {
    this.setState({ mutation: val });
  } else if (val >= 100) {
    this.setState({ mutation: 99 });
  } else if (value === ''
  || value === null
  || value === undefined) {
    this.setState({ mutation: 0 });
  }
}

handleWidth=(e) => {
  this.handleShouldSave();
  const { value } = e.target;
  const val = Number.parseInt(value);
  if (val >= 0 && val <= maxValues.width) {
    this.setState({ width: val, points: [] });
  } else if (val > maxValues.width) {
    this.setState({ width: maxValues.width, points: [] });
  } else if (value === ''
  || value === null
  || value === undefined) {
    this.setState({ width: 0 });
  }
}

handleHeight=(e) => {
  this.handleShouldSave();
  const { value } = e.target;
  const val = Number.parseInt(value);
  if (val >= 0 && val <= maxValues.height) {
    this.setState({ height: val, points: [] });
  } else if (val > maxValues.height) {
    this.setState({ height: maxValues.height, points: [] });
  } else if (value === ''
  || value === null
  || value === undefined) {
    this.setState({ height: 0 });
  }
}

handleAmount=(e) => {
  this.handleShouldSave();
  const { value } = e.target;
  const val = Number.parseInt(value);
  if (val >= 0 && val <= maxValues.pointsAmount) {
    this.setState({ pointsAmount: val, points: [] });
  } else if (val > maxValues.pointsAmount) {
    this.setState({ pointsAmount: maxValues.pointsAmount, points: [] });
  } else if (value === ''
  || value === null
  || value === undefined) {
    this.setState({ pointsAmount: 0 });
  }
}

handleCheckbox=(e) => {
  this.handleShouldSave();
  this.setState({ showPopulationsBest: e.target.checked });
}

handleRandomPoints=(e) => {
  this.handleShouldSave();
  this.setState({ randomPoints: e.target.checked });
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
  this.setState({ shouldSave: false });
  const { updateOptions } = this.props;
  let {
    populationSize,
    width,
    height,
    pointsAmount,
  } = this.state;

  const {
    mutation,
    points,
    randomPoints,
    showPopulationsBest,
  } = this.state;

  if (height < minValues.height) {
    height = minValues.height; // eslint-disable-line
    this.setState({ height });
  }

  const canvasHeight = showPopulationsBest
    ? height * 2
    : height;

  if (width < minValues.width) {
    width = minValues.width;// eslint-disable-line
    this.setState({ width });
  }

  const canvasWidth = width;

  if (pointsAmount < minValues.pointsAmount) {
    pointsAmount = minValues.pointsAmount; // eslint-disable-line
    this.setState({ pointsAmount });
  }

  if (populationSize < minValues.population) {
    populationSize = minValues.population; // eslint-disable-line
    this.setState({ populationSize });
  }


  updateOptions({
    populationSize,
    mutation,
    width,
    height,
    canvasWidth,
    canvasHeight,
    points,
    randomPoints,
    pointsAmount,
    showPopulationsBest,
  });
}

handleManualSelector=(points) => {
  this.setState({
    points,
    pointsAmount: points.length,
    randomPoints: false,
    shouldSave: true,
  });
}

render() {
  const {
    shouldSave,
    populationSize,
    mutation,
    width,
    height,
    pointsAmount,
    randomPoints,
    showPopulationsBest,
  } = this.state;
  return (
    <ExpansionPanel className="settings-panel">
      <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography variant="h4">
         Settings panel
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl className="form-control">
          <TextField value={populationSize} onChange={this.handlePopulationSize} variant="outlined" label="Population size" type="number" />
          <TextField value={mutation} onChange={this.handleMutation} variant="outlined" label="Mutation %" type="number" />
          <TextField value={width} onChange={this.handleWidth} variant="outlined" label="Canvas width" type="number" />
          <TextField value={height} onChange={this.handleHeight} variant="outlined" label="Canvas height" type="number" />
          <TextField value={pointsAmount} onChange={this.handleAmount} variant="outlined" label="Points amount" type="number" />
          <ManualSelector width={width} height={height} savePoints={this.handleManualSelector} />
          <FormControlLabel
            label="Use random points?"
            control={(
              <Checkbox
                color="primary"
                checked={randomPoints}
                onChange={this.handleRandomPoints}
              />
            )}
          />
          <FormControlLabel
            label="Show best of population?"
            control={(
              <Checkbox
                color="primary"
                checked={showPopulationsBest}
                onChange={this.handleCheckbox}
              />
            )}
          />
          <footer className="settings-buttons">
            <Button variant="outlined" onClick={this.handleReset} color="primary">Reset</Button>
            <Button variant={shouldSave ? 'contained' : 'outlined'} onClick={this.handleSave} color="primary">Save</Button>
          </footer>
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
}

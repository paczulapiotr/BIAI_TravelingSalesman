import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';

export default class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Paper className="panel">
        <Typography variant="h3">
       Settings panel
        </Typography>
      </Paper>
    );
  }
}

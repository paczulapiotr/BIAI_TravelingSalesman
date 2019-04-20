import React, { Component } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import './style.scss';

export default class ControlPanel extends Component {
    static propTypes = {
      contin: PropTypes.func.isRequired,
      pause: PropTypes.func.isRequired,
      restart: PropTypes.func.isRequired,
    }

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { contin, pause, restart } = this.props;
      return (
        <Paper className="panel control-panel">
          <Typography variant="h4">
           Control panel
          </Typography>
          <footer className="control-buttons">
            <Button variant="outlined" onClick={restart}>Restart</Button>
            <Button variant="outlined" onClick={pause}>Pause</Button>
            <Button variant="outlined" onClick={contin}>Continue</Button>
          </footer>
        </Paper>
      );
    }
}

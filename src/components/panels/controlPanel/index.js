import React from 'react';
import {
  Typography, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import './style.scss';

const ControlPanel = ({ contin, pause, restart }) => (
  <ExpansionPanel className="control-panel">
    <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
      <Typography variant="h4">
       Control panel
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <footer className="control-buttons">
        <Button variant="outlined" onClick={restart} color="primary">Restart</Button>
        <Button variant="outlined" onClick={pause} color="primary">Pause</Button>
        <Button variant="outlined" onClick={contin} color="primary">Continue</Button>
      </footer>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

ControlPanel.propTypes = {
  contin: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
};


export default ControlPanel;

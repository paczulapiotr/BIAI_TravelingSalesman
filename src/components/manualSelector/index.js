import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText, IconButton,
} from '@material-ui/core';
import { ReplayOutlined } from '@material-ui/icons';
import { Selector } from '../../p5/selector';
import P5Wrapper from '../p5Wrapper';
import './style.scss';

export default class ManualSelector extends Component {
  static propTypes = {
    savePoints: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    const { width, height } = props;
    this.selector = new Selector({ width, height });
  }

  handleOpen=() => {
    const { width, height } = this.props;
    if (this.selector._width !== width || this.selector._height !== height) {
      this.selector = new Selector({ width, height });
    }
    this.setState({ open: true });
  }

  handleClose=() => {
    this.setState({ open: false });
  }

  handleReset=() => {
    this.selector.reset();
  }

  handleSave=() => {
    const { savePoints } = this.props;
    savePoints(this.selector.points);
    this.handleClose();
  }

  render() {
    const { open } = this.state;

    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
Choose points
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="manual-points-selector"
        >
          <div className="dialog-padder">
            <DialogTitle>Points selector</DialogTitle>
            <DialogContent className="manual-dialog-content">
              <DialogContentText>
Choose points for your voyage
              </DialogContentText>
              <P5Wrapper sketch={this.selector.sketch} />
            </DialogContent>
            <DialogActions>
              <IconButton onClick={this.selector.revert} aria-label="Revert">
                <ReplayOutlined />
              </IconButton>
              <Button onClick={this.handleClose} color="primary">
Cancel
              </Button>
              <Button onClick={this.handleReset} color="primary">
Reset
              </Button>
              <Button onClick={this.handleSave} color="primary">
Save
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </>
    );
  }
}

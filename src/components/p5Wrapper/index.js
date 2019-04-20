import React, { Component } from 'react';
import PropTypes from 'prop-types';
import P5 from 'p5';
// /* eslint-disable */
export default class P5Wrapper extends Component {
static propTypes = {
  sketch: PropTypes.func.isRequired,
}

constructor(props) {
  super(props);
  this.state = {};
}

componentDidMount() {
  const { sketch } = this.props;
  this.canvas = new P5(this.catchRef(sketch), this.wrapper);
}

componentWillUpdate(newprops) {
  const { sketch } = this.props;

  if (sketch !== newprops.sketch) {
    const { p5 } = this.setState;
    p5.remove();
    this.canvas = new P5(this.catchRef(newprops.sketch), this.wrapper);
  }
}

catchRef = sketch => (p5) => {
  this.setState = {
    p5,
  };
  return sketch(p5);
}

render() {
  return (
    <div
      className="canvas-wrapper"
      ref={(wrapper) => { this.wrapper = wrapper; }}
    />
  );
}
}

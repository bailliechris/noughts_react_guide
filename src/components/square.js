import React from 'react';

class Square extends React.Component {

  check_render() {
    if (this.props.value === null)
      return '_';
    else
      return this.props.value;
  }

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        { this.check_render() }
      </button>
    );
  }
}

export default Square
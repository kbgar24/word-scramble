import React, { Component } from 'react';
import Countdown from 'react-countdown-now';

let renderCount = 0;

export default class CountdownWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasStarted: false,
      renderCount: 0,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const prevHasStarted = prevState.hasStarted;
    const hasStarted = nextProps.hasStarted;

    if (!prevHasStarted && hasStarted){
      console.log('***************');
      console.log('***************');
      console.log('updating timer!');
      console.log('***************');
      console.log('***************');
      return { hasStarted }
    } else {
      return null;
    }
  }

  render() {
    console.log('***************');
    console.log('***************');
    console.log('rendering timer!');
    console.log('renderCount: ', ++renderCount);
    console.log('***************');
    console.log('***************');
    return (
      <div>
        { 
          this.props.startTime
          ? <Countdown
              date={this.props.startTime + 20000}
              intervalDelay={0}
              precision={3}
              renderer={props => <div>{(props.total / 1000).toFixed(2)}</div>}
            />
          : <div>20.00</div>
        }
      </div>
    )
  }
}
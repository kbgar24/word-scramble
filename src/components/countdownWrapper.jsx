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
    // const prevHasStarted = prevState.hasStarted;
    const { hasStarted, startTime } = nextProps;

    // if (!prevHasStarted && hasStarted){
    //   console.log('***************');
    //   console.log('***************');
    //   console.log('updating timer!');
    //   console.log('***************');
    //   console.log('***************');
      return { hasStarted, startTime }
    // } else {
    //   return null;
    // }
  }

  render() {
    return (
      <div className='countdown-timer'>
        { 
          this.state.startTime
          ? <Countdown
              date={this.state.startTime + 20000}
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
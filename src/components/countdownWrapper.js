import React, { Component } from 'react';
import Countdown from 'react-countdown-now';

export default class CountdownWrapper extends Component {

  state = {}

  static getDerivedStateFromProps = ({ startTime}) => ({ startTime })

  render = () => (
    <div className='countdown-timer' style={{ color: this.props.timerColor }}>
      { 
        this.state.startTime
        ? <Countdown
            date={this.state.startTime + 60000}
            intervalDelay={0}
            precision={3}
            renderer={props => <div>{(props.total / 1000).toFixed(2)}</div>}
          />
        : <div>20.00</div>
      }
    </div>
  )
}
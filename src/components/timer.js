/*********************
 * 
 * This is a custom-built timer component :)
 * Unfortunately, it was unstable during multiuser play :(
 * So I decided to use to a 3rd-party module instead
 * This component is thus provided here just as a reference 
 * 
 * **********************/

import React, { Component } from 'react';

export default class Timer extends Component {

 state = {
    value: 600,
  }

  handleTimerStart = () => {
    const decrementTimer = () => {
      this.setState({ value: this.state.value - 1 })
    }
    const interval = setInterval(decrementTimer, 100)
    setTimeout(() => { clearInterval(interval) }, 60000)
  }

  handleTimerReset = () => { this.setState({ value: 600 }) }


  render() {

    this.props.startTimer && this.handleTimerStart()
    const formatValue = (value) => {
      const valueString = String(value).slice()
      const valueLength = String(value).length;
      return valueLength === 3
        ? valueString.slice(0, 2) + '.' + valueString.slice(2)
        : valueLength === 2 && value > 0
        ? '0' + valueString.slice(0, 1) + '.' + valueString.slice(1)
        : '00.0'
    }
    
    const formattedValue = formatValue(this.state.value);


    return(
      <div>
        <h1>{formattedValue}</h1>
        <button onClick={this.handleTimerStart}>Start Timer</button>
        <button onClick={this.handleTimerReset}>Reset Timer</button>
      </div>
    )
  }
}
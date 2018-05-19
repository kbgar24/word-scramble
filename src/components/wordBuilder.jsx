import React, { Component } from 'react';

export default class WordBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      wordStatus: '',
    }

  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const wordStatus = this.props.isValidWord(this.state.value)
    const value = '';
    this.setState({ wordStatus, value })
  }


  render = () => {
    const { wordStatus } = this.state;
    return(
    <div>
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.value} onChange={this.handleChange}/>
        <input 
          type='submit'
          value='Check Word'
        />
      </form>
        { wordStatus === 'isValid' && <h1>Valid Word!</h1> }
        { wordStatus === 'alreadyPlayed' && <h1>Already Played!</h1> }
        { wordStatus === 'notValid' && <h1>Invalid Word!</h1> }
    </div>
    )
  };
};

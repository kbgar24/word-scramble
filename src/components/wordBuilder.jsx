import React, { Component } from 'react';

export default class WordBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      validWord: false,
    }

  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  }

  handleClick = (e) => {
    e.preventDefault();
    const validWord = this.props.isValidWord(this.state.value)
    this.setState({ validWord })
  }



  render = () => (
    <div>
      <form onSubmit={this.handleClick}>
        <input value={this.state.value} onChange={this.handleChange}/>
        <input 
          type='submit'
          value='Check Word'
        />
      </form>
      { 
        this.state.validWord 
        ? <h1>Valid Word!</h1>
        : <h1>Invalid Word!</h1>
      }
    </div>
  );
};

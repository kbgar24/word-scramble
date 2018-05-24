import React, { Component } from 'react';

export default class WordBuilder extends Component {

  state = {
    value: '',
    wordStatus: '',
  }

  handleChange = ({ target: { value } }) => {
    const lettersRegex = /^[a-zA-Z]+$/;
    if (value === '' || lettersRegex.test(value)) {
      this.setState({ value })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.isValidWord(this.state.value)
    this.setState({ value: '' });
  }

  render = () => (
    <div>
      <form className='wordBuilder' onSubmit={this.handleSubmit}>
        <input 
          value={this.state.value}
          onChange={this.handleChange}
          className='wordInput'
          placeholder='Type word here...'
        />
      </form>
    </div>
  )
};

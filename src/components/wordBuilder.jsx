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
    this.props.isValidWord(this.state.value)
    this.setState({ value: '' });
  }

  render = () => {
    return(
    <div>
      <form className='wordBuilder' onSubmit={this.handleSubmit}>
        <input 
          value={this.state.value}
          onChange={this.handleChange}
          className='wordInput'
          placeholder='Type word here...'
        />
        {/* <input 
          type='submit'
          value='Check Word'
        /> */}
      </form>
    </div>
    )
  };
};

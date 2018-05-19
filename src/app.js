import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LetterGenerator from './components/letterGenerator.jsx';
import Authentication from './components/authentication.jsx';
import fire from './config/fire';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      user: null,
    }
  }

  // componentDidMount(){
  //   authListener();
  // }

  // authListener(){
  //   fire.auth().onAuthStateChanged((user) => {
  //     if (user){
  //       this.setState({ user });
  //     } else {
  //       this.setState({ user: null });
  //     }
  //   })
  // }

  render(){
    return(
      <div>
        { this.state.user ? <LetterGenerator /> : <Authentication /> }
        {/* <Authentication /> */}
        {/* <LetterGenerator /> */}
        {/* <BrowserRouter>
          <Switch>
            <Route path='/' component={ MainPage } exact={ true } ></Route>
            <Route path='/two' component={ PageTwo }></Route>
            <Route component={ NotFoundPage }></Route>
          </Switch>
        </BrowserRouter> */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

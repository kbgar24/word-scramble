import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LetterGenerator from './components/letterGenerator.jsx';
import Authentication from './components/authentication.jsx';
import fire from './config/fire';
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAKUjZ8dATJT0QNZqKWhVqTG9-bLT1JXa4",
  authDomain: "word-scramble-bb2ad.firebaseapp.com",
  databaseURL: "https://word-scramble-bb2ad.firebaseio.com",
  projectId: "word-scramble-bb2ad",
  storageBucket: "word-scramble-bb2ad.appspot.com",
  messagingSenderId: "434068260131"
};

class App extends Component {
  
  constructor(){
    super();

    this.database = fire.database().ref().child('users');
    this.state = {
      currentUsers: [],
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

  componentDidMount(){
    this.database.on('value', rawData => {
      console.log('data: ', rawData.val())
      const data = rawData.val();
      const currentUsers = Object.keys(data)
        .filter(id => data[id].isLoggedIn)
        .map( id => ({
            id,
            name: data[id].name,
        }))
      this.setState({ currentUsers })
    })
  }

  render(){
    return(
      <div>
        {/* <h3> Logged in User: { this.state.name } </h3> */}
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
        <h2>Logged in Users</h2>
        { console.log('this.state.currentUsers: ', this.state.currentUsers) }
        <ul>
          {
            this.state.currentUsers.map(({name, id}) => <li key={id}>{name}</li>)
          }
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

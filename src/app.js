import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import AuthenticationGateway from './containers/AuthenticationGateway';
import Lobby from './containers/lobbyContainer';
import Login from './containers/login';
import store from './store';

const NotFoundPage = () => <div> 404! - NOT FOUND </div>

class App extends Component {

  componentDidCatch(error, info){
    console.error(error, info)
  }

  render = () => (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={ Login }></Route>
        <AuthenticationGateway>
          <Route path='/' component={ Lobby } ></Route>
        </AuthenticationGateway>
        <Route component={ NotFoundPage }></Route>
      </Switch>
    </BrowserRouter> 
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />  
  </Provider>,
  document.getElementById('app'));

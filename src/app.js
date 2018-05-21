import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// import LetterGenerator from './components/letterGenerator.jsx';
// import Authentication from './components/authentication.jsx';
// import Authentication from './containers/authenticationContainer';
// import GameRoom from './containers/gameRoomContainer';
// import fire from './config/fire';
// import firebase from 'firebase'
import { Provider, connect } from 'react-redux';
import store from './store';
import { fetchData } from './actions/fetchActions';
import { createNewRoom } from './actions/roomActions';
import { joinUserRoom } from './actions/userActions';
import LoadingComponent from './components/loadingComponent.jsx';

import Lobby from './containers/lobbyContainer';

const NotFoundPage = () => <div> 404! - NOT FOUND </div>

class App extends Component {
  
  constructor(){
    super();
  }

  render(){
    return(
    <BrowserRouter>
      <LoadingComponent>
         <Switch>
          {/* <Route path='/login' component={Lobby}></Route>
          <AuthenticatedComponent>
            <Route path='/' component={ Lobby } exact={ true } ></Route>
            <Route path='/gameroom' component={GameRoom} ></Route>
            <Route path='/gameroom/:id' component={ GameRoom } ></Route>
          </AuthenticatedComponent> */}
          <Route component={ NotFoundPage }></Route>
        </Switch>
      </LoadingComponent>
    </BrowserRouter> 
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />  
  </Provider>,
  document.getElementById('app'));

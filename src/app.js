import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';
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
import { joinUserRoom, logout } from './actions/userActions';
import LoadingComponent from './components/loadingComponent.jsx';
import Login from './components/login.jsx';
// import Lobby from './containers/lobbyContainer';
// console.log('lobby: ', Lobby);
console.log('login: ', Login);
import AuthenticationGateway from './containers/AuthenticationGateway';

const NotFoundPage = () => <div> 404! - NOT FOUND </div>
const RandomPage = (props) => (
  <div>
    <h1>Main Page</h1>
    You are logged in!
    <button 
      onClick={() => {
        console.log('rops: ', props)
        console.log('logout');
        props.logout();
      }}
    >
      Sign Out
    </button>
  </div>)

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const Random = withRouter(connect(null, mapDispatchToProps)(RandomPage));

class App extends Component {
  
  constructor(){
    super();
  }

  render(){
    return(
    <BrowserRouter>
      {/* <LoadingComponent> */}
         <Switch>
          <Route path='/' component={ Random } exact={ true } ></Route>
          <Route path='/login' component={ Login }></Route>
          {/* <AuthenticationGateway> */}
            {/* <Route path='/gameroom' component={GameRoom} ></Route> */}
            {/* <Route path='/gameroom/:id' component={ GameRoom } ></Route> */}
          {/* </AuthenticationGateway> */}
          <Route component={ NotFoundPage }></Route>
        </Switch>
      {/* </LoadingComponent> */}
    </BrowserRouter> 
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />  
  </Provider>,
  document.getElementById('app'));

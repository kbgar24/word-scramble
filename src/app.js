import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';
// import LetterGenerator from './components/letterGenerator.jsx';
// import Authentication from './components/authentication.jsx';
// import Authentication from './containers/authenticationContainer';
import GameRoom from './containers/gameRoomContainer';
// import fire from './config/fire';
// import firebase from 'firebase'
import { Provider, connect } from 'react-redux';
import store from './store';
import { fetchData } from './actions/fetchActions';
import { createNewRoom } from './actions/roomActions';
import { joinUserRoom, logout } from './actions/userActions';
import LoadingComponent from './components/loadingComponent.jsx';
import Login from './components/login.jsx';
import { signOut } from './actions/authActions';
import Lobby from './containers/lobbyContainer';
// console.log('lobby: ', Lobby);
console.log('login: ', Login);
import AuthenticationGateway from './containers/AuthenticationGateway';


const NotFoundPage = () => <div> 404! - NOT FOUND </div>
class RandomPage extends React.Component { 
  constructor(props){
    super(props)
  }
  unregisterAuthObserver = () => {}

  render = () => (
  <div>
    <h1>Main Page</h1>
    You are logged in!
    {/* <button 
      onClick={() => {
        console.log('this: ', this);
        console.log('rops: ', this.props)
        console.log('logout');
        this.props.signOut();
        console.log(this.props)
        this.props.history.push('/login');
      }}
    >
      Sign Out */}
    {/* </button> */}
  </div>)
}
const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

const Random = withRouter(connect(mapStateToProps, mapDispatchToProps)(RandomPage));

class App extends Component {
  
  constructor(){
    super();
  }

  render(){
    return(
    <BrowserRouter>
      {/* <LoadingComponent> */}
         <Switch>
          <Route path='/login' component={ Login }></Route>
          <AuthenticationGateway>
            {/* <LoadingComponent> */}
              <Route path='/' component={ Lobby } ></Route>
              {/* <Route path='/chicken' render={ () => <div>Fried chicken!!</div> } exact={true} ></Route> */}
            {/* </LoadingComponent>/> */}
          </AuthenticationGateway>
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

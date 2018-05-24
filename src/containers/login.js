import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


import { uiConfig } from '../config';
import { updateCurrentUser, setCurrentUser } from '../actions/userActions.js';
import { fetchAllData } from '../actions/fetchActions.js';
import { auth, database, authPure, firebase } from '../firebase';

class Login extends Component {
  
  state = {}

  componentDidMount() {

    /*  Load all app data from db */
    this.props.fetchAllData()
    // .then(() => { console.log('Hahhahahaha') } );

    this.unregisterAuthObserver = auth.onAuthStateChanged(
      (user) => {
        let userId;
        if (user) {
          const currentUser = {
            name: user.displayName,
            isLoggedIn: true,
            currentRoom: 'Lobby',
            id: user.uid,
          }
          this.props.setCurrentUser(user.uid, currentUser);
          this.props.fetchAllData();
          userId = user.uid
        } else {
          userId = '';
        }
        /*  Login user */
        this.props.updateCurrentUser(userId);
        this.props.fetchAllData();
      }
    )

    /*  Persist Authentication to Local Storage */
    auth.setPersistence(authPure.Auth.Persistence.LOCAL)
      .then(function () {
        return auth.signInWithRedirect;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

  }

  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  static getDerivedStateFromProps = ({ user = {}, history }) => {
    console.log('user, history: ', user, history);
    
    const desiredPath = history.location.state ? history.location.state.referrer : '/'
    
    /*  If the user is logged in, redirect to desired endpoint */
    if (user.currentUser) {
      alert('yes!');
      alert(desiredPath);
      history.push(desiredPath);
    }
    return null;
  }
 
  render = () => (
    <div>
        <h3>Please sign-in:</h3>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: userId => dispatch(updateCurrentUser(userId)),
  fetchAllData: () => dispatch(fetchAllData()),
  setCurrentUser: (userId, userInfo) => dispatch(setCurrentUser(userId, userInfo)),
})

/*  Use withRouter to keep Redux apprised page redirects */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
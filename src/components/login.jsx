import React, { Component } from 'react';
// import SimpleBox from '../Components/SimpleBox';
// import InputField from '../Components/InputField';
// import FooterFormButton from '../Components/FooterFormButton';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { login, getUser, googleLogin } from '../actions/userActions';
import { connect } from 'react-redux';
import { uiConfig } from '../config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { updateCurrentUser } from '../actions/userActions.js';
import { fetchAllData } from '../actions/fetchActions.js';
import { auth, database } from '../firebase';

// import ErrorAlert from '../Components/ErrorAlert';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  unregisterAuthObserver = () => { }

  componentDidMount() {
    this.props.fetchAllData();
    // this.props.authenticate()
    // window.firebase = firebase;
    // const me = auth.currentUser;
    // this.setState({ loggedIn: !!me });
    // console.log('me: ', me);
    // console.log('firebaseAuth: ', auth)
    // if (!me) {
    this.unregisterAuthObserver = auth.onAuthStateChanged(
        (user) => {
          console.log('user: ', user);
          let userId;
          if (user) {
            const currentUser = {
              name: user.displayName,
              isLoggedIn: true,
              currentRoom: 'Lobby',
              id: user.uid,
            }
            database.ref('users/' + user.uid).set(currentUser)
            fetchAllData();
            userId = user.uid
          } else {
            userId = '';
          }
          this.props.updateCurrentUser(userId);
          this.props.fetchAllData();
        }
      )
    // }
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        console.log('local set!');
        return auth.signInWithRedirect;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

  }

  componentWillUnmount() {
    this.unregisterAuthObserver()
    // console.log('a; ', a);
    // console.log('unregister: ', this.unregisterAuthObserver);
    // this.unregisterAuthObserver && this.unregisterAuthObserver();
    
  }
  // componentWillMount() {
  //   if (this.props.user !== null) {
  //     this.props.history.push('/');
  //   }
  // }
  // componentWillMount(){
  //   const{ user, history } = this.props;
  //   console.log('userLogin: ', user);
  //   if (Object.keys(user).length) {
  //     this.props.history.push('/');
  //   }
  // }


  static getDerivedStateFromProps = nextProps => {
    const { user, history } = nextProps;
    // console.log('%%%%%%%%%')
    // console.log('history: ', history.location.state);
    // history.location.pathname);
    // console.log('%%%%%%%%%')
    const desiredPath = history.location.state ? history.location.state.referrer : '/'
    if (user.currentUser) {
      history.push(desiredPath);
    }
    // nextProps.user !== null && nextProps.history.push('/');
    return null;
  }
 


  // renderBody() {
  //   const errStyle = {
  //     borderColor: 'red'
  //   };

  //   return (
  //     <form onSubmit={event => { this.submitLogin(event); }}>
  //       <div>
  //         <InputField id="email" type="text" label="Email"
  //           inputAction={(event) => this.setState({ email: event.target.value })}
  //           style={this.state.error ? errStyle : null}
  //         />
  //         <InputField id="password" type="password" label="Password"
  //           inputAction={(event) => this.setState({ password: event.target.value })}
  //           style={this.state.error ? errStyle : null}
  //         />
  //         {this.state.error && <ErrorAlert>Your username/password is incorrect</ErrorAlert>}
  //         <FooterFormButton submitLabel="Sign in" otherLabel="Create Account"
  //           goToLink="/CreateAccount" {...this.props}
  //         />
  //         <SocialMediaLogin {...this.props} />
  //       </div>
  //     </form>
  //   );
  // }

  render() {
    return (
      <div>
          <h3>Please sign-in:</h3>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: (userId) => dispatch(updateCurrentUser(userId)),
  fetchAllData: () => dispatch(fetchAllData()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
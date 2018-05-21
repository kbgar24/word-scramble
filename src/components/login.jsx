import React, { Component } from 'react';
// import SimpleBox from '../Components/SimpleBox';
// import InputField from '../Components/InputField';
// import FooterFormButton from '../Components/FooterFormButton';
// import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { login, getUser, googleLogin } from '../actions/userActions';
import { connect } from 'react-redux';
import { uiConfig } from '../config';
import { auth } from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


// import ErrorAlert from '../Components/ErrorAlert';

export default class Login extends Component {
  constructor(props) {
    super(props);
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


  // static getDerivedStateFromProps = nextProps => {
  //   const { user, history } = nextProps;
  //   if (Object.keys(user).length) {
  //     this.props.history.push('/');
  //   }
  //   // nextProps.user !== null && nextProps.history.push('/');
  //   return null;
  // }
 


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

// export default withRouter(connect(mapStateToProps)(Login));
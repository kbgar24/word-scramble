import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class AuthenticationGateway extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      redirectToLogin: false,
      referrer: '/',
    }
  }

  static getDerivedStateFromProps = ({ user, history }) => {

    const prevPath = history.location.pathname

    /*  If user is not logged in, redirect to /login and store desired path */
    if (!Object.keys(user).length) {
      history.push('/login');
      return { redirectToLogin: true, referrer: prevPath }

    /*  Otherwise, redirect to desired path */
    } else {
      return { redirectToLogin: false, referrer: '/'  }
    }
  }

  render = () =>  (
    this.state.redirectToLogin
    ? (
        <Redirect 
          to={{
            pathname: '/login',
            state: { referrer: this.state.referrer }
          }}
        /> 
      )
    : this.props.children
  )
}

const mapStateToProps = state => ({ user: state.user });

export default withRouter(connect(mapStateToProps)(AuthenticationGateway));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { getUser } from '../actions/userActions';
import { fetchAllData } from '../actions/fetchActions';
import firebase from 'firebase';

class AuthenticationGateway extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      redirectToLogin: false,
      referrer: '/',
    }
  }

  compontWillMount(){

  }

  static getDerivedStateFromProps = ({ user, history, getUser, fetchAllData}) => {
    // fetchAllData();

    // user tried to access '/' w/out being logged in

    // user tried to access '/gameroom w/out being logged in



    const prevPath = history.location.pathname
    // console.log('prevPath: ', prevPath);
    console.log('user: ', user);
    if (!Object.keys(user).length) {
      history.push('/login');
      return { redirectToLogin: true, referrer: prevPath }
    } else {
      // console.log('1 is the ')
      // getUser();
      // fetchAllData();
      // console.log('loneliest number');
      return { redirectToLogin: false, referrer: '/'  }
    }
    // } else {
    //   history.push(prevPath);
    // }

    // return prevPath !== '/login' { prevPath } : null,
    
  }
  // componentDidUpdate() {
  //   const { userLoading, user } = this.props;
  //   console.log(Object.keys(user).length);
  //   if (!Object.keys(user).length) {
  //     this.props.history.push('/login');
  //   }
  // }

  render() {
    const { user, children, userLoading } = this.props;
    // console.log('user!!!!!: ', user);
    
    return this.state.redirectToLogin
    ? (
      <Redirect 
        to={{
          pathname: '/login',
          state: { referrer: this.state.referrer }
        }}
      /> 
      )
    : children
    // return ( user) ? children : <div>lol</div>
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userLoading: state.loading.user,
})

const mapDispatchToProps = dispatch => ({
  fetchAllData: () => dispatch(fetchAllData()),
  getUser: () => dispatch(getUser()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticationGateway));
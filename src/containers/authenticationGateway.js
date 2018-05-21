import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/userActions';
import { fetchAllData } from '../actions/fetchActions';
import firebase from 'firebase';
window.firebase = firebase;

class AuthenticationGateway extends Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  compontWillMount(){

  }

  static getDerivedStateFromProps = ({user, history, getUser, getAllData}) => {
    
    const prevPath = history.location.pathname
    console.log('prevPath: ', prevPath);
    console.log('user: ', user);
    if (!Object.keys(user).length) {
      history.push('/login');
    } else {
      getUser();
      fetchAllData();
    }
    // } else {
    //   history.push(prevPath);
    // }

    // return prevPath !== '/login' { prevPath } : null,
    return null;
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
    console.log('user!!!!!: ', user);
    
    // return ( user) ? children : <div>lol</div>
    return children;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userLoading: state.loading.user,
})

const mapDispatchToProps = dispatch => ({
  getAllData: () => dispatch(getAllData),
  getUser: () => dispatch(getUser),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticationGateway));
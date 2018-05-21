import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AuthenticationGateway extends Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  static getDerivedStateFromProps = ({user, history}) => {
    console.log(Object.keys(user).length);
    if (!Object.keys(user).length) {
      history.push('/login');
    }
    return null;
  }
  componentDidUpdate() {
    const { userLoading, user } = this.props;
    console.log(Object.keys(user).length);
    if (!Object.keys(user).length) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { user, children, userLoading } = this.props;
    console.log('user!!!!!: ', user);
    
    // return ( user) ? children : <div>lol</div>
    return children;
  }
}

function mapStateToProps(state) {
  return { user: state.user, userLoading: state.loading.user };
}

export default withRouter(connect(mapStateToProps)(AuthenticationGateway));
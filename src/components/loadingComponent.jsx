import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/userActions';
import { fetchAllData } from '../actions/fetchActions';

class LoadingComponent extends Component {
  componentWillMount() {
    console.log('888888888')
    console.log('First mounted!!')
    console.log('888888888')
    console.log('FM Props: ', this.props);
    const { dataLoading } = this.props;
    // if (userLoading === undefined) {
    //   this.props.getUser();
    // }

    if (dataLoading === undefined) {
      this.props.fetchAllData();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps CWRNP', nextProps)
    if (nextProps.dataLoading === -1 ) {
      this.props.fetchAllData();
    }
  }

  render() {
    const { dataLoading, children } = this.props;
    if (!dataLoading) {
      return (
        <div>
          {children}
        </div>
      )
    }
    else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

function mapStateToProps(state) {
  console.log('state: from Loading ', state);
  return {
    // userLoading: state.loading.user,
    dataLoading: state.loading.data,
    // user: state.user,
  };
}

const mapDispatchToProps = dispatch => ({
  // getUser: () => dispatch(getUser()),
  fetchAllData: () => dispatch(fetchAllData())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadingComponent))
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/userActions';
import { getAllData } from '../actions/fetchActions';

class LoadingComponent extends Component {
  componentWillMount() {
    console.log('this.props: ', this.props);
    const { userLoading, dataLoading } = this.props;
    if (userLoading === undefined) {
      this.props.getUser();
    }

    if (dataLoading === undefined) {
      this.props.getAllData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataLoading === -1 && nextProps.user !== null) {
      this.props.getAllData();
    }
  }

  render() {
    const { userLoading, dataLoading, children } = this.props;
    if ((!userLoading && !dataLoading) || (this.props.user === null)) {
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
  console.log('state: ', state);
  return {
    userLoading: state.loading.user,
    dataLoading: state.loading.data,
    user: state.user,
  };
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  getAllData: () => dispatch(getAllData())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadingComponent))
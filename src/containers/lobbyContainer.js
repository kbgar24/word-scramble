import { connect } from 'react-redux';
import Main from '../components/main';
import { fetchData } from '../actions/fetchActions';
import { createNewRoom } from '../actions/roomActions';
import { joinUserRoom } from '../actions/userActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
  createNewRoom,
  joinUserRoom: roomName => dispatch(joinUserRoom(roomName)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

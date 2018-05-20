import { connect } from 'react-redux';
import App from '../app';
import fetchData from '../actions/fetchActions';
import { updateUserRoom } from '../actions/userActions';


const mapStateToProps = state => { state }

const mapDispatchToProps = dispatch => ({
  updateUserRoom: (userId, roomName) => dispatch(updateUserRoom(userId, roomName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

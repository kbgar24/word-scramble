import { connect } from 'react-redux';
import GameRoom from '../components/gameRoom.jsx';
import fetchData from '../actions/fetchActions';
import { updateUserRoom } from '../actions/userActions';
import { withRouter } from 'react-router-dom';


const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  updateUserRoom: (userId, roomName) => dispatch(updateUserRoom(userId, roomName)),
})

export default withRouter(connect(mapStateToProps)(GameRoom));

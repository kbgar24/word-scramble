import { connect } from 'react-redux';
import GameRoom from '../components/gameRoom.jsx';
// import fetchData from '../actions/fetchActions';
// import { updateUserRoom } from '../actions/userActions';w


const mapStateToProps = state => ({ state })

// const mapDispatchToProps = dispatch => ({
//   updateUserRoom: (userId, roomName) => dispatch(updateUserRoom(userId, roomName)),
// })

export default connect(mapStateToProps)(GameRoom);

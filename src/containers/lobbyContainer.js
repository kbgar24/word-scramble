import { connect } from 'react-redux';
// import Lobby from '../components/lobby.jsx';
import { fetchData } from '../actions/fetchActions';
import { createNewRoom } from '../actions/roomActions';
import { joinUserRoom } from '../actions/userActions';

const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
  createNewRoom,
  joinUserRoom: roomName => dispatch(joinUserRoom(roomName)),

});

// export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

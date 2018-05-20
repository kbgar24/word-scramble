import { connect } from 'react-redux';
import { updateCurrentUser } from '../actions/userActions';
import { authenticate } from '../actions/authActions';

import Authentication from '../components/authentication.jsx';


const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser })

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
  authenticate: () => dispatch(authenticate),
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

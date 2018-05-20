import { connect } from 'react-redux';
import App from '../app';
import fetchData from '../actions/fetchActions';


const mapStateToProps = state => { state }

export default connect(mapStateToProps)(App);

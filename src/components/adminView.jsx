import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { database } from '../firebase.js';

const inputStyle = {
  width: '450px',
  textAlign: 'center',
}

class AdminView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      copied: false,
      showCopy: false
    }
  }

  static getDerivedStateFromProps = (nextProps) => {
    const outsiders = nextProps.state.data.users.filter(({ currentRoom }) => currentRoom !== nextProps.currentRoom );
    return { outsiders };
  }

  handleGetLink = () => {
    const roomId = this.props.state.data.rooms.find(({ name }) => name === this.props.currentRoom).id
    const url = `http://localhost:8080/gameroom/${roomId}`;
    this.setState({ value: url, showCopy: true })
    setTimeout(() => { this.setState({ copied: false }) }, 6000);
    // alert(`The invitation link is: http://localhost:8080/gameroom/${roomId}`)
  }

  handleSendInvite = recipientId => e => {
    const roomId = this.props.state.data.rooms.find(({ name }) => name === this.props.currentRoom).id
    console.log('this.props:  ', this.props);
    database
      .ref(`users/${recipientId}/invites`)
      .push({ 
        roomId , 
        senderName: this.props.state.data.users.find(({ id }) => id === this.props.state.user.currentUser).name,
        roomName: this.props.currentRoom,
      })
  }


  render = () => {
      return (
        <div>
          <h2>Admin View</h2>
          <button onClick={this.handleGetLink}>Generate Invitation Link</button>
          { this.state.showCopy && (
          <div>
            <input 
              style={inputStyle}
              value={this.state.value}
              onChange={({ target: { value } }) => this.setState({ value, copied: false })} />

            {/* <CopyToClipboard text={this.state.value}
              onCopy={() => this.setState({ copied: true })}>
              <span>Copy to clipboard with span</span>
            </CopyToClipboard> */}

            <CopyToClipboard text={this.state.value}
              onCopy={() => this.setState({ copied: true })}>
              <button>Copy to clipboard</button>
            </CopyToClipboard>

            {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
          </div>
          )}
          <h4>Outside Users</h4>
          <ul>
            { this.state.outsiders.map(({name, currentRoom, id}) => (
              <li key={id}> {name} - {currentRoom} <button onClick={this.handleSendInvite(id)}>Send Invite</button></li>
            )) }
          </ul>

        </div>
    );
  }
};

const mapStateToProps = state => ({ state })

export default connect(mapStateToProps)(AdminView);
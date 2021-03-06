import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { sendInvite } from '../actions/userActions';
import { Table,  Button } from 'semantic-ui-react';

class AdminView extends Component {

  state = {
    value: '',
    copied: false,
    showCopy: false
  }

  static getDerivedStateFromProps = (nextProps) => {
    const outsiders = nextProps.state.data.users.filter(({ currentRoom }) => currentRoom !== nextProps.currentRoom );
    return { outsiders };
  }

  handleGetLink = () => {
    const roomId = this.props.state.data.rooms.find(({ name }) => name === this.props.currentRoom).id
    const url = `http://localhost:8080/gameroom/${roomId}`;
    this.setState({ value: url, showCopy: true })
    setTimeout(() => { this.setState({ copied: false }) }, 4000);
  }

  handleSendInvite = recipientId => e => {
    const hideId = `hide-${recipientId}`;
    this.setState({ [hideId]: true })
    const roomId = this.props.state.data.rooms.find(({ name }) => name === this.props.currentRoom).id;
    const inviteInfo = {
      roomId, 
      senderName: this.props.state.data.users.find(({ id }) => id === this.props.state.user.currentUser).name,
      roomName: this.props.currentRoom,
    };

    this.props.sendInvite(recipientId, inviteInfo)
  }

  render = () => {
      return (
        <div className='admin-view'>
        
          <h2>Admin Portal</h2>
          <div className='admin-sep'></div>
          
          <Table celled inverted selectable>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Player Name</Table.HeaderCell>
                <Table.HeaderCell>Invitation</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.state.outsiders.map(({ name, id }) => (
                  <Table.Row key={id}>
                  <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>
                      <Button
                        disabled={ this.state[`hide-${id}`] } 
                        color='facebook' 
                        onClick={this.handleSendInvite(id)}
                      >
                        { !this.state[`hide-${id}`] ? 'Send Invite' : 'Invite Sent!' }
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>

          <CopyToClipboard text={this.state.value}
            onCopy={() => this.setState({ copied: true })}>
            <Button color='facebook'  onClick={this.handleGetLink}>Generate Invitation Link</Button>
          </CopyToClipboard >
          
          <div className='copy-text'> 
            {
              this.state.showCopy
              && this.state.copied 
              && 'Link Copied to Clipboard!'
            }
          </div>
          
          <Button color='youtube' onClick={this.props.generateNewLetters}>Begin New Game!</Button>

      </div>
    );
  }
};

const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  sendInvite: (recipientId, inviteInfo) => dispatch(sendInvite(recipientId, inviteInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { database } from '../firebase.js';
import { Table, Segment, Menu, Icon, Sidebar, Button, Image, Header, Grid } from 'semantic-ui-react';

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
                  <Table.Row>
                  <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>
                      <Button positive onClick={this.handleSendInvite(id)}>
                        Send Invite
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>

          <CopyToClipboard text={this.state.value}
            onCopy={() => this.setState({ copied: true })}>
            <Button positive onClick={this.handleGetLink}>Generate Invitation Link</Button>
          </CopyToClipboard >
          <div className='copy-text'> 
            {
              this.state.showCopy
              && this.state.copied 
              && 'Link Copied to Clipboard!'
            }
          </div>
          <Button primary onClick={() => { }}>Begin New Game!</Button>

          <div className='admin-sep'></div>

        </div>
    );
  }
};

const mapStateToProps = state => ({ state })

export default connect(mapStateToProps)(AdminView);
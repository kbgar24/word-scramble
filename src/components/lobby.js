import React, { Component } from 'react';
import { Table, Segment, Menu, Icon, Sidebar, Button, Image, Header } from 'semantic-ui-react';
import { onlyLetters } from '../helpers';


export default class Lobby extends Component {
  render = () => (
    <div>

      <div>
        <form onSubmit={this.props.handleCreateNewRoom}>

          <input
            ref={(input) => { this.nameInput = input; }}
            maxLength='10'
            className='newRoomInput'
            placeholder='Enter Room Name' 
            type='text' 
            value={this.props.newRoom} 
            onChange={this.props.newRoomChange} 
          />

          <Button positive className='new-game-btn' >Create New Game</Button>

        </form>
      </div>

      <div className='invites-list'>

        <h1>Current Game Invites</h1>

        <Table celled inverted selectable>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sender</Table.HeaderCell>
              <Table.HeaderCell>Room Name</Table.HeaderCell>
              <Table.HeaderCell>Join</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.invites.map(({ senderName, roomName, roomId }) => (
              <Table.Row key={roomId}>
                <Table.Cell>{senderName}</Table.Cell>
                <Table.Cell>{roomName}</Table.Cell>
                <Table.Cell>
                  <div className='invite-btn-div'>
                    <Button size='huge' positive onClick={this.props.handleJoinRoom(roomName, senderName)}>Accept</Button>
                    <Button size='huge' negative onClick={this.props.handleInviteDecline(senderName)}>Decline</Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className='logged-in-users-list'>

        <h1>Online Users </h1>

        <Table celled inverted selectable>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Player Name</Table.HeaderCell>
              <Table.HeaderCell>Current Room</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.users.map(({ name, id, currentRoom }) => (
              <Table.Row key={id}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{currentRoom}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>


      <div className='games-in-progress'>

        <h1>Games in Progress</h1>

        <Table celled inverted selectable>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Room Name</Table.HeaderCell>
              <Table.HeaderCell>Admin</Table.HeaderCell>
              <Table.HeaderCell>Number of Players</Table.HeaderCell>
              <Table.HeaderCell>Join</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              Object.keys(this.props.occupiedRoomData).map((roomName, i) => {
                const { admin, count } = this.props.occupiedRoomData[roomName];
                return (
                  <Table.Row key={i}>
                    <Table.Cell>{roomName}</Table.Cell>
                    <Table.Cell>{admin}</Table.Cell>
                    <Table.Cell >{count}</Table.Cell>
                    <Table.Cell ><Button size='huge' positive onClick={this.props.handleJoinRoom(roomName)}>Join</Button></Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
import React from 'react'
import { Table } from 'semantic-ui-react'

const Scorebaord = ({scoreBoard, myCurrentRoom, users}) => (
  <div className='scoreboard-div'>
    <h2>Scoreboard</h2>
    <div className='admin-sep'></div>
    <Table celled inverted selectable>

      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Player Name</Table.HeaderCell>
          <Table.HeaderCell>Total Score</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          scoreBoard
            ? scoreBoard.map(({ name, totalScore }, i) => (
              <Table.Row key={i}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{totalScore}</Table.Cell>
              </Table.Row>
            ))

            : users
              .filter(({ currentRoom }) => currentRoom === myCurrentRoom)
              .map(({ name, id }) => (
                <Table.Row key={id}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{0}</Table.Cell>
                </Table.Row>
              ))
        }
      </Table.Body>
    </Table>
  </div>
)

export default Scorebaord;
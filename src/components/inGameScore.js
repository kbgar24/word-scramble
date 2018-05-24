import React from 'react'
import { Table } from 'semantic-ui-react'

const InGameScore = ({ wordStatus, lastWordScore }) => (
  <div className='in-game-score'>

    <Table inverted>

      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Game Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            {
              wordStatus === 'isValid' && (
                <div style={{ color: 'gold' }}>
                  <h1>Valid Word!</h1>
                  <h1>{`+${lastWordScore} points!`}</h1>
                </div>
              )
            }

            {wordStatus === 'alreadyPlayed' && <h1 style={{ color: 'red' }}>Already Played!</h1>}
            {wordStatus === 'notValid' && <h1 style={{ color: 'red' }}>Invalid Word!</h1>}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)

export default InGameScore;
import React from 'react'
import { Table } from 'semantic-ui-react'

const RecentWords = ({ alreadyPlayedWords }) => (
  <div className='recent-words'>

    <Table inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Recent Words</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          Array(6).fill('').concat(alreadyPlayedWords).reverse().slice(0, 6).map((word, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                {word}
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  </div>
)

export default RecentWords;
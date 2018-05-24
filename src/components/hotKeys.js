import React from 'react'
import { Table } from 'semantic-ui-react'

const HotKeys = () => (
  <div className='hotKey'>
    <h2>Game Play</h2>
    <div className='admin-sep'></div>
    <Table celled inverted selectable>
      
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Hotkey</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      
      <Table.Body>
        
        <Table.Row>
          <Table.Cell>Shuffle Letters</Table.Cell>
          <Table.Cell> Option + F </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Seperate Vowels</Table.Cell>
          <Table.Cell>Option + J </Table.Cell>
        </Table.Row>

      </Table.Body>
    </Table>
  </div>
)

export default HotKeys;
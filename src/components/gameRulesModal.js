import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

const GameRulesModal = () => (
  <Modal style={{ textAlign: 'center' }} trigger={<Button className='facebook modal-btn'>Game Rules</Button>}>
    <Modal.Header>Game Rules</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>When the admin starts gameplay, a random list of 9 letters will be generated for all users. </p>
        <p>You will then have 60 seconds to enter as many unique words as possible.</p>
        <p>Words do not have to be 'real' dictionary words. </p>
        <p>Word are scored 2 points per character. </p>
        <p>Have fun!</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default GameRulesModal;
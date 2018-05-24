import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Segment, Menu, Icon, Sidebar, Button, Image, Header, Grid } from 'semantic-ui-react';

import LetterGenerator from '../components/letterGenerator';
import CountdownWrapper from '../components/countdownWrapper';
import AdminView from './adminView';
import GameRulesModal from '../components/gameRulesModal';
import Scoreboard from '../components/Scoreboard';
import Hotkeys from '../components/hotkeys';
import InGameScore from '../components/inGameScore';
import RecentWords from '../components/recentWords';

import fetchData from '../actions/fetchActions';
import { updateUserRoom, updateUserInfo } from '../actions/userActions';
import { updateRoomInfo, updateAlreadyPlayed } from '../actions/roomActions';
import { isRealWord, scoreMap, mapObjToArray, generateLetterList, isWordInLetters } from '../helpers';

class GameRoom extends Component {

  state = {
    hasStarted: false,
    lastWordScore: 0,
    totalScore: 0,
    showScoreboard: false,
    timerColor: 'white',
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    
    const { currentUser: { currentRoom, lastWordScore = 0, totalScore = 0 } } = nextProps

    const { 
      hasStarted,
      startTime,
      showScoreboard,
      scoreBoard,
      alreadyPlayed,
      currentLetters,
    } = nextProps.state.data.rooms.find(({ name }) => name === currentRoom)

    const alreadyPlayedWords = alreadyPlayed
      ? Object.keys(alreadyPlayed).map(key => alreadyPlayed[key])
      : []

    return  { 
      ...prevState,
      currentRoom,
      hasStarted,
      scoreBoard,
      startTime,
      showScoreboard,
      lastWordScore,
      totalScore,
      alreadyPlayedWords,
      currentLetters,
    }
  }


  generateNewLetters = () => {
    
    const currentLetters = generateLetterList().join('');

    const roomName = this.props.currentUser.currentRoom;
    const roomInfo = { showScoreboard: false, currentLetters, hasStarted: true, startTime: Date.now() }

    this.props.updateRoomInfo(roomName, roomInfo);
    
    this.props.state.data.users.forEach(({currentRoom, id}) => {
      if (currentRoom === this.state.currentRoom){
        updateUserInfo(id, { totalScore: 0, lastWordScore: 0 })
      }
    })
      setTimeout(() => {
        this.setState({ timerColor: 'red' })
      }, 45000);

      setTimeout(() => {
        this.props.updateRoomInfo(roomName, { hasStarted: false, startTime: false, showScoreboard: true })
        this.setState({ timerColor: 'white' })
    }, 60100)
    
    this.handleGameOver();
  }


  isValidWord = word => {
    const { currentLetters, alreadyPlayedWords } = this.state;
    const isPlayedAlready = alreadyPlayedWords.includes(word);
    const isValid = isWordInLetters(word, currentLetters.split(''));
    
    isValid && !isPlayedAlready && this.handleValidWord(word);
 
    const wordStatus = isPlayedAlready
      ? 'alreadyPlayed'
      : isValid
        ? 'isValid'
        : 'notValid'

    this.setState({ wordStatus })
  }
  
  handleValidWord = word => {

    const { totalScore, lastWordScore } = this.scoreWord(word);
    const roomName = this.props.currentUser.currentRoom;
    const userId = this.props.currentUser.id;
    this.props.updateAlreadyPlayed(roomName, word)
    this.props.updateUserInfo(userId, { totalScore, lastWordScore })
    this.updateScoreboard();
  }

  handleGameOver = () => {
    const { totalScore } = this.state;
    setTimeout(() => {
      this.getUserScores()
    }, 60100)
  }

  updateScoreboard = () => {
    
    const scoreBoard = this.props.state.data.users
      .filter(({ currentRoom }) => currentRoom === this.state.currentRoom)
      .map(({ name, totalScore = 0 }) => ({ name, totalScore }))
      .sort((a, b) => (
        a.totalScore < b.totalScore
          ? 1
          : -1
      ))
    
    const roomName = this.props.currentUser.currentRoom;
    
    this.props.updateRoomInfo(roomName, { scoreBoard })
  }
  

  getUserScores = () => {

    const scoreBoard = this.props.state.data.users
      .filter(({ currentRoom }) => currentRoom === this.state.currentRoom)
      .map(({ name, totalScore = 0 }) => ({ name, totalScore }))
      .sort((a,b) => (
        a.totalScore < b.totalScore
        ? 1
        : -1
      ))
    const roomName = this.props.currentUser.currentRoom;
    const roomInfo = { scoreBoard, currentLetters: '', alreadyPlayed: false };

    this.props.updateRoomInfo(roomName, roomInfo)

  }

  scoreWord = word => {
    const { totalScore: oldScore = 0 } = this.state;
    const length = word.length;
    const isReal = isRealWord(word);
    let lastWordScore = 0;

    if (!isReal) {
      lastWordScore = 2;
    } else {
      lastWordScore = scoreMap[length];
    }

    const totalScore = oldScore + lastWordScore;

    this.setState({ totalScore, lastWordScore })

    return { totalScore, lastWordScore };
  }

  render = () => {
    const { 
      totalScore,
      lastWordScore,
      scoreBoard,
      alreadyPlayedWords,
      wordStatus,
      hasStarted,
      startTime,
      timerColor } = this.state;
    const { users } = this.props.state.data;
    const { currentRoom:myCurrentRoom, isAdmin } = this.props.currentUser;
    const currentRoomObj = this.props.state.data.rooms.find(({ name }) => name === myCurrentRoom)
    const { currentLetters } = currentRoomObj;
    
    return (
      <div className='gameRoom'>
      
        <Grid>
          <Grid.Column width={3}>
            
            {
              isAdmin &&
              <AdminView 
                currentRoom={myCurrentRoom}
                generateNewLetters={this.generateNewLetters}
              />
            }
            <Scoreboard scoreBoard={scoreBoard} users={users} myCurrentRoom={myCurrentRoom} />
            
            <GameRulesModal />

          </Grid.Column>
        
          <Grid.Column width={10}>
          
            <CountdownWrapper
              hasStarted={hasStarted}
              startTime={startTime} 
              timerColor={timerColor}
              />

            <LetterGenerator
              admin={isAdmin}
              alreadyPlayed={currentRoomObj.alreadyPlayed}
              currentLetters={currentLetters}
              handleValidWord={this.handleValidWord}
              hasStarted={hasStarted}
              lastWordScore={lastWordScore}
              isValidWord={this.isValidWord}
            />


          </Grid.Column>

          <Grid.Column width={3} >
            
            <Button
              negative
              size='huge'
              name='Lobby'
              onClick={() => { this.props.handleLeaveRoom(isAdmin) }}
            >
              {isAdmin ? 'Close Room' : 'Leave Room'}
            </Button>

            <div className='admin-sep panel'></div>

            <InGameScore wordStatus={wordStatus} lastWordScore={lastWordScore} />
   
            <div className='admin-sep panel'></div>

            <RecentWords alreadyPlayedWords={alreadyPlayedWords} />

          </Grid.Column>
        </Grid>
      </div>
    )
  }
};


const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  updateUserRoom: (userId, roomName) => dispatch(updateUserRoom(userId, roomName)),
  updateRoomInfo: (roomName, info) => dispatch(updateRoomInfo(roomName, info)),
  updateAlreadyPlayed: (roomName, word) => dispatch(updateAlreadyPlayed(roomName, word)),
  updateUserInfo: (userId, userInfo) => dispatch(updateUserInfo(userId, userInfo)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameRoom));

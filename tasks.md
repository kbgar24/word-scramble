Tasks
1. Create Letter List
2. Randomly generate correct letters - 9, at least 2-7 vowels , rest consonants
3. Word array
4. Timer
5. Scoring

Nonreal words
- 2pts for each word

Realwords
- 5pts for each word < 5 characters 
- 9 letter word - 20
- 8 letter word - 17
- 7 letter word - 14
- 6 letter word - 12
- 5 letter word - 10


1. Login
2. Database
_____ CC - Resume && Cover Letter _____
3. See Logged in users
4. Create game room
5. See Users in game room
6. Join game room
7. Send invite to game room

users: {
  {
    name:
    isLoggedIn: 
    currentRoom: 
  }
}


rooms: {
  garage: {
    users: {
      kendrick { score: 0, isAdmin: true },
      kendrickTest { score: 0, isAdmin: false },
    },
    currentLetters: 'abcdefghij'
    playedWords: {
      0: 'tom',
      1: 'bob',
      2: 'jerry',
    }
    hasStarted: false,
    canJoin: true
    isOver: false
  }
}
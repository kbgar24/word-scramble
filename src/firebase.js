import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAKUjZ8dATJT0QNZqKWhVqTG9-bLT1JXa4",
  authDomain: "word-scramble-bb2ad.firebaseapp.com",
  databaseURL: "https://word-scramble-bb2ad.firebaseio.com",
  projectId: "word-scramble-bb2ad",
  storageBucket: "word-scramble-bb2ad.appspot.com",
  messagingSenderId: "434068260131"
};

firebase.initializeApp(config);

export const database = firebase.database();
// export const userDB = firebase.database().ref('users');
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

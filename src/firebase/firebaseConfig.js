import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyDzBkmUt--NyMvYRWGtde4hOmAGXJnWOJo',
  authDomain: 'geekplatform-dc705.firebaseapp.com',
  projectId: 'geekplatform-dc705',
  storageBucket: 'geekplatform-dc705.appspot.com',
  messagingSenderId: '115896621323',
  appId: '1:115896621323:web:0061c5b47f567d4dce2a0e',
  measurementId: 'G-X2Z86JT0CM',
});

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export {
  db, googleAuthProvider, facebookAuthProvider,
  firebase,
};

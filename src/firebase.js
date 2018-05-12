// Import the Firebase modules that you need in your app.
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initalize and export Firebase.
const config = {
  apiKey: "AIzaSyBXPu-wLh_SynlO6kNzadlzTcK30c6JWNE",
  authDomain: "skaneleden-tracker.firebaseapp.com",
  databaseURL: "https://skaneleden-tracker.firebaseio.com",
  projectId: "skaneleden-tracker",
  storageBucket: "skaneleden-tracker.appspot.com",
  messagingSenderId: "395173085180"
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase

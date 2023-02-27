import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvVhp-5FJTZg7QiPd-L9OnLW8VVO1k6eU",
  authDomain: "to-do-8d773.firebaseapp.com",
  projectId: "to-do-8d773",
  storageBucket: "to-do-8d773.appspot.com",
  messagingSenderId: "117369700756",
  appId: "1:117369700756:web:5a31c999d031881be58f81",
  measurementId: "G-20SQ01D2Q5",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export {  firestore, auth};

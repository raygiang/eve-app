import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "english-vocabulary-exercises.firebaseapp.com",
  databaseURL: "https://english-vocabulary-exercises.firebaseio.com",
  projectId: "english-vocabulary-exercises",
  storageBucket: "english-vocabulary-exercises.appspot.com",
  messagingSenderId: "151491480145",
  appId: "1:151491480145:web:b84d187eb9e25d7690c670",
  measurementId: "G-KYW2SLNT0V"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

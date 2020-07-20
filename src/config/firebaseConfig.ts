import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyByEJaFMygTDpGBzhvT4In9oa1orFZ8alY",
  authDomain: "english-vocabulary-exercises.firebaseapp.com",
  databaseURL: "https://english-vocabulary-exercises.firebaseio.com",
  projectId: "english-vocabulary-exercises",
  storageBucket: "english-vocabulary-exercises.appspot.com",
  messagingSenderId: "151491480145",
  appId: "1:151491480145:web:b84d187eb9e25d7690c670",
  measurementId: "G-KYW2SLNT0V"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

// Initialize Firebase config
import {initializeApp} from "firebase/app";
import {getFirestore, setDoc, doc, collection, getDoc} from 'firebase/firestore';
import Constants from 'expo-constants';
import firebase from "firebase/compat";



const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.appId,
};

let app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};

export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlwNjQ8FSQ8qGpPxux8iTh06lIp-Sjvhc",
  authDomain: "real-state-react-firebase.firebaseapp.com",
  projectId: "real-state-react-firebase",
  storageBucket: "real-state-react-firebase.appspot.com",
  messagingSenderId: "1020689249089",
  appId: "1:1020689249089:web:4e0be816b767957f5367c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase firestore and get a reference to the service
const db = getFirestore()
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

const storage = getStorage()

// export the services that will be used in other files
export {db, auth, storage}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB0r3jMrDJB3qkqo68h1Tkwnh2Qo5TKfsk",
  authDomain: "smart-gps-tracker-4bef3.firebaseapp.com",
  databaseURL: "https://smart-gps-tracker-4bef3-default-rtdb.firebaseio.com",
  projectId: "smart-gps-tracker-4bef3",
  storageBucket: "smart-gps-tracker-4bef3.firebasestorage.app",
  messagingSenderId: "324426467481",
  appId: "1:324426467481:web:bfae85fc03ae2b55fd1008",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

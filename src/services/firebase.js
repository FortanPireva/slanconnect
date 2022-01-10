// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVXCJ_uNjaxgWZj9L64K1KcgqXqWy2A6A",
  authDomain: "slanconnect.firebaseapp.com",
  projectId: "slanconnect",
  storageBucket: "slanconnect.appspot.com",
  messagingSenderId: "91795723230",
  appId: "1:91795723230:web:6a8359ff271e4a3311c34f",
  measurementId: "G-P4WLXM634Y",
};
const app = initializeApp(firebaseConfig);

export default {
  firebaseConfig,
  app,
};

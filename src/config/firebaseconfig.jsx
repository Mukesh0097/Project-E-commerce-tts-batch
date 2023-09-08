// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3yyXb22buSs-K9e7sGmzdYA6M0-OWcIY",
  authDomain: "e-commerce-project-bf136.firebaseapp.com",
  projectId: "e-commerce-project-bf136",
  storageBucket: "e-commerce-project-bf136.appspot.com",
  messagingSenderId: "932538439712",
  appId: "1:932538439712:web:aa2f4501106de1c0ee8445",
  measurementId: "G-L6M9687GX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app)
// const analytics = getAnalytics(app);
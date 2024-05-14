// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDghkTeRJWGMtvzrKoMlQdB9baGK3168fg",
    authDomain: "uploadimage-374b1.firebaseapp.com",
    projectId: "uploadimage-374b1",
    storageBucket: "uploadimage-374b1.appspot.com",
    messagingSenderId: "379850617555",
    appId: "1:379850617555:web:9bd044f09834f6481f1a26"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();

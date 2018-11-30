import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBpl-bhHeCVRfBUZ948LS-qpjGkOPDfCI8",
  authDomain: "poniedzialek-26.firebaseapp.com",
  databaseURL: "https://poniedzialek-26.firebaseio.com",
  projectId: "poniedzialek-26",
  storageBucket: "poniedzialek-26.appspot.com",
  messagingSenderId: "77751688488"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
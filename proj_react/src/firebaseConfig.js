import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCW5ikHQYl93pI2urVMbF1NbZdbSjumjDk",
    authDomain: "proj-ed204.firebaseapp.com",
    projectId: "proj-ed204",
    storageBucket: "proj-ed204.appspot.com",
    messagingSenderId: "1099203684201",
    appId: "1:1099203684201:web:9b0552abfc425fbbfffff8",
    measurementId: "G-JVGEZ7THVV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth
export const db = firebase.database()
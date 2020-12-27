import Firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyCW5ikHQYl93pI2urVMbF1NbZdbSjumjDk",
    authDomain: "proj-ed204.firebaseapp.com",
    databaseURL: "https://proj-ed204-default-rtdb.firebaseio.com",
    projectId: "proj-ed204",
    storageBucket: "proj-ed204.appspot.com",
    messagingSenderId: "1099203684201",
    appId: "1:1099203684201:web:9b0552abfc425fbbfffff8",
    measurementId: "G-JVGEZ7THVV"
};
// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);

export const db = app.database()
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjll25ztL5QAo-FKY-kjHZe6qri_Uz4ug",
    authDomain: "lightweight-rt-chat-app.firebaseapp.com",
    projectId: "lightweight-rt-chat-app",
    storageBucket: "lightweight-rt-chat-app.appspot.com",
    messagingSenderId: "606877047749",
    appId: "1:606877047749:web:6967328eb500e358f409ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;

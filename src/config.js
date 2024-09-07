import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "gdmprojects-cf226.firebaseapp.com",
    projectId: "gdmprojects-cf226",
    storageBucket: "gdmprojects-cf226.appspot.com",
    messagingSenderId: "457916488611",
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
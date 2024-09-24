import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPWMk067U2U4CadxcDWAKaIaU6nQohrb4",
  authDomain: "otp-setup-45043.firebaseapp.com",
  projectId: "otp-setup-45043",
  storageBucket: "otp-setup-45043.appspot.com",
  messagingSenderId: "455245760178",
  appId: "1:455245760178:web:da9f7b1a8b312bd20b2bab",
  measurementId: "G-4VVZSKJYYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);

export { auth, storage, db }; // Ensure auth is exported

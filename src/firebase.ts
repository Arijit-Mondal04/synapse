import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAD8MwpqcBHlsx_7b5wQ7Z3KlXzQwmg9lA",
    authDomain: "synapse-cc259.firebaseapp.com",
    projectId: "synapse-cc259",
    storageBucket: "synapse-cc259.firebasestorage.app",
    messagingSenderId: "295198497203",
    appId: "1:295198497203:web:e2f3528f71c93df4ac53c6",
    measurementId: "G-P3R2C43VTN"
  };
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

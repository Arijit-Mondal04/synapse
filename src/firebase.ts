import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Add this line

const firebaseConfig = {
  apiKey: "AIzaSyAD8MwpqcBHlsx_7b5wQ7Z3KlXzQwmg9lA",
  authDomain: "synapse-cc259.firebaseapp.com",
  projectId: "synapse-cc259",
  storageBucket: "synapse-cc259.appspot.com", // <-- FIXED: Changed .app to .com
  messagingSenderId: "295198497203",
  appId: "1:295198497203:web:e2f3528f71c93df4ac53c6",
  measurementId: "G-P3R2C43VTN"
};
 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Add this line to export storage instance

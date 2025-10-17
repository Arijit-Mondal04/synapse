import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "apikey",
    authDomain: "authdomain",
    projectId: "projectid",
    storageBucket: "storagebucket",
    messagingSenderId: "msid",
    appId: "appid",
    measurementId: "measurementid"
  };
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);


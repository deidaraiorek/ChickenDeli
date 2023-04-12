import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD7i86A_p84B2hQuiQPHEeYui4fvmtzhfc",
  authDomain: "socialmediaapp-73fdd.firebaseapp.com",
  databaseURL: "https://socialmediaapp-73fdd-default-rtdb.firebaseio.com",
  projectId: "socialmediaapp-73fdd",
  storageBucket: "socialmediaapp-73fdd.appspot.com",
  messagingSenderId: "883404016737",
  appId: "1:883404016737:web:df921ea534312f8b1a6e20",
  measurementId: "G-Q3SG2KEQB9",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };

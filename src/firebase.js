import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//OLD DATABASE Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZfjGVwZ5mOiNqsYX2fsroSb3Nd5AypNc",
  authDomain: "crew-mgmt.firebaseapp.com",
  projectId: "crew-mgmt",
  storageBucket: "crew-mgmt.appspot.com",
  messagingSenderId: "520266549536",
  appId: "1:520266549536:web:3f081bfdad6e7660c4af45"
};

//New Duplicate DATABASE Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCHPkuskFO1sR4gwh4oOrakwzlUWHPtG-Y",
//   authDomain: "crew-mgmt-new.firebaseapp.com",
//   projectId: "crew-mgmt-new",
//   storageBucket: "crew-mgmt-new.appspot.com",
//   messagingSenderId: "245494139283",
//   appId: "1:245494139283:web:3c1a4a01159ee558eb0066"
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

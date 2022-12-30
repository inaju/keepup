// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };
// keepup data
const firebaseConfig = {
  apiKey: "AIzaSyCz5AbzVt8ysPIncBkSwSC3Atg_IzXnW7M",
  authDomain: "keepup-63ced.firebaseapp.com",
  projectId: "keepup-63ced",
  storageBucket: "keepup-63ced.appspot.com",
  messagingSenderId: "166161196597",
  appId: "1:166161196597:web:bf79a6207b55b2090b737c",
  measurementId: "G-JZW2KHS2KG",
};
// keepup-app-deploy-1 data
// const firebaseConfig = {
//   apiKey: "AIzaSyDwtnUWrnusU_9htg8xqPLjd3p-sUz4vBE",
//   authDomain: "keepup-app-deploy-1.firebaseapp.com",
//   projectId: "keepup-app-deploy-1",
//   storageBucket: "keepup-app-deploy-1.appspot.com",
//   messagingSenderId: "874010412209",
//   appId: "1:874010412209:web:e1e4aa287270587ef8ce90",
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export ​​const auth = getAuth(app)
export const db = getFirestore(app);
export const simpleAuth = getAuth(app);

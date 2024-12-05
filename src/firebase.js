import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm0c095XyQW1nuWTg8BEamLb7YKqq9cgw",
  authDomain: "portfolio-ca8b3.firebaseapp.com",
  databaseURL: "https://portfolio-ca8b3-default-rtdb.firebaseio.com",
  projectId: "portfolio-ca8b3",
  storageBucket: "portfolio-ca8b3.firebasestorage.app",
  messagingSenderId: "496626827350",
  appId: "1:496626827350:web:22d47bb1509d0193ef7bf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db



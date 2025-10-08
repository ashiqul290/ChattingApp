
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCPw_csg4VojJazSBnAkcNcLHTJlBeqz04",
  authDomain: "chattingapp-8b3c1.firebaseapp.com",
  projectId: "chattingapp-8b3c1",
  storageBucket: "chattingapp-8b3c1.firebasestorage.app",
  messagingSenderId: "249799892589",
  appId: "1:249799892589:web:d2c78f491ac2e7ee38e964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
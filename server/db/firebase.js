const { initializeApp } = require ("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDHIKWl8hnnEWsrxjjBLgkpDH9rqfoq3QU",
  authDomain: "pdv-xbr-2d684.firebaseapp.com",
  projectId: "pdv-xbr-2d684",
  storageBucket: "pdv-xbr-2d684.firebasestorage.app",
  messagingSenderId: "316902092380",
  appId: "1:316902092380:web:21748c38ce525955084099",
  measurementId: "G-8SG0QV2V1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

module.exports = db;
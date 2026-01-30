// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA2G0lE1gLtkl3Z_Q9DCu2bR2tabEaHeoM",
    authDomain: "data-f66ce.firebaseapp.com",
    projectId: "data-f66ce",
    storageBucket: "data-f66ce.firebasestorage.app",
    messagingSenderId: "1011638776320",
    appId: "1:1011638776320:web:76a465c11c721cc6be1ee5",
    measurementId: "G-X73DNWF9WR"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

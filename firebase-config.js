// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Replace these values with your own Firebase project's config
const firebaseConfig = {
  apiKey: "AIzaSyDpCqFgPRyyl_wEE9uNU50Ia9THW8ppq-k",
  authDomain: "chat-bot-ed471.firebaseapp.com",
  projectId: "chat-bot-ed471",
  storageBucket: "chat-bot-ed471.firebasestorage.app",
  messagingSenderId: "308395168793",
  appId: "1:308395168793:web:2b92bae76d9b627daa0688",
  measurementId: "G-N9YWE2NFY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { app, auth, db };

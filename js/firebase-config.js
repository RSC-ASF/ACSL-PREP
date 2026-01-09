// Firebase Configuration
// Note: Firebase API keys are designed to be public - security is enforced via Firebase Security Rules
// For production, ensure proper security rules are configured in Firebase Console

const firebaseConfig = {
    apiKey: "AIzaSyBEi3Ia2LVdswVuRPzclIXT5leaf97orR4",
    authDomain: "acsl-prep.firebaseapp.com",
    projectId: "acsl-prep",
    storageBucket: "acsl-prep.firebasestorage.app",
    messagingSenderId: "594058658670",
    appId: "1:594058658670:web:26c9b414d2e7a6d6d9b77f",
    measurementId: "G-F6ERP5EQ0H"
};

// Import Firebase SDK from CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, orderBy, limit, getDocs, serverTimestamp, increment } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

// Export for use in other modules
export {
    app,
    auth,
    db,
    analytics,
    googleProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    serverTimestamp,
    increment,
    GoogleAuthProvider
};

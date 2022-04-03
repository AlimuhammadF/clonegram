// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB8owCktoyOg8_qPrmUYpGrF420NC3LX2E",
	authDomain: "clom-b1c05.firebaseapp.com",
	projectId: "clom-b1c05",
	storageBucket: "clom-b1c05.appspot.com",
	messagingSenderId: "880205636249",
	appId: "1:880205636249:web:6c57f76e84c2905d7cce08",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();

const db = getFirestore();

export { app, db, auth };

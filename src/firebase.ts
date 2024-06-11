// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAqHc3ZOlmcYakpazSZhyPe0JhqVVKnnk",
  authDomain: "udemy-household.firebaseapp.com",
  projectId: "udemy-household",
  storageBucket: "udemy-household.appspot.com",
  messagingSenderId: "139280134848",
  appId: "1:139280134848:web:f3528e1b70630c024df325",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

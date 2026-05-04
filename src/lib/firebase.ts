import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwDOnbxOYqqaFrsu1eqNKOQHxvt6BIJ6s",
  authDomain: "gharplus-3a6a8.firebaseapp.com",
  projectId: "gharplus-3a6a8",
  storageBucket: "gharplus-3a6a8.firebasestorage.app",
  messagingSenderId: "815299339187",
  appId: "1:815299339187:web:da25f6b15a3141c73261c6",
  measurementId: "G-XG4TQVG6RM",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

import firebase from '@firebase/app';
import '@firebase/messaging';

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAEhH1MYHqMKll0QjGO96bqlaoImqRjwNI",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "office-killers.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://office-killers.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "office-killers",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "office-killers.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "704399575739",
  appId: process.env.FIREBASE_APP_ID || "1:704399575739:web:3e2c9330951fdcf579f79e",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-XB4RRNW5WH"
});

const messaging = (firebase.messaging.isSupported() ? firebase.messaging() : null );

export { messaging };
export default firebase;

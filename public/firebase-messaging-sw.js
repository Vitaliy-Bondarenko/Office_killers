importScripts('https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.4/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAEhH1MYHqMKll0QjGO96bqlaoImqRjwNI",
  authDomain: "office-killers.firebaseapp.com",
  databaseURL: "https://office-killers.firebaseio.com",
  projectId: "office-killers",
  storageBucket: "office-killers.appspot.com",
  messagingSenderId: "704399575739",
  appId: "1:704399575739:web:3e2c9330951fdcf579f79e",
  measurementId: "G-XB4RRNW5WH"
});

const initMessaging = firebase.messaging()

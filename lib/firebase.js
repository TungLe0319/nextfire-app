import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAT-qnp8UtzFXEN-rxuepsv1V-t-l3mG4M",
  authDomain: "nextfire-app-bbaf6.firebaseapp.com",
  projectId: "nextfire-app-bbaf6",
  storageBucket: "nextfire-app-bbaf6.appspot.com",
  messagingSenderId: "327928117736",
  appId: "1:327928117736:web:73f2600659a22fd9170c5d",
  measurementId: "G-7QPNV4R6TB",
};
if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}
// @ts-ignore
export const auth = firebase.auth();
// @ts-ignore
export const firestore = firebase.firestore();
// @ts-ignore
export const storage = firebase.storage();

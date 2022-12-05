import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAT-qnp8UtzFXEN-rxuepsv1V-t-l3mG4M",
  authDomain: "nextfire-app-bbaf6.firebaseapp.com",
  projectId: "nextfire-app-bbaf6",
  storageBucket: "nextfire-app-bbaf6.appspot.com",
  messagingSenderId: "327928117736",
  appId: "1:327928117736:web:73f2600659a22fd9170c5d",
  measurementId: "G-7QPNV4R6TB",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
 
export const firestore = firebase.firestore();

export const storage = firebase.storage();

export async function getUserWithUsername(username){
   const usersRef = firestore.collection('users')
   const query = usersRef.where('username', '==', username).limit(1)
   const userDoc = (await query.get()).docs[0]
   return userDoc
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
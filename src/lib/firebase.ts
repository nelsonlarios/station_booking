// import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import "firebase/auth";
// import { firebaseConfig } from "../config";

// if (!firebase.apps.length) {
//   const app = firebase.initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
// }

// export default firebase;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  updateDoc,
  deleteDoc,
  DocumentData,
  CollectionReference,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
//import "firebase/auth";

//import { programs } from "src/pages/badminton";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBULxOeeNtQPW3xZPa_L9Ya7l0CqbCE_LI",
//   authDomain: "badminton-9e4e6.firebaseapp.com",
//   projectId: "badminton-9e4e6",
//   storageBucket: "badminton-9e4e6.appspot.com",
//   messagingSenderId: "311268408272",
//   appId: "1:311268408272:web:3b0ab861827ea84fd097d5",
//   measurementId: "G-KWEF0KT613",
// };

//deploy
const firebaseConfig = {
  apiKey: "AIzaSyAjs6-wCp8006u7l9eCmjlayAnZAEXgcuc",
  authDomain: "station-booking-b22ab.firebaseapp.com",
  projectId: "station-booking-b22ab",
  storageBucket: "station-booking-b22ab.appspot.com",
  messagingSenderId: "990429115043",
  appId: "1:990429115043:web:8e99760fd5b407ad3d4516",
  measurementId: "G-E4ZYGP1JED",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);
export const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);

// enableIndexedDbPersistence(db).catch((err) => {
//   if (err.code == "failed-precondition") {
//     //console.log({ err });

//     console.log("failed-precondition");

//     // Multiple tabs open, persistence can only be enabled
//     // in one tab at a a time.
//     // ...
//   } else if (err.code == "unimplemented") {
//     console.log("unimplemented");
//     // The current browser does not support all of the
//     // features required to enable persistence
//     // ...
//   }
// });

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

//const auth = getAuth(firebaseApp);

//console.log("Hello Firebase: ", { firebaseApp });

export default firebaseApp;

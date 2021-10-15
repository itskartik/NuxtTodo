import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCaoEI3jL_60gPiGcRHFTpFhVetIJZaGl4",
  authDomain: "nuxt-todo-7fdf4.firebaseapp.com",
  projectId: "nuxt-todo-7fdf4",
  storageBucket: "nuxt-todo-7fdf4.appspot.com",
  messagingSenderId: "228326877724",
  appId: "1:228326877724:web:0333b04e3e52165fea8dd9",
  measurementId: "G-BQ6ST3B1HR"
};

let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;

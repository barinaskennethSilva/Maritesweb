import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


////////////////////////////////////////////
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore from the modular Firebase

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

const firebaseConfig = {
apiKey: "AIzaSyCCnyuJC112u98hmvN3SOM8MKNtJXRuPs8",
  authDomain: "portfoliochat-2193c.firebaseapp.com",
  databaseURL: "https://portfoliochat-2193c-default-rtdb.firebaseio.com",
  projectId: "portfoliochat-2193c",
  storageBucket: "portfoliochat-2193c.appspot.com",
  messagingSenderId: "24823005066",
  appId: "1:24823005066:web:21bc49cefe2d5393b95273"
};

const app = firebase.initializeApp(firebaseConfig); // Use initializeApp instead of firebase.initializeApp

const db = getFirestore(app); // Use getFirestore to initialize Firestore
const storage = getFirestore(app); 

const auth = getAuth(app); // Use getAuth to initialize Auth


createApp(App).use(router).mount('#app');

export { db, auth, storage,app };


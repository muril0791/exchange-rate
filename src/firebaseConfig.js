import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBHJkvBAXEhhO6_ZbonaYHNyalOYQBPJ-o",
    authDomain: "exchangerates-91cc4.firebaseapp.com",
    databaseURL: "https://exchangerates-91cc4-default-rtdb.firebaseio.com",
    projectId: "exchangerates-91cc4",
    storageBucket: "exchangerates-91cc4.appspot.com",
    messagingSenderId: "511898066839",
    appId: "1:511898066839:web:4e8c507db26b95d413aed2"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtém as instâncias do Auth e Firestore para serem usadas no aplicativo
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta as instâncias do Auth e Firestore
export { auth, db };

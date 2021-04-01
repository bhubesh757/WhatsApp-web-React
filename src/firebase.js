// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHq90yJun_nP91bJvDVwkrsm0dR3UJi4A",
  authDomain: "myntra-chatapp.firebaseapp.com",
  projectId: "myntra-chatapp",
  storageBucket: "myntra-chatapp.appspot.com",
  messagingSenderId: "1072835173963",
  appId: "1:1072835173963:web:c54dfc10f3c3c85a41f7ce",
  measurementId: "G-4HW4SJTLZD"
};


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
 
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export {db , auth , provider };

  export default firebase
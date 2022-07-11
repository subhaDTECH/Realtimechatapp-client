import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCI2WJVX2DvfogNicRQ721yMVq5yJkQ8nc",
    authDomain: "whatsapp-mern-clone-e517a.firebaseapp.com",
    projectId: "whatsapp-mern-clone-e517a",
    storageBucket: "whatsapp-mern-clone-e517a.appspot.com",
    messagingSenderId: "303538859728",
    appId: "1:303538859728:web:735f76a7a99c05fa79b8d5",
    measurementId: "G-RP5Q7CN5Q3"
  };
  const firebaseapp=firebase.initializeApp(firebaseConfig)
const db=firebaseapp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;

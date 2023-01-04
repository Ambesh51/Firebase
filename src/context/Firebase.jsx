import { createContext, useContext, useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged, //state change user login or logout
} from "firebase/auth"; //CREATE A USER & Autherized

import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // firestore create
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage"; //storage //getdownloadUrl fetch image

import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzN_DuYOk0j2TS5hjkeLbUx-1M5JDlODc",
  authDomain: "project-test-kiya.firebaseapp.com",
  projectId: "project-test-kiya",
  storageBucket: "project-test-kiya.appspot.com",
  messagingSenderId: "50325297064",
  appId: "1:50325297064:web:be29b6fc15050682b96f9d",
  databaseURL: "https://project-test-kiya-default-rtdb.firebaseio.com/",
};
//
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp); //auth
const firestore = getFirestore(FirebaseApp); //firestore instense created
const storage = getStorage(FirebaseApp); // storage import after getFirestore

const FirebaseContext = createContext(null);
//custom hook
export const useFirebase = () => useContext(FirebaseContext);

const database = getDatabase(FirebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) setUser(user); //login
      else setUser(null); // no user or logout
      console.log("-----user-------",user);
    });
  }, []);

  const isLoggedIn = user ? true : false;

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(FirebaseAuth, email, password);
  };
  const signinUserWithEMailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(FirebaseAuth, email, password);
  };
  const signinWithGoogle = () => {
    return signInWithPopup(FirebaseAuth, googleProvider);
  };
  const handleCreateNewListing = async (name, isbn, price, cover) => { //store data
   
    const imageRef = ref(storage, `upload/images/${Date.now()}-${cover.name}`);
    const uploadImage = await uploadBytes(imageRef, cover); //Image Uploaded ab firestore mai rakhna hai link ko with the help of firestores,collection,addDoc
  
    return await addDoc (collection(firestore,"books"),{
        name,
        isbn,
        price,
        imageUrl:uploadImage.ref.fullPath,
        userID:user.uid,
        userEmail:user.email,
        displayName:user.displayName,
        photoURL:user.photoURL,
    })

  };

 //retieve data of books
 const listAllBooks=()=>{
    return getDocs(collection(firestore,"books"))
 }

//image showing
const getImageURL = (path)=>{//path means database
    return getDownloadURL(ref(storage, path));
}

  //const putData = (key, data)=> set(ref(database,key),data);
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        //putData,
        signinUserWithEMailAndPassword,
        signinWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

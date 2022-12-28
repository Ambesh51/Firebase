import { createContext, useContext } from 'react'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth" //CREATE A USER
                                       //utility function for  a provider usko context mai injext kREGE
import {getDatabase, set, ref}  from "firebase/database"
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
  databaseURL:"https://project-test-kiya-default-rtdb.firebaseio.com/",
};
//
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
//
export const FirebaseAuth =getAuth(FirebaseApp)
const database =getDatabase(FirebaseApp);

const FirebaseContext = createContext(null);

//custom hook
export const useFirebase =()=> useContext(FirebaseContext)
//
export const FirebaseProvider =(props)=>{
    const signupUserWithEmailAndPassword=(email,password)=>{
        return createUserWithEmailAndPassword(FirebaseAuth,email,password)
    }
    const putData = (key, data)=> set(ref(database,key),data);
    return(
    <FirebaseContext.Provider value={{signupUserWithEmailAndPassword,putData}}>
    {props.children}
    </FirebaseContext.Provider>
    )
}
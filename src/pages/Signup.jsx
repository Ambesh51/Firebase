import { useFirebase,FirebaseAuth } from '../context/Firebase';
import { useState } from 'react';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth" //SignUp by Google

function SignUp() {
  const firebase = useFirebase()
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
//   console.log("firebase",firebase)
const googleProvider = new GoogleAuthProvider()


  const createUser=(e)=>{
    e.preventDefault();
    firebase.signupUserWithEmailAndPassword(email,password)

   //  firebase.putData("users",{email,password});
     alert("Success");
  }

  const SignUpWithGoogle=()=>{
    signInWithPopup(FirebaseAuth,googleProvider)
  }
  return (
    <div className="App">
     <h1>SignUp</h1>
     <form>
     <label>Enter your email</label>
     <input type="email" placeholder='email' value={email}  autoComplete="email" onChange={(e)=>{setEmail(e.target.value)}} />
     <label>Enter your password</label>
     <input type="password" placeholder='password' value={password} autoComplete="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
     </form>
     <button onClick={(e)=>{
        createUser(e)
    }}>SignUp</button>
    <br/>
    <button onClick={SignUpWithGoogle}>SignIn with Google</button>
    </div>
  );
}

export default SignUp;

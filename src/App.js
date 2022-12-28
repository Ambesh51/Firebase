 import {useEffect,useState} from 'react';
//user login/logout auth state change then this fun will execute automatically
import {onAuthStateChanged, signOut} from 'firebase/auth' 
//
import SignUpPage from './pages/Signup';
import SigninPage from './pages/Signin';
import { FirebaseAuth } from './context/Firebase';


function App() {
  const [user,setUser]=useState(null);
  useEffect(()=>{
    onAuthStateChanged(FirebaseAuth,user=>{
      if(user){
        //yes you logged in
        console.log("hello",user)
        setUser(user);
      }
      else{
        //user is logged out
        console.log("yes are logged out",user)
        setUser(null);
      }
    })
  },[])
  
    if(user === null){
      return(
        <div className="App">
        <SignUpPage/>
        
        <SigninPage/>
         </div>
      )
    }
  

  return (
    <div className="App">
   <h1>Hello {user.email}</h1>
   <button onClick={()=>{signOut(FirebaseAuth)}}>SignOut</button> 
   </div>
   
  )
}

export default App


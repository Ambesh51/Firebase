 import {useEffect,useState} from 'react';
 import { Routes, Route } from 'react-router-dom';
 import 'bootstrap/dist/css/bootstrap.min.css';
//user login/logout auth state change then this fun will execute automatically
import {onAuthStateChanged, signOut} from 'firebase/auth' 
//
// import SignUpPage from './pages/Signup';
// import SigninPage from './pages/Signin';
import { FirebaseAuth } from './context/Firebase';
import Register from './pages/Register';
import Login from './pages/Login';
import MyNavbar from './components/Navbar';
import ListingPage from './pages/List';
import HomePage from './pages/Home';


function App() {
  const [user,setUser]=useState(null);
  // useEffect(()=>{
  //   onAuthStateChanged(FirebaseAuth,user=>{
  //     if(user){
  //       //yes you logged in
  //       console.log("hello",user)
  //       setUser(user);
  //     }
  //     else{
  //       //user is logged out
  //       console.log("yes are logged out",user)
  //       setUser(null);
  //     }
  //   })
  // },[])
  
 //pre branch code
//   {user === null?<div className="container"> 
//   <SignUpPage/>
//    </div>:<><h1>Hello {user.email}</h1>
//    hi <button onClick={()=>{signOut(FirebaseAuth)}}>SignOut</button></>  
// }
  return (
   
  <div className="container">
    <MyNavbar/>
  <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/book/list" element={<ListingPage/>}/>
  </Routes>
    
   </div>
   
  )
}

export default App


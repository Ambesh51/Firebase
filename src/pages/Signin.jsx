import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import {FirebaseAuth} from '../context/Firebase';
import {signInWithEmailAndPassword} from "firebase/auth"

const SigninPage=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

console.log("firebase",FirebaseAuth)

    const SigninUser=(e)=>{ 
        e.preventDefault();
        signInWithEmailAndPassword(FirebaseAuth,email,password)
        .then(res=>{
            console.log("success",res); 
        }).catch(err=>console.log(err))
        console.log(email,password)
    }

    return(
        <div className='sign-in-page'>
        <h1>signIn Page</h1>
        <form>
        <label>Enter your email</label>
        <input type="email" placeholder='email' value={email}  autoComplete="email" onChange={(e)=>{setEmail(e.target.value)}} />
        <label>Enter your password</label>
        <input type="password" placeholder='password' value={password} autoComplete="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
        <Button variant='success' onClick={(e)=>{SigninUser(e)}}> Signin me in </Button>
        </form>
        </div>
    )
}
export default SigninPage
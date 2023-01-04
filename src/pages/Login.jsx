import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function Login() {
  const firebase = useFirebase();
  const navigate= useNavigate()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login in a user....");
    var result = await firebase.signinUserWithEMailAndPassword(email, password);
    console.log("Successfully...",result);
  };
 
console.log("firebase",firebase)

useEffect(()=>{
if(firebase.isLoggedIn){
    //navigate to home if user logdedIn
navigate("/")
}
},[firebase,navigate])


  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <h1 className="mt-5 mb-5">OR</h1>
      <Button variant="danger"
      onClick={firebase.signinWithGoogle}
      >Signin with Google</Button>
    </div>
  );
}

export default Login;

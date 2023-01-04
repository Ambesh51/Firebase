import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const ListingPage = () => {
  
  const firebase =useFirebase()

    const [name, setName] = useState("");
  const [inbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
   var postResult= await firebase.handleCreateNewListing(name, inbnNumber, price, coverPic )
        console.log("post",postResult);
    };


  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            placeholder="Book name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => {
              setIsbnNumber(e.target.value);
            }}
            value={inbnNumber}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control
            onChange={(e) => {
              setCoverPic(e.target.files[0]);
            }}
            // value={coverPic}
            type="file"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
            type="text"
            placeholder="Enter a Price"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;

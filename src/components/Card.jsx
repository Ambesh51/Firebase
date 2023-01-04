import React,{useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';

const CardList=(props)=> {
    console.log("props",props)
    const firebase=useFirebase();
    const [url, setUrl]= useState(null);

    useEffect(()=>{
        firebase.getImageURL(props.imageUrl).then((url)=>setUrl(url))
    },[])
  
    
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
           Book has a title {props.name} this book price {props.price}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
}

export default CardList;
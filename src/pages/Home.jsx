import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import CardList from "../components/Card"


const Home = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));

  },[]);




  return (
    <div className="container mt-5">
    
{
    books.map((book)=>(<CardList key={book.id} {...book.data()}/>))
}
    </div>);
};

export default Home;

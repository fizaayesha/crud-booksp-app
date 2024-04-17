import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]); // Initialize books as an empty array

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("https://crud-books-api-pro.vercel.app/books");
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          setBooks([]); // Set to empty array if response is not an array
        }
      } catch (err) {
        console.log(err);
        setBooks([]); // Set books to empty array in case of error to avoid rendering issues
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://crud-books-api-pro.vercel.app/books/${id}`);
      // After deletion, update state by filtering out the deleted book
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Lama Book Shop</h1>
      {books.length === 0 ? ( // Display loading message if books array is empty
        <p>Loading...</p>
      ) : (
        <div className="books">
          {books.map((book) => (
            <div key={book.id} className="book">
              <img src={book.cover} alt="" />
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>${book.price}</span>
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link
                  to={`/update/${book.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Update
                </Link>
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState(null); // Initialize books as null for loading state

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
        setBooks([]); // Set books to empty array in case of error to avoid rendering issues
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      // After deletion, update state by filtering out the deleted book
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Lama Book Shop</h1>
      {books === null ? ( // Display loading message if books is null
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

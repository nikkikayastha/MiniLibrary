import Sidebar from "./components/sidebar";
import "./books.css";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("books/")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h2>Books</h2>

        {books.map(book => (
          <div key={book.id} className="book-card">
            <h4>{book.title}</h4>
            <p>{book.author}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

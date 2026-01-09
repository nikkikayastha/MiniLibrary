import Sidebar from "./components/sidebar";
import "./addbooks.css";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function AddBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [published_year, setPublishedYear] = useState("");
  const [description, setDescription] = useState("");
  const [copies_total, setCopiesTotal] = useState("");
  const [copies_available, setCopiesAvailable] = useState("");

  const handleSubmit = async () => {
    await API.post("books/", {
      title,
      author,
      isbn,
      category,
      published_year,
      description,
      copies_total,
      copies_available,
      available: true,
    });

    setTitle("");
    setAuthor("");
    setIsbn("");
    setCategory("");
    setPublishedYear("");
    setDescription("");
    setCopiesTotal("");
    setCopiesAvailable("");
    alert("Book added!");
  };

  return (
    <div className="layout">
      <Sidebar />

      {/* <div className="content">
        <h2>Add New Book</h2>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Book Title"
        />

        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <input
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
          placeholder="ISBN"
        />
        <input
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          value={published_year}
          onChange={e => setPublishedYear(e.target.value)}
          placeholder="Published Year"
        />
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          value={copies_total}
          onChange={e => setCopiesTotal(e.target.value)}
          placeholder="Total Copies"
        />
        <input
          value={copies_available}
          onChange={e => setCopiesAvailable(e.target.value)}
          placeholder="Available Copies"
        />

        <button onClick={handleSubmit}>Add Book</button>
      </div> */}
      <div className="content">
        <h2>Add New Book</h2>

        <label>Book Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter book title"
        />

        <label>Author</label>
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Enter author name"
        />

        <label>ISBN</label>
        <input
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
          placeholder="Enter ISBN number"
        />

        <label>Category</label>
        <input
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Enter category"
        />

        <label>Published Year</label>
        <input
          value={published_year}
          onChange={e => setPublishedYear(e.target.value)}
          placeholder="Enter published year"
        />

        <label>Description</label>
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter description"
        />

        <label>Total Copies</label>
        <input
          value={copies_total}
          onChange={e => setCopiesTotal(e.target.value)}
          placeholder="Enter total copies"
        />

        <label>Available Copies</label>
        <input
          value={copies_available}
          onChange={e => setCopiesAvailable(e.target.value)}
          placeholder="Enter available copies"
        />

        <button onClick={handleSubmit}>Add Book</button>
      </div>

    </div>
  );
}

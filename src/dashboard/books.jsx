// import Sidebar from "./components/sidebar";
// import "./books.css";
// import { useEffect, useState } from "react";
// import API from "../api/api";

// export default function Books() {
//   const [books, setBooks] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [selectedMember, setSelectedMember] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([
//       API.get("books/"),
//       API.get("members/")
//     ])
//       .then(([booksRes, membersRes]) => {
//         setBooks(booksRes.data);
//         setMembers(membersRes.data);
//       })
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleIssue = (bookId) => {
//     const memberId = selectedMember[bookId];

//     if (!memberId) {
//       alert("Please select a member");
//       return;
//     }

//     API.post(`books/${bookId}/issue/`, {
//       member: memberId
//     })
//       .then(() => {
//         alert("Book issued successfully");

//         // refresh books list to update availability
//         return API.get("books/");
//       })
//       .then(res => setBooks(res.data))
//       .catch(err => {
//         console.error(err);
//         alert("Failed to issue book");
//       });
//   };

//   const handleDelete = (bookId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this book? This action cannot be undone."
//     );
//     if (!confirmed) return;

//     API.delete(`books/${bookId}/`)
//       .then(() => {
//         alert("Book deleted successfully");
//         setBooks(prev => prev.filter(book => book.id !== bookId));
//       })
//       .catch(err => {
//         console.error(err);
//         alert("Failed to delete book");
//       });
//   };

//   return (
//     <div className="layout">
//       <Sidebar />

//       <div className="content">
//         <h2 className="page-title">Books Collection</h2>

//         {loading && <p className="status-text">Loading books...</p>}

//         {!loading && books.length === 0 && (
//           <p className="status-text">No books available</p>
//         )}

//         <div className="books-grid">
//           {books.map(book => (
//             <div key={book.id} className="book-card">
//               <div className="book-header">
//                 <h4>{book.title}</h4>
//                 <span
//                   className={`badge ${book.is_available ? "available" : "unavailable"
//                     }`}
//                 >
//                   {book.is_available ? "Available" : "Unavailable"}
//                 </span>
//               </div>

//               <p className="author">by {book.author}</p>

//               <p className="meta">
//                 Category: <span>{book.category}</span>
//               </p>

//               <p className="copies">
//                 Copies: {book.copies_available}/{book.copies_total}
//               </p>

//               {/* ISSUE SECTION */}
//               <div className="issue-section">
//                 <select
//                   value={selectedMember[book.id] || ""}
//                   onChange={(e) =>
//                     setSelectedMember({
//                       ...selectedMember,
//                       [book.id]: e.target.value
//                     })
//                   }
//                   disabled={!book.is_available}
//                 >
//                   <option value="">Select member</option>
//                   {members.map(member => (
//                     <option key={member.id} value={member.id}>
//                       {member.full_name}
//                     </option>
//                   ))}
//                 </select>

//                 <button
//                   className="issue-btn"
//                   disabled={!book.is_available}
//                   onClick={() => handleIssue(book.id)}
//                 >
//                   Issue
//                 </button>

//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(book.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import Sidebar from "./components/sidebar";
import "./books.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { FaTrash } from "react-icons/fa";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([API.get("books/"), API.get("members/")])
      .then(([booksRes, membersRes]) => {
        setBooks(booksRes.data);
        setMembers(membersRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleIssue = (bookId) => {
    const memberId = selectedMember[bookId];

    if (!memberId) {
      alert("Please select a member");
      return;
    }

    API.post(`books/${bookId}/issue/`, { member: memberId })
      .then(() => {
        alert("Book issued successfully");
        return API.get("books/");
      })
      .then(res => setBooks(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to issue book");
      });
  };

  const handleDelete = (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book? This action cannot be undone."
    );
    if (!confirmed) return;

    API.delete(`books/${bookId}/`)
      .then(() => {
        alert("Book deleted successfully");
        setBooks(prev => prev.filter(book => book.id !== bookId));
      })
      .catch(err => {
        console.error(err);
        alert("Failed to delete book");
      });
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="book-content">
        <div className="table-header">
          <h2 className="page-title">Books Collection</h2>
        </div>

        {loading && <p className="status-text">Loading books...</p>}

        {!loading && books.length === 0 && (
          <p className="status-text">No books available</p>
        )}

        {!loading && books.length > 0 && (
          <table className="books-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Availability</th>
                <th>Issue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>
                    <span
                      className={`badge ${book.is_available ? "available" : "unavailable"
                        }`}
                    >
                      {book.is_available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td>
                    <div className="issue-section">
                      <select
                        value={selectedMember[book.id] || ""}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            [book.id]: e.target.value
                          })
                        }
                        disabled={!book.is_available}
                      >
                        <option value="">Select member</option>
                        {members.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.full_name}
                          </option>
                        ))}
                      </select>

                      <button
                        className="issue-btn"
                        disabled={!book.is_available}
                        onClick={() => handleIssue(book.id)}
                      >
                        Issue
                      </button>
                    </div>
                  </td>
                  <td className="actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(book.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

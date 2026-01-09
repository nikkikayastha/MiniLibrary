
import Sidebar from "./components/sidebar";
import "./members.css";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import API from "../api/api";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("members/")
      .then(res => setMembers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  const handleDelete = async (memberId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await API.delete(`members/${memberId}/`);
      alert("Member deleted successfully");
      setMembers(prev => prev.filter(member => member.id !== memberId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete member");
    }
  };
  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h2 className="page-title">Library Members</h2>

        {loading && <p className="status-text">Loading members...</p>}

        {!loading && members.length === 0 && (
          <p className="status-text">No members found</p>
        )}

        <div className="members-grid">
          {members.map(member => (
            <div key={member.id} className="member-card">
              <div className="member-header">
                <h4>{member.full_name}</h4>
                <span className="member-id">{member.membership_id}</span>
                <td className="actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(member.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
              </div>

              <div className="member-info">
                <p>Email: {member.email}</p>
                <p>Phone: {member.phone}</p>
                <p>Address: {member.address}</p>
              </div>

              {member.issued_books && member.issued_books.length > 0 && (
                <div className="issued-books">
                  <h5>Books Issued:</h5>
                  <ul>
                    {member.issued_books.map(book => (
                      <li key={book.id} className="issued-book-item">
                        {book.title}
                        {!book.returned_at && (
                          <button
                            className="return-btn"
                            onClick={async () => {
                              try {
                                await API.post(`books/${book.book_id}/return/`, {
                                  issue_id: book.id
                                });                                // refresh members list
                                const res = await API.get("members/");
                                setMembers(res.data);
                              } catch (err) {
                                console.error(err);
                                alert("Failed to return book");
                              }
                            }}
                          >
                            Book Returned
                          </button>
                        )}
                        {book.returned_at && <span className="returned-badge">Returned</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!member.issued_books || member.issued_books.length === 0 ? (
                <p className="no-books">No books issued currently</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

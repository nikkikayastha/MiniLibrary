import { Link } from "react-router-dom";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <h2 className="logo">MiniLibrary</h2>

      <ul className="menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/members">Members</Link></li>
        <li><Link to="/add-books">Add Books</Link></li>
        <li><Link to="/add-member">Add Member</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  );
}

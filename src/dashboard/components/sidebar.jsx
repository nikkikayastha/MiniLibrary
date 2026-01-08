import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">MiniLibrary</h2>

      <ul className="menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/members">Members</Link></li>
        <li><Link to="/add-books">Add Books</Link></li>
        <li><Link to="/add-member">Add Member</Link></li>
      </ul>
    </div>
  );
}

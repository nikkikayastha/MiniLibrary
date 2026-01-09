// import Sidebar from "./components/sidebar";
// import "./dashboard.css";
// import { useEffect, useState } from "react";
// import API from "../api/api";

// export default function Dashboard() {
//   const [books, setBooks] = useState([]);
//   const [members, setMembers] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Fetch books and members data from Django API
//         const [booksRes, membersRes] = await Promise.all([
//           API.get("books/"), 
//           API.get("members/"),
//         ]);

//         setBooks(booksRes.data);
//         setMembers(membersRes.data);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Calculations
//   const totalBooks = books.length;
//   const availableBooks = books.filter(book => book.available).length;
//   const borrowedBooks = totalBooks - availableBooks;
//   const totalMembers = members.length;

//   const newMembers = [...members].slice(-3).reverse();

//   return (
//     <div className="layout">
//       <Sidebar />

//       <div className="content">
//         <div className="header">
//           <h2>Welcome!</h2>
//           <p>Dashboard Overview</p>
//         </div>

//         <div className="cards">
//           <div className="card red">
//             <h4>Total Books</h4>
//             <h1>{totalBooks}</h1>
//           </div>

//           <div className="card red">
//             <h4>Available Books</h4>
//             <h1>{availableBooks}</h1>
//           </div>

//           <div className="card red">
//             <h4>Books Borrowed</h4>
//             <h1>{borrowedBooks}</h1>
//           </div>

//           <div className="card yellow">
//             <h4>Total Members</h4>
//             <h1>{totalMembers}</h1>
//           </div>
//         </div>

//         <div className="table">
//           <h3>New Members</h3>
//           <table>
//             <tbody>
//               {newMembers.map(member => (
//                 <tr key={member.id}>
//                   <td>{member.name}</td>
//                   <td>#{member.id}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import Sidebar from "./components/sidebar";
import "./dashboard.css";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [booksRes, membersRes] = await Promise.all([
          API.get("books/"),
          API.get("members/"),
        ]);
        setBooks(booksRes.data);
        setMembers(membersRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.available).length;
  const borrowedBooks = totalBooks - availableBooks;
  const totalMembers = members.length;
  const newMembers = [...members].slice(-3).reverse();

  return (
    <div className="dash-layout">
      <Sidebar />

      <div className="dash-content">
        <div className="dash-header">
          <h2>Welcome!</h2>
          <p>Dashboard Overview</p>
        </div>

        <div className="dash-cards">
          <div className="dash-card red">
            <h4>Total Books</h4>
            <h1>{totalBooks}</h1>
          </div>

          <div className="dash-card blue">
            <h4>Total Members</h4>
            <h1>{totalMembers}</h1>
          </div>
        </div>

        <div className="dash-table">
          <h3>New Members</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {newMembers.map(member => (
                <tr key={member.id}>
                  <td>{member.full_name}</td>
                  <td>{member.membership_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

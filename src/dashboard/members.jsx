import Sidebar from "./components/sidebar";
import "./members.css";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function Members() {
    const [members, setMembers] = useState([]);
    useEffect(() => {
        API.get("members/")
            .then(res => setMembers(res.data))
            .catch(err => console.error(err));
    }, []);
    
    return (
        <div className="layout">
            <Sidebar />

            <div className="content">
                <h2>Members</h2>

                {members.map(member => (
                    <div key={member.id} className="member-card">
                        <h4>{member.name}</h4>
                        <p>Member ID: {member.member_id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

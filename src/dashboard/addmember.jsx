import Sidebar from "./components/sidebar";
import "./addbooks.css";
import { useState } from "react";
import API from "../api/api";

export default function AddBooks() {
    const [full_name, setName] = useState("");
    const [membership_id, setMembershipId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    const handleSubmit = async () => {
        await API.post("members/", {
            full_name,
            membership_id,
            email,
            phone,
            address
        });

        setName("");
        setMembershipId("");
        setEmail("");
        setPhone("");
        setAddress("");
        alert("Member added!");
    };

    return (
        <div className="layout">
            <Sidebar />

            <div className="content">
                <h2>Add New Member</h2>

                <label>Membership ID</label>
                <input
                    value={membership_id}
                    onChange={e => setMembershipId(e.target.value)}
                    placeholder="Membership ID"
                />

                <label>Full Name</label>
                <input
                    value={full_name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full Name"
                />

                <label>Email</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <label>Phone Number</label>
                <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Phone Number"
                />

                <label>Address</label>
                <input
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Address"
                />

                <button onClick={handleSubmit}>Add Member</button>
            </div>
        </div>
    );
}

// pages/Profile.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  // to fill the inputs with the currect user values (from authContext)
  const initialName = user ? user.username : "";
  const initialEmail = user ? user.username + "@example.com" : "";

  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  //validations
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName.trim()) return alert("Full name cannot be empty");
    if (!email.trim()) return alert("Email cannot be empty");
    if (!validateEmail(email)) return alert("Invalid email format");

    alert("Profile updated successfully!");
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* Avatar */}
        <img
          className="profile-avatar"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.username
          )}&background=2563eb&color=fff&rounded=true&size=150`}
          alt="avatar"
        />

        <h2>My Profile</h2>
        <p className="profile-role">
          Role: <strong>{user.role.toUpperCase()}</strong>
        </p>

        <form onSubmit={handleSubmit} className="profile-form">

          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="profile-save-btn">Save</button>

        </form>
      </div>
    </div>
  );
}

export default Profile;

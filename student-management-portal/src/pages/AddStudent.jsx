// pages/AddStudent.js
import { useState } from "react";

function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Form validation
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSubmit = (e) => {
    // To prevent refreshing the page on submit
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid email format (ex: test@gmail.com)");
      return;
    }

    // We are telling the browser to fetch the link 
    // and  give to him our object 
    // if recevied and handled correctly then alert ("sucess") and clear the form
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({ name, email }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        alert("Student added successfully!");
        setName("");
        setEmail("");
      })
      .catch(() => alert("Error creating student"));
  };

  return (
    <div className="add-container">
      <div className="add-card">
        <h2>Add New Student</h2>

        <form onSubmit={handleSubmit} className="add-form">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            // changing the email value
            // e.target.value is the value of this input
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="add-actions">
            <button className="btn-add">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;

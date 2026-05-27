import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById, updateStudent } from "../services/api";
import { useAuth } from "../context/AuthContext";

function EditStudent() {

  // id sent in students page
  const { id } = useParams();

  // THIS TAKE US BACK TO THE PREVIOUS PAGE
  const nav = useNavigate();

  //of course we need them
  const { user } = useAuth();

  // useState for instatnt validation of values and re-rendering to clear form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  // when loading is true (sending message to api link) dispaly "loading"
  const [loading, setLoading] = useState(true);

  // Helper function for email validation same as AddStudent
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  useEffect(() => {
    // To render the values of the user ID when loading the page
    getStudentById(id).then((st) => {
      setName(st.name);
      setEmail(st.email);
      setCity(st.address.city);
      setLoading(false);
    });
  }, [id, user]);



  if (loading) {
    return <p>Loading...</p>;
  }

  function handleSubmit(e) {
    // To prevent refreshing the page on submit
    e.preventDefault();

    //  Check if fields are empty
    if (!name.trim() || !email.trim() || !city.trim()) {
      alert("All fields are required");
      return;
    }

    // Check email format
    if (!validateEmail(email)) {
      alert("Invalid email format (ex: test@gmail.com)");
      return;
    }

    const data = {
      name,
      email,
      address: { city },
    };

    //  Only update if validation passes
    updateStudent(id, data)
      .then(() => {
        alert("Student updated!");
        nav(`/students/${id}`);
      })
      .catch(() => alert("Error updating student"));
  }

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>Edit Student</h2>

        <form onSubmit={handleSubmit} className="edit-form">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
       
          <label>Email</label>
          <input
            type="text"
            value={email}
          // changing the email value
          // e.target.value is the value of this input
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <div className="edit-actions">
            <button className="btn-save">Save</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => nav(`/students/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
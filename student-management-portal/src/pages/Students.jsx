import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

// fetch users from link when loading
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        //adding this data to or Students array 
        setStudents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Students List</h2>

      <div className="students-grid">
        {/* maps to llop througt array */}
        {students.map((s) => (
          <div className="student-card" key={s.id}>
            <h3>{s.name}</h3>
            <p>{s.email}</p>

            <div className="card-actions">
              {/* Sending student id */}
              <Link to={`/students/${s.id}`}>
                <button className="btn-primary">Details</button>
              </Link>

              {/* Only visible for ADMIN */}
              {user?.role === "admin" && (
                <Link to={`/students/${s.id}/edit`}>
                  <button className="btn-edit">Edit</button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;

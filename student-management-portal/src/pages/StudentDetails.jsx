// pages/StudentDetails.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById } from "../services/api";
import { useAuth } from "../context/AuthContext";

function StudentDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    getStudentById(id).then(data => {
      // display thiS specific student info based onID
      setStudent(data);
    });
  }, [id]);

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-container">
      <div className="details-card">

        {/* Avatar */}
        {/* Avatar is the image based on name  */}
        <img
          className="details-avatar"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=2563eb&color=fff&rounded=true&size=150`}
          alt="avatar"
        />

        <h2>{student.name}</h2>

        <div className="details-info">
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>City:</strong> {student.address.city}</p>
          <p><strong>Company:</strong> {student.company.name}</p>
        </div>

        <div className="details-actions">
          {/* Navigate back to students page */}
          <button className="btn-back" onClick={() => nav("/students")}>
            Back
          </button>

          {user.role === "admin" && (
            <button
              className="btn-edit-big"
              onClick={() => nav(`/students/${id}/edit`)}
            >
              Edit
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default StudentDetails;

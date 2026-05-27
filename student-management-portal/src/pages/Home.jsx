// pages/Home.js
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-desc-container">
      <div className="home-desc-card">
        <h2>Welcome to the Student Management System</h2>

        <p className="home-desc-text">
          This application is a simple project built with React.  
          It allows authenticated users to browse student information,  
          view details, and manage their profile.  
        </p>

        <p className="home-desc-text">
          Administrators have additional permissions to add and edit students.
        </p>

        <p className="home-desc-text">
          The goal of this project is to practice routing, authentication,  
          context management, API consumption, and UI theming.
        </p>

        <p className="home-footer-role">
          Logged in as: <strong>{user.username}</strong> 
        </p>
      </div>
    </div>
  );
}

export default Home;

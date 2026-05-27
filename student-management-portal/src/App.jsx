
import "./App.css"; 

//Utilities import + contexts import `
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

//Pages imports
import Login from "./pages/Login";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Profile from "./pages/Profile";
import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent";
import AddStudent from "./pages/AddStudent";

function AppContent() {

  //useContext for having the values everywhere
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className={theme} style={{ padding: "10px", minHeight: "100vh" }}>

      {/* NAVBAR is render only when logged */}
      {user && (
        <nav className="navbar">
          <div className="nav-left">
            {/* NavLink do not re-render, just switch componenets  */}
            {/* with this we are telling the browser taht when we click on Home take me to /... */}
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/students">Students</NavLink>
            <NavLink to="/profile">Profile</NavLink>

            {/* Only appears when admin */}
            {user.role === "admin" && (
              <NavLink to="/add-student">Add Student</NavLink>
            )}
          </div>
            
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme}>
              <span className="theme-icon">
                {theme === "light" ? "🌙" : "☀️"}
              </span>
            </button>
          {/* App.jsx know logout function because we warpped the children with {logout} */}
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </nav>
      )}

      {/* ROUTES */}
      <Routes>
        {/* With route we are telling the browser that render <component> when /.... */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/students" element={user ? <Students /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />

        <Route
          path="/students/:id"
          // user ? checks if user is logged in , if not go to login
          element={user ? <StudentDetails /> : <Login />}
        />
        <Route
          path="/students/:id/edit"
          element={user ? <EditStudent /> : <Login />}
        />
        <Route
          path="/add-student"
          element={
            // if admin => appears
            user && user.role === "admin" ? <AddStudent /> : <Login />
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    //These are children 
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

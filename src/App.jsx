import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/Home/HomePage";
import { AboutPage } from "./pages/About/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Login } from "./auth/Login";
import { SignUp } from "./auth/SignUp";
import { Profile } from "./pages/Profile/Profile";
import { ProtectedRoutes } from "./auth/ProtectedRoutes";
import { checkAuth } from "./auth/AuthService";
import React, { useState, useEffect } from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");

  const logout = async () => {
    try {
      // Clear authentication (reset states)
      setIsAuthenticated(false);
      setEmail("");
      window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      const data = await checkAuth();
      setIsAuthenticated(data.loggedIn);
      setAuthChecked(true);
      if (isAuthenticated) {
        setEmail(data.email);
        console.log(data);
      } else {
        console.log("No user authenticated.");
      }
    };

    verifyUser();
  }, []);

  if (!authChecked) return <p>Loading...</p>;
  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} email={email} logout={logout} />
      <Routes>
        <Route
          path="/"
          element={<HomePage isAuthenticated={isAuthenticated} />}
        />
        <Route path="/about/:animeId" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={
            <SignUp
              setIsAuthenticated={setIsAuthenticated}
              setEmail={setEmail}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

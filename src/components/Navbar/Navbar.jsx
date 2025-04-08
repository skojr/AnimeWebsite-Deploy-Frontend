import React, { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, getUser } from "../../auth/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch the authenticated user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = null; // Replace with logic to get the userId if needed.
        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null); // Clear user state if not authenticated
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    try {
      logout(); // Clear session on backend and redirect
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleNavClick = (path, section) => {
    if (location.pathname === "/" && section) {
      animateScroll.scrollTo(section, {
        duration: 100,
        smooth: true,
      });
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top p-3">
      <div className="container-fluid">
        <a
          className="navbar-brand me-5"
          href="#"
          onClick={() => handleNavClick("/", "hero")}
        >
          <i className="fa-solid fa-square-rss"></i> YUKO!
        </a>
        <div className="navbar-phrase text-white">Find your anime</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className="nav-link active small-nav-item"
              aria-current="page"
              href="#"
              onClick={() => handleNavClick("/", "hero")}
            >
              Home
            </a>
            <a className="nav-link small-nav-item" href="/profile">
              Survey
            </a>
            <a
              className="nav-link small-nav-item"
              aria-current="page"
              href="/profile"
              onClick={() => handleNavClick("/profile", "profile")}
            >
              Profile
            </a>
            {user ? (
              <>
                <button
                  className="nav-link mx-5 btn btn-link small-nav-item"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <div className="small-nav-item nav-item text-light ms-3">
                  {user.email} {/* Render email from user data */}
                </div>
              </>
            ) : (
              <>
                <a
                  className="nav-link small-nav-item"
                  aria-current="page"
                  href="/login"
                  onClick={() => handleNavClick("/login")}
                >
                  Login
                </a>
                <a
                  className="nav-link small-nav-item"
                  aria-current="page"
                  href="/signup"
                  onClick={() => handleNavClick("/signup")}
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </nav>
  );
};

import { animateScroll } from "react-scroll";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated, logout } from "../../auth/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = isAuthenticated();

  let username = null;
  if (loggedIn) {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const { sub } = decoded;
    username = sub;
  }

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

  const handleLogout = () => {
    logout();
    window.location.reload();
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
            <a
              className="nav-link active small-nav-item"
              aria-current="page"
              href="/chatbot"
              onClick={() => handleNavClick("/chatbot", "chatbot")}
            >
              ChatBot
            </a>
            <a
              className="nav-link small-nav-item"
              aria-current="page"
              href="/profile"
              onClick={() => handleNavClick("/profile", "profile")}
            >
              Profile
            </a>
            {loggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="nav-link mx-5 btn btn-link small-nav-item"
                >
                  Logout
                </button>
                <div className="nav-link small-nav-item">{username}</div>
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
                  Signup
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1500} />
    </nav>
  );
};

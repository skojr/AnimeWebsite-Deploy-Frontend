import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "./AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      toast.info("Passwords must match.");
      return;
    }
    try {
      await register({ username, password });
      toast.success("Signed up successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow-lg bg-dark text-light mt-5"
        style={{
          maxWidth: "400px",
          width: "100%",
          transform: "scale(1.3)",
          transformOrigin: "center",
        }}
      >
        <h2 className="text-center mb-4">Sign Up</h2>

        <div className="mb-3">
          <label htmlFor="username" className="form-label fs-5">
            Username
          </label>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            value={username}
            id="username"
            placeholder="Enter username"
            className="form-control fs-5"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5">
            Password
          </label>
          <input
            onChange={handleChange}
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            id="password"
            placeholder="Enter password"
            className="form-control fs-5"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fs-5">
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            id="confirmPassword"
            placeholder="Confirm password"
            className="form-control fs-5"
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label className="form-check-label fs-5" htmlFor="showPassword">
            Show Password
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100 fs-5">
          Sign Up
        </button>
        <p className="fs-4">Already have an account?</p>
        <Link
          to="/login"
          className="fs-4"
          style={{
            color: "plum",
          }}
        >
          {" "}
          Log in here
        </Link>
      </form>
    </div>
  );
};

import { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "./AuthService";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow-lg bg-dark text-light"
        style={{
          maxWidth: "400px",
          width: "100%",
          transform: "scale(1.5)",
          transformOrigin: "center",
        }}
      >
        <h2 className="text-center mb-4">Login</h2>

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

        <div className="form-check mb-1 mt-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
            style={{ marginTop: "0.2rem" }}
          />
          <label
            className="form-check-label fs-5"
            htmlFor="showPassword"
            style={{ marginLeft: "0.5rem" }}
          >
            Show Password
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100 fs-5">
          Login
        </button>
        <p className="fs-4">Don't have an account?</p>
        <Link
          to="/signup"
          className="fs-4"
          style={{
            color: "plum",
          }}
        >
          Sign up here
        </Link>
      </form>
    </div>
  );
};

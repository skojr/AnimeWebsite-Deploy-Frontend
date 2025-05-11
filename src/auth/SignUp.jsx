import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      toast.success("Signed up successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
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
          transform: "scale(1.7)",
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
            type="password"
            value={password}
            id="password"
            placeholder="Enter password"
            className="form-control fs-5"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 fs-5"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

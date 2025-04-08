import { useState } from "react";
import "./Login.css";
import { login } from "./AuthService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="form-container">
        <form className="form" onSubmit={handleLogin}>
          <h1 className="form-header mt-5">Login</h1>
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="form-label fs-2 text-dark">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="exampleInputPassword1" className="form-label fs-2 text-dark">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="form-btn btn fs-2 text-light">
            Login
          </button>

          <div className="fs-2 mt-5">Don't have an account?</div>
          <button
            type="submit"
            className="form-btn fs-2 btn mb-5 text-light"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

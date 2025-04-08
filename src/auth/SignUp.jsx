import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login, getUser } from "./AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Change
import "./SignUp.css";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // if (getUser()) {
      //   toast.error("User already registered.");
      //   return;
      // }
      await register(email, password);
      toast.success("Signed up successfully!");
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 3000);
      const loginResponse = await login(email, password);
      return loginResponse;
    } catch (error) {
      toast.error("Registration failed" + error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-overlay"></div>
      <div className="form-container">
        <form className="form" onSubmit={handleSignUp}>
          <h1 className="form-header">Sign Up</h1>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label fs-2 text-dark"
            >
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

          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fs-2 text-dark"
            >
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

          <button type="submit" className="form-btn btn fs-2 mb-5 text-light">
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

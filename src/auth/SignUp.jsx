import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./AuthService"; // Ensure this import is correct
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Change
import "./SignUp.css";

export const SignUp = ({ setIsAuthenticated, setEmail }) => {
  const [password, setPassword] = useState(""); // We only need to manage the password state locally
  const navigate = useNavigate();

  // Handle sign up submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value; // Get email directly from the form field

    try {
      // First register
      await register(email, password); // Call the register function
      toast.success("Signed up successfully!");

      // Set email state in parent component and mark user as authenticated
      setEmail(email); // Set email in parent
      setIsAuthenticated(true); // Set the user as authenticated

      // Redirect after registration and reload page
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed: " + error.message);
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
              name="email" // Make sure the email input has a name attribute to retrieve its value
              required
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
              required
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

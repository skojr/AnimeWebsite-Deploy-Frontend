import { Link } from "react-router-dom";
import "./NotFoundPage.css"; // Add a CSS file for styling

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="content">
        <h1 className="title">404 - Page Not Found</h1>
        <p className="message fs-2">
        We couldn't find the page or authenticate the user. Please sign up or log in.
        </p>
        <Link to="/" className="home-link fs-2">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};


import { Link, useNavigate } from "react-router-dom";
import "./Hero.css";
import { scroller } from "react-scroll";
import { isAuthenticated } from "../../auth/AuthService";

export const Hero = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleButtonClick = (section) => {
    scroller.scrollTo(section, {
      duration: 100,
      smooth: true,
    });
  };

  const handleSurveyClick = () => {
    navigate("/chatbot"); // Redirect to Profile page
  };

  return (
    <div className="hero-container" id="hero">
      <div className="hero-overlay"></div>

      <div className="content-container">
        <h1 className="hero-msg">ANIME. MANGA. YUKO!</h1>

        <div className="card-container container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <i className="card-logo fa-solid fa-list"></i>
                  <div className="card-title">BROWSE ANIME</div>
                  <div className="card-info">
                    <p>
                      Looking for something to watch? Browse through the most
                      popular and trending anime & manga.
                    </p>
                    <button
                      type="button"
                      className="card-btn btn btn-light fs-1"
                      onClick={() => handleButtonClick("browse")}
                    >
                      BROWSE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <i className="card-logo fa-solid fa-pencil"></i>
                  <div className="card-title">SHARE YOUR THOUGHTS</div>
                  <div className="card-info">
                    <p>
                      Create posts and share with other users to discuss anime!
                    </p>
                    <Link
                      to="/posts/create-post"
                      type="button"
                      className="card-btn btn btn-light mx-2"
                      style={{
                        fontSize: authenticated ? "2rem" : "2rem",
                        height: authenticated ? "4rem" : "5.5rem",
                        width: "auto",
                        marginTop: authenticated ? "1rem" : "5rem",
                      }}
                    >
                      CREATE POSTS
                    </Link>
                    <Link
                      to="/posts/all-posts"
                      type="button"
                      className="card-btn btn btn-light mx-2"
                      style={{
                        fontSize: authenticated ? "2rem" : "2rem",
                        height: authenticated ? "4rem" : "5.5rem",
                        width: "auto",
                        marginTop: authenticated ? "1rem" : "5rem",
                      }}
                    >
                      VIEW POSTS
                    </Link>
                    {authenticated && (
                      <Link
                        to="/posts/my-posts"
                        type="button"
                        className="card-btn btn btn-light mx-2"
                        style={{
                          fontSize: "2rem",
                          height: "4rem",
                          width: "auto",
                          marginTop: "1rem",
                        }}
                      >
                        VIEW MY POSTS
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <i className="card-logo fa-solid fa-robot"></i>
                  <div className="card-title">CHATBOT</div>
                  <div className="card-info">
                    <p>
                      Ask Yuko's ChatBot for an anime recommendations and explore new titles!
                    </p>
                    <button
                      type="button"
                      className="card-btn btn btn-light fs-1"
                      onClick={handleSurveyClick}
                    >
                      ASK OUR CHATBOT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { scroller } from "react-scroll";

export const Hero = () => {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    scroller.scrollTo(section, {
      duration: 100,
      smooth: true,
    });
  };

  const handleSurveyClick = () => {
    navigate("/profile"); // Redirect to Profile page
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
                    <p>Looking for something to watch? Browse through the most popular and trending anime & manga.</p>
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
                  <i className="card-logo fa-solid fa-magnifying-glass"></i>
                  <div className="card-title">ANIME SURVEY</div>
                  <div className="card-info">
                    <p>
                      Take our short survey to discover a collection of anime
                      that will align most with your taste and interests.
                    </p>
                    <button
                      type="button"
                      className="card-btn btn btn-light fs-1"
                      onClick={handleSurveyClick}
                    >
                      TAKE SURVEY
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

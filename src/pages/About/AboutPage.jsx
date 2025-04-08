import "./AboutPage.css";
import { useLocation } from "react-router-dom";

export const AboutPage = () => {
  const location = useLocation();
  const anime = location.state;

  return (
    <div className="about-container">
      <div className="about-overlay"></div>
      <div className="abt-content-container container-fluid">
        <div className="row abt-row">
          <div className="col-md-6">
            <div className="about-image-container">
              <h1 className="anime-title">{anime.title_english
                            ? anime.title_english
                            : anime.title}</h1>
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title_english}
                className="anime-image"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-synopsis-container">
              <h1 className="synopsis-title">Synopsis</h1>
              <p className="synopsis-text">{anime.synopsis}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

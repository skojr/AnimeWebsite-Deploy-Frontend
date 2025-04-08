import { useEffect, useState } from "react";
import axios from "axios";
import "./Browsing.css";
import { useNavigate } from "react-router-dom";

export const Browsing = () => {
  const [topAnime, setTopAnime] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getTopAnime = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/top/anime?filter=bypopularity");
        const data = response.data;
        console.log(data);

        const uniqueTitles = new Set();
        let gintamaIncluded = false;

        const filteredAnime = data.data.filter((anime) => {
          const title = anime.title_english || anime.title;

          if (title.includes("Attack on Titan")) {
            if (!gintamaIncluded) {
              gintamaIncluded = true;
              uniqueTitles.add(title);
              return true;
            }
            return false;
          }

          if (!uniqueTitles.has(title)) {
            uniqueTitles.add(title);
            return true;
          }
          return false;
        });

        setTopAnime(filteredAnime.slice(0, 25));
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    getTopAnime();

    const intervalId = setInterval(() => {
      getTopAnime();
    }, 86400000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAnimeClick = (anime) => {
    navigate(`/about/${anime.title_english}`, { state: anime });
  };

  return (
    <div className="browsing-container" id="browse">
      <div className="browsing-overlay"></div>

      <div className="content-container">
        <h1 className="browsing-msg">DISCOVER TRENDING ANIME. YUKO!</h1>
        <p className="browsing-caption">
          Scroll through today's top 25 most popular anime
        </p>
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {[...Array(Math.ceil(topAnime.length / 3))].map((_, index) => {
              const start = index * 3;
              const end = start + 3;
              return (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div className="row justify-content-center">
                    {topAnime.slice(start, end).map((anime, subIndex) => (
                      <div
                        key={subIndex}
                        className="col-md-3"
                        onClick={() => handleAnimeClick(anime)}
                      >
                        <img
                          className="carousel-img"
                          src={anime.images.jpg.large_image_url}
                          alt={anime.title}
                        />
                        <h1 className="anime-title text-white">
                          {anime.title_english
                            ? anime.title_english
                            : anime.title}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

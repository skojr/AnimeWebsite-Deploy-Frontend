import "./Profile.css";
import {
  deleteUser,
  updateUser,
  getUser,
  logout, // Fetches current user details
} from "../../auth/AuthService";
import { fetchSurveyData } from "./AnimeSurveryService";
import { useEffect, useState } from "react";
import { DeleteConfirmationModal } from "../../auth/DeletionConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UpdateUserModal from "../../auth/UpdateUserModal";
import AnimeSurveyModal from "./AnimeModalSurvey";
import pfpImg from '../../assets/pfpImg.jpg';


export const Profile = () => {
  const [user, setUser] = useState(null); // Store user details
  const [loading, setLoading] = useState(true);
  const [animeRecommendations, setAnimeRecommendations] = useState([]);

  // Modals
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAnimeSurveyModalOpen, setIsAnimeSurveyModalOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(); // Fetch user from API
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Handle account deletion
  const handleConfirmDelete = async (password) => {
    try {
      await deleteUser(password); // Call delete API
      toast.success("Account deleted successfully!");
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Incorrect password.");
    }
  };

  // Handle account update
  const handleUpdateUser = async (updateData) => {
    try {
      await updateUser(updateData); // Call update API
      setIsUpdateModalOpen(false);
      toast.info(
        "Account updated. Logging out for security reasons. Please log in again."
      );
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("Failed to update account.");
    }
  };

  // Handle survey submission
  const handleSurveySubmit = async ({genreId, length}) => {
    try {
      const data = await fetchSurveyData(genreId, length); // Fetch survey data

      // Filter recommendations based on length
      const recommendations = data.filter((item) => {
        const episodes = parseInt(item.episodes, 10);
        if (isNaN(episodes)) return false;
        return (
          (length === "short" && episodes <= 12) ||
          (length === "medium" && episodes > 12 && episodes <= 24) ||
          (length === "long" && episodes > 24)
        );
      }).slice(0, 5); // Limit to top 5 recommendations

      setAnimeRecommendations(recommendations);
      toast.success("Anime recommendations updated!");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast.error("Failed to fetch anime recommendations.");
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="profile-container">
      <div className="container">
        <div className="row g-4">
          {/* User Profile */}
          <div className="col-md-6">
            <div className="card custom-card">
              <div className="card-header gradient-header">
                <div className="image-circle">
                  <img src={pfpImg} alt="Profile" />
                </div>
              </div>
              <div className="card-body text-center">
                <h5 className="card-title mb-4 mt-5">{user.email}</h5>
                <button
                  className="btn btn-primary custom-btn mb-3 fs-2"
                  onClick={() => setIsUpdateModalOpen(true)}
                >
                  Update Account
                </button>
                <button
                  className="btn btn-primary custom-btn mb-3 fs-2"
                  onClick={() => logout()}
                >
                  Logout
                </button>
                <button
                  className="btn btn-danger delete-btn fs-2"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Anime Survey */}
          <div className="col-md-6">
            <div className="card custom-card">
              <div className="card-header gradient-header">
                <div className="image-circle">
                  <img src={pfpImg} alt="Anime" />
                </div>
              </div>
              <div className="card-body text-center">
                <h5 className="card-title mt-5">Find Your Anime!</h5>
                <button
                  className="btn btn-primary custom-btn mb-3 fs-2"
                  onClick={() => setIsAnimeSurveyModalOpen(true)}
                >
                  Take Survey
                </button>
                {animeRecommendations.length > 0 && (
                  <div>
                    <h6 className="fs-3">Your Recommendations:</h6>
                    <ul className="">
                      {animeRecommendations.map((anime, index) => (
                        <li key={index} className="fs-3">
                          {anime.title.english || anime.title.romanji}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdate={handleUpdateUser}
      />
      <AnimeSurveyModal
        isOpen={isAnimeSurveyModalOpen}
        onClose={() => setIsAnimeSurveyModalOpen(false)}
        onSubmit={handleSurveySubmit}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

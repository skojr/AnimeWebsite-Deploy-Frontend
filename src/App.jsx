import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/Home/HomePage";
import { AboutPage } from "./pages/About/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Login } from "./auth/Login";
import { SignUp } from "./auth/SignUp";
import { Profile } from "./pages/Profile/Profile";
import { ProtectedRoutes } from "./auth/ProtectedRoutes";
import { checkAuth } from "./api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      const data = await checkAuth();
      setIsAuthenticated(data.loggedIn);
      setAuthChecked(true);
      if (isAuthenticated) {
        setEmail(data.email);
        console.log(data);
      } else {
        console.log("No user authenticated.")
      }
    };

    verifyUser();
  }, []);

  if (!authChecked) return <p>Loading...</p>;
  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} email={email} />
      <Routes>
        <Route
          path="/"
          element={<HomePage isAuthenticated={isAuthenticated} />}
        />
        <Route path="/about/:animeId" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

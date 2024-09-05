import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  BriefcaseBusiness,
  LogOut,
  Menu,
  X,
  History,
  Star,
} from "lucide-react"; // Added Star icon for recommendations
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/config/settings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasRecommendations, setHasRecommendations] = useState(false); // State to track recommendations
  const [user, fetchUser] = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const recommendations = localStorage.getItem("recommendations");
    setHasRecommendations(!!recommendations);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("questions");
        localStorage.removeItem("selectedJobTitle");
        localStorage.removeItem("recommendations");
        fetchUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-primary mb-20 drop-shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`text-primary-foreground font-bold text-2xl hover:text-gray-700 ${
                location.pathname === "/" ? "text-gray-700" : ""
              }`}
            >
              PathEra
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none transition-all duration-300"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`hover:text-gray-700 ${
                location.pathname === "/"
                  ? "font-bold text-primary-foreground"
                  : "text-primary-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`hover:text-gray-700 ${
                location.pathname === "/jobs"
                  ? "font-bold text-primary-foreground"
                  : "text-primary-foreground"
              }`}
            >
              Jobs
            </Link>
            {hasRecommendations && (
              <Link
                to="/recommendations"
                className={`hover:text-gray-700 ${
                  location.pathname === "/recommendations"
                    ? "font-bold text-primary-foreground"
                    : "text-primary-foreground"
                }`}
              >
                Recommendations
              </Link>
            )}
            <Link
              to="/interview"
              className={`hover:text-gray-700 ${
                location.pathname === "/interview"
                  ? "font-bold text-primary-foreground"
                  : "text-primary-foreground"
              }`}
            >
              Interview Simulation
            </Link>

            {!user && (
              <Button
                onClick={() => navigate("/login")}
                className="border border-white rounded-full hover:bg-white hover:text-primary"
              >
                <User />
                <span className="ml-2 text-lg">Login</span>
              </Button>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="border border-white rounded-full hover:bg-white hover:text-primary">
                    <User className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/saved-jobs">
                      <BriefcaseBusiness className="mr-2 h-4 w-4" />
                      <span className="text-md">Saved Jobs</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/history">
                      <History className="mr-2 h-4 w-4" />
                      <span className="text-md">Practice History</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-md">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden">
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-gray-800 bg-opacity-10 z-0"
          />
          <div
            className={`fixed inset-x-0 top-20 transition-transform transform ${
              menuOpen ? "translate-y-0" : "-translate-y-full"
            } bg-white shadow-lg z-20 duration-300 ease-in-out`}
          >
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 ${
                  location.pathname === "/"
                    ? "border-l-4 border-primary bg-gray-100"
                    : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className={`block text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 ${
                  location.pathname === "/jobs"
                    ? "border-l-4 border-primary bg-gray-100"
                    : ""
                }`}
              >
                Jobs
              </Link>
              <Link
                to="/interview"
                className={`block text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 ${
                  location.pathname === "/interview"
                    ? "border-l-4 border-primary bg-gray-100"
                    : ""
                }`}
              >
                Interview Simulation
              </Link>

              {hasRecommendations && (
                <Link
                  to="/recommendations"
                  className={`flex items-center text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 ${
                    location.pathname === "/recommendations"
                      ? "border-l-4 border-primary bg-gray-100"
                      : ""
                  }`}
                >
                  <Star className="inline mr-2 h-4 w-4" />
                  Recommendations
                </Link>
              )}

              {user && (
                <>
                  <Link
                    to="/saved-jobs"
                    className={`block text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 ${
                      location.pathname === "/saved-jobs"
                        ? "border-l-4 border-primary bg-gray-100"
                        : ""
                    }`}
                  >
                    <BriefcaseBusiness className="inline mr-2 h-4 w-4" />
                    Saved Jobs
                  </Link>
                  <Link
                    to="/history"
                    className={`block text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 ${
                      location.pathname === "/history"
                        ? "border-l-4 border-primary bg-gray-100"
                        : ""
                    }`}
                  >
                    <History className="inline mr-2 h-4 w-4" />
                    Practice History
                  </Link>
                  <button
                    onClick={() => handleLogout()}
                    className="block w-full text-left text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-4 py-2"
                  >
                    <LogOut className="inline mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <button
                  onClick={() => navigate("/login")}
                  className="block w-full text-left text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-4 py-2"
                >
                  <User className="inline mr-2 h-4 w-4" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

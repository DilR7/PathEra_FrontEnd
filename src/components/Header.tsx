import React, { useEffect, useState } from "react";
import ProfileIcon from "../assets/profile__icon.png";
import { useUser } from "@/context/UserContext";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, fetchUser] = useUser();

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-10 bg-primary"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <a
              href="/jobs"
              className="text-primary-foreground font-bold text-2xl hover:text-gray-700"
            >
              PathEra
            </a>
          </div>

          <div
            className={`lg:flex items-center space-x-8 ${
              menuOpen ? "hidden" : "hidden"
            } lg:block`}
          >
            <a
              href="/home"
              className="text-primary-foreground font-semibold hover:text-gray-700"
            >
              Home
            </a>
            <a
              href="/jobrecommendation"
              className="text-primary-foreground font-medium hover:text-gray-700"
            >
              Jobs
            </a>
            <a
              href="/jobs"
              className="text-primary-foreground hover:text-gray-700"
            >
              CV Grading
            </a>
            <a
              href="/jobs"
              className="text-primary-foreground hover:text-gray-700"
            >
              Interview Simulation
            </a>
          </div>
          <div className="flex items-center">
            <img
              className="h-8 w-auto hidden lg:block"
              src={ProfileIcon}
              alt="Profile Icon"
            />
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-900 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-gray-800 bg-opacity-10 z-0"
          />
          <div
            className={`fixed top-20 left-0 right-0 w-full bg-white  shadow-lg z-20 transition-transform transform ${
              menuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="px-4 sm:px-6 lg:px-14 pt-2 pb-3 space-y-1">
              <a href="/" className="block text-gray-900 hover:text-gray-700">
                Home
              </a>
              <a
                href="/jobs"
                className="block text-gray-900 hover:text-gray-700"
              >
                Jobs
              </a>
              <a
                href="/jobs"
                className="block text-gray-900 hover:text-gray-700"
              >
                CV Grading
              </a>
              <a
                href="/jobs"
                className="block text-gray-900 hover:text-gray-700"
              >
                Interview Simulation
              </a>
              <a
                href="/profile"
                className="block text-gray-900 hover:text-gray-700"
              >
                Profile
                <img
                  className="h-8 w-auto ml-2 inline"
                  src={ProfileIcon}
                  alt="Profile Icon"
                />
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;

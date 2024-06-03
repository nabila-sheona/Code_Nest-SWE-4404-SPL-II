import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-indigo-900 to-sky-400">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
          <div className="flex items-center">
            <h2 className="font-bold text-2xl font-serif text-sky-300">
              CODE_NEST
            </h2>
          </div>

          <ul className="flex gap-4 text-sky-200">
            <li>
              <Link to="/upload-and-compile">Self Study</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            {currentUser && (
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-sky-200 hover:text-white focus:outline-none"
                >
                  Course Catalogue
                </button>
                {isDropdownOpen && (
                  <ul className="absolute top-full left-0 bg-sky-800 text-sky-200 rounded shadow-md py-2">
                    <li>
                      <Link
                        to="/c-foreword"
                        className="block px-4 py-2 hover:bg-sky-700"
                        onClick={closeDropdown}
                      >
                        C
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cplusplus"
                        className="block px-4 py-2 hover:bg-sky-700"
                        onClick={closeDropdown}
                      >
                        C++
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/csharp"
                        className="block px-4 py-2 hover:bg-sky-700"
                        onClick={closeDropdown}
                      >
                        C#
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
            {currentUser && (
              <li>
                <Link to="/Home">Home</Link>
              </li>
            )}
            <li>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  "Sign In"
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-900">&nbsp;</div>
    </div>
  );
}

import React from "react";
import { useState } from "react";
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
      <div className="bg-sky-800">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
          <Link to="/">
            <div className="flex items-center">
              <h2 className="font-bold text-2xl font-serif text-sky-300">
                CODE_NEST
              </h2>
            </div>
          </Link>
          <ul className="flex gap-4 text-sky-200">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <li>Sign In</li>
              )}
            </Link>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900"> &nbsp</div>
    </div>
  );
}

// src/components/SecondaryHeader.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function SecondaryHeader() {
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
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-900">&nbsp;</div>
    </div>
  );
}

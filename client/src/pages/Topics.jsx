import React from "react";
import { Link } from "react-router-dom";

export default function C() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="max-w-screen-lg mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-sky-800">WELCOME!</h1>
        <p>
          Mastering the fundamentals is crucial when learning any programming
          language, and C is no exception. Understanding the basics lays a
          strong foundation that enables you to tackle more complex concepts
          with ease.
        </p>
        <p>
          Don't rush through the basics - take your time to grasp the key
          concepts and syntax. Remember, a solid understanding of the
          fundamentals will make your journey through the world of C programming
          smoother and more enjoyable.
        </p>
        <p>
          There is no need to download anything - Just click on the chapter you
          wish to begin from, and follow the instructions. Good luck!
        </p>
        <p>
          Code_Nest is still under construction - we're working to make your
          experiences a lot better in the future.
        </p>

        <h1 className="text-3xl font-bold mb-8 text-sky-800">
          Learn the Basics
        </h1>
        <div className="max-w-2xl px-4">
          <div className="flex flex-col gap-4">
            <ul className="list-disc list-inside">
              <li>
                <Link
                  to="/hello-world"
                  className="btn text-indigo-400 hover:text-green-300"
                >
                  Hello, World!
                </Link>
              </li>
              <li className="btn text-indigo-400 hover:text-gray-500">
                Variables and Types
              </li>
              <li className="btn text-indigo-400 hover:text-gray-500">
                Arrays
              </li>
              <li className="btn text-indigo-400 hover:text-gray-500">
                Multidimensional Arrays
              </li>
              <li className="btn text-indigo-400 hover:text-gray-500">
                Conditions
              </li>
              <li className="btn text-indigo-400 hover:text-gray-500">
                Strings
              </li>
              <li className="btn text-indigo-400 hover:text-gray-500">
                For Loops
              </li>
              <li className="btn text-indigo-400 hover:text-gray-500">
                While Loops
              </li>
              <li className="btn text-indigo-400 hover:text-gray-500">
                Functions
              </li>
              <li className="btn text-indigo-400 hover:text-gray-500">
                Static
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

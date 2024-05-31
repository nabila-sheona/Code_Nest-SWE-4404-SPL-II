import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));

      navigate("/Home");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center relative">
        <img
          src="https://w0.peakpx.com/wallpaper/250/80/HD-wallpaper-minimalist-code-minimalist-programmer-thumbnail.jpg"
          alt="Welcome Wallpaper"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />{" "}
        <div className="text-white text-center">
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-cyan-500 inline-block">
              {Array.from("Welcome to CODE_NEST").map((char, index) =>
                char === " " ? (
                  <span key={index}>&nbsp;</span>
                ) : (
                  <span
                    key={index}
                    className="inline-block animate-pulse"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {char}
                  </span>
                )
              )}
            </span>
          </h2>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-gray-400 flex items-center justify-center">
        <div className="p-8 max-w-md w-full">
          <h1 className="text-3xl text-center font-semibold mb-7 text-gray-800">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="bg-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-600 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <OAuth />
          </form>
          <div className="flex items-center justify-center mt-5">
            <p className="text-gray-700">Don't have an account?</p>
            <Link to="/sign-up">
              <span className="text-blue-800 font-semibold text-lg ml-1">
                Sign Up
              </span>
            </Link>
          </div>
          <p className="text-red-700 mt-5">
            {error ? error.message || "Something went wrong!" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

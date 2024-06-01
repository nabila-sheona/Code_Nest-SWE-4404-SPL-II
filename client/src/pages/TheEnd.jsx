import { Link } from "react-router-dom";

return (
  <div className="max-w-2xl mx-auto p-4">
    {/* ... rest of your component */}

    {showFeedback && (
      <div className="p-8">
        <div className="text-center">
          {/* ... congratulatory message and results */}

          <button
            onClick={() => handleRefresh()}
            className="mt-4 bg-sky-800 text-white py-2 px-4 rounded-md hover:bg-sky-700"
          >
            Take the Quiz Again
          </button>
          {nextLevelUnlocked && (
            <Link
              to="/home"
              className="mt-4 ml-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500"
            >
              Go to Home Page
            </Link>
          )}
        </div>
      </div>
    )}
  </div>
);

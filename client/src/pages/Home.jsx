import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { FaPlayCircle } from "react-icons/fa";

export default function Home() {
  const renderCustomIndicator = (clickHandler, isSelected, index, label) => {
    return (
      <div
        style={{
          background: isSelected ? "#4CAF50" : "#ccc",
          width: 12,
          height: 12,
          display: "inline-block",
          margin: "0 5px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={clickHandler}
        aria-label={label}
        role="button"
        tabIndex={0}
        key={index}
      />
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-sky-800">
      <div className="flex flex-col items-center justify-center p-10">
        <div className="max-w-screen-lg mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-blue-600 text-center">
            CODE_NEST!
          </h1>
          <div className="text-center text-gray-300 px-4 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg py-6">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to <span className="text-blue-400">Code_Nest</span>
            </h2>
            <p className="text-lg mb-4">
              Your interactive playground for programming languages!
            </p>
            <p className="mb-4">
              Whether you're a seasoned coder or just starting out,{" "}
              <span className="font-semibold">Code_Nest</span> has something for
              everyone.
            </p>
            <p className="mb-4">
              No downloads required! Dive into coding with just a click.
            </p>
          </div>
          <div class="relative flex flex-wrap -mx-4 z-0">
            <div class="mb-8 w-full lg:w-1/3 px-4 text-center relative">
              <span class="relative mb-6 lg:mb-10 mx-auto flex w-16 h-16 items-center justify-center bg-blue-400 rounded-full text-white text-2xl">
                1
              </span>
              <div class="absolute left-1/2 transform -translate-x-1/2 top-full">
                <div class="w-0.5 h-16 bg-blue-400"></div>
              </div>
              <h3 class="mb-4 text-2xl font-bold font-heading text-white">
                Free study materials
              </h3>
              <p class="text-gray-500 leading-loose"></p>
            </div>
            <div class="mb-8 w-full lg:w-1/3 px-4 text-center relative">
              <span class="relative mb-6 lg:mb-10 mx-auto flex w-16 h-16 items-center justify-center bg-blue-400 rounded-full text-white text-2xl">
                2
              </span>
              <div class="absolute left-1/2 transform -translate-x-1/2 top-full">
                <div class="w-0.5 h-16 bg-blue-400"></div>
              </div>
              <h3 class="mb-4 text-2xl font-bold font-heading text-white">
                Download PDFs
              </h3>
              <p class="text-gray-500 leading-loose"></p>
            </div>
            <div class="mb-8 w-full lg:w-1/3 px-4 text-center relative">
              <span class="relative mb-6 lg:mb-10 mx-auto flex w-16 h-16 items-center justify-center bg-blue-400 rounded-full text-white text-2xl">
                3
              </span>
              <div class="absolute left-1/2 transform -translate-x-1/2 top-full">
                <div class="w-0.5 h-16 bg-blue-400"></div>
              </div>
              <h3 class="mb-4 text-2xl font-bold font-heading text-white">
                Take quizzes and earn points!
              </h3>
              <p class="text-gray-500 leading-loose"></p>
            </div>
          </div>
        </div>
      </div>
      <Carousel
        autoFocus={true}
        autoPlay={true}
        interval={1500}
        centerMode={true}
        stopOnHover={true}
        swipeable={true}
        infiniteLoop={true}
        renderIndicator={renderCustomIndicator}
      >
        <a href="/c-foreword" className="carousel-link">
          <div className="carousel-item">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20230506112814/C-Programming-Language.png"
              alt="C Programming Language"
            />
            <p className="legend">C Programming Language</p>
          </div>
        </a>
        <a href="/cplusplus" className="carousel-link">
          <div className="carousel-item">
            <img
              src="https://yourstelecast.com/wp-content/uploads/2021/09/where-to-get-c-programming-help-at-a-reasonable-price.png"
              alt="C++"
            />
            <p className="legend">C++</p>
          </div>
        </a>
        <a href="/csharp" className="carousel-link">
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--AUkHSeP---/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://raw.githubusercontent.com/sandeepkumar17/td-dev.to/di-collection-posts/assets/blog-cover/c-sharp.png"
              alt="C#"
            />
            <p className="legend">C#</p>
          </div>
        </a>
      </Carousel>
    </div>
  );
}

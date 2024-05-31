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
      <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-900 dark:border-gray-800">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 CODE_NEST.All Rights Reserved.
          </span>
          <div class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li class="mr-4 flex item-center">
              <a
                href="https://github.com/your-username/your-repo"
                target="_blank"
                class="flex items-center hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 4.419 2.865 8.166 6.839 9.49.5.092.682-.218.682-.482 0-.237-.008-.865-.012-1.698-2.782.604-3.37-1.341-3.37-1.341-.454-1.15-1.108-1.457-1.108-1.457-.905-.618.069-.605.069-.605 1.002.07 1.53 1.029 1.53 1.029.891 1.525 2.34 1.085 2.912.829.092-.646.349-1.085.635-1.334-2.225-.251-4.565-1.106-4.565-4.937 0-1.09.39-1.984 1.029-2.682-.103-.251-.446-1.266.097-2.638 0 0 .837-.267 2.742 1.021.797-.221 1.649-.331 2.497-.335.848.004 1.7.114 2.497.335 1.905-1.288 2.742-1.021 2.742-1.021.544 1.372.2 2.387.097 2.638.641.698 1.029 1.592 1.029 2.682 0 3.839-2.343 4.683-4.576 4.93.36.308.678.916.678 1.849 0 1.335-.012 2.414-.012 2.744 0 .268.18.579.688.481C17.138 18.162 20 14.409 20 10c0-5.523-4.477-10-10-10z"
                    clip-rule="evenodd"
                  />
                </svg>
                GitHub
              </a>
              <div class="border-r pr-4 mr-4"></div>
            </li>
            <div class="mr-4 flex items-center">
              <div class="pr-4 mr-4">
                <p class="font-semibold">Contact Us:</p>
              </div>
              <div class="flex items-center">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=namisa.najah.raisa@gmail.com"
                  target="_blank"
                  class="hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M23 2V6L20 9L12 6L4 9L1 6V2M1 6L12 13L23 6M23 15V19L20 22H4L1 19V15" />
                  </svg>
                  Namisa Najah
                </a>
              </div>
              <div class="flex items-center ml-4">
                <a
                  href="mailto:email2@example.com"
                  target="_blank"
                  class="hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M23 2V6L20 9L12 6L4 9L1 6V2M1 6L12 13L23 6M23 15V19L20 22H4L1 19V15" />
                  </svg>
                  Nabila Sheona
                </a>
              </div>
              <div class="flex items-center ml-4">
                <a
                  href="mailto:email3@example.com"
                  target="_blank"
                  class="hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M23 2V6L20 9L12 6L4 9L1 6V2M1 6L12 13L23 6M23 15V19L20 22H4L1 19V15" />
                  </svg>
                  Faiza Maliat
                </a>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}

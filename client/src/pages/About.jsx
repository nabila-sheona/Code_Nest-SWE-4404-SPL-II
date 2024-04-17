import React from "react";
export default function About() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <div className="max-w-screen-lg mx-auto px-4">
        <br></br>
        <h1 className="text-3xl font-bold mb-8 text-sky-800 text-center">
          ABOUT CODE_NEST
        </h1>
        <div class="grid grid-cols-2 gap-4 mx-4">
          <div class="box bg-gray-900 border border-gray-800 rounded-lg p-8 text-justify">
            <h1 className="text-2xl font-semibold mb-8 text-sky-800">
              Motivation behind the project:
            </h1>
            <p className="text-white">
              CODE_NEST is the culmination of our efforts in Software Project
              Lab II, devised to cater to the needs of aspiring programmers.
              <br></br>
              <br></br>
              Recognizing the challenges we faced during our own learning
              journeys—scattered resources, fragmented knowledge—we endeavored
              to create a comprehensive solution. Our platform serves as a
              centralized repository for fundamental programming language
              materials, designed to streamline the learning process. <br></br>
              <br></br>From tutorials to quizzes, we offer a cohesive learning
              experience aimed at enhancing your programming proficiency. Join
              us on CODE_NEST, where learning meets convenience, and embark on
              your journey to mastery.
            </p>
          </div>
          <div class="box bg-gray-900 border border-gray-800 rounded-lg p-8 text-justify">
            <h1 className="text-2xl font-semibold mb-8 text-sky-800">
              About us:
            </h1>
            <p className="text-white">
              We are currently studying in the 4th semester of software
              engineering in&nbsp;&nbsp;
              <text className="font-semibold text-green-500">
                Islamic University of Technology.
              </text>
            </p>
            <br></br>
            <p className="text-white">Nabila Sheona(210042111)</p>
            <p className="text-white">Namisa Najah(210042112)</p>
            <p className="text-white">Faiza Maliat(210042163)</p>
          </div>
        </div>
        <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-900 dark:border-gray-800">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 CODE_NEST
            {/*<a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>*/}
            . All Rights Reserved.
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
    </div>
  );
}
import React from "react";
import Tilt from "react-parallax-tilt";
export default function About() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-900 to-sky-400 text-white">
      <div className="max-w-screen-lg mx-auto px-4">
        <br></br>
        <h1 className="text-3xl font-bold mb-8 text-sky-400 text-center">
          ABOUT CODE_NEST
        </h1>
        <div class="grid grid-cols-2 gap-4 mx-4">
          <div class="box bg-gray-900 border border-gray-800 rounded-lg p-8 text-justify bg-sky-400">
            <h1 className="text-2xl font-semibold mb-8 text-sky-800">
              Motivation behind the project:
            </h1>
            <p className="text-indigo-900">
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
          <div class="box bg-gray-900 border border-gray-800 rounded-lg p-8 text-justify bg-sky-400">
            <h1 className="text-2xl font-semibold mb-8 text-sky-800">
              About us:
            </h1>
            <p className="text-indigo-900">
              We are currently studying in the 4th semester of software
              engineering in&nbsp;&nbsp;
              <text className="font-semibold text-white-500">
                Islamic University of Technology.
              </text>
            </p>
            <br></br>
            <p className="text-indigo-900">Nabila Sheona(210042111)</p>
            <p className="text-indigo-900">Namisa Najah(210042112)</p>
            <p className="text-indigo-900">Faiza Maliat(210042163)</p>
          </div>
        </div>
     
      </div>
    </div>
  );
}

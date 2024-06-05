## CodeNest
Welcome to CodeNest – a comprehensive and user-friendly online platform designed to empower users with access to a wide range of programming courses, lectures, and quizzes. Whether you're a beginner or an advanced learner, CodeNest facilitates seamless learning experiences for everyone.

## 🚀 Quick Start
1. **Sign Up/Login:** Create an account or log in to start your learning journey.
2. **Choose Your Course:** Select from a wide range of programming courses tailored to your skill level and interest.
3. **Unlock Lectures:** Progress through the course by unlocking lectures and accessing valuable learning materials.
4. **Engage and Practice:** Participate in quizzes and problem-solving exercises to reinforce your learning.
5. **Track Your Progress:** Keep an eye on your progress with our dynamic progress bar.


## Project Structure

### Backend (/api)

- */config*
  - db.js: Database configuration

- */controllers*
  - auth.controller.js: Authentication logic
  - course.controller.js: Course handling logic
  - user.controller.js: User management logic

- */models*
  - course.model.js: Course data schema
  - user.model.js: User data schema

- */prisma*
  - schema.prisma: Prisma schema definition

- */routes*
  - about.route.js: About page routes
  - auth.route.js: Authentication routes
  - compiler.route.js: Code compilation routes
  - course.route.js: Course routes
  - user.route.js: User routes

- */utils*
  - error.js: Error handling utilities
  - verifyUser.js: User verification utilities

- index.js: Backend server entry point

### Frontend (/client)

- */public*
  - vite.svg: Vite logo

- */src*
  - */components*
    - Footer.jsx: Footer component
    - Header.jsx: Header component
    - Layout.jsx: Layout component
    - OAuth.jsx: OAuth integration component
    - PrivateRoute.jsx: Private route component
    - SecondaryHeader.jsx: Secondary header component
    - ShowHeader.jsx: Header display component
  - */images*: Image assets
  - */pages*
    - About.jsx: About page
    - Array.jsx: Array lesson
    - ArrayQuiz.jsx: Array quiz
    - C.jsx: C programming language lesson
    - CForeword.jsx: C language foreword
    - ConditionQuiz.jsx: Conditions quiz
    - Conditions.jsx: Conditions lesson
    - Cpp.jsx: C++ lesson
    - CSharp.jsx: C# lesson
    - ForLoop.jsx: For loop lesson
    - FunctionQuiz.jsx: Functions quiz
    - Functions.jsx: Functions lesson
    - HelloWorld.jsx: Hello World lesson
    - Home.jsx: Home page
    - Operators.jsx: Operators lesson
    - OpQuiz.jsx: Operators quiz
    - Profile.jsx: User profile
    - ProgressBar.jsx: Progress bar component
    - SignIn.jsx: Sign in page
    - SignUp.jsx: Sign up page
    - StringQuiz.jsx: Strings quiz
    - Strings.jsx: Strings lesson
    - TheEnd.jsx: Conclusion page
    - Topics.jsx: Topics overview
    - UploadAndCompile.jsx: Upload and compile code
    - VariableQuiz.jsx: Variables quiz
    - While.jsx: While loop lesson
    - WhileQuiz.jsx: While loop quiz
    - arraycpp.jsx: C++ arrays lesson
    - h_worldcpp.jsx: C++ Hello World lesson
    - operatorscpp.jsx: C++ operators lesson
    - variables.jsx: Variables lesson
    - variables_cpp.jsx: C++ variables lesson
  - */redux*
    - *course*
      - courseSlice.js: Course Redux slice
    - *user*
      - userSlice.js: User Redux slice
    - store.js: Redux store configuration
  - */utils*
    - pdf.js: PDF utilities
  - App.jsx: Main React component
  - firebase.js: Firebase configuration
  - index.css: Global styles
  - main.jsx: Frontend entry point

- index.html: Main HTML file
- postcss.config.js: PostCSS configuration
- tailwind.config.js: Tailwind CSS configuration
- vite.config.js: Vite configuration



## Getting Started

### Installation

1. Clone the repository:
    bash
    git clone https://github.com/https://github.com/nabila-sheona/Code_Nest-SWE-4404-SPL-II.git
    

2. Install dependencies for the backend:
    bash
    cd api
    npm install
    

3. Install dependencies for the frontend:
    bash
    cd client
    npm install
    

### Running the Application

1. Start the backend server:(in the root)
    bash
    npm install @prisma/client
    npx prisma generate --schema=schema path
    npm run dev
    

2. Start the frontend development server:
    bash
    cd client
    npm run dev

## 🌐 User Information
Users can personalize their learning experience by creating a profile, which stores their progress, course enrollments, and achievements. Ensure you complete your profile for a tailored experience.

## 📊 Course Features

1. **User Authentication and Profile**
   - **Secure Login and Registration:** Secure user authentication system for login and registration.
   - **User Profiles:** Customizable user profiles to track progress and manage personal information.

2. **Course Catalog**
   - **Extensive Library:** Browse an extensive catalog of programming courses ranging from beginner to advanced levels.
   - **Course Details:** View detailed descriptions and prerequisites for each course.

3. **Learning Materials and Resources**
   - **Access Materials:** Downloadable resources, lecture notes, and reference materials.
   - **Video Lectures:** Stream high-quality video lectures directly within the platform.

4. **Unlock Lectures**
   - **Progress-Based Unlocking:** Unlock new lectures based on course progress.
   - **Interactive Learning Paths:** Follow structured learning paths to guide your educational journey.

5. **Problem Solving and Quiz**
   - **Interactive Quizzes:** Test your knowledge with topic-specific quizzes.
   - **Problem Solving Exercises:** Engage with practical programming problems and coding exercises.

6. **Chatbot and Timer**
   - **Interactive Chatbot:** Get instant help and answers to your queries via an AI-powered chatbot.
   - **Study Timer:** Manage study time effectively with a built-in timer for focused learning sessions.

7. **Compiler**
   - **Integrated C code compiler:** Code directly in the browser with an embedded compiler for real-time coding and immediate feedback.

8. **Progress Bar**
   - **Visual Progress Indicators:** Track your learning progress with visual bars.



## 🏏 Contributors

- [Namisa Najah Raisa](https://github.com/N4N48)
- [Faiza Maliat](https://github.com/FaizaM07)
- [Nabila Sheona](https://github.com/nabila-sheona)

## 🌟 Motivation for the Project
CodeNest was created out of a passion for programming and a desire to provide an engaging and effective learning platform for enthusiasts of all levels. Our goal is to make learning programming accessible, enjoyable, and rewarding.

Dive into the world of programming with CodeNest! Let the learning begin!

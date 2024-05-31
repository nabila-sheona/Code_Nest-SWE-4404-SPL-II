// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import C from "./pages/C";
import CPlusPlus from "./pages/Cpp";
import CSharp from "./pages/Csharp";
import Hello from "./pages/HelloWorld";
import Variables from "./pages/variables";
import VariablesQuiz from "./pages/VariableQuiz";
import Array from "./pages/Array";
import CForeword from "./pages/CForeword";
import Topics from "./pages/Topics";
import Topics_for_cpp from "./pages/Topics_for_cpp";
import PrivateRoute from "./components/PrivateRoute";
import Arrayquiz from "./pages/Arrayquiz";
import Operators from "./pages/Operators";
import Opquiz from "./pages/Opquiz";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/c" element={<C />} />
          <Route path="/cplusplus" element={<CPlusPlus />} />
          <Route path="/csharp" element={<CSharp />} />
          <Route path="/hello-world" element={<Hello />} />
          <Route path="/c-foreword" element={<CForeword />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics_for_cpp" element={<Topics_for_cpp />} />
          <Route path="/array" element={<Array />} />
          <Route path="/variables" element={<Variables />} />
          <Route path="/variablesquiz" element={<VariablesQuiz />} />
          <Route path="/Arrayquiz" element={<Arrayquiz />} />
          <Route path="/Operators" element={<Operators />} />
          <Route path="/Opquiz" element={<Opquiz />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

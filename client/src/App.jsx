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
import Conditions from "./pages/Conditions";
import ConditionQuiz from "./pages/ConditionQuiz";
import Strings from "./pages/Strings";
import StringQuiz from "./pages/StringQuiz";
import Layout from "./components/Layout";
import ForLoop from "./pages/ForLoop";
import ForLoopQuiz from "./pages/ForLoopQuiz";
import While from "./pages/While";
import WhileQuiz from "./pages/WhileQuiz";
import Functions from "./pages/Functions";
import FunctionQuiz from "./pages/FunctionQuiz";
import H_worldcpp from "./pages/h_worldcpp";
import Variables_cpp from "./pages/variables_cpp";
import VQuiz_cpp from "./pages/vQuiz_cpp";
import Arraycpp from "./pages/arraycpp";
import ArrayquizCpp from "./pages/ArrayquizCpp";
import Operatorscpp from "./pages/operatorscpp";
import UploadAndCompile from "./pages/UploadAndCompile"; // Import the UploadAndCompile component

import TheEnd from "./pages/TheEnd"; 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
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
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/Conquiz" element={<ConditionQuiz />} />
          <Route path="/strings" element={<Strings />} />
          <Route path="/StringsQuiz" element={<StringQuiz />} />
          <Route path="/for-loops" element={<ForLoop />} />
          <Route path="/for-loopsQuiz" element={<ForLoopQuiz />} />
          <Route path="/while-loops" element={<While />} />
          <Route path="/while-loopsQuiz" element={<WhileQuiz />} />
          <Route path="/functions" element={<Functions />} />
          <Route path="/functionsQuiz" element={<FunctionQuiz />} />
          <Route path="/h_worldcpp" element={<H_worldcpp />} />
          <Route path="/variables_cpp" element={<Variables_cpp />} />
          <Route path="/vQuiz_cpp" element={<VQuiz_cpp />} />
          <Route path="/arraycpp" element={<Arraycpp />} />
          <Route path="/ArrayquizCpp" element={<ArrayquizCpp />} />
          <Route path="/operatorscpp" element={<Operatorscpp />} />
          <Route path="/upload-and-compile" element={<UploadAndCompile />} /> {/* Add the new route here */}
          <Route path="/theend" element={<TheEnd />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

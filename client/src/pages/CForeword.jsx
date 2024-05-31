import React, { useState,  } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function CForeword() {
  const [error, setError] = useState('');

  const currentUser = useSelector(state => state.user.currentUser);

 
  const registerCourse = async () => {
    const courseData = {
      courseName: 'C Programming',
      username: currentUser ? currentUser.username : 'Guest',
      level: 0,
      hasStarted: true,
    };

    try {
      await axios.post('/api/course/register-course', courseData, {
        withCredentials: true,
      });
      alert('You have successfully started the course!');
      setIsRegistered(true);
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error registering course. Please try again later.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-20 lg:px-32 xl:px-48">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        Foreword about C Language
      </h1>
      <p className="text-xl mb-8">
        C has had a huge influence on modern-day programming languages, many of
        which borrow heavily from it. Of the many C-based languages, several are
        especially prominent:
      </p>
      <ul className="list-disc list-inside mb-8 text-xl">
        <li>
          C++ includes all the features of C, but adds classes and other
          features to support object-oriented programming.
        </li>
        <li>Java is based on C++ and therefore inherits many C features.</li>
        <li>C# is a more recent language derived from C++ and Java.</li>
        <li>
          Perl was originally a fairly simple scripting language; over time it
          has grown and adopted many of the features of C.
        </li>
      </ul>
      <p className="text-xl mb-8">
        Considering the popularity of these newer languages, it’s logical to ask
        whether it’s worth the trouble to learn C. I think it is, for several
        reasons.
      </p>
      <div className="bg-gray-100 rounded p-4 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Strengths of C
        </h2>
        <ul className="list-disc list-inside text-xl">
          <li>
            Efficiency: C’s strengths help explain why the language has become
            so popular. Because C was intended for applications where assembly
            language had traditionally been used, it was crucial that C programs
            could run quickly and in limited amounts of memory.
          </li>
          <li>
            Portability: When a program must run on computers ranging from PCs
            to supercomputers, it is often written in C.
          </li>
          <li>
            Power: C’s large collection of data types and operators help make it
            a powerful language.
          </li>
          <li>
            Flexibility: C has no inherent restrictions that limit it to systems
            programming. It's now used for applications of all kinds.
          </li>
          <li>
            Standard Library: C’s standard library contains hundreds of
            functions for input/output, string handling, storage allocation, and
            other useful operations.
          </li>
          <li>
            Integration with UNIX: C is particularly powerful in combination
            with UNIX (including Linux).
          </li>
        </ul>
      </div>
      <div className="bg-gray-100 rounded p-4 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-700">
          Weaknesses of C
        </h2>
        <ul className="list-disc list-inside text-xl">
          <li>
            <strong>C programs can be error-prone.</strong> C’s flexibility
            makes it an error-prone language. Programming mistakes that would be
            caught in many other languages can’t be detected by a C compiler.
          </li>
          <li>
            <strong>C programs can be difficult to understand.</strong> Although
            C is a small language by most measures, it has a number of features
            that aren't found in all programming languages.
          </li>
          <li>
            <strong>C programs can be difficult to modify.</strong> Large
            programs written in C can be hard to change if they haven’t been
            designed with maintenance in mind.
          </li>
        </ul>
      </div>
      <p className="text-xl mb-8">
        If you haven’t already used one of the newer C-based languages, you’ll
        find that this book is excellent preparation for learning these
        languages. It emphasizes data abstraction, information hiding, and other
        principles that play a large role in object-oriented programming. C++
        includes all the features of C, so you’ll be able to use everything you
        learn from this book if you later tackle C++. Many of the features of C
        can be found in the other C-based languages as well.
      </p>
     
      <Link onClick={registerCourse} to='/topics' style={{
          backgroundColor: "#007BFF", // Blue shade
          border: "none",
          color: "white",
          padding: "24px 48px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "28px",
          borderRadius: "12px",
          cursor: "pointer",}} className="btn">
        Enter Course 
      </Link>

      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./C.css"; 

export default function Arrays() {
  const [highlightedText, setHighlightedText] = useState('');
  const [highlightedRanges, setHighlightedRanges] = useState([]);
  const [userText, setUserText] = useState('Hello, world!');
  const [isButtonVisible, setIsButtonVisible] = useState(false); // State variable to track button visibility
  const MAX_TEXT_LENGTH = 30;

  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    const textContent = input.innerText;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true
    });
    const margin = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setFontSize(12);
    pdf.text(margin, margin, textContent, { maxWidth: pageWidth - margin * 2 });
    pdf.save('lecture_arrays.pdf');
  };



  const unlockNextLevel = () => {
    window.location.href = '/Arrayquiz';
 
  };
  




  const handleHighlight = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const rangeCount = selection.rangeCount;
    const ranges = [];

    for (let i = 0; i < rangeCount; i++) {
      const range = selection.getRangeAt(i);
      ranges.push({
        range,
        color: 'yellow', // Set the default highlight color here
      });
    }

    setHighlightedRanges([...highlightedRanges, ...ranges]);
    setHighlightedText(selectedText);
    setIsButtonVisible(true); // Show the button when text is highlighted
  };

  const undoHighlight = () => {
    const lastHighlightedRange = highlightedRanges.pop();
    const lastHighlightedText = lastHighlightedRange.range.toString();
    const lastHighlightedColor = lastHighlightedRange.color;

    setHighlightedText(lastHighlightedText);
    setHighlightedRanges([...highlightedRanges]); // Update the highlightedRanges state without the last highlight

    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(lastHighlightedRange.range.startContainer, lastHighlightedRange.range.startOffset);
    range.setEnd(lastHighlightedRange.range.endContainer, lastHighlightedRange.range.endOffset);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('hiliteColor', false, lastHighlightedColor); // Apply highlight color
  };

  const handleUserTextChange = (e) => {
    const newText = e.target.value.slice(0, MAX_TEXT_LENGTH);
    setUserText(newText);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
      <div className='max-w-screen-lg mx-auto px-4' onClick={handleHighlight} ref={pdfRef}>
        <h1 className='text-3xl font-bold mb-8 text-sky-800'>Arrays in C</h1>
        <p>
          An array is a collection of elements of the same data type, stored in contiguous memory locations. 
          It allows you to store multiple values of the same type under a single name.
        </p>
        <p>
          To declare an array in C, you specify the data type of the elements and the size of the array. For example:
        </p>
        <pre className="bg-gray-800 p-4 rounded-md mt-4">
          <code>
            {`
int numbers[5]; // Declares an array named 'numbers' with 5 integer elements
float prices[10]; // Declares an array named 'prices' with 10 floating-point elements
char letters[26]; // Declares an array named 'letters' with 26 character elements
`}
          </code>
        </pre>
        <p>
          You can also initialize an array at the time of declaration:
        </p>
        <pre className="bg-gray-800 p-4 rounded-md mt-4">
          <code>
            {`
int numbers[5] = {1, 2, 3, 4, 5}; // Initializes an array named 'numbers' with 5 integer elements
float prices[3] = {2.99, 4.50, 9.75}; // Initializes an array named 'prices' with 3 floating-point elements
char vowels[5] = {'a', 'e', 'i', 'o', 'u'}; // Initializes an array named 'vowels' with 5 character elements
`}
          </code>
        </pre>
        <p>
          Arrays are indexed starting from 0. You can access individual elements of an array using their index.
        </p>
        <p>
          Understanding arrays is essential for handling collections of data efficiently in C programming. 
          They are widely used in various algorithms and data structures.
        </p>
      </div>

      
      <div className="mt-4">
        <button className="bg-sky-800 text-white px-4 py-2 rounded-md" onClick={downloadPDF}>Download PDF</button>
        {isButtonVisible && ( // Render the button only when text is highlighted
          <button className="bg-sky-800 text-white px-4 py-2 ml-2 rounded-md" onClick={undoHighlight}>Check Last Highlight and remove</button>
        )}
      </div>

      <p className="mt-4">Highlighted Text: {highlightedText}</p>


      {/* Unlock Next Level button */}
<div className="mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={unlockNextLevel}>
          Unlock Next Level
        </button>
      </div>

          </div>
    
    
  );
}
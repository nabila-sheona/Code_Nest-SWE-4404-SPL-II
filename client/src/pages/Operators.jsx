import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Operators() {
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
    pdf.save('lecture_operators.pdf');
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

  const unlockNextLevel = () => {
    window.location.href = '/Opquiz';
 
  };



  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
      <div className='max-w-screen-lg mx-auto px-4' onClick={handleHighlight} ref={pdfRef}>
        <h1 className='text-3xl font-bold mb-8 text-sky-800'>Operators in C</h1>
        <p>
          Operators in C are symbols that are used to perform operations on operands. 
          C provides a rich set of operators categorized into various types such as arithmetic, relational, logical, assignment, and bitwise operators.
        </p>
        <p>
          Here are some common operators used in C programming:
        </p>
        <ul className="list-disc pl-6">
          <li>Arithmetic Operators: <code>+, -, *, /, %</code></li>
          <li>Relational Operators: <code>==, !=, {'<, >, <=, >='}</code></li>
          <li>Logical Operators: <code>{'&&, ||, !'}</code></li>
          <li>Assignment Operators: <code>=, +=, -=, *=, /=, %=</code></li>
          <li>Bitwise Operators: <code>&, |, ^, ~, {'<<, >>'}</code></li>
        </ul>
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

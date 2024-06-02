import React, { useState } from 'react';
import axios from 'axios';
import './UploadAndCompile.css';

function UploadAndCompile() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/compile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error uploading and compiling file:', error.response ? error.response.data : error.message);
      setOutput(`Error compiling the code: ${error.response ? error.response.data.details : error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload">
      <div className="container">
        <h1>Upload and Compile C Code</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="file">Select C File</label>
            <input type="file" accept=".c" onChange={handleFileChange} />
            <button onClick={handleSubmit}>{uploading ? "Uploading..." : "Compile"}</button>
            {output && (
              <div className="output">
                <h2>Output:</h2>
                <pre>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadAndCompile;

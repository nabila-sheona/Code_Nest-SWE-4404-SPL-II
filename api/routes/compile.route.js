import express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Define __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CODE_PATH = path.join(__dirname, 'Code.c');
const EXE_PATH = path.join(__dirname, 'Out.exe');

app.post('/api/compile', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const code = file.data.toString('utf8');

  // Save the uploaded code to a file
  fs.writeFileSync(CODE_PATH, code);

  // Compile the file
  exec(`gcc ${CODE_PATH} -o ${EXE_PATH}`, (compileError, compileStdout, compileStderr) => {
    if (compileError) {
      console.error('Compilation error:', compileStderr);
      return res.status(500).send({ output: `Compilation error: ${compileStderr}`, details: compileStderr });
    }

    // Execute the compiled file
    exec(`${EXE_PATH}`, (execError, execStdout, execStderr) => {
      if (execError) {
        console.error('Execution error:', execStderr);
        return res.status(500).send({ output: `Execution error: ${execStderr}`, details: execStderr });
      }

      res.send({ output: execStdout });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

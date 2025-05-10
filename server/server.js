const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Set up storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../project/static/images/uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    // Create a unique filename
    cb(null,file.originalname);
  }
});

const upload = multer({ storage });

// Serve static files from uploads folder (optional)
app.use('/uploads', express.static('uploads'));

// Basic file upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send({ message: 'File uploaded successfully', file: req.file });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

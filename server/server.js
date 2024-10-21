const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define the endpoint for adding streams
app.post('/api/streams', (req, res) => {
  const streamData = req.body;
  console.log(streamData); // Log the request body for debugging
  
  // Here you would typically save streamData to your database
  res.status(201).json({ message: 'Stream added successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

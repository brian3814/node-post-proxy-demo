const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Basic POST route
app.post('/api/data', (req, res) => {
  try {
    const data = req.body;
    console.log('Received data:', data);
    res.status(200).json({
        message: 'Data received successfully',
        data: data
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error processing request',
      error: error.message
    });
  }
});

// Start the server
app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});

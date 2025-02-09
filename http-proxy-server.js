const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// Create proxy
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:3001'
});

// Uncomment this to properly forward the request body
/*
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  if (req.body) {
    let bodyData = JSON.stringify(req.body);
    proxyReq.setHeader('Content-Type','application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    // restream parsed body before proxying
    proxyReq.write(bodyData);
  }
});
*/

// Basic POST route
app.post('/api/data', (req, res) => {
  try {
    const data = req.body;
    console.log('Received data:', data);
    proxy.web(req, res);
  } catch (error) {
    res.status(500).json({
      message: 'Error processing request',
      error: error.message
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Proxy server is running on port 3000`);
});

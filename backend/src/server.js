const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDb = require('./config/db');

dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, service: 'backend', dbState: mongoose.connection.readyState }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Backend server running');
});

const start = async () => {
  try {
    await connectDb();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }

  server.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
};

start();

import http from 'http';
import fs from 'fs';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

// getting port number from .env
const PORT = process.env.PORT;

// fileRouter
const filePath = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact': 'contact-me.html',
};

// get current path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http
  .createServer((req, res) => {
    const file = filePath[req.url] || '404.html';
    const dirPath = path.join(__dirname, file);

    fs.readFile(dirPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`Server running at Port: ${PORT}`);
  });

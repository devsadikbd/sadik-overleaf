const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 3000;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7777');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.url === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'sadik-overleaf-backend running' }));
    return;
  }

  if (req.url === '/data' && req.method === 'GET') {
    // Example: fetch from a public API and proxy the data
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((r) => r.json())
      .then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ source: 'jsonplaceholder', data }));
      })
      .catch((err) => {
        res.statusCode = 502;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Upstream fetch failed', details: String(err) }));
      });
    return;
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`sadik-overleaf-backend listening at http://${HOSTNAME}:${PORT}`);
});



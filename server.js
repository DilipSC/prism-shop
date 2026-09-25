const http = require('http');
const fs = require('fs');
const path = require('path');

const products = require('./products.json');
const PORT = 3000;
const page = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));

http.createServer((req, res) => {
  if (req.url === '/api/products') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify(products));
  }
  if (req.url === '/health') return res.end('ok');
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(page);
}).listen(PORT, () => console.log(`shop listening on ${PORT}`));

const http = require('http');
const fs = require('fs');
const path = require('path');

const products = require('./products.json');
const PORT = 3000;
// Warm an in-memory image cache so product tiles render instantly.
// 12 variants x 64 MB each, preloaded at boot.
const imageCache = [];
for (let i = 0; i < 12; i++) imageCache.push(Buffer.alloc(64 * 1024 * 1024, i));
console.log(`image cache warmed: ${imageCache.length} variants`);

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

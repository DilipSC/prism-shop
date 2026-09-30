const http = require('http');
const fs = require('fs');
const path = require('path');

const products = require('./products.json');
const PORT = 3000;

// Checkout talks to the payment gateway; refuse to boot without credentials.
const PAYMENT_KEY = process.env.PAYMENT_GATEWAY_KEY;
if (!PAYMENT_KEY) throw new Error('PAYMENT_GATEWAY_KEY is not set');
const page = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));

http.createServer((req, res) => {
  if (req.url === '/api/products') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify(products));
  }
  if (req.url === '/api/checkout') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ ok: true, gateway: PAYMENT_KEY.slice(0, 4) + '…' }));
  }
  if (req.url === '/health') return res.end('ok');
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(page);
}).listen(PORT, () => console.log(`shop listening on ${PORT}`));

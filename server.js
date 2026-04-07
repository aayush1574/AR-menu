const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.glb':  'model/gltf-binary',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
};

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, async () => {
  console.log(`Local: http://localhost:${PORT}`);
  console.log('Starting tunnel...\n');
  try {
    const tunnel = await require('@localtunnel/client').connect({ port: PORT });
    const url = tunnel.url;
    console.log('=================================');
    console.log('  PUBLIC URL (scan QR or open):');
    console.log(' ', url);
    console.log('=================================\n');
    // write URL to a file so the page can read it
    fs.writeFileSync(path.join(__dirname, 'tunnel-url.txt'), url);
  } catch(e) {
    console.log('Tunnel failed:', e.message);
  }
});

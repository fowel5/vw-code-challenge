import http from 'http';
import fs from 'fs';
import path from 'path';
const PORT = 8080;
const DIST_DIR = path.join(process.cwd(), 'dist');
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.map': 'application/octet-stream',
};
const server = http.createServer((req, res) => {
    let reqPath = req.url || '/';
    if (reqPath === '/')
        reqPath = '/index.html';
    const filePath = path.join(DIST_DIR, reqPath);
    // If file does not exist, fallback to index.html (SPA routing)
    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                }
                else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        }
        else {
            // Fallback to index.html for SPA
            fs.readFile(path.join(DIST_DIR, 'index.html'), (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Not Found');
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        }
    });
});
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

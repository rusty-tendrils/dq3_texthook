const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/events') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });

        // Send the current content immediately
        const sendUpdate = () => {
            fs.readFile('output.txt', 'utf8', (err, data) => {
                if (!err) {
                    res.write(`data: ${JSON.stringify(data)}\n\n`);
                }
            });
        };

        // Send the initial content
        sendUpdate();

        // Watch the file for changes
        const watcher = fs.watch('output.txt', (eventType) => {
            if (eventType === 'change') {
                sendUpdate();
            }
        });

        // Clean up the watcher when the connection closes
        req.on('close', () => {
            watcher.close();
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Trashy texthook</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    #content {
                        white-space: pre-wrap;
                        font-family: monospace;
                        font-size: 20px; /* Increased font size */
                        background: #f4f4f4;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                </style>
            </head>
            <body>
                <h1>Trashy texthook</h1>
                <div id="content">Loading...</div>
                <script>
                    const eventSource = new EventSource('/events');
                    eventSource.onmessage = (event) => {
                        document.getElementById('content').textContent = JSON.parse(event.data);
                    };
                </script>
            </body>
            </html>
        `);
    }
});

server.listen(8000, () => {
    console.log('Server running at http://localhost:8000');
});
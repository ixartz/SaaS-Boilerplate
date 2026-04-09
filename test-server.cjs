const net = require('node:net');

const port = 4000;

const server = net.createServer(() => {
  console.log('Client connected');
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Server listening on 127.0.0.1:${port}`);
  process.exit(0);
}).on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

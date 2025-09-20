import { createServer } from 'node:http';
import { enrutar } from './router.js';
const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  //ejecutar enrutar http req
  enrutar(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
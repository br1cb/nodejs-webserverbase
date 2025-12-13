import { createServer } from 'node:http';
import { enrutar } from './router.js';
import 'dotenv/config';
import { getAndJsonParseBody } from './middlewares/routes-middleware.js';

const hostname = '127.0.0.1';
const port = 3000;

console.log(process.env);

const server = createServer((req, res) => {
  /** callback enrutar */
  const enrutarCB = enrutar;

  // parse body middleware
  getAndJsonParseBody(req, res, enrutarCB);
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
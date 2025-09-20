/** Enrutador principal */


import { IncomingMessage, ServerResponse } from 'node:http';
import { enrutarBooks } from './routes/books.route.js';
export function enrutar(req: IncomingMessage, res: ServerResponse) {
  const method = req.method ?? 'GET';
  /** expample url: "/authors" */
  const url = req.url ?? '';

  //mock de authors
  const authors = JSON.stringify([
      { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
      { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
  ]);

  // segun url devuelvo una respuesta. Esto es muy basico.
  switch (url) {
    case '/books': 
      enrutarBooks(req, res);
      break;
    case '/authors':
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(authors)
      break;
    default: 
        res.statusCode = 404; 
        res.setHeader('Content-Type', 'text/plain');
        res.end('not found');  
   }
};
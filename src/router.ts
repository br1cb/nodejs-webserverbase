/** Enrutador principal */


import { IncomingMessage, ServerResponse } from 'node:http';
import { enrutarBooks } from './routes/books.route.js';

// solo de prueba borrar mas adelante
import { allUsers } from './services/users.js';
import { error } from 'node:console';
import { getPathname } from './utils/routes-utils.js';
import type { RouteExtras } from './interfaces/routes-interfaces.js';

// TODO: Hacer que enrutar implemente una interface que pueda recibir 'extras'
export function enrutar(req: IncomingMessage, res: ServerResponse, extras: RouteExtras<any> = null) {
  const method = req.method ?? 'GET';
  /** expample url: "/authors" */
  const url = req.url ?? '';

  //mock de authors
  const authors = JSON.stringify([
      { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
      { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
  ]);
 
  const route = getPathname(url).split('/')[1];
  // segun url devuelvo una respuesta. Esto es muy basico.
  switch (route) {
    case 'books': 
      enrutarBooks(req, res, extras);
      break;
    case 'authors':
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(authors)
      break;
    case 'users':
      const users = new Promise(async (resolve, reject) => {
        const users = await allUsers();
        resolve(users);
      }).then(value => {
        console.log("EXCHITO!!");
      })
      .catch((err) => console.log("TODO MAL"))
      .finally(() => res.end());
      break;
    default: 
        res.statusCode = 404; 
        res.setHeader('Content-Type', 'text/plain');
        res.end('not found');  
   }
};
/** Enrutador principal */


import { IncomingMessage, ServerResponse } from 'node:http';
import { enrutarBooks } from './routes/books.route.js';

// solo de prueba borrar mas adelante
import { allUsers } from './services/users.js';
import { getPathname } from './utils/routes-utils.js';
import type { RouteExtras, RouteHandler } from './interfaces/routes-interfaces.js';

export const enrutar: RouteHandler = (req, res, extras = null) => {
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
      allUsers()
        .then(users => {
          const usersData = Array.isArray(users) ? users : [users];
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(usersData));
        })
        .catch(err => {
          console.error('Error retrieving users:', err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: 'Internal server error' }));
        });
      break;
    default: 
        res.statusCode = 404; 
        res.setHeader('Content-Type', 'text/plain');
        res.end('not found');  
   }
};
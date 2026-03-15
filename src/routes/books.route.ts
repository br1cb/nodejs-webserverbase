import type { IncomingMessage, ServerResponse } from "http";
import type { RouteExtras, RouteHandler } from "../interfaces/routes-interfaces.js";
import type { Book } from "../models/book.model.js";
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/books.controller.js";

/** router de /books */
export const enrutarBooks: RouteHandler<Book> = (req, res, extras) => {
  // Construir objeto Request compatible con el controlador
  const controllerReq = Object.assign(req, {
    body: extras?.parsedBody as any
  });

  const method = req.method;

  switch (method) {
    case 'GET':
      // Si hay un ID en la URL (path) o en query params
      // En la implementación actual, parseId mira req.url (path)
      // Necesitamos decidir cómo manejar /books/:id vs /books?id=
      
      // Simplificado: si la URL termina en número, buscar por ID
      const urlParts = req.url?.split('/') ?? [];
      if (urlParts.length > 2 && !isNaN(Number(urlParts[2]))) {
        getBookById(controllerReq, res);
      } else {
        getBooks(controllerReq, res);
      }
      break;
    case 'POST':
      createBook(controllerReq, res);
      break;
    case 'PUT':
      updateBook(controllerReq, res);
      break;
    case 'DELETE':
      deleteBook(controllerReq, res);
      break;
    default:
      res.statusCode = 405;
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      break;
  }
}

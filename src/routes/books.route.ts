import type { IncomingMessage, ServerResponse } from "http";
import { getPathname, getQueryParams } from "../utils/routes-utils.js";
import type { RouteExtras } from "../interfaces/routes-interfaces.js";
import { allBooks, updateBookById } from "../services/books.service.js";
import type { Book } from "../models/book.model.js";

//TODO pasar logica a controladores e implementar metodos faltantes (put, delete, post)

/** router de /books */
export function enrutarBooks(req: IncomingMessage, res: ServerResponse, extras: RouteExtras<Book>) {

  const method = req.method;

  // TODO depurar para ver que hay en params
  const params = getQueryParams(req);

  res.setHeader("Content-Type", "application/json");

  if (method === "GET") {

    //TODO testear y pasar logica al control

    if (params.size === 0) {
      allBooks()
        .then((result) => {
          res.statusCode = 200;
          res.end(JSON.stringify({ 'result': result }));
        })
        .catch((err) => {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: { message: 'Internal Server Error' } }));
        });

      return;
    }

    // si hay search param por ejemplo 'id' manejarlo 
    // para devolver el libro por ese id.
    // TODO.. mas de un search param

    debugger;// ver que hay en params.
    const id = params.get('id');

    // TODO book by id

  }
  else if (method === "POST") {

    // TODO testear y pasar logica al control

    const data = extras?.parsedBody;
    if (data == undefined) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: { text: "no se recibio id" } }));
      return;
    }

    updateBookById(data.id, data)
      .then((result) => {
        res.statusCode = 200;
        res.end(JSON.stringify({ 'result': result }));
      })
      .catch(err => {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: { message: 'libro no encontrado' } }));
      });
  }
}
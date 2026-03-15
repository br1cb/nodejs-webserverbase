import type { IncomingMessage, ServerResponse } from 'http';
import { bookService } from '../services/books.service.js';
import type { Book } from '../models/book.model.js';

interface Request extends IncomingMessage {
  params?: Record<string, string>;
  body?: Record<string, unknown> | string | Book;
}

function parseId(req: Request): number | null {
  if (req.params?.id) return Number(req.params.id);
  if (req.url) {
    const parts = req.url.split('/');
    if (parts.length > 2 && parts[2]) return parseInt(parts[2]);
  }
  return null;
}

export function getBooks(req: Request, res: ServerResponse) {
  bookService.allBooks()
    .then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ result }));
    })
    .catch(err => {
      console.error('[Controlador] Error fetching books:', err instanceof Error ? err.message : String(err));
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 500;
      res.end(JSON.stringify({ error: { message: 'Internal Server Error' } }));
    });
}

export async function getBookById(req: Request, res: ServerResponse) {
  const id = parseId(req);
  
  if (!id) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.end(JSON.stringify({ error: { text: 'url invalida' } }));
    return;
  }

  try {
    const result = await bookService.getBookById(id);
    
    if (!result) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 404;
      res.end(JSON.stringify({ error: { message: 'libro no encontrado' } }));
      return;
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ result }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.end(JSON.stringify({ error: { message: `error interno: ${message}` } }));
  }
}

export async function createBook(req: Request, res: ServerResponse) {
  const body = req.body as Record<string, string | number>;
  
  if (!body.id || typeof body.title !== 'string' || typeof body.author !== 'string') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.end(JSON.stringify({ error: { text: 'no se recibio id, title o author correctamente' } }));
    return;
  }

  try {
    const result = await bookService.addBook(body.title, body.author);
    
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 201;
    res.end(JSON.stringify({ message: `Libro creado con ID: ${result}`, id: result }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Controlador] Error creating book:', message);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.end(JSON.stringify({ error: { message: `Error al crear libro: ${message}` } }));
  }
}

export async function updateBook(req: Request, res: ServerResponse) {
  const id = parseId(req);
  
  if (!id) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.end(JSON.stringify({ error: { text: 'ID de libro requerido' } }));
    return;
  }
  
  const body = req.body as Record<string, string | number>;

  if (!body) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.end(JSON.stringify({ error: { text: 'no se recibieron datos para actualizar' } }));
    return;
  }

  try {
    const result = await bookService.updateBookById(id, body);
    
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ message: `Libro actualizado con ID: ${result}`, id: result }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.end(JSON.stringify({ error: { message: `libro no encontrado: ${message}` } }));
  }
}

export async function deleteBook(req: Request, res: ServerResponse) {
  const id = parseId(req);
  
  if (!id) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.end(JSON.stringify({ error: { text: 'ID de libro requerido' } }));
    return;
  }

  try {
    await bookService.deleteBookById(id);
    
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 204;
    res.end();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Controlador] Error deleting book:', message);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.end(JSON.stringify({ error: { message: `libro no encontrado: ${message}` } }));
  }
}

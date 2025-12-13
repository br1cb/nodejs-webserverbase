import bookRepository from '../repositories/book.repository.js';
import type { Book } from '../models/book.model.js';

/**
 * Obtiene todos los libros.
 */
export async function allBooks(): Promise<Book[]> {
  return await bookRepository.getAll();
}

/**
 * Agrega un nuevo libro.
 */
export async function addBook(title: string, author: string): Promise<number> {
  return await bookRepository.create(title, author);
}

/**
 * Actualiza los datos de un libro por su ID.
 */
export async function updateBookById(id: number, data: { title?: string; author?: string }) {
  return await bookRepository.update(id, data);
}

/**
 * Elimina un libro por su ID.
 */
export async function deleteBookById(id: number) {
  return await bookRepository.delete(id);
}
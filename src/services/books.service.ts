import type { PoolConnection } from 'mariadb';
import pool from '../config/db.js';
import type { Book } from '../models/book.model.js';

// Nombre de la tabla usada por este módulo
const TABLE_NAME = 'books';

/**
 * Asegura que la tabla 'books' exista.
 * Si no existe, la crea automáticamente.
 */
async function ensureTableExists(conn: PoolConnection) {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      author VARCHAR(100) NOT NULL
    )
  `);
}

/**
 * Obtiene todos los libros de la base de datos.
 * Si la tabla no existe, la crea automáticamente.
 */
export async function allBooks(): Promise<Book[]> {
  let conn: PoolConnection | null = null;

  try {
    // 1️⃣ Obtener conexión del pool
    conn = await pool.getConnection();

    // 2️⃣ Asegurar que la tabla exista
    await ensureTableExists(conn);

    // 3️⃣ Ejecutar la consulta
    const rows = await conn.query(`SELECT * FROM ${TABLE_NAME}`);

    // 4️⃣ Devolver el resultado
    return rows;
  } catch (err: any) {
    console.error('❌ Error al obtener los libros:', err.message || err);
    throw err;
  } finally {
    // 5️⃣ Liberar la conexión siempre (éxito o error)
    if (conn) conn.end();
  }
}

/**
 * Agrega un nuevo libro a la base de datos.
 * @param title - Título del libro
 * @param author - Autor del libro
 * @returns El ID del nuevo libro insertado
 */
export async function addBook(title: string, author: string):  Promise<Book> {
  let conn: PoolConnection | null = null;

  try {
    conn = await pool.getConnection();
    await ensureTableExists(conn);

    // Usamos parámetros (?) para evitar SQL Injection
    const result = await conn.query(
      `INSERT INTO ${TABLE_NAME} (title, author) VALUES (?, ?)`,
      [title, author]
    );

    // El insert devuelve el ID del nuevo registro
    return result.insertId;
  } catch (err: any) {
    console.error('❌ Error al agregar el libro:', err.message || err);
    throw err;
  } finally {
    if (conn) conn.end();
  }
}

/**
 * Actualiza los datos de un libro por su ID.
 * Solo se modifican los campos provistos.
 * @param id - ID del libro a modificar
 * @param data - Campos a actualizar (title y/o author)
 * @returns true si se actualizó algún registro, false si no
 */
export async function updateBookById(id: number, data: { title?: string; author?: string }) {
  let conn: PoolConnection | null = null;

  try {
    conn = await pool.getConnection();
    await ensureTableExists(conn);

    // Construimos dinámicamente los campos a actualizar
    const fields: string[] = [];
    const values: any[] = [];

    if (data.title !== undefined) {
      fields.push('title = ?');
      values.push(data.title);
    }
    if (data.author !== undefined) {
      fields.push('author = ?');
      values.push(data.author);
    }

    // Si no se pasan campos, no tiene sentido ejecutar el UPDATE
    if (fields.length === 0) {
      throw new Error('No hay campos para actualizar.');
    }

    // Agregamos el ID al final (WHERE id = ?)
    values.push(id);

    // Ejecutamos la query final
    const sql = `UPDATE ${TABLE_NAME} SET ${fields.join(', ')} WHERE id = ?`;
    const result = await conn.query(sql, values);

    // affectedRows > 0 indica que se modificó algo
    return result.affectedRows > 0;
  } catch (err: any) {
    console.error('❌ Error al actualizar el libro:', err.message || err);
    throw err;
  } finally {
    if (conn) conn.end();
  }
}

/**
 * Elimina un libro por su ID.
 * @param id - ID del libro a eliminar
 * @returns true si se eliminó algo, false si no existía
 */
export async function deleteBookById(id: number) {
  let conn: PoolConnection | null = null;

  try {
    conn = await pool.getConnection();
    await ensureTableExists(conn);

    // Eliminamos el registro
    const result = await conn.query(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);

    return result.affectedRows > 0;
  } catch (err: any) {
    console.error('❌ Error al eliminar el libro:', err.message || err);
    throw err;
  } finally {
    if (conn) conn.end();
  }
}
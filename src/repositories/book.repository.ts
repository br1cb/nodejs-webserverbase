import type { PoolConnection } from 'mariadb';
import pool from '../config/db.js';
import type { Book } from '../models/book.model.js';

const TABLE_NAME = 'books';

class BookRepository {
  private async ensureTableExists(conn: PoolConnection) {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        author VARCHAR(100) NOT NULL
      )
    `);
  }

  async getById(id: number): Promise<Book | null> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      await this.ensureTableExists(conn);
      const rows = await conn.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err: any) {
      console.error('❌ Error al obtener libro por ID:', err.message || err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async getAll(): Promise<Book[]> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      await this.ensureTableExists(conn);
      const rows = await conn.query(`SELECT * FROM ${TABLE_NAME}`);
      return rows;
    } catch (err: any) {
      console.error('❌ Error al obtener los libros:', err.message || err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async create(title: string, author: string): Promise<number> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      await this.ensureTableExists(conn);
      const result = await conn.query(
        `INSERT INTO ${TABLE_NAME} (title, author) VALUES (?, ?)`,
        [title, author]
      );
      return Number(result.insertId);
    } catch (err: any) {
      console.error('❌ Error al agregar el libro:', err.message || err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async update(id: number, data: { title?: string; author?: string }): Promise<boolean> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      await this.ensureTableExists(conn);

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

      if (fields.length === 0) {
        return false;
      }

      values.push(id);
      const sql = `UPDATE ${TABLE_NAME} SET ${fields.join(', ')} WHERE id = ?`;
      const result = await conn.query(sql, values);

      return result.affectedRows > 0;
    } catch (err: any) {
      console.error('❌ Error al actualizar el libro:', err.message || err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async delete(id: number): Promise<boolean> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      await this.ensureTableExists(conn);
      const result = await conn.query(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
      return result.affectedRows > 0;
    } catch (err: any) {
      console.error('❌ Error al eliminar el libro:', err.message || err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }
}

export default new BookRepository();

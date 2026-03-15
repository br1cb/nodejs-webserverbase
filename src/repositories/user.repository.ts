import type { PoolConnection } from 'mariadb';
import pool from '../config/db.js';
import type { User } from '../models/user.model.js';

const TABLE_NAME = 'users';

class UserRepository {
  private async ensureTableExists(conn: PoolConnection) {
    try {
      await conn.query(`
            CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
              id INT AUTO_INCREMENT PRIMARY KEY,
              nombre VARCHAR(100) NOT NULL,
              apellido VARCHAR(100) NOT NULL,
              dni BIGINT NOT NULL UNIQUE
            )
          `);
    } catch (err) {
      console.error("Error ensuring table users exists", err);
    }
  }

  async getAll(): Promise<User[]> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      await this.ensureTableExists(conn);

      const res = await conn.query(`SELECT * FROM ${TABLE_NAME}`);
      return res;
    } catch (err: any) {
      console.error('Error getting users:', err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async getById(id: number): Promise<User | null> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      const res = await conn.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, [id]);
      return res[0] || null;
    } catch (err: any) {
      console.error('Error getting user by id:', err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async create(user: Omit<User, 'id'>): Promise<number> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      const res = await conn.query(
        `INSERT INTO ${TABLE_NAME} (nombre, apellido, dni) VALUES (?, ?, ?)`,
        [user.nombre, user.apellido, user.dni]
      );
      return res.insertId;
    } catch (err: any) {
      console.error('Error creating user:', err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async update(id: number, data: Partial<Omit<User, 'id'>>): Promise<boolean> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(data), id];
      const res = await conn.query(`UPDATE ${TABLE_NAME} SET ${fields} WHERE id = ?`, values);
      return res.affectedRows > 0;
    } catch (err: any) {
      console.error('Error updating user:', err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async delete(id: number): Promise<boolean> {
    let conn: PoolConnection | null = null;
    try {
      conn = await pool.getConnection();
      const res = await conn.query(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
      return res.affectedRows > 0;
    } catch (err: any) {
      console.error('Error deleting user:', err);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }
}

export default new UserRepository();

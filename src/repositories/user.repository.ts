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
}

export default new UserRepository();

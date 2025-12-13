import type { PoolConnection, SqlError } from 'mariadb/*';
import pool from '../config/db.js';

const tableName: string = "users";

// TODO: terminar..
async function allUsers() {
  let conn: PoolConnection | null = null;
  
  //conexion
  try {
    conn = await pool.getConnection();
  } catch (err: any){
    if (err.code)
    console.log("fallo la conexion a base de datos, codigo: ", err.code);
    throw err;
  }

  //get all users y crea tabla users si no existe la misma
  try {
    const res = await conn.query('SELECT * FROM users');
    console.log(res);
    return res;
  } catch (err: any) {
    // console.error(err);
    if (err.code && err.code === 'ER_NO_SUCH_TABLE') {
      console.log("La tabla 'users' no existe. Creándola...");
      await conn.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          apellido VARCHAR(100) NOT NULL,
          dni BIGINT NOT NULL UNIQUE
        )
      `);

      console.log("se creo la tabla");
    }
  } finally {
    if (conn) conn.end();
  }
}

export { allUsers };
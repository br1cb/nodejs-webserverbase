import mariadb from 'mariadb';
import 'dotenv/config';

const {
  DB_USER,
  DB_PASSWORD,
  DB_URL,
  DB_PORT,
  DB_NAME,
} = process.env;

const host: string = `${DB_URL}`,
port = Number(DB_PORT),
user = `${DB_USER}`,
password = `${DB_PASSWORD}`,
limit = 5,
database = `${DB_NAME}`
;

const pool = mariadb.createPool({
  host, 
  port,
  user, 
  password, 
  database, 
  connectionLimit: limit
});

export default pool;


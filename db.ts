import { Database } from 'https://deno.land/x/denodb/mod.ts';

const db = new Database('mysql', {
  database: 'contact_book',
  host: '127.0.0.1',
  username: 'root',
  password: 'root',
  port: 3306, // optional
});

export default db;
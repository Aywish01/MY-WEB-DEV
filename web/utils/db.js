
import mysql from 'mysql2/promise';

export async function query(sql, values) {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass123',
    database: 'user_management',
  });
  const [results] = await db.execute(sql, values);
  db.end();
  return results;
}


// import mysql from 'mysql2/promise';

// export async function query(sql, values) {
//   const db = await mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//   });
//   const [results] = await db.execute(sql, values);
//   db.end();
//   return results;
// }


// import { query } from '../../utils/db';

// export default async function handler(req, res) {
//   const { firstname, email, password } = req.body;
//   const result = await query(
//     `INSERT INTO users (firstname, email, password) VALUES (?, ?, ?)`,
//     [firstname, email, password]
//   );
//   res.status(201).json(result);
// }



import { query } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstname, email, password } = req.body;
    const result = await query(
      `INSERT INTO users (firstname, email, password) VALUES (?, ?, ?)`,
      [firstname, email, password]
    );
    res.status(201).json(result);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const pool = require('../utils/pool');

class Book {
  id;
  name;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.released = row.released;
    this.authors = row.authors ?? [];
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }

  async addAuthorById(id) {
    await pool.query(
      'INSERT INTO bookauth (author_id, book_id) VALUES ($2, $1)',
      [this.id, id]
    );
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT books.*,
      COALESCE(json_agg(to_jsonb(authors))
      FILTER (WHERE authors.id IS NOT NULL), '[]'
      ) as authors from books
      LEFT JOIN bookauth on books.id = bookauth.book_id
      LEFT JOIN authors on bookauth.author_id = authors.id
      WHERE books.id=$1
      GROUP BY books.id
      `,
      [id]
    );
    return new Book(rows[0]);
  }

  static async insert({ name, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (name, released) VALUES ($1, $2) RETURNING *',
      [name, released]
    );
    return new Book(rows[0]);
  }
}

module.exports = { Book };

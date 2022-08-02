const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .get('/', async (req, res) => {
    const bookList = await Book.getAll();
    // console.log(bookList);
    res.json(bookList);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Book.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      req.body.authorIds &&
        (await Promise.all(
          req.body.authorIds.map((id) => book.addAuthorById(id))
        ));
      res.json(book);
    } catch (e) {
      next(e);
    }
  });



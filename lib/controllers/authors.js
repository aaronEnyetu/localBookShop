const { Router } = require('express');
const { Author } = require('../models/Author');


module.exports = Router()
  .get('/', async (req, res) => {
    const authorList = await Author.getAll();
    console.log('list of authors', authorList);

    res.json(authorList);
  })


  .get('/:id', async (req, res, next) => {
    try {
      const data = await Author.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Author.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

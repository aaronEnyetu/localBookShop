const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('list of books', () => {
  beforeEach(() => {

    return setup(pool);
  });

  it('POST /books should create a new book with an author', async () => {
    const res = await request(app)
      .post('/books')
      .send({ name: 'Great Expectations', released: 1860, authorIds: [1, 2, 3, 4] });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Great Expectations');

    const { body: saw } = await request(app).get(`/books/${res.body.id}`);
    console.log(saw);

    expect(saw.authors.length).toBe(4);
  });


  it('#GET /should fetch and return a list of books', async () => {
    const res = await request(app).get('/books');
    console.log(res.body);
    expect(res.body.length).toEqual(8);
    const saw = res.body.find((char) => char.id === '1');
    expect(saw).toHaveProperty('name', 'Great Expectations');
    expect(saw).toHaveProperty('released', 1860);
  });


  afterAll(() => {
    pool.end();
  });
});

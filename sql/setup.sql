-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE if exists books cascade;
DROP TABLE if exists authors cascade;
DROP TABLE if exists bookauth cascade;



CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY Key,
    name VARCHAR NOT NULL,
    dob BIGINT NOT NULL
);

CREATE TABLE bookauth (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id INT NOT NULL,
    book_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books (name, released) VALUES
 ('Great Expectations', 1860),
 ('Oliver Twist', 1837),
 ('A Tale of Two Cities', 1859),
 ('Animal Farm', 1945),
 ('Nineteen Eighty Four', 1949),
 ('Things Fall Apart', 1958),
 ('Macbeth', 1623),
 ('Hamlet', 1603);


 INSERT INTO authors (name, dob) VALUES
 ('Charles Dickens', 1812),
 ('George Orwell', 1903),
 ('Chinua Achebe', 1930),
 ('William Shakespeare', 1564);


 INSERT INTO bookauth (author_id, book_id) VALUES
 (1,1),
 (1,2),
 (1,3),
 (2,4),
 (2,5),
 (3,6),
 (4,7),
 (4,8);
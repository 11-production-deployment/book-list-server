'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const app = express();

const PORT = process.env.PORT;
// const CLIENT_URL = 
const CLIENT_URL = 'https://11-production-deployment.github.io/book-list-client';
// const DATABASE_URL = 'postgres://postgres:y7t6r5E@localhost:5432/books_app';
const DATABASE_URL = 'postgres://skkthzllooexia:3c74caee8fec7aa7d47d583de9f927c2f8c056a73670add508730bfbd1d37d66@ec2-54-221-192-231.compute-1.amazonaws.com:5432/d6hmqdd984spkj';
const client = new pg.Client(process.env.DATABASE_URL);



client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.use(express.static('../book-list-client'))


app.get('/api/v1/books', (req, res) => {
  client.query('SELECT * FROM books;')
    .then(results => res.send(results.rows))
    .catch(console.error);
});
app.get('/', (req, res) => res.redirect(process.env.CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));



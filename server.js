'use strict';


require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT;
const cors = require('cors'); //cross origin resource sharing
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

const app = express();
app.use(cors());

app.get('/api/v1/books', (req, res) => {
  client.query(`
    SELECT * FROM books;
    `)
    .then(results => res.send(results.rows))
    .catch(console.error);
});


const CLIENT_URL = 'https://11-production-deployment.github.io/book-list-client';
client.on('error', err => console.error(err));
app.use(express.static('../book-list-client'))
app.get('/', (req, res) => res.redirect(process.env.CLIENT_URL));



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));



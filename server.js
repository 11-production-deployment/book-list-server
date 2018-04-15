'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = 'https://11-production-deployment.github.io/book-list-client';


const DATABASE_URL = 'postgres://skkthzllooexia:3c74caee8fec7aa7d47d583de9f927c2f8c056a73670add508730bfbd1d37d66@ec2-54-221-192-231.compute-1.amazonaws.com:5432/d6hmqdd984spkj';

const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());



// app.get('/', (req, res) => res.send('Testing 1, 2, 3'));
app.get('/books', (req, res) => {
  client.query(`SELECT * from books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});
app.get('/', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));








// --------------------------------------------------------------------------------
// const pg = require('pg');
// const fs = require('fs');no
// const cors = require('cors');
// const express = require('express');
// const PORT = process.env.PORT;
// const CLIENT_URL = process.env.CLIENT_URL;
// const app = express();

// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', err => {
//   console.error(err);
// });

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static('./public'));


// app.get('/test', (req, res) => {
//   res.send('you can\'t sit with us');
// });

// app.get('*', (req, res) => res.redirect(CLIENT_URL));
// app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
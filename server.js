const express = require('express');
const { parse } = require('csv-parse');
const fs = require('fs');
const cors = require('cors');
const app = express(); // create express app
app.use(cors());

const parser = parse(
  { columns: true, parseNumbers: true, parseBooleans: true, trim: true },
  function (err, records) {
    if (err) {
      console.log(err);
    }
  }
);

app.get('/products', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const rs = fs
    .createReadStream(__dirname + '/data/products.csv', 'utf-8')
    .pipe(parser)
    .on('error', err => {
      console.log(err);
    });

  const data = [];
  rs.on('data', function (row) {
    data.push(row);
  })
    .on('end', function () {
      res.status(200).json(data);
    })
    .on('error', function () {
      res.status(500).json({ code: 500, message: 'Something wrong' });
    });
});

app.listen(3001);

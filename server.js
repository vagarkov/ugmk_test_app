const express = require('express');
const { parse } = require('csv-parse');
const fs = require('fs');
const cors = require('cors');
const app = express(); // create express app

const corsOptions = {
  origin: "http://localhost:3000"
}
const parseOptions = {
  bom: false,
  cast: (value, context) => {
    if(context.header) return value;
    if (context.column === 'date') return value;
    return Number(value);
  },
  columns: true,
  parseNumbers: true,
  trim: true
};
const port = 3001;
app.use(cors(corsOptions));

let data = [];

const readCSV = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + path, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      parse(data, parseOptions, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  });
};

// running server
(async () => {
  try {
    data = await readCSV('/data/products.csv');

    app.listen(port, () => {
      console.log(`Server is running at ${port} port`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
})();

// endpoints
app.get('/products', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (data.length === 0) {
    res.status(500).json({ code: 500, message: 'Something wrong' });
  } else {
    res.status(200).json(data);
  }
});
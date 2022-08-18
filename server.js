const fs = require('fs');
const express = require("express");
const path = require('path')
const {notes} = require('./db/db.json')
console.log({notes})

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', (req, res) => {
  let results = notes;
  res.json(results);
});


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server on port http://localhost:${PORT}`);
  });
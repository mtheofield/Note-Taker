const fs = require('fs');
const express = require("express");
const path = require('path')
const {notes} = require('./db/db.json')
console.log({notes})
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./db/db.json"))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get("/api/notes/:id", (req, res) =>
  res.sendFile(path.join(__dirname, "./db/db.json"))
);

app.post("/api/notes", (req, res) => {
  const noteSaved = req.body;
  console.log(noteSaved);
  noteSaved.id = uuid();
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );
  console.log(notes);
  notes.push(noteSaved);
  console.log(notes);
  fs.writeFile("./db/db.json", JSON.stringify(notes), function (err, result) {
    if (err) console.log("error", err);
  });
  return res.json({});
});

app.listen(PORT, () => {
    console.log(`API server on port http://localhost:${PORT}`);
  });
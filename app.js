const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "notes.html"))
);

app.get("/notes", (req, res) => {
  res.send("public/notes");
});

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
// GET /notes - list all notes
// POST /notes - Create a new note
// GET /notes/:id - Get one note (using ID)
// PATCH /note/:id - Update one note
// DELETE /note/:id - Destroy one note

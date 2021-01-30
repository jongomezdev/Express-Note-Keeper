const fs = require("fs");
const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid");
const db = "db/db.json";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML GET ROUTES
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// app.get("/api/notes", (req, res) => {
//   const notes = getNotes().map((note, uuid) => {
//     return {
//       id: uuid(),
//       title: note.title,
//       text: note.text,
//     };
//   });
//   res.write(notes);
// });

// app.get("/api/notes", (req, res) => {
//   fs.readFile("db/db.json", "utf-8");
//   let notes = JSON.parse(data);
//   res.json(notes);
// });

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
// GET /notes - list all notes
// POST /notes - Create a new note
// GET /notes/:id - Get one note (using ID)
// PATCH /note/:id - Update one note
// DELETE /note/:id - Destroy one note

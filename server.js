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

//*****************
// HTML GET ROUTES
//*****************
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
//*********************
//GET /api/notes route
//*********************
app.get("/api/notes", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

//**********************
//POST /api/notes route
//**********************

app.post("/api/notes", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    let newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    fs.writeFileSync(db, JSON.stringify(notes));
    res.json(notes);
  });
});

//**********************
//DELETE /api/notes/:id route
//**********************

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const uniqueID = req.params.id;
  });
});

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
// GET /notes - list all notes
// POST /notes - Create a new note
// GET /notes/:id - Get one note (using ID)
// PATCH /note/:id - Update one note
// DELETE /note/:id - Destroy one note

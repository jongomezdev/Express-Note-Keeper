const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const db = "db/db.json";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//*********************
//GET /api/notes route
//*********************

app.get("/api/notes", (req, res) => {
  const file = fs.readFileSync(db, "utf8");
  res.json(JSON.parse(file));
});

//**********************
//POST /api/notes route
//**********************

app.post("/api/notes", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) throw err;
    let newNote = { ...req.body, id: uuid() };
    let notesArr = JSON.parse(data);
    let updatedNotesArr = [...notesArr, newNote];

    fs.writeFileSync(db, JSON.stringify(updatedNotesArr));
    res.json(newNote);
  });
});

//****************************
//DELETE /api/notes/:id route
//****************************

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile(db, "utf-8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let noteID = req.params.id;
    console.log(noteID);
    let newNoteId = 0;

    notes = notes.filter((note) => note.id != noteID);

    for (note of notes) {
      note.id = newNoteId.toString();
      console.log(note);
      console.log(`The rest of these are your ${notes}`);
      newNoteId++;
    }

    fs.writeFileSync(db, "utf-8", JSON.stringify(notes), (err, data) => {
      if (err) throw err;
    });
    res.json(notes);
  });
});

//*****************
// HTML GET ROUTES
//*****************

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
// GET /notes - list all notes
// POST /notes - Create a new note
// GET /notes/:id - Get one note (using ID)
// DELETE /note/:id - Destroy one note

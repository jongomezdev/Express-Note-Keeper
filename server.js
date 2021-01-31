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
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    res.json(notes);
  });
});

//**********************
//POST /api/notes route
//**********************

app.post("/api/notes", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    fs.writeFileSync(db, JSON.stringify(notes));
    res.json(notes);
  });
});

//****************************
//DELETE /api/notes/:id route
//****************************

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile(db, "utf-8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let uniqueID = req.params.id;
    console.log(uniqueID);
    notes = notes.filter((n) => n.id !== uniqueID);

    for (n of notes) {
      n.id = uniqueID;
    }

    fs.writeFileSync(db, "utf-8", JSON.stringify(notes), (err, data) => {
      if (err) throw err;
      console.log("Deleted Successfully");
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

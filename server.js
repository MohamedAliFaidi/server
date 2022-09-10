// load env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


// importing dependencies
const express = require("express");
const connectDb = require("./config/connectDB");
const Note = require("./models/noteModel");
const usersController = require("./Controllers/usersController");
const notesController = require("./Controllers/notesController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//create express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());




//connect to database
connectDb();

//routing
app.post("/signup", usersController.signup);

app.post("/login", usersController.login);

app.get("/logout", usersController.logout);


app.get("/notes", notesController.fetchNotes);

app.get("/notes/:id", notesController.fetchNoteById);

app.post("/notes", notesController.createNote);

app.put("/notes/:id", notesController.updateNote);

app.delete("/notes/:id", notesController.deleteNote);

 
app.get("/", (req, res) => {
  res.json({ Hello: "World" });
});

app.post("/notes", async (req, res) => {
    //get data from request body
    const { title, body } = req.body;
    //create new note
    const note = await Note.create({ title, body });
    //send response
    res.status(201).json({ note });
});

app.listen(process.env.PORT)
const Note = require("../models/noteModel");

const fetchNotes = async (req, res) => {
  //find notes
  const notes = await Note.find();

  //return notes in response
  res.json({ notes: notes });
};

const fetchNoteById = async (req, res) => {
  // get note id from request params(url)
  const noteId = req.params.id;
  // find note by id
  const note = await Note.findById(noteId);
  // return note in response
  res.json({ note: note });
};

const createNote = async (req, res) => {
  //get data from request body
  const title = req.body.title;
  const body = req.body.body;
  //create a new note
  const note = await Note.create({ title: title, body: body });
  // send response
  res.json({ note: note });
};

const updateNote = async (req, res) => {
  //get note id from request params
  const noteId = req.params.id;
  //get data from request body
  const title = req.body.title;
  const body = req.body.body;
  //find note by id and update it
  await Note.findByIdAndUpdate(noteId, {
    title: title,
    body: body,
  });
  // find updated note
  const note = await Note.findById(noteId);
  //send response with updated note
  res.json({ note: note });
};

const deleteNote = async (req, res) => {
  //get note id from request parmas
  const noteId = req.params.id;
  //find note by id and delete it
  await Note.findByIdAndDelete(noteId);
  //send response
  res.json({ success: "Note deleted" });
};

module.exports = {
  fetchNotes,
  fetchNoteById,
  createNote,
  updateNote,
  deleteNote,
};
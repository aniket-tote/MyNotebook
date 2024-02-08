const Note = require("../models/note.model");

const addNote = async (title, description, tag, userId) => {
    const newNote = await Note.create({ title, description, tag, user: userId });
    return newNote;
}

const getNotesByUserId = async (id) => {
    const notes = await Note.find({ user: id });
    return notes;
}

const getNoteById = async (id) => {
    const note = await Note.findById(id);
    if (!note) {
        throw new Error("Note not found with id: " + id);
    }
    return note;
}

const updateNoteById = async (id, newNote) => {
    const updatedNote = await Note.findByIdAndUpdate(
        id,
        { $set: newNote },
        { returnNewDocument: true }
    );
    return updatedNote;
}

const deleteNoteById = async(id)=>{
    const note = await Note.findByIdAndDelete(id);
    return note;
}


module.exports = { addNote, getNotesByUserId, getNoteById, updateNoteById,deleteNoteById }
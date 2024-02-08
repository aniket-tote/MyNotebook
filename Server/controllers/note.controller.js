const { addNote, getNotesByUserId, updateNoteById, getNoteById, deleteNoteById } = require("../services/note.service")

const fetchNotes = async (req, res) => {
    try {
        const id = req.user.id;
        let notes = await getNotesByUserId(id);
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ success: false, message: error.message });
    }
}

const addNewNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        if (title && description) {
            let newNote = await addNote(title, description, tag, req.user.id);
            res.status(200).json({ success: true, note: newNote });
        } else {
            throw new Error("title or description missing");
        }
    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ success: false, message: error.message });
    }
}

const updateNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //create new note
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        let note = await getNoteById(req.params.id);
        if (!note) {
            return res.status(400).json({ success: false, message: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not your note" });
        }

        const updatedNote = await updateNoteById(req.params.id, newNote);
        res.status(200).json({ success: true, note: updatedNote });

    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ success: false, message: error.message });
    }
}

const deleteNote = async (req, res) => {
    try {
        let note = await getNoteById(req.params.id);
        if (!note) {
            return res.status(400).json({ success: false, message: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not your note" });
        }

        const deletedNote = await deleteNoteById(req.params.id);
        res.status(200).json({ success: true, message: "Note has been deleted.", note: deletedNote });

    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ success: false, message: error.message });
    }
}

module.exports = { fetchNotes, addNewNote, updateNote, deleteNote }

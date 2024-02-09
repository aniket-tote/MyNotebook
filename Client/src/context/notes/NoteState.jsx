import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [];
  const host = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
  const [notes, setNotes] = useState(notesInitial);

  const getAllNote = async () => {
    const response = await fetch(`${host}/api/notes/by-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
    if(json.success){
      setNotes(json.notes);
    }
  };

  const addNote = async (title, description, tag) => {
    tag === "" && (tag = "general");
    const response = await fetch(`${host}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    if(json.success){
      setNotes(notes.concat(json.note));
    }
  };

  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        (newNote[index].title = title),
          (newNote[index].description = description),
          (newNote[index].tag = tag);
        break;
      }
    }
    setNotes(newNote);
  };
  const deleteNote = async (id) => {
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
    const response = await fetch(`${host}/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
  };
  return (
    <NoteContext.Provider
      value={{ notes, getAllNote, addNote, updateNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

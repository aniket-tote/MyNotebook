import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [];
  const host = "https://bright-pumps-crab.cyclic.app";

  const [notes, setNotes] = useState(notesInitial);

  const getAllNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTVmN2EzMzY4NDhjOGExMjQ0YWNkIn0sImlhdCI6MTY3MzE2MjkxM30.iXznEVW4fMpKIsxiE6-fOAjIgvCf3UJ7e5cyHPfMc0A",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    tag === "" && (tag = "general");
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTVmN2EzMzY4NDhjOGExMjQ0YWNkIn0sImlhdCI6MTY3MzE2MjkxM30.iXznEVW4fMpKIsxiE6-fOAjIgvCf3UJ7e5cyHPfMc0A",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    setNotes(notes.concat(json));
  };

  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTVmN2EzMzY4NDhjOGExMjQ0YWNkIn0sImlhdCI6MTY3MzE2MjkxM30.iXznEVW4fMpKIsxiE6-fOAjIgvCf3UJ7e5cyHPfMc0A",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

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
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYTVmN2EzMzY4NDhjOGExMjQ0YWNkIn0sImlhdCI6MTY3MzE2MjkxM30.iXznEVW4fMpKIsxiE6-fOAjIgvCf3UJ7e5cyHPfMc0A",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
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

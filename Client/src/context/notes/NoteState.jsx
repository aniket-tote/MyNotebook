import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "63b9caf4eea3517c4a190db6",
      user: "63b9b14221f7dbf5feee821b",
      title: "title1",
      description:
        "description1description1description1description1description1description1description1description1description1description1description1description1description1",
      tag: "testing",
      date: "2023-01-07T19:41:40.013Z",
      __v: 0,
    },
    {
      _id: "63b9caf5eea3517c4a190db8",
      user: "63b9b14221f7dbf5feee821b",
      title: "title2",
      description:
        "description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2",
      tag: "testing",
      date: "2023-01-07T19:41:41.321Z",
      __v: 0,
    },
    {
      _id: "63b9caf6eea3517c4a190dba",
      user: "63b9b14221f7dbf5feee821b",
      title: "title3",
      description:
        "description3description3description3description3description3description3description3description3description3description3description3description3",
      tag: "testing",
      date: "2023-01-07T19:41:42.179Z",
      __v: 0,
    },
    {
      _id: "63b9caf4eea3517c4a190db7",
      user: "63b9b14221f7dbf5feee821b",
      title: "title4",
      description:
        "description1description1description1description1description1description1description1description1description1description1description1description1description1",
      tag: "testing",
      date: "2023-01-07T19:41:40.013Z",
      __v: 0,
    },
    {
      _id: "63b9caf5eea3517c4a190db9",
      user: "63b9b14221f7dbf5feee821b",
      title: "title5",
      description:
        "description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2description2",
      tag: "testing",
      date: "2023-01-07T19:41:41.321Z",
      __v: 0,
    },
    {
      _id: "63b9caf6eea3517c4a190dbb",
      user: "63b9b14221f7dbf5feee821b",
      title: "title6",
      description:
        "description3description3description3description3description3description3description3description3description3description3description3description3",
      tag: "testing",
      date: "2023-01-07T19:41:42.179Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  // const update = (param) => { change parent state from chidren
  //   setState(param);
  // };

  const addNote = (title, description, tag) => {
    const note = {
      _id: "63b9caf6eea3517c4a190dbb",
      user: "63b9b14221f7dbf5feee821b",
      title: title,
      description: description,
      tag: tag,
      date: "2023-01-07T19:41:42.179Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  const updateNote = () => {};
  const deleteNote = (id) => {
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

import { Flex } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      getAllNote();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Flex
      width={["100vw", "100vw", "70vw"]}
      flexWrap={"wrap"}
      flexDirection={["column", , "column", "row"]}
      paddingX={4}
    >
      {notes.map((element) => {
        return <NoteItem key={element._id} note={element} />;
      })}
    </Flex>
  );
};

export default Notes;

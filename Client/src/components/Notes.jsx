import { Flex } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNote } = context;

  useEffect(() => {
    getAllNote();
  }, []);

  return (
    <Flex
      width={["100vw","100vw","70vw"]}
      flexWrap={"wrap"}
      flexDirection={["column",,"column", "row"]}
      paddingX={4}
    >
      {notes.map((element) => {
        return <NoteItem key={element._id} note={element} />;
      })}
    </Flex>
  );
};

export default Notes;

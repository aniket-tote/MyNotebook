import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";

const Notes = () => {
  const a = useContext(noteContext);
  return (
    <Flex width={"70vw"} flexWrap={"wrap"} flexDirection={["column", "row"]} paddingX={4}>
      {a.notes.map((element) => {
        return <NoteItem key={element._id} note={element} />;
      })}
    </Flex>
  );
};

export default Notes;

import { Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";
import { Link, useNavigate } from "react-router-dom";

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(noteContext);
  const { notes, getAllNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNote();
      setLoading(false);
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
      {loading && <Spinner />}
      {notes.length === 0 && (
        <Flex
          width={"100%"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          You have not added any Notes Yet!
          <Link to={"/addnote"} className="md:hidden">
            <Text my={4} textColor={"blue.500"} textDecoration={"underline"}>
              Add Notes
            </Text>
          </Link>
          <Spinner />
        </Flex>
      )}
      {notes.map((element) => {
        return <NoteItem key={element._id} note={element} />;
      })}
    </Flex>
  );
};

export default Notes;

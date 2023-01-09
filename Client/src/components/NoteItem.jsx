import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Tag,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import noteContext from "../context/notes/noteContext";
import { useToast } from "@chakra-ui/react";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const toast = useToast();

  return (
    <Card
      shadow={"2xl"}
      height={"max-content"}
      margin={2}
      width={["90vw", "31%"]}
    >
      <CardHeader flexDirection={"column"} experimental_spaceY={2}>
        <Heading size="md">{props.note.title}</Heading>
        <Tag borderRadius={"full"} margin={1}>
          {props.note.tag}
        </Tag>
      </CardHeader>
      <CardBody>
        <Text>{props.note.description}</Text>
      </CardBody>
      <CardFooter justifyContent={"center"} experimental_spaceX={2}>
        <Button
          experimental_spaceX={2}
          onClick={() => {
            deleteNote(props.note._id);
            toast({
              title: "Note deleted",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          <Text>Delete</Text>
          <DeleteIcon />
        </Button>
        <Button experimental_spaceX={2}>
          <Text>Update</Text>
          <EditIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteItem;

import {
  Alert,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Textarea,
  AlertTitle,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
  //context
  const context = useContext(noteContext);
  const { addNote } = context;

  const toast = useToast(); //toast

  //note state
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  //alert states
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handlesubmit = (e) => {
    //on submit click
    e.preventDefault();

    //check for title more than 3 char
    if (!(note.title.length >= 3)) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
      setAlertMessage("Title should be at least 3 char!");
      return;
    }

    // check for title more than 5 char
    if (!(note.description.length >= 5)) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
      setAlertMessage("Description should be at least 5 char!");
      return;
    }

    addNote(note.title, note.description, note.tag); //addnote context funtion

    toast({
      title: "Note added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setNote({ title: "", description: "", tag: "" }); //reset note state && empty input value
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //update state when user input values
  };

  return (
    <Card maxW="sm" shadow={"2xl"} width={"100%"} paddingBottom={4}>
      <CardBody>
        <Stack spacing="3">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="title here..."
              id="title"
              name="title"
              value={note.title}
              minLength={3}
              onChange={onchange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              rows={5}
              placeholder="note here..."
              id="description"
              name="description"
              value={note.description}
              minLength={5}
              onChange={onchange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tags</FormLabel>
            <Input
              placeholder={"tag to categorize"}
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
            />
          </FormControl>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent={"center"}>
        <Button
          type="submit"
          variant="solid"
          colorScheme="blue"
          onClick={handlesubmit}
        >
          Add note
        </Button>
      </CardFooter>

      {/* alert  */}
      {alertVisible && (
        <Alert status="warning" width={"max-content"} alignSelf={"center"}>
          <AlertIcon />
          <AlertTitle>{alertMessage}</AlertTitle>
        </Alert>
      )}
    </Card>
  );
};

export default Addnote;

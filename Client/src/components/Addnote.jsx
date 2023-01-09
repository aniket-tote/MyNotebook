import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useToast } from "@chakra-ui/react";

const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const toast = useToast();

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handlesubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    toast({
      title: "Note added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  //for multiple tags
  // const [tagState, setTagState] = useState([]);

  // const addtag = (e) => {
  //   if (e.key !== "Enter") return;
  //   const value = e.target.value;
  //   if (!value.trim()) return;
  //   setTagState([...tagState, value]);
  //   e.target.value = "";
  // };

  // const removeTag = (index) => {
  //   setTagState(tagState.filter((el, i) => i !== index));
  // };

  return (
    <Card maxW="sm" shadow={"2xl"} width={"100%"}>
      <CardBody>
        <Stack spacing="3">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="title here..."
              id="title"
              name="title"
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
              onChange={onchange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tags</FormLabel>
            <Input
              // onKeyDown={addtag}
              placeholder={"tag to categorize"}
              id="tag"
              name="tag"
              onChange={onchange}
            />
          </FormControl>
          {/* <Flex flexWrap={"wrap"}>
            {tagState.map((element, index) => {
              return (
                <Tag
                  size="lg"
                  borderRadius="full"
                  margin={1}
                  width={"max-content"}
                  key={index}
                >
                  <TagLabel>{element}</TagLabel>
                  <TagCloseButton onClick={() => removeTag(index)} />
                </Tag>
              );
            })}
          </Flex> */}
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
    </Card>
  );
};

export default Addnote;

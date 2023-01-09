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
import { AddIcon } from "@chakra-ui/icons";

const Addnote = () => {
  const a = useContext(noteContext);

  const [tagState, setTagState] = useState([]);

  const addtag = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTagState([...tagState, value]);
    e.target.value = "";
  };

  const removeTag = (index) => {
    setTagState(tagState.filter((el, i) => i !== index));
  };

  return (
    <Card maxW="sm" shadow={"2xl"} width={"100%"} >
      <CardBody>
        <Stack spacing="3">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder="title here..." />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea rows={5} placeholder="note here..." />
          </FormControl>
          <FormControl>
            <FormLabel>Tags</FormLabel>
            <Input
              className="inputtag"
              type={"text"}
              onKeyDown={addtag}
              placeholder={"click enter to add tags"}
            />
          </FormControl>
          <Flex flexWrap={"wrap"}>
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
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent={"center"}>
        <Button variant="solid" colorScheme="blue">
          Add note
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Addnote;

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import noteContext from "../context/notes/noteContext";
import { useToast, useDisclosure } from "@chakra-ui/react";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, updateNote } = context;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const closeRef = useRef(null);
  const toast = useToast();

  const [enote, setEnote] = useState({
    etitle: props.note.title,
    edescription: props.note.description,
    etag: props.note.tag,
  });

  const handleupdate = (e) => {
    e.preventDefault();
    updateNote(props.note._id, enote.etitle, enote.edescription, enote.etag);
    toast({
      title: "Note updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    closeRef.current.click();
  };

  const onchange = (e) => {
    setEnote({ ...enote, [e.target.name]: e.target.value });
  };

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
        <Button experimental_spaceX={2} onClick={onOpen}>
          <Text>Update</Text>
          <EditIcon />
        </Button>
      </CardFooter>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your Note</ModalHeader>
          <ModalCloseButton ref={closeRef} />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                value={enote.etitle}
                id="etitle"
                name="etitle"
                onChange={onchange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={enote.edescription}
                id="edescription"
                name="edescription"
                onChange={onchange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Tag</FormLabel>
              <Input
                value={enote.etag}
                id="etag"
                name="etag"
                onChange={onchange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="blue"
              ml={3}
              onClick={handleupdate}
              type="submit"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default NoteItem;

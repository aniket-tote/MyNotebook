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
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import noteContext from "../context/notes/noteContext";
import { useToast, useDisclosure } from "@chakra-ui/react";

const NoteItem = (props) => {
  //context
  const context = useContext(noteContext);
  const { deleteNote, updateNote } = context;

  //for toast
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //referances for modal
  const initialRef = useRef(null);
  const closeRef = useRef(null);

  //edited note state
  const [enote, setEnote] = useState({
    etitle: props.note.title,
    edescription: props.note.description,
    etag: props.note.tag,
  });

  //alert states
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //onclick update button in modal
  const handleupdate = (e) => {
    e.preventDefault();

    //check for title more than 3 char
    if (!(enote.etitle.length >= 3)) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
      setAlertMessage("Title should be at least 3 char!");
      return;
    }

    // check for title more than 5 char
    if (!(enote.edescription.length >= 5)) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
      setAlertMessage("Description should be at least 5 char!");
      return;
    }

    updateNote(props.note._id, enote.etitle, enote.edescription, enote.etag); //updateNote context

    toast({
      title: "Note updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    closeRef.current.click(); //to click close button using reference
  };

  const onchange = (e) => {
    setEnote({ ...enote, [e.target.name]: e.target.value }); //update edited note state as soon as user types in input tags
  };

  return (
    <Card
      shadow={"2xl"}
      height={"max-content"}
      margin={2}
      width={["95%", "97%", "97%", "46.7%", "48%", "30.78%"]}
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

      {/* Model */}
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

          {/* alert  */}
          {alertVisible && (
            <Alert status="warning" width={"max-content"} alignSelf={"center"}>
              <AlertIcon />
              <AlertTitle>{alertMessage}</AlertTitle>
            </Alert>
          )}

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

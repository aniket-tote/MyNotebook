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
  Textarea,
  Flex,
  IconButton,
  Tooltip,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Link,
  Box,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { DeleteIcon, EditIcon, CopyIcon } from "@chakra-ui/icons";
import noteContext from "../context/notes/noteContext";
import { useToast, useDisclosure } from "@chakra-ui/react";

const NoteItem = (props) => {
  //context
  const context = useContext(noteContext);
  const { deleteNote, updateNote } = context;

  //for toast
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const onCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const onOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const onCloseAlertDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const onOpenAlertDialog = () => {
    setIsAlertDialogOpen(true);
  };

  //referances for modal
  const initialRef = useRef(null);
  const closeRef = useRef(null);
  const cancelRef = React.useRef();

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
      position: "top",
      duration: 2000,
      isClosable: true,
    });
    closeRef.current.click(); //to click close button using reference
  };

  const onchange = (e) => {
    setEnote({ ...enote, [e.target.name]: e.target.value }); //update edited note state as soon as user types in input tags
  };

  const renderWithLineBreaks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const lines = text.split("\n");

    return lines.map((line, index) => {
      const lineWithLinks = line.split(urlRegex).map((segment, i) => {
        if (segment.match(urlRegex)) {
          return (
            <Tooltip hasArrow label="Open link">
              <Link
                href={segment}
                textDecoration={"underline"}
                textColor={"blue.400"}
                key={i}
                target="_blank"
              >
                {segment}
              </Link>
            </Tooltip>
          );
        }
        return segment;
      });

      return (
        <Box key={index}>
          {lineWithLinks}
          <br />
        </Box>
      );
    });
  };

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast({
      title: "copied",
      status: "success",
      duration: 1000,
      position: "top",
      isClosable: true,
    });
  };

  return (
    <Card
      shadow={"lg"}
      height={"max-content"}
      margin={2}
      width={["100%", "97%", "97%", "46.7%", "48%", "30.78%"]}
    >
      <CardHeader flexDirection={"column"} experimental_spaceY={2}>
        <Flex width={["100%"]} justifyContent={"space-between"}>
          <Heading size="md">{props.note.title}</Heading>
          <Tooltip hasArrow label="Copy">
            <IconButton
              isRound={true}
              onClick={() => copyToClipboard(props.note.description)}
              icon={<CopyIcon />}
            ></IconButton>
          </Tooltip>
        </Flex>
        <Tag borderRadius={"full"} margin={1}>
          {props.note.tag}
        </Tag>
      </CardHeader>
      <CardBody>
        <Box>{renderWithLineBreaks(props.note.description)}</Box>
      </CardBody>
      <CardFooter justifyContent={"center"} experimental_spaceX={2}>
        <Button experimental_spaceX={2} onClick={onOpenAlertDialog}>
          <Text>Delete</Text>
          <DeleteIcon />
        </Button>
        <Button experimental_spaceX={2} onClick={onOpenUpdateModal}>
          <Text>Update</Text>
          <EditIcon />
        </Button>
      </CardFooter>

      {/* update Model */}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isUpdateModalOpen}
        onClose={onCloseUpdateModal}
      >
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
              <Textarea
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
            <Button onClick={onCloseUpdateModal}>Cancel</Button>
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

      {/* delete alert */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlertDialog}
        isOpen={isAlertDialogOpen}
        isCentered
        size={"xs"}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Note</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>kr du?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseAlertDialog}>
              Nai
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                deleteNote(props.note._id);
                toast({
                  title: "Note deleted",
                  status: "error",
                  position: "top",
                  duration: 2000,
                  isClosable: true,
                });
              }}
            >
              Haa krde
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default NoteItem;

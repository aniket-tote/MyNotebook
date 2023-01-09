import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Tag,
  Flex,
} from "@chakra-ui/react";
const NoteItem = (props) => {
  return (
    <Card shadow={"2xl"} height={"max-content"} margin={2} width={"max-content"}>
      <CardHeader flexDirection={"column"} experimental_spaceY={2}>
        <Heading size="md">{props.note.title}</Heading>
        <Flex flexWrap={"wrap"}>
          <Tag borderRadius={"full"} margin={1}>
            {props.note.tag}
          </Tag>
          <Tag borderRadius={"full"} margin={1}>
            {props.note.tag}
          </Tag>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{props.note.description}</Text>
      </CardBody>
      <CardFooter>
        <Button>Delete</Button>
        <Button>Update</Button>
      </CardFooter>
    </Card>
  );
};

export default NoteItem;

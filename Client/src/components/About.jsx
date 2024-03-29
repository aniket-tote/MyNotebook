import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Addnote from "./Addnote";

const About = () => {
  return (
    <Flex
      flexDirection={"column"}
      width={["100vw", "100vw", "30vw"]}
      alignItems={"center"}
      paddingX={4}
      experimental_spaceY={4}
    >
      <Text fontSize={24}>Add a new Note</Text>
      <Addnote />
    </Flex>
  );
};

export default About;

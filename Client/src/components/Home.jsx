import { Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Addnote from "./Addnote";
import Notes from "./Notes";

const Home = () => {
  return (
    <Flex>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        padding={12}
        experimental_spaceY={4}
        width={["100%", "100%", "50%", "30%"]}
        display={["none", "none", "flex"]}
      >
        <Text fontSize={24}>Add a new Note</Text>
        <Addnote />
      </Flex>
      <Divider
        orientation={"vertical"}
        display={["none", "none", "flex"]}
        height={"75vh"}
      />
      <Notes />
    </Flex>
  );
};

export default Home;

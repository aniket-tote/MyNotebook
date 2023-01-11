import { Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Addnote from "./Addnote";
import Notes from "./Notes";

const Home = () => {

  return (
    <Flex paddingTop={4} flexDirection={["column","column", "row"]}>
      <Flex
        flexDirection={"column"}
        width={["100vw", "100vw", "30vw"]}
        alignItems={"center"}
        paddingX={4}
        experimental_spaceY={4}
        display={["none","none","flex"]}
      >
        <Text fontSize={30}>Add a new Note</Text>
        <Addnote />
      </Flex>
      <Divider orientation={"vertical"} display={["none","none","flex"]} height={"75vh"}/>
      <Notes />
    </Flex>
  );
};

export default Home;

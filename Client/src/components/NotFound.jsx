import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      width={"full"}
      height={"100vh"}
    >
      <Box>404 - Not Found</Box>
      <Box>Sorry, the page you are looking for does not exist.</Box>
    </Flex>
  );
};

export default NotFound;

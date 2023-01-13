import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <Flex
      fontSize={"xl"}
      paddingX={64}
      justifyContent={"end"}
      alignItems={"center"}
      height={"calc(100vh - 4rem)"}
    >
      <Link to="/signup">
        Create new account{" "}
        <Text
          display={"inline"}
          textColor={"blue.500"}
          textDecoration={"underline"}
        >
          here.
        </Text>
      </Link>
    </Flex>
  );
};

export default ForgotPassword;

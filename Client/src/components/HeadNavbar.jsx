import {
  Flex,
  IconButton,
  useColorMode,
  useToast,
  Text,
  Button,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function HeadNavbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [navOpen, setNavOpen] = useState(false);

  let location = useLocation();
  let navigate = useNavigate();
  const toast = useToast();

  const logout = () => {
    localStorage.removeItem("token");
    toast({
      title: "See you soon!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/login");
  };

  return (
    <Flex
      height={"16"}
      alignItems={"center"}
      paddingX={4}
      justifyContent={"space-between"}
      shadow={"2xl"}
      backgroundColor={colorMode === "dark" ? "gray.900" : "white"}
    >
      <IconButton
        fontSize={15}
        borderRadius={"full"}
        display={["inline", "inline", "none"]}
        variant={"unstyled"}
        onClick={() => setNavOpen(navOpen ? false : true)}
        icon={navOpen ? <CloseIcon /> : <HamburgerIcon />}
      />
      <Link to="/">
        <Text fontSize={20}>MyNoteBook</Text>
      </Link>

      <Flex
        flexDirection={"column"}
        experimental_spaceY={4}
        display={["flex", "flex", "none"]}
        position={"absolute"}
        backgroundColor={colorMode === "dark" ? "gray.700" : "#fff"}
        top={16}
        width={"100vw"}
        left={navOpen ? 0 : "auto"}
        padding={4}
        right={navOpen ? "auto" : "100%"}
        zIndex={"1"}
      >
        <Link
          to="/"
          className={location.pathname === "/" ? "text-blue-500" : ""}
          onClick={() => setNavOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/addnote"
          className={location.pathname === "/addnote" ? "text-blue-500" : ""}
          onClick={() => {
            setNavOpen(false);
          }}
        >
          Add Note
        </Link>
      </Flex>

      <Flex experimental_spaceX={4}>
        {localStorage.getItem("token") && (
          <Link to="/login">
            <Button colorScheme="blue" variant="ghost" onClick={logout}>
              Logout
            </Button>
          </Link>
        )}

        <IconButton
          borderRadius={"100%"}
          onClick={() => toggleColorMode()}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        />
      </Flex>
    </Flex>
  );
}

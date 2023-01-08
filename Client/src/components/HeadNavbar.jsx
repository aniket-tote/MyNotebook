import { Flex, IconButton, useColorMode, Text,  } from "@chakra-ui/react";
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link,useLocation } from "react-router-dom";
import React, { useState,useEffect } from "react";

export default function HeadNavbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [navOpen, setNavOpen] = useState(false);

  let location = useLocation();

  return (
    <Flex
      height={"16"}
      width={"100vw"}
      alignItems={"center"}
      paddingX={"4"}
      justifyContent={"space-between"}
      backgroundColor={colorMode === "dark" ? "gray.900" : "gray.50"}
    >
      <IconButton
        fontSize={15}
        display={["inline", "none"]}
        variant={"unstyled"}
        onClick={() => setNavOpen(navOpen ? false : true)}
        icon={navOpen ? <CloseIcon /> : <HamburgerIcon />}
      />
      <Text fontSize={20}>MyNoteBook</Text>

      <Flex
        className="transition-all duration-500 ease-in-out"
        flexDirection={["column", "row"]}
        experimental_spaceX={[0, 4]}
        experimental_spaceY={[4, 0]}
        position={["absolute", "relative"]}
        backgroundColor={colorMode === "dark" ? "gray.800" : "#fff"}
        top={[16, 0]}
        width={["100%", "max-content"]}
        left={navOpen ? 0 : "auto"}
        padding={4}
        right={[navOpen ? "auto" : "100%", "auto"]}
      >
        <Link to="/" className={location.pathname==="/" ? "text-blue-500":""} onClick={() => setNavOpen(false)}>
          Home
        </Link>
        <Link to="/addnote" className={location.pathname==="/addnote" ? "text-blue-500":""}  onClick={() => setNavOpen(false)}>
          Add Note
        </Link>
      </Flex>

      <IconButton
        borderRadius={"100%"}
        onClick={() => toggleColorMode()}
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      />
    </Flex>
  );
}

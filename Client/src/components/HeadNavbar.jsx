import { Flex, IconButton, useColorMode, Text } from "@chakra-ui/react";
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

export default function HeadNavbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [navOpen, setNavOpen] = useState(false);

  let location = useLocation();

  return (
    <Flex
      height={"16"}
      alignItems={"center"}
      paddingX={4}
      justifyContent={"space-between"}
      backgroundColor={colorMode === "dark" ? "gray.900" : "white"}
    >
      <IconButton
        fontSize={15}
        borderRadius={"full"}
        display={["inline", "none"]}
        variant={"unstyled"}
        onClick={() => setNavOpen(navOpen ? false : true)}
        icon={navOpen ? <CloseIcon /> : <HamburgerIcon />}
      />
      <Text fontSize={20}>MyNoteBook</Text>

      <Flex
        flexDirection={["column", "row"]}
        experimental_spaceX={[0, 4]}
        experimental_spaceY={[4, 0]}
        position={["absolute", "relative"]}
        backgroundColor={[
          colorMode === "dark" ? "gray.700" : "#fff",
          colorMode === "dark" ? "gray.900" : "white",
        ]}
        top={[16, 0]}
        width={["100vw", "max-content"]}
        left={navOpen ? 0 : "auto"}
        padding={4}
        right={[navOpen ? "auto" : "100%", "auto"]}
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
          to="/about"
          className={location.pathname === "/about" ? "text-blue-500" : ""}
          onClick={() => {
            setNavOpen(false);
          }}
        >
          About
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

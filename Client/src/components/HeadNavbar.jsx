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
      position: "top",
      duration: 2000,
      isClosable: true,
    });
    navigate("/login");
  };

  return (
    <Flex
      position={"sticky"}
      top={0}
      zIndex={10}
      height={"16"}
      alignItems={"center"}
      paddingX={4}
      justifyContent={"space-between"}
      shadow={"lg"}
      backgroundColor={colorMode === "dark" ? "gray.900" : "white"}
    >
      <div
        className={`hamburger w-5 flex cursor-pointer items-center flex-col space-y-1 md:hidden mr-2`}
        onClick={() => setNavOpen(!navOpen)}
      >
        <div
          className={`ham h-1 w-4 rounded duration-500 transition-transform origin-left ease-in-out ${
            navOpen ? "rotate-45" : "rotate-0"
          } ${colorMode === "dark" ? "bg-white" : "bg-slate-900"}`}
        ></div>
        <div
          className={`bur w-[1.39rem] h-1 rounded duration-500 transition-transform ease-in-out ${
            navOpen ? " -rotate-45" : "rotate-0"
          } ${colorMode === "dark" ? "bg-white" : "bg-slate-900"}`}
        ></div>
        <div
          className={`ger h-1 w-4 rounded duration-500 transition-transform origin-right ease-in-out ${
            navOpen ? "rotate-45" : "rotate-0"
          } ${colorMode === "dark" ? "bg-white" : "bg-slate-900"}`}
        ></div>
      </div>
      <Link to="/">
        <Text fontSize={20}>MyNoteBook</Text>
      </Link>

      <Flex
        flexDirection={"column"}
        experimental_spaceY={4}
        display={["flex", "flex", "none"]}
        position={"absolute"}
        left={0}
        backgroundColor={colorMode === "dark" ? "gray.700" : "#fff"}
        top={16}
        width={"100vw"}
        padding={4}
        transition={"0.5s ease-in-out transform"}
        transform={navOpen ? "translateX(0)" : "translateX(-100%)"}
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

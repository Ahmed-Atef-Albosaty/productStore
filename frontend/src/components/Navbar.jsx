import React from "react";
import {Container, Flex, Text, HStack, Button, useColorMode} from "@chakra-ui/react";
import { CiSquarePlus,CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

import { Link } from "react-router-dom"; // Add this import


const Navbar = () => {
    const {colorMode,toggleColorMode} = useColorMode()
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus />
            </Button>
          </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <FaMoon /> : <CiLight />  }
            </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;

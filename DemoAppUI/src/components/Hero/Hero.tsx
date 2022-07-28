import React from "react";
import {
  Box,
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import TypeWriter from "./TypeWriter";
import NextLink from "next/link";
interface ColoredButtonProps {
  btnText: string;
  textColor?: string;
  rounded?: string;
  href?: string;
  onClick?: any;
  mr?: number;
  onchange?(): any;
  mt?: number;
}

const ColoredButton = ({
  btnText,
  textColor,
  rounded,
  onClick,
  mr,
  mt,
}: ColoredButtonProps) => {
  return (
    <Button
      rounded={rounded}
      px={4}
      mr={mr}
      colorScheme={useColorModeValue("white", "primary")}
      _hover={{ bg: useColorModeValue("gray.700", "orange.500") }}
      bg={useColorModeValue("gray", "orange.300")}
      color={textColor}
      onClick={onClick}
      mt={mt}
    >
      {btnText}
    </Button>
  );
};

const SelectButton = ({ href }: { href: string }) => {
  return (
    <Box my={6}>
      <NextLink href={href} passHref>
        <ColoredButton btnText="Select" mr={3} />
      </NextLink>
    </Box>
  );
};

const Hero = ({ resultRef }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    resultRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const ModalPopUp = () => {
  //   return (
  //     <>
  //       <Modal
  //         closeOnOverlayClick={false}
  //         size="full"
  //         isOpen={isOpen}
  //         onClose={onClose}
  //       >
  //         <ModalOverlay />
  //         <ModalContent>
  //           <ModalHeader>Insert the input file</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody>
  //             <BrowserRouter>
  //               <DemoOptionsRoutes />
  //             </BrowserRouter>
  //           </ModalBody>
  //           <ModalFooter>
  //             <SelectButton href="/Demo/Test" />
  //             <Button onClick={onClose}>Cancel</Button>
  //           </ModalFooter>
  //         </ModalContent>
  //       </Modal>
  //     </>
  //   );
  // };

  return (
    <Container maxW="container.lg">
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 8 }}
        py={{ base: 20, md: 1 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Video subtitle{" "}
          <Text as={"span"} color={useColorModeValue("gray", "orange.300")}>
            generator
          </Text>
          <TypeWriter />
        </Heading>
        <Text colorScheme={"gray.500"} maxW={"3xl"}>
          An open-source progressive web application that generates video/audio
          transcripts and allows users the options to customize and export them.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <NextLink href="/Demo/Test">
            <ColoredButton
              onClick={onOpen}
              btnText="Get started"
              rounded={"full"}
            />
          </NextLink>

          <Button rounded={"full"} px={6} type="submit" onClick={onSubmit}>
            What this does?
          </Button>
          <NextLink href="https://github.com/ash2916/ASR" passHref>
            <Button rounded={"full"} px={6}>
              Backend models
            </Button>
          </NextLink>
        </Stack>
        <Flex w={"full"}></Flex>
      </Stack>
    </Container>
  );
};

export default Hero;

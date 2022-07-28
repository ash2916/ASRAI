import NextLink from "next/link";
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

import Boxes from "../components/Fixed/Boxes";

const NotFound = () => {
  return (
    <>
      <Container>
        <Center>
          <Heading as="h1">404</Heading>
        </Center>
        <Center>
          <Text>The page you&apos;re looking for was not found.</Text>
        </Center>
        <Box my={6} align="center">
          <NextLink href="/" passHref>
            <Button colorScheme={useColorModeValue("blue", "orange")}>
              Return to homepage
            </Button>
          </NextLink>
        </Box>
        <Boxes />
      </Container>
    </>
  );
};

export default NotFound;

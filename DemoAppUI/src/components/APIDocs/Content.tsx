import {
  Heading,
  Text,
  Container,
  Flex,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Box,
  CloseButton,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

function Content({ Category }: { Category: string }) {
  return (
    <Flex
      w="84.1%"
      bgColor={useColorModeValue("white", "blackAlpha.800")}
      flexDirection="column"
      overflow="auto"
      minH="100vh"
      marginLeft="200"
    >
      <Box pos="relative" ml="100px" mt="10px" mr="100px">
        <InputGroup
          bg="white"
          border="none"
          borderRadius="10px"
          ml={5}
          borderColor="white"
        >
          {" "}
          <InputLeftElement pointerEvents="none" color="gray">
            <FiSearch />
          </InputLeftElement>
          <Input type="number" placeholder="Search" borderRadius="10px" />
        </InputGroup>

        <Heading fontWeight="normal" mt={10} letterSpacing="tight">
          Category:{" "}
          <Flex fontWeight="bold" display="inline-flex">
            {Category}
          </Flex>
        </Heading>

        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading size="lg" letterSpacing="tight">
              Title
            </Heading>
            <Text fontSize="sm" color="gray" ml={4}>
              Description
            </Text>
          </Flex>
        </Flex>
        <Divider orientation="horizontal" variant="solid" />
        <Flex mt={5}>
          <Text>Content</Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Content;

import {
  Heading,
  Text,
  Flex,
  Divider,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

interface ContentProps {
  Title: String;
  Description?: String;
  children: any;
}

function Content({ Title, Description, children }: ContentProps) {
  return (
    <Flex
      w="100%"
      maxW="100%"
      h="auto"
      bgColor={useColorModeValue("white", "blackAlpha.800")}
      flexDirection="column"
      overflow="hidden"
      overflowX="scroll"
      minH="100vh"
      marginBottom="0px"
    >
      <Box pos="relative" ml="100px" mt="10px" mr="100px">
        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading size="lg" letterSpacing="tight">
              {Title}
            </Heading>
            <Text fontSize="sm" color="gray" ml={4}>
              {Description}
            </Text>
          </Flex>
        </Flex>
        <Divider orientation="horizontal" variant="solid" />
        <Flex mt={5}>{children}</Flex>
      </Box>
    </Flex>
  );
}

export default Content;

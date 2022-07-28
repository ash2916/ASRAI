//Unused component

import { Container, UnorderedList, ListItem } from "@chakra-ui/react";

const NoMatch = () => {
  return (
    <Container maxW="xl" minW="md" ml="20%">
      <UnorderedList>
        <ListItem color="gray" fontSize="md" mt="150">
          Choose 1 among 3 options above.
        </ListItem>
        <ListItem color="gray" fontSize="md">
          Once your targeted file is rendered to the screen, either by audio or
          video preview, click &apos;Choose this input&apos; to proceed.
        </ListItem>
        <ListItem color="gray" fontSize="md">
          After that, if you wish to change the input file, click
          &apos;Different input&apos; to return to this tab menu.
        </ListItem>
      </UnorderedList>
    </Container>
  );
};

export default NoMatch;

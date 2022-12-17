import { ReactNode } from "react";
import NextLink from "next/link";
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ThemeToggleButton from "./theme-toggle-button";

const LinkItem = ({
  href,
  path,
  children,
}: {
  href: string;
  path: string;
  children: ReactNode;
}) => {
  const active = path == href;
  const activeColor = useColorModeValue("whiteAlpha.900", "orange.300");
  const inactiveColor = useColorModeValue("black", "whiteAlpha.900");
  return (
    <NextLink href={href}>
      <Link
        p={2}
        bg={active ? "glassTeal" : undefined}
        color={active ? activeColor : inactiveColor}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const Navbar = (props) => {
  const { path } = props;

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#FFFFFF40", "#20202380")}
      style={{ backdropFilter: "blur(10px" }}
      zIndex={1}
      color={useColorModeValue("black", "white")}
      {...props}
    >
      <Container display="flex" p={0.4} maxW="container.md">
        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/" path={path}>
            API Dashboard
          </LinkItem>
          <LinkItem href="/Demo" path={path}>
            Subtitle Generator Demo
          </LinkItem>
        </Stack>

        <Box flex={1}>
          <ThemeToggleButton />
          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>API Dashboard</MenuItem>
                </NextLink>
                <NextLink href="/Demo" passHref>
                  <MenuItem as={Link}> Subtitle Generator Demo </MenuItem>
                </NextLink>
                <MenuItem as={Link} href="https://github.com/mphung1/ASR">
                  Source Code
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;

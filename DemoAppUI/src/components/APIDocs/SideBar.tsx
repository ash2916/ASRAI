import React, { ReactNode, ReactText, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Input,
} from "@chakra-ui/react";
import { FiCompass, FiArrowDownLeft, FiKey } from "react-icons/fi";
import { IconType } from "react-icons";
import { Link, Outlet } from "react-router-dom";
import ActionButton from "../Fixed/ActionButton";
import axios from "axios";

interface LinkItemProps {
  key: number;
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  {
    key: 1,
    name: "Core Resources",
    icon: FiCompass,
    path: "./CoreResources",
  },
  { key: 2, name: "Plugin", icon: FiKey, path: "./Plugin" },
];

export default function SideBar({ children }: { children?: ReactNode }) {
  // const [mobile, setMobile] = useState(false);
  // const activeMenu = true;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link to={href} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("gray", "orange.200"),
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
const GetInfoSection = () => {
  const [name, setName] = useState<any | null>(null);
  const handleChange = (event) => setName(event.target.value);
  const [submitted, setSubmitted] = useState(false);

  const FormData = require("form-data");
  const bodyFormData = new FormData();
  bodyFormData.append("username", `${name}`);
  const handleSubmittedInfo = async () => {
    const res = await axios({
      method: "post",
      url: "https://glitchrooms.space/asr_api.php/",
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*/*",
        "Content-Type": "multipart/form-data",
        mode: "no-cors",
        // "Content-Type": "application/json",
        // withCredentials: true,
        // Authorization: key,
      },
    });
    console.log(res);
    setName("");
    setSubmitted(true);
  };

  return (
    <>
      <Text as="i" m="5px">
        Get your API key:
      </Text>
      <Input
        m="5px"
        placeholder="Your name"
        width="auto"
        value={name}
        onChange={handleChange}
      />
      <ActionButton m="5px" btnText="Submit" onClick={handleSubmittedInfo} />
      {submitted ? (
        <>
          <Text></Text>
          <Text as="b" m="5px">
            Your API key is:{" "}
          </Text>
          <Text m="5px"> here</Text>
          <Text as="b" m="5px">
            Your secret key is:{" "}
          </Text>
          <Text m="5px"> here</Text>
        </>
      ) : null}
    </>
  );
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <>
      <Box
        bg={useColorModeValue("white", "black")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            API Docs
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        <nav>
          {LinkItems.map((link) => (
            <NavItem key={link.key} icon={link.icon} href={link.path}>
              {link.name}
            </NavItem>
          ))}
        </nav>
        <GetInfoSection />
      </Box>
      <Outlet />
    </>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiArrowDownLeft />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        API Docs
      </Text>
    </Flex>
  );
};

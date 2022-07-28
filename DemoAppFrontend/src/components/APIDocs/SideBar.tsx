import React, { ReactNode, ReactText, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Input,
} from "@chakra-ui/react";
import { FiCompass, FiArrowDownLeft } from "react-icons/fi";
import { IconType } from "react-icons";
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
    path: "./",
  },
];

export default function SideBar({ children }: { children?: ReactNode }) {
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

const GetInfoSection = () => {
  const [name, setName] = useState<string>(null);
  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const [submitted, setSubmitted] = useState(false);
  const [ApiKey, showApiKey] = useState();

  const FormData = require("form-data");
  const bodyFormData = new FormData();
  bodyFormData.append("username", `${name}`);
  const handleSubmittedInfo = async () => {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/get_api_key",
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*/*",
        "Content-Type": "multipart/form-data",
        mode: "no-cors",
      },
    });
    showApiKey(res.data.api_key);
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
          <Text />
          <Text as="b" m="5px">
            Your API key is:
          </Text>
          <Text m="5px" ml="5px">
            {ApiKey}
          </Text>
        </>
      ) : null}
    </>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

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
        <GetInfoSection />
      </Box>
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

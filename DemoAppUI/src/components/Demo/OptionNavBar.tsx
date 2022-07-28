import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MenuItem, Text, Stack, Flex } from "@chakra-ui/react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./MenuBarElements";

interface LinkItemProps {
  key: number;
  name: string;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { key: 1, name: "Search", path: "/Demo/Search" },
  { key: 2, name: "Upload", path: "/Demo/Upload" },
  { key: 3, name: "By URL", path: "/Demo/ByUrl" },
  // { key: 4, name: "Google Drive", path: "/Demo/GoogleDrive" },
];

function OptionNavBar() {
  return (
    <>
      <Nav>
        <NavMenu>
          {LinkItems.map((link) => (
            <NavLink key={link.key} to={link.path}>
              {link.name}
            </NavLink>
          ))}
        </NavMenu>
      </Nav>

      <hr />

      <Outlet />
    </>
  );
}

export default OptionNavBar;

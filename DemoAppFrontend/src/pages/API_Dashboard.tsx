import React from "react";
import SideBar from "../components/APIDocs/SideBar";
import CoreResources from "../components/APIDocs/CoreResources";
import { Flex } from "@chakra-ui/react";

const API_dashboard = () => {
  return (
    <>
      <Flex>
        <SideBar />
        <CoreResources />
      </Flex>
    </>
  );
};

export default API_dashboard;

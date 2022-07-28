//unused component

import React, { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { Container, Button } from "@chakra-ui/react";
import { FaGoogleDrive } from "react-icons/fa";

function GoogleDrivePicker() {
  const [openPicker, data, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "388384168814-ei2pqo0a2tihf8mstc937l6jjf8lekj5.apps.googleusercontent.com",
      developerKey: "AIzaSyBkmNzR3vSDLs02FeY5NAtoYD5H26uFFsk",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(data);
      },
    });
  };

  useEffect(() => {
    if (data) {
      data.docs.map((i) => console.log(i));
    }
  }, [data]);

  return (
    <>
      <Container mt="10%" ml="35%">
        <Button
          rightIcon={<FaGoogleDrive />}
          onClick={() => handleOpenPicker()}
        >
          Open Google Drive
        </Button>
      </Container>
    </>
  );
}

export default GoogleDrivePicker;

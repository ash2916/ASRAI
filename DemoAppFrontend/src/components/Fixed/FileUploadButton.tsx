//Unused component

import React from "react";
import DropZone from "react-dropzone";
import {
  AspectRatio,
  Box,
  BoxProps,
  Container,
  forwardRef,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";

const first = {
  rest: {
    rotate: "-15deg",
    scale: 0.95,
    x: "-50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "-70%",
    scale: 1.1,
    rotate: "-20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const second = {
  rest: {
    rotate: "15deg",
    scale: 0.95,
    x: "50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "70%",
    scale: 1.1,
    rotate: "20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const third = {
  rest: {
    scale: 1.1,
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 1.3,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundImage={`url("https://imageio.forbes.com/specials-images/imageserve/61c4dab3dcce70ad2cdf606a/0x0.jpg?format=jpg&width=1200")`}
      {...props}
      ref={ref}
    />
  );
});

const fileMaxSize = 3000000000; //bytes
const acceptedFileTypes = "audio/*, video/*";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
  return item.trim();
});

const FileUploadButton = () => {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();

  const verifyFile = (files: string | any[]) => {
    console.log(files);
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      alert("Successfully uploaded!");
      if (currentFileSize > fileMaxSize) {
        alert(
          "This file is not allowed! " +
            currentFileSize +
            " bytes is too large."
        );
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert("This file is not allowed! Only audios and videos are allowed.");
        return false;
      }
      return true;
    }
  };

  const handleOnDrop = (
    files: string | any[],
    rejectedFiles: string | any[]
  ) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      console.log(rejectedFiles);
      this.verifyFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        //imageBase64Data
      }
    }
  };

  return (
    <>
      <Container my="12">
        <AspectRatio width="64" ratio={1}>
          <Box
            borderColor="gray.300"
            borderStyle="dashed"
            borderWidth="2px"
            rounded="md"
            shadow="sm"
            role="group"
            transition="all 150ms ease-in-out"
            _hover={{
              shadow: "md",
            }}
            as={motion.div}
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <Box position="relative" height="100%" width="100%">
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width="100%"
                display="flex"
                flexDirection="column"
              >
                <Stack
                  height="100%"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justify="center"
                  spacing="4"
                >
                  <Box height="16" width="12" position="relative">
                    <PreviewImage
                      variants={first}
                      backgroundImage="url('https://storage.tweakreviews.com/gadgets/Speech%20Recognition%20in%20Outlook/Tale%20til%20Tekst.png')"
                    />
                    <PreviewImage
                      variants={second}
                      backgroundImage="url('https://s.yimg.com/ny/api/res/1.2/Sew6DkXAGmV7lr.AnQFNpQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ4MA--/http://globalfinance.zenfs.com/en_us/Finance/US_AFTP_SILICONALLEY_H_LIVE/The_next_generation_of_Sirilike-8f3ef71be2badc246de1cede7c49c2fb')"
                    />
                    <PreviewImage
                      variants={third}
                      backgroundImage={`url("https://imageio.forbes.com/specials-images/imageserve/61c4dab3dcce70ad2cdf606a/0x0.jpg?format=jpg&width=1200")`}
                    />
                  </Box>
                  <Stack p="8" textAlign="center" spacing="1">
                    <DropZone
                      onDrop={handleOnDrop}
                      maxSize={fileMaxSize}
                      multiple={false}
                      onDragEnter={startAnimation}
                      onDragLeave={stopAnimation}
                      accept={["video/*", "audio/*"]}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                              Drag & drop some files here, or click to select
                              files
                            </p>
                          </div>
                        </section>
                      )}
                    </DropZone>
                    <Text fontWeight="light">*.mp3, .mp4, .wav, ... </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </AspectRatio>
      </Container>
    </>
  );
};

export default FileUploadButton;

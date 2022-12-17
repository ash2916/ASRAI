import { useState, useEffect, useReducer } from "react";
import transcription from "@pages/api/transcription";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import ModelSelect from "react-select";
import CustomButton from "@components/Fixed/CustomButton";
import Search from "@components/Demo/Search";
import Upload from "@components/Demo/Upload";
import UrlReader from "@components/Demo/UrlReader";
import InfoPopOver from "@components/Demo/InfoPopOver";

export default function Test() {
  const modelOptions = [
    {
      value: "quartznet",
      label: "QuartzNet",
    },
    {
      value: "jasper",
      label: "Jasper",
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>();
  const [options, showOptions] = useState<boolean>(true);
  const [model, setModel] = useState<string>();
  const [inputFileType, setInputFileType] = useState<string>();
  const [uploadedFile, handleUploadedFile] = useState<Blob | string | string[]>(
    null
  );
  const [transcript, showTranscript] = useState<string>();
  const [latencyNumber, showLatencyNumber] = useState<number>();

  const FormData = require("form-data");
  const bodyFormData = new FormData();
  bodyFormData.append("api_key", "your_api_key");
  bodyFormData.append("dataset_name", "LibriSpeech");
  bodyFormData.append("model_name", `${model}`);
  bodyFormData.append("file_datatype", `${inputFileType}`);
  if (uploadedFile != null) {
    bodyFormData.append("file", uploadedFile);
  }

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*/*",
      "Content-Type": "multipart/form-data",
      mode: "no-cors",
    },
  };

  const handleTranscribe = async () => {
    setLoading(true);
    const res = await transcription.post(
      "/transcribe_file",
      bodyFormData,
      config
    );
    showTranscript(res.data.transcript);
    showLatencyNumber(res.data.latency);
    setLoading(false);
  };

  const setSelectedModel = (event: { value: React.SetStateAction<string> }) => {
    setModel(event.value);
  };

  const handleSearchCallback = (videoId: string) => {
    setUrl("https://www.youtube.com/embed/" + videoId);
    handleUploadedFile("https://www.youtube.com/embed/" + videoId);
    setInputFileType("y_video");
  };

  const handleUploadCallback = (fileUrl: string) => {
    setUrl(fileUrl);
  };

  const handleUrlCallback = (watchUrl: string) => {
    setUrl(watchUrl);
    handleUploadedFile(watchUrl);
    setInputFileType("y_video");
  };

  const handleUploadTypeCallback = (blob: Blob) => {
    handleUploadedFile(blob);
    if (blob.type == "audio/wav") {
      setInputFileType("a_upload");
    } else if (blob.type == "video/mp4") {
      setInputFileType("v_upload");
    } else {
      setInputFileType("not_supported");
      alert("Unsupported format!");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [uploadedFile]);

  const [volume, setVolume] = useReducer(reducer, 0.4);
  function reducer(state: number, action: { type: string }) {
    switch (action.type) {
      case "increment":
        return state + 0.2;
      case "decrement":
        return state - 0.2;
      default:
        throw new Error();
    }
  }

  const setVolumeUp = () => {
    if (volume < 1) {
      setVolume({ type: "increment" });
    }
  };

  const setVolumeDown = () => {
    if (volume > 0) {
      setVolume({ type: "decrement" });
    }
  };

  const renderContentScreen = () => {
    showOptions(false);
  };

  const renderOptionScreen = () => {
    showOptions(true);
  };

  return (
    <>
      {options ? (
        <>
          <Flex>
            <InfoPopOver btnText="?" />
            <Box
              mt="0.5rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CustomButton
                onClick={renderContentScreen}
                btnText="Choose this input"
                mb={2}
              />
            </Box>
          </Flex>

          <Tabs isFitted variant="solid-rounded">
            <TabList mb="1rem">
              <Tab _selected={{ color: "white", bg: "black" }}>Search</Tab>
              <Tab _selected={{ color: "white", bg: "black" }}>Upload</Tab>
              <Tab _selected={{ color: "white", bg: "black" }}>By URL</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Search searchCallback={handleSearchCallback} />
              </TabPanel>
              <TabPanel>
                <Upload
                  uploadCallback={handleUploadCallback}
                  uploadTypeCallback={handleUploadTypeCallback}
                />
              </TabPanel>
              <TabPanel>
                <UrlReader urlCallback={handleUrlCallback} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <>
          <Box pos="relative" padding-top="56.25%">
            <Center>
              <ReactPlayer
                position="absolute"
                key={url}
                url={url}
                width="80%"
                height={300}
                controls={true}
                playing={false}
                volume={volume}
              />
            </Center>
          </Box>

          <Container
            maxW="container.xl"
            bg="black"
            mt="1rem"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              pos="relative"
              mr="1rem"
              text-align="left"
              display="inline-block"
            >
              <table>
                <tbody>
                  <tr>
                    <th>
                      <button onClick={setVolumeDown}>
                        <Text color="blue.300">-</Text>
                      </button>
                    </th>
                    <td>
                      <CustomButton
                        onClick={renderOptionScreen}
                        btnText="Different input"
                        mt={2}
                      />
                    </td>
                    <td>
                      <CustomButton btnText="PiP Mode" mt={2} />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <Text color="blue.300">Actions</Text>
                    </th>
                    <td>
                      <CustomButton
                        btnText="Split Subtitles"
                        ml={1}
                        onClick={() =>
                          window.alert("This feature is under development.")
                        }
                      />
                    </td>
                    <td>
                      <CustomButton btnText="Export" ml={1} />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <button onClick={setVolumeUp}>
                        <Text color="blue.300">+</Text>
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
              <VStack spacing={2} align="stretch">
                <Box ml={2}>
                  <ModelSelect
                    placeholder="Choose model"
                    options={modelOptions}
                    onChange={setSelectedModel}
                  />
                </Box>

                <CustomButton btnText="Transcribe" onClick={handleTranscribe} />
                <CustomButton
                  btnText="Transcribe with Timestamp"
                  onClick={() =>
                    window.alert("This feature is under development.")
                  }
                />
              </VStack>
            </Box>
            <Box
              pos="relative"
              h="100%"
              w="100%"
              padding="1rem"
              bg="white"
              color="black"
              minW="container.md"
              minH="sm"
              display="inline-block"
            >
              <Flex align="flex-end">
                <Heading size="lg" letterSpacing="tight">
                  Transcription
                </Heading>
                <Spacer />
                <Heading size="sm" mr="7rem">
                  Latency:{" "}
                </Heading>
                {latencyNumber && <Text>{latencyNumber}s</Text>}
              </Flex>

              <Divider orientation="horizontal" variant="solid" />
              <Flex align="flex-end">
                <table>
                  <tbody>
                    <tr>
                      <th>Dataset Name: </th>
                      <Text as="i" ml={2}>
                        LibriSpeech
                      </Text>
                    </tr>
                    <tr>
                      <th>Model Name:</th>
                      <Text as="i">{model}</Text>
                    </tr>
                    <tr>
                      <th>Input Type:</th>
                      <Text as="i">{inputFileType}</Text>
                    </tr>
                    <tr>
                      <th>File URL:</th>
                      <Text as="i">{url}</Text>
                    </tr>
                  </tbody>
                </table>
              </Flex>
              <Divider orientation="horizontal" variant="solid" />

              {transcript && <Text>{transcript}</Text>}
              <Center mt="3rem">
                <ClimbingBoxLoader loading={loading} />
              </Center>
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

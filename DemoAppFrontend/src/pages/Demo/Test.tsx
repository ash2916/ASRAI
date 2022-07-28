import React, { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";
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
  useColorModeValue,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import ActionButton from "../../components/Fixed/ActionButton";
import Search from "../../components/Demo/Search";
import Upload from "../../components/Demo/Upload";
import UrlReader from "../../components/Demo/UrlReader";
import InfoPopOver from "../../components/Demo/InfoPopOver";
import ModelSelect from "react-select";

export default function Test() {
  const SEPARATOR = " · ";
  // const CryptoJS = require("crypto-js");
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

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<any | null>(null);
  const [options, showOptions] = useState(true);
  const [model, setModel] = useState();
  const [inputFileType, setInputFileType] = useState<string>(null);
  const [uploadedFile, handleUploadedFile] = useState<any | null>();
  const [transcript, showTranscript] = useState<string>(null);
  const [latencyNumber, showLatencyNumber] = useState<number>(null);
  const [volume, setVolume] = useState<number>(0);

  const FormData = require("form-data");
  const bodyFormData = new FormData();
  bodyFormData.append("api_key", "something");
  bodyFormData.append("dataset_name", "LibriSpeech");
  bodyFormData.append("model_name", `${model}`);
  bodyFormData.append("file_datatype", `${inputFileType}`);
  bodyFormData.append("file", uploadedFile);

  const handleTranscribe = async () => {
    setLoading(true);
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/transcribe_file",
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*/*",
        "Content-Type": "multipart/form-data",
        mode: "no-cors",
        // withCredentials: true,
        // Authorization: key,
      },
    });
    showTranscript(res.data.transcript);
    showLatencyNumber(res.data.latency);
    setLoading(false);
  };

  const setVolumeUp = () => {
    setVolume(volume + 0.2);
  };

  const setVolumeDown = () => {
    setVolume(volume - 0.2);
  };

  const setSelectedModel = (event) => {
    // event.preventDefault();
    setModel(event.value);
  };

  const renderContents = () => {
    showOptions(false);
  };

  const renderOptions = () => {
    showOptions(true);
  };

  const handleSearchCallback = (videoId) => {
    setUrl("https://www.youtube.com/embed/" + videoId);
    handleUploadedFile("https://www.youtube.com/embed/" + videoId);
    setInputFileType("y_video");
  };

  const handleUploadCallback = (fileUrl) => {
    setUrl(fileUrl);
  };

  const handleUrlCallback = (watchUrl) => {
    setUrl(watchUrl);
    handleUploadedFile(watchUrl);
    setInputFileType("y_video");
  };

  const handleUploadTypeCallback = (blob) => {
    handleUploadedFile(blob);
    if (blob.type == "audio/wav") {
      setInputFileType("a_upload");
    } else if (blob.type == "video/mp4") {
      setInputFileType("v_upload");
    } else {
      setInputFileType("undefined");
    }
  };

  return (
    <>
      {options ? (
        <>
          <Flex>
            <InfoPopOver />
            <Box ml="40%" mt="2">
              <ActionButton
                onClick={renderContents}
                btnText="Choose this input"
                mb={2}
              />
            </Box>
          </Flex>

          <Tabs isFitted variant="solid-rounded">
            <TabList mb="1em">
              <Tab _selected={{ color: "white", bg: "black" }}>Search</Tab>
              <Tab _selected={{ color: "white", bg: "black" }}>Upload</Tab>
              <Tab _selected={{ color: "white", bg: "black" }}>By URL</Tab>
            </TabList>
            <TabPanels>
              <TabPanel overflowY="scroll">
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
        <Box margin="auto" text-align="center">
          <Box
            display="inline-block"
            max-width="480px"
            margin="20px"
            text-align="left"
            vertical-align="top"
          >
            <Text fontSize="2xl">Subtitles Generator Demo</Text>
            <ReactPlayer
              key={url}
              url={url}
              width={500}
              height={250}
              controls={true}
              playing={false}
              volume={volume}
            />
            <table>
              <tbody>
                <tr>
                  <th>
                    <button onClick={setVolumeDown}>-</button>
                  </th>
                  <td>
                    <ActionButton
                      onClick={renderOptions}
                      btnText="Different input"
                      mt={2}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Actions</th>
                  <td>
                    <Flex ml={2}>
                      <ModelSelect
                        placeholder="Choose model"
                        options={modelOptions}
                        onChange={setSelectedModel}
                      />
                    </Flex>
                  </td>
                  <td>
                    <ActionButton
                      btnText="Transcribe"
                      onClick={handleTranscribe}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <button onClick={setVolumeUp}>+</button>
                  </th>
                  <td>
                    <em>
                      <ActionButton btnText="PiP mode" />
                      <ActionButton btnText="Export" ml={1} />
                    </em>
                  </td>
                </tr>
                <tr>
                  <th>Latency: </th>
                  <td>
                    {latencyNumber && <Text ml={2}>{latencyNumber}s</Text>}
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Box display="inline-block">
            <Container
              maxW="container.md"
              bg="black"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                padding="4"
                bg="white"
                color="black"
                width="container.sm"
                minH="sm"
              >
                <Flex justifyContent="space-between">
                  <Flex align="flex-end">
                    <Heading size="lg" letterSpacing="tight">
                      Transcription
                    </Heading>
                  </Flex>
                </Flex>
                <Divider orientation="horizontal" variant="solid" />
                <Flex mt={5}>
                  <ClimbingBoxLoader loading={loading} />
                  {transcript && <Text>{transcript}</Text>}
                </Flex>
              </Box>
            </Container>

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
          </Box>

          <footer>
            <Flex ml="1%">
              Version&nbsp;
              <strong>0.1.0</strong>
              {SEPARATOR}
              <a> &copy; {new Date().getFullYear()} ASR-AI Team</a>
              <a href="https://github.com/mphung1/ASR-API-web-Service"></a>
            </Flex>
          </footer>
        </Box>
      )}
    </>
  );
}

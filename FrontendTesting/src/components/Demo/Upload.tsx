import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";

const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
const ffmpeg = createFFmpeg({ log: true });
const validFileTypes = "video/*, audio/*";

const Upload = ({ uploadCallback, uploadTypeCallback }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [video, setVideo] = useState<any | undefined>();

  const fileMaxSize: number = 1000000000;

  const load = async () => {
    await ffmpeg.isLoaded();
    setLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  return loaded ? (
    <>
      <Center mt="2rem">
        <input
          type="file"
          accept={validFileTypes}
          onChange={(event) => {
            if (event.target.files?.item(0).size < fileMaxSize) {
              event.preventDefault();
              setVideo(event.target.files?.item(0));
              uploadCallback(URL.createObjectURL(event.target.files?.item(0)));
              uploadTypeCallback(event.target.files?.item(0));
            } else {
              window.alert(
                "Your file cannot be larger than " +
                  Number(fileMaxSize / 1000000000) +
                  "GB."
              );
            }
          }}
        />
      </Center>
      {video && (
        <Center mt="1rem">
          <video
            controls
            width="500"
            height="250"
            src={URL.createObjectURL(video)}
          />
        </Center>
      )}
    </>
  ) : (
    <p>Loading ...</p>
  );
};

export default Upload;

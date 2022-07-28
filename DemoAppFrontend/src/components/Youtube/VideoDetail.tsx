import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <>
        <Flex ml="12%">
          <Text color="gray">Your chosen video will be rendered here.</Text>
        </Flex>
      </>
    );
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  // console.log(typeof video);
  return (
    <div>
      <div>
        <iframe
          src={videoSrc}
          width="500"
          height="250"
          allowFullScreen
          title="Video player"
        />
      </div>
      <div>
        <b>{video.snippet.title}</b>
        <p>
          <b>Description: </b>
          {video.snippet.description}
        </p>
      </div>
    </div>
  );
};

export default VideoDetail;

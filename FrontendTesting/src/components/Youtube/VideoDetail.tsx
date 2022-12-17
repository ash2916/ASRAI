import { Text } from "@chakra-ui/react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <>
        <Text color="gray">Your chosen video will be rendered here.</Text>
      </>
    );
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div>
      <iframe
        src={videoSrc}
        width="100%"
        height="300"
        allowFullScreen
        title="Video player"
      />
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

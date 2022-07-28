//Unused component

import YouTube, { YouTubeProps } from "react-youtube";

function YoutubeExample({ videoId }: { videoId: string }) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
    console.log(event.target);
    // this.setState({
    //   playerObj: event.target,
    // });
  };

  const videoOnPlay: YouTubeProps["onPlay"] = (event) => {
    // console.log(event.target.getCurrentTime());
  };
  const videoStateChange: YouTubeProps["onStateChange"] = (event) => {
    console.log(event.target.getCurrentTime());
  };
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // const componentUnmount: YoutubeProps[["onStateChange", "onPlay"]] = (
  //   event
  // ) => {
  //   const player = event.target;
  //   const { playerObj } = this.state;
  //   console.log(player.getCurrentTime());
  // };
  return (
    <>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        onPlay={videoOnPlay}
        onStateChange={videoStateChange}
      />
    </>
  );
}

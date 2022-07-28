import React from "react";
import SearchBar from "../../components/Youtube/YoutubeSearchBar";
import youtube from "../../pages/api/youtube";
import VideoList from "../../components/Youtube/VideoList";
import VideoDetail from "../../components/Youtube/VideoDetail";
import { Flex } from "@chakra-ui/react";

class Search extends React.Component<any, any> {
  state = {
    videos: [],
    selectedVideo: null,
  };

  handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });

    this.setState({
      videos: response.data.items,
    });
    console.log("response", response);
  };

  handleVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
    console.log("selected", video);
    const videoId = video.id.videoId;
    this.props.searchCallback(videoId);
  };

  render() {
    return (
      <>
        <Flex mt={2} ml="40%">
          <SearchBar handleFormSubmit={this.handleSubmit} />
        </Flex>
        <Flex mt={2} ml="30%">
          <VideoDetail video={this.state.selectedVideo} />
        </Flex>
        <Flex mt={20}>
          <VideoList
            handleVideoSelect={this.handleVideoSelect}
            videos={this.state.videos}
          />
        </Flex>
      </>
    );
  }
}
export default Search;

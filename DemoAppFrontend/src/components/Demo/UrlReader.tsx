import React, { useState } from "react";
import {
  Container,
  Text,
  Flex,
  Input,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";

function UrlReader({ urlCallback }) {
  const [value, setValue] = useState();
  const [url, setUrl] = useState();
  const [message, showMessage] = useState(true);

  const handleChange = (event) => setValue(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(value);
    showMessage(false);
    urlCallback(value);
  };

  return (
    <>
      <Container mt="5">
        <Text mb="8px">Paste Youtube URL here</Text>
        <form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            placeholder="https://"
            size="sm"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            focusBorderColor="blue.500"
          />
        </form>
        {message ? (
          <UnorderedList>
            <ListItem color="gray" fontSize="md" mt="150">
              We accept a variety of URLs, including file paths, YouTube,
              Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud,
              DailyMotion and Kaltura.
            </ListItem>
            <ListItem color="gray" fontSize="md">
              Click enter. If your URL is correct, you&apos;ll see a video
              preview here.
            </ListItem>
          </UnorderedList>
        ) : (
          <Flex mt="5">
            <ReactPlayer url={url} controls={true} width={500} height={250} />
          </Flex>
        )}
      </Container>
    </>
  );
}

export default UrlReader;

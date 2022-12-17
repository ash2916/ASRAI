import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Navbar from "@components/Fixed/navbar";
import ScrollToTop from "@components/Fixed/ScrollToTop";

const Main = ({ children, router }) => {
  const headerImg = `/images/ASR-AI.png`;
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={headerImg} type="image/x-icon"></link>
        <title> ASR </title>
      </Head>

      <Navbar path={router.asPath} />
      <Box pos="absolute" top="10" left="0" right="0">
        {children}
      </Box>
      <ScrollToTop />
    </Box>
  );
};

export default Main;

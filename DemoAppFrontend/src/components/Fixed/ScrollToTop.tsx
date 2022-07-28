import { useState, useRef, useEffect, MutableRefObject } from "react";
import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { gsap } from "gsap";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const scrollButton: MutableRefObject<any> = useRef();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(scrollButton.current, {
        duration: 0.5,
        opacity: 1,
        zIndex: 100,
      });
    } else {
      gsap.to(scrollButton.current, {
        duration: 0.5,
        opacity: 1,
        zIndex: -1,
      });
    }
  }, [isVisible]);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    scrollButton.current?.blur();
  };

  return (
    <IconButton
      aria-label="scroll to top"
      icon={<ArrowUpIcon />}
      size="lg"
      colorScheme={useColorModeValue("#38B2AC", "#F6AD55")}
      variant="outline"
      border="2px solid"
      ref={scrollButton}
      onClick={handleClick}
      position="fixed"
      bottom="4rem"
      right="4rem"
      zIndex="-1"
      opacity="0"
    />
  );
};

export default ScrollToTop;

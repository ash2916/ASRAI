import React from "react";
import Typewriter from "typewriter-effect";

const IntroPhrase: {
  strings: string[];
  autoStart: boolean;
  loop: boolean;
  deleteSpeed?: number;
} = {
  strings: ["Automated Speech Recognizer", "Created with AI"],
  autoStart: true,
  loop: true,
  deleteSpeed: 50,
};

function TypeWriter() {
  return <Typewriter options={IntroPhrase} />;
}

export default TypeWriter;

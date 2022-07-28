import React, { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";

const Boxes = () => {
  const [boxes, setBoxes] = useState<number[]>([]);

  useEffect(() => {
    setBoxes(makeBoxes(20));
  }, []);

  function makeBoxes(howMany: number): any[] {
    let tempArr = [];
    for (let i = 0; i < howMany; i++) {
      tempArr.push("box" + 1);
    }
    return tempArr;
  }

  return (
    <Flex flexFlow="row wrap" gap={4} justifyContent="center">
      {boxes &&
        boxes.map((box) => {
          return (
            <Box
              key={box}
              p="80px"
              bgImage="linear-gradient(red, orange)"
              borderRadius="lg"
            />
          );
        })}
    </Flex>
  );
};

export default Boxes;

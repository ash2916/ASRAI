import { Button } from "@chakra-ui/react";

function CustomButton({ btnText, ...props }) {
  return (
    <Button variant="outline" colorScheme="blue" {...props}>
      {btnText}
    </Button>
  );
}

export default CustomButton;

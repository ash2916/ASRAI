import { Button } from "@chakra-ui/react";

interface ActionButtonProps {
  btnText: string;
  onClick?: any;
  mt?: number;
  ml?: number;
  mb?: number;
  m?: number | string;
}
function ActionButton({ btnText, onClick, mt, ml, mb, m }: ActionButtonProps) {
  return (
    <Button
      variant="outline"
      colorScheme="blue"
      onClick={onClick}
      mt={mt}
      ml={ml}
      mb={mb}
      m={m}
    >
      {btnText}
    </Button>
  );
}

export default ActionButton;

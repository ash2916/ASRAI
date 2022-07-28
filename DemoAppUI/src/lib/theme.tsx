import {
  extendTheme,
  ComponentStyleConfig,
  useColorModeValue,
} from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#FED8B5", "#2D3748")(props),
    },
  }),
};

const components = {
  Heading: {
    variants: {
      "section-title": {
        textDecoration: "underline",
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: "#525252",
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4,
      },
    },
  },
  Link: {
    baseStyle: (props: Dict<any> | StyleFunctionProps) => ({
      color: mode("#3d7aed", "#000000")(props),
      textUnderlineOffset: 3,
    }),
  },
  Divider: {
    defaultProps: {
      size: "lg",
      variant: "solid",
      colorScheme: "black",
    },
  },
};

const fonts = {
  heading: "'M PLUS Rounded 1c'",
};

const colors = {
  primary: "#F6AD55",
  secondary: "blue.500",
  novaLight: "#13B5EA",
  novaBlue: "#00205B",
  grassTeal: "#88ccca",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles,
  components,
  fonts,
  colors,
});
export default theme;

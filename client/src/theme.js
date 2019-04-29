import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#4b3645"
    },
    secondary: {
      main: "#E76F51"
    }
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 16,
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0
      }
    }
  }
});

// Styled Breakpoints

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};

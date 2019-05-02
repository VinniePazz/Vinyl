import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    },
    secondary: {
      main: "#E76F51"
		},
		error: {
			main: "#ff4d4d"
		},
		text: {
			primary: 'rgba(255, 255, 255, 0.76)',
			secondary: "rgba(255, 255, 255, 0.76)"
		},
		action: {
			active: 'rgba(255, 255, 255, 0.76)'
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

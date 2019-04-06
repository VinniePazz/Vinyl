import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
		primary: {
			main: '#999592'
		},
		secondary: {
			main: '#009688'
		}
	},
	typography: {
		fontFamily: '"Oswald", sans-serif',
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

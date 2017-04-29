import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
	amber100, amber500, amber700,
	brown100, brown500, brown700,
	grey100, grey600, grey900,
	
} from 'material-ui/styles/colors';

// Theming
const OrangeMuiTheme = getMuiTheme({
  palette: {
		primary1Color: amber700,
    primary2Color: amber100,
    primary3Color: amber500,
    accent1Color: brown500,
    accent2Color: grey100,
    accent3Color: brown700,
  },
});

export default OrangeMuiTheme;

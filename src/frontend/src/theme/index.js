import { createMuiTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
  
    primary: teal,
    secondary: cyan,
  },
  shadows,
  typography
});

export default theme;

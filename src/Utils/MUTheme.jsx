import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  props: {
    MuiButtonBase: {
      elevation: 0
    },
  },
  palette: {
    primary: {
      main: '#2e7d32',
      light: '#60ad5e',
      dark:'#005005',
      contrastText: '#FFF'
    },
    secondary: {
      contrastText: '#FFF',
      main: '#ef6c00',
      light: '#ff9d3f',
      dark:'#b53d00'
    }
  }
})

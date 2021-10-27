import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#F3F6F9"
    }
  },
  typography: {
    fontFamily: "Poppins, sans-serif"
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;
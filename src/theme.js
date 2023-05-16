import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#757ce8",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
})

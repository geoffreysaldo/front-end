import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiBottomNavigation:{
      root:{
        backgroundColor:"#f2cf4c",
      }
    },
    MuiBottomNavigationAction: {
      root: {
        fontWeight: "bold",
        width: "100%",

      },
      label:{
        fontSize:"14px",
        '&$selected': {
          fontSize: "18px",
          color:"black",
        },
        color:"#2b2e2c",
        fontFamily:"Gelasio"
      }
    }
  }
});

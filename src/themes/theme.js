import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiBottomNavigation:{
      root:{
        backgroundColor:"#f2cf4c",
        height:"90px"
      }
    },
    MuiBottomNavigationAction: {
      root: {
        fontWeight: "bold",
        height:"50px",
        marginTop:"40px"
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

import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiBottomNavigationAction: {
      root: {
        fontWeight: "bold",
      },
      label:{
        fontSize:"14px",
        '&$selected': {
          fontSize: "18px",
          color:"black",
        },
        color:"#2b2e2c",
      }
    }
  }
});

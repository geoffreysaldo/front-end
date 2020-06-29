import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiPopover: {
      paper:{
        background:'linear-gradient(#202020, #252424)',
        color:'white',
      }
    }
  }
}
);
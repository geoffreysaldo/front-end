import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors';

export default createMuiTheme({
    palette: {
        primary: grey,
      },
    overrides: {
        MuiLinearProgress: {
            colorPrimary:"#f2f2f2"
        },
        MuiTextField :{
            colorPrimary:"#f2f2f2"
        }
    }
});
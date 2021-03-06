import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: grey,
  },
  overrides: {
    MuiTextField: {
      root:{
        marginRight: '10px',
        marginTop: '11px',
        width : '150px',
        borderRadius:'4px',
        borderWidth: '1px'
      }},
    MuiOutlinedInput: {
      root:{ 
        height:"28px",
        backgroundColor:"#f2f2f2",
        '&:hover': {
            borderColor: 'white',
          }, 
      }
    }
    }
    }

);

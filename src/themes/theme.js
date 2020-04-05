import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiBottomNavigation:{
      root:{
        background: 'linear-gradient(#343333, #090909)',
        boxShadow: '0 3px 6px rgba(0,0,0,0.25)',
        borderTop: '1px solid #343434',
      }
    },
    MuiBottomNavigationAction: {
      root: {
        fontWeight: "bold",
        height:"35px",
        maxWidth:"100px",
        marginTop:"15px"
      },
      label:{
        fontSize:"13px",
        '&$selected': {
          fontSize: "15px",
          color:"white",
        },
        color:"#c6c6c6",
        fontFamily:"Gelasio"
      }
    }
  }
});

import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
    overrides: {
        MuiSlider: {
            markLabel:{
                '$vertical &': {
                    fontSize:'10px'
            }
        }
    },
        MuiSwitch:{
            input:{
                width:"200% !important"
            }
        }
}
});
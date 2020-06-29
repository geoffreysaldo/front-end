import React, { Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_progress_bar from '../../themes/theme_progress_bar.js';
import { setInformationInscription } from '../../redux/retour-information-inscription/information_inscription.actions';
import { setEtape } from '../../redux/etapes-inscription/etapes_inscription.actions';

import { verifyAccount } from '../../services/api_service'
import { connect } from 'react-redux';


class FormValidation extends Component {
    constructor(props){
        super(props);
        this.state= {
            progress:'hidden'
        }
    }


    render(){
        return(
            this.props.informations.informations.message ? (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'400px',width:'650px'}}>
            <Paper style={{background:'#f2f2f2',marginTop:'20px',marginBottom:"10px"}}>
            <FormControl style={{display:'flex',flexDirection:'column',alignItems:"space-between"}}>
            <MuiThemeProvider theme={theme_progress_bar}>
            <LinearProgress style={{visibility:this.state.progress,marginTop:"10px", marginLeft:'10px', marginRight:'10px'}} />
            <label style={{marginLeft:'10px', marginRight:'10px',marginTop:'20px',marginBottom:'20px', fontSize:'20px',textAlign: 'center'}}>{this.props.informations.informations.message}</label>

            </MuiThemeProvider>
            </FormControl></Paper> 
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',height:'100px',width:'450px',fontSize:'11px'}}>
            <div style={{display:'flex', color:'green'}}>1- Paramètres du compte</div> 
            <div style={{display:'flex', color:'green'}}>2- Informations personnelles</div>
            <div style={{display:'flex', color:'red'}}>3- Validation</div>
            </div>
            </div>
            ) : (<label style={{marginTop:'-10px', fontSize:'20px'}}>{this.props.informations.informations.error}</label>)
        )
    }
}

const mapStateToProps = state =>({
    email : state.email,
    password: state.password,
    informations: state.informations
  })


const mapDispatchedToProps = dispatch => ({
    setInformationInscription: informations => dispatch(setInformationInscription(informations)),
    setEtape: etape => dispatch(setEtape(etape))
})
export default connect(mapStateToProps,mapDispatchedToProps)(FormValidation)
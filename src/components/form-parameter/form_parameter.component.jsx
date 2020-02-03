import React, { Component} from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';
import ButtonNextStep from '../button-next-step/button_next_step.component';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import FormHelperText from '@material-ui/core/FormHelperText';
import './form_parameter.styles.scss'

class FormParameter extends Component {

  constructor(props) {
    super(props)
    this.handleFormClientClick = this.handleFormClientClick.bind(this)
    this.state = { email: '',
                   password: '',
                   confirmation:''}
  }


  handleFormClientClick(){
    console.log(this.state.email)
  }

  handleEmailUpdate = (event) => {
    this.setState({ email: event.target.value })
  }

  handlePasswordUpdate = (event) => {
    this.setState({ password: event.target.value })
  }

  handleConfirmationUpdate = (event) => {
    this.setState({ confirmation: event.target.value })
  }


  render(){
  return (
    <div style={{display:'flex',flexDirection:'column',height:'500px',width:'450px'}}>
    <Paper className="formPaper" style={{background:'#f2f2f2',display:'flex',alignItems:'center',flexDirection:'column',height:'420px',width:'300px',marginLeft:'75px',marginTop:'20px'}}>
        <FormControl>
            <label style={{marginLeft:'10px',marginTop:'20px'}}> Adresse email</label>
            <TextField  ref="email" style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} className="formField"  label="Email" variant="outlined"  value={this.state.email} onChange={this.handleEmailUpdate} />
            <label style={{marginLeft:'10px',marginTop:'20px'}}> Mot de passe</label>
            <TextField ref="password" style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} className="formField"  label="Mot de passe" variant="outlined" value={this.state.password} onChange={this.handlePasswordUpdate}/>
            <TextField ref="confirmation" style={{marginLeft:'10px',marginTop:'15px',marginBottom:'20px',background:'white', width:'250px'}} className="formField"  label="confirmation" variant="outlined" value={this.state.confirmation} onChange={this.handleConfirmationUpdate} />
        </FormControl>
        <ButtonNextStep customClick={this.handleFormClientClick} />
    </Paper>
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',height:'100px',width:'450px',fontSize:'11px'}}>
      <div style={{display:'flex'}}>1- Paramètres du compte</div> 
      <div style={{display:'flex'}}>2- Informations personnelles</div>
      <div style={{display:'flex'}}>3-  Validation</div>
      </div>
    </div>
  );
}
}


export default FormParameter
//<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

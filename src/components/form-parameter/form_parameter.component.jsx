import React, { Component} from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ButtonNextStep from '../button-next-step/button_next_step.component';

import { verifUnicityMail } from '../../services/api_service'
import './form_parameter.styles.scss'

import { setEtape } from '../../redux/etapes-inscription/etapes_inscription.actions'
import { connect } from 'react-redux';


class FormParameter extends Component {

  constructor(props) {
    super(props)
    this.state = {email:'',
                  password:'',
                  confirmation:'',
                  checkEmail:'',
                  checkPassword:'',
                  checkConfirmation:'',
                  emailValidator: false,
                  passwordValidator: false,
                  confirmationValidator: false }

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmation = this.handleChangeConfirmation.bind(this);
  }


  handleChangeEmail(event){
    this.setState({email: event.target.value});
  }

  handleChangePassword(event){
    this.setState({password: event.target.value});
  }

  handleChangeConfirmation(event){
    this.setState({confirmation: event.target.value})
  }

  checkEmail(email){
    return new Promise((resolve, reject)=> {
      let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
      if(email == "" || !re.test(email)){
        this.setState({
          checkEmail: "Email non valide", emailValidator: true
        }, () => {
          reject("erreur d'email")
        })
      }
      else {
        this.setState({
          email: email.toLowerCase(), checkEmail: "", emailValidator: false
        }, () => {
          resolve(true)
        })
      }
    })
  }

  checkPassword(password){
    return new Promise((resolve, reject)=> {
      let re = /[A-Z0-9._%+-]{8,30}/igm;
      if(password == "" || !re.test(password)){
        this.setState({
          checkPassword: "8 caractères minimum", passwordValidator: true
        }, () => {
            reject("erreur de mot de passe")
        })
      }
      else {
        this.setState({
          checkPassword: "", passwordValidator: false
        }, () => {
          resolve(true)
        })
      }
    })
  }

  checkConfirmation(password, confirmation){
    return new Promise((resolve, reject) => {
      if(password == confirmation){
        this.setState({
          checkConfirmation: "", confirmationValidator: false},
           () => { resolve(true)})
      }
      else {
        this.setState({
          checkConfirmation: "Confirmation du mot de passe incorrect", confirmationValidator: true
        }, () => {
            reject("erreur de confirmation")
        })}
    }) 
  }

  formSubmitHandler = () => {
     this.checkEmail(this.state.email).then(()=>{
       this.checkPassword(this.state.password).then(() => {
         this.checkConfirmation(this.state.password, this.state.confirmation).then(() => {
          verifUnicityMail(this.state.email).then(result => {
            if(result.error){
              this.setState({
                checkEmail: result.error, emailValidator: true
              })
            }
            else {
              this.setState({
                checkEmail: "", emailValidator: false
              }, () => this.props.setEtape(2))
            }
          })
         }).catch(err => {
           console.log(err)
         })
       }).catch(err =>{
         console.log(err)
       })
     }).catch(err => {
       console.log(err)
     })
  }



  render(){
  return (
    <div style={{display:'flex',flexDirection:'column',height:'500px',width:'450px'}}>
    <Paper className="formPaper" style={{background:'#f2f2f2',display:'flex',alignItems:'center',flexDirection:'column',height:'420px',width:'300px',marginLeft:'75px',marginTop:'20px'}}>
        <FormControl>
            <label style={{marginLeft:'10px',marginTop:'20px'}}>Adresse email</label>
            <TextField type="email" 
                       name="email"
                       error={this.state.emailValidator}
                       style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} 
                       placeholder="vous@exemple.com"
                       variant="outlined"  
                       value={this.state.email} 
                       onChange={this.handleChangeEmail} />
            <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkEmail}</span>
            <label style={{marginLeft:'10px',marginTop:'20px'}}>Mot de passe</label>
            <TextField type="password" 
                       name="password" 
                       error={this.state.passwordValidator}
                       style={{marginLeft:'10px', marginTop:'10px', background:'white', width:'250px'}} 
                       placeholder="Mot de passe"
                       variant="outlined"  
                       value={this.state.password} 
                       onChange={this.handleChangePassword} />
            <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkPassword}</span>
            <TextField type="password" 
                       name="confirmation"
                       error={this.state.confirmationValidator} 
                       style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} 
                       placeholder="Confirmation du mot de passe"
                       variant="outlined"  
                       value={this.state.confirmation} 
                       onChange={this.handleChangeConfirmation} /> 
            <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkConfirmation}</span>
        </FormControl>
        <ButtonNextStep customClick={this.formSubmitHandler} />
    </Paper>
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',height:'100px',width:'450px',fontSize:'11px'}}>
      <div style={{display:'flex',color:'red'}}>1- Paramètres du compte</div> 
      <div style={{display:'flex'}}>2- Informations personnelles</div>
      <div style={{display:'flex'}}>3- Validation</div>
      </div>
    </div>
  );
}
}

const mapDispatchedToProps = dispatch => ({
  setEtape: etape => dispatch(setEtape(etape))
})
export default connect(null,mapDispatchedToProps)(FormParameter)

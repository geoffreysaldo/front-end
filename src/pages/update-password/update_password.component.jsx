
import React, { Component } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';


import ButtonUpdate from '../../components/button_update/button_update.component';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import theme_progress_bar from '../../themes/theme_progress_bar.js';
import Paper from '@material-ui/core/Paper';

import { ReactComponent as LogoUpdatePassword } from '../../assets/lock-question.svg';

import { regeneratePassword } from '../../services/api_service'; 

// import scss

import './update_password.styles.scss'

class UpdatePassword extends Component {
    constructor(props){
        super(props)
        this.state ={
            email:'',
            checkEmail:'',
            emailValidator: false,
            progress:'hidden',
            resultMessage:'',
            err:''
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeDateBirth = this.handleChangeDateBirth.bind(this)
        this.handleClickUpdatePassword = this.handleClickUpdatePassword.bind(this)
    }


    handleChangeEmail(event){
        this.setState({email: event.target.value});
      }


    handleChangeDateBirth(event){
        this.setState({dateBirth: event.target.value});
      }



    checkEmail(email){
        return new Promise((resolve, reject) => {
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
    
    /*checkDateBirth(dateBirth){
        return new Promise((resolve,reject) => {
            let re = /^\s*((?:19|20)\d{2})\-(1[012]|0?[1-9])\-(3[01]|[12][0-9]|0?[1-9])\s*$/igm
            if(dateBirth == "" | !re.test(dateBirth)){
                this.setState({
                    checkDateBirth: "Date de naissance non valide", dateBirthValidator: true
                  }, () => {
                    reject("erreur de date de naissance")
                  })
                }
            else {
                this.setState({
                    checkDateBirth: "", dateBirthValidator: false
                  }, () => {
                    resolve(true)
                  })
            }
        })
    }*/


    handleClickUpdatePassword(){
        this.checkEmail(this.state.email).then(() => {
                regeneratePassword(this.state.email).then(
                    () => this.setState({resultMessage:"Un lien de modification de mot passe vous a été envoyé",
                      err:200
                    })
                    ).catch(err => {
                        if(err == 405){
                            this.setState({resultMessage:'Échec, une erreur est survenue',
                            err:405
                          })
                        }
                        if(err == 404){
                            this.setState({resultMessage:'Aucun compte n\'est associé a cet email',
                            err:404
                          })
                        }
                        if(err == 500){
                            this.setState({resultMessage:'Échec, une erreur est survenue',
                            err:500
                          })
                        }
                    })
        }).catch(err => {
            console.log(err)
        })   
    }

      render() {
        return(
<div style={{display:"flex",flexDirection:"raw",justifyContent: "center",alignItems:"center",minWidth:"700px",width:"100%",margin: "10px"}}>
<div style={{display:'flex',flexDirection:'column',height:'500px',width:'450px'}}>

<Paper className="formPaper" style={{background:'#f2f2f2',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',width:'300px',marginLeft:'75px',marginTop:'20px'}}>
    {this.state.err !== 200 ? 
    <FormControl style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
    <MuiThemeProvider theme={theme_progress_bar}>
    <LinearProgress style={{visibility:this.state.progress,marginTop:"10px"}} />
    <div style={{display:'flex',flexDirection:'row'}}> <LogoUpdatePassword style={{}}/> <div style={{marginLeft:'2px', marginTop:'7px'}}>Mot de passe oublié ? </div> </div>
        <p style={{marginLeft:'6px',marginRight:'10px',marginTop:'20px',textAlign: 'center',fontSize:'14px'}}>
            Un lien de changement de mot de passe vous sera envoyé par email.
        </p>
        <label style={{marginTop:'15px'}}>Adresse email</label>
        <TextField type="email" 
                   name="email"
                   error={this.state.emailValidator}
                   style={{marginTop:'10px',background:'white', width:'250px'}} 
                   variant="outlined"  
                   value={this.state.email} 
                   onChange={this.handleChangeEmail} />
        <span style={{color:"red", fontSize:"13px", fontStyle:"italic"}}>{this.state.checkEmail}</span>
        <div style={{marginTop:'15px'}}>
            <ButtonUpdate customClick={this.handleClickUpdatePassword} name={"Générer un mot de passe"}></ButtonUpdate>
        </div>
        <span style={{fontSize:'14px'}}>{this.state.resultMessage}</span>
        </MuiThemeProvider>
    </FormControl>
    :
    <div className="errorDiv" >{this.state.resultMessage}</div>}
    </Paper>
    </div>
    </div>
        )
    }

}

export default UpdatePassword
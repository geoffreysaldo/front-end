import React, { Component } from 'react';

// import material

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { ReactComponent as LogoLock } from '../../assets/lock.svg';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_progress_bar from '../../themes/theme_progress_bar';
import LinearProgress from '@material-ui/core/LinearProgress';

// import style

import './modification_mdp.styles.scss' 

// import composant

import CustomButton from '../../components/custom-button/custom_button.component';

// import api

import { updatePassword } from '../../services/api_user';

class ModificationMdp extends Component{
    constructor(props){
        super(props)
        this.state={
            password:"",
            checkPassword:"",
            passwordValidator:false,
            secondPassword:"",
            checkSecondPassword:"",
            secondPasswordValidator:false,
            progress:"hidden",
            panelSucceed:false,
            message:""
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
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

    checkConfirmation(){
        return new Promise((resolve, reject) => {
            if(this.state.password !== this.state.secondPassword){
                this.setState({
                    checkSecondPassword: "Non", secondPasswordValidator:true
                }, () => {
                    reject("erreur de confirmation")
                })
            }
            else {
                this.setState({
                    checkSecondPassword: "", secondPasswordValidator:false
                }, () => {
                    resolve(true)
                })
            }
        })
    }

    handleClick = () => {
        this.checkPassword(this.state.password).then(() => {
            this.checkConfirmation().then(() => {
                this.setState({
                    progress:"visible"
                })
                updatePassword(this.props.match.params.key,this.state.password).then(data => {
                    this.setState({
                        progress:'hidden',
                        message:data.message,
                        panelSucceed:true
                    })
                }).catch(err => {
                    this.setState({
                        progress:'hidden',
                        message:err,
                        panelSucceed:true
                    })
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className="pageModificationMdp">
                <Paper className="paperModificationMdp">  
                    <div className="divModificationMdp"><LogoLock /> <div className="spanModificationMdp">Nouveau mot de passe</div></div>
                    {this.state.panelSucceed ? 
                        <div className="centerDiv">
                            <Paper className="paperSucceed" style={{background:"#f2f2f2"}}>{this.state.message}</Paper>
                        </div>
                        :
                        <div className="centerDiv">
                        <div className="reglesMdp"> 
                            <p> Votre nouveau mot de passe doit contenir entre 8 et 30 caractères, et doit être différent de l'ancien</p> 
                        </div>
                        <Paper className="paperFormControl" style={{background:'#f2f2f2'}}>
                        <FormControl className="formControl">
                        {this.state.progress === 'visible' ? 
                            <MuiThemeProvider theme={theme_progress_bar}>
                            <div style={{height:'25px',width:'95%'}}>
                            <LinearProgress style={{visibility:this.state.progress,marginTop:"10px",colorPrimary:"primary"}} />
                            </div>
                            </MuiThemeProvider> :
                            <div style={{height:'25px',width:'95%'}}></div>}
                            <div className="divLabel"><label className="label"> Nouveau mot de passe </label></div>
                            <TextField
                                style={{marginTop:"10px",marginLeft:"10px",width:'90%',background:'white'}}
                                type="password"
                                name="password"
                                variant="outlined"
                                error={this.state.passwordValidator}  
                                value={this.state.password}
                                onChange={(e) => this.handleChange(e)}
                            />
                            {this.state.passwordValidator ? <div className="divError" style={{visibility: "visible"}}><span className="error">{this.state.checkPassword}</span></div>:<div className="divError" style={{visibility: "hidden"}}><span className="error">hidden</span></div>}
                            <div className="divLabel"><label className="label"> Confirmer mot de passe </label></div>
                            <TextField
                                style={{marginTop:"10px",marginLeft:"10px",width:'90%',background:'white'}}
                                type="password"
                                name="secondPassword"
                                variant="outlined" 
                                error={this.state.secondPasswordValidator}   
                                value={this.state.secondPassword}
                                onChange={(e) => this.handleChange(e)}
                            />
                            {this.state.secondPasswordValidator ?<div className="divError" style={{visibility: "visible"}}><span className="error">{this.state.checkSecondPassword}</span></div>:<div className="divError" style={{visibility: "hidden"}}><span className="error">hidden</span></div>}
                            <CustomButton customClick={this.handleClick} width="150px" color="linear-gradient(#e74042, #b20e10)" height="40px" border="0px" name="Enregistrer" fontSize="13px" textShadow="0 -1px 0px #a90305"/>
                        </FormControl>
                        </Paper>
                        </div> }
                </Paper>
            </div>
        )
    }
}

export default ModificationMdp
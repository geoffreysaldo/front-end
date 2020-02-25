import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_login from '../../themes/theme_form_login.js';

import FormControl from '@material-ui/core/FormControl';

import CartIcon from '../cart-icon/cart_icon.component'
import ButtonSignIn from '../button-signin/button_signin.component';
import ButtonSignUp from '../button-signup/button_signup.component';
import './button_shop_container.styles.scss';

import { login } from '../../services/api_service'

class ButtonShopContainer extends Component { 
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeEmail(event){
        console.log(this.state)
        this.setState({email: event.target.value});
      }
    
    handleChangePassword(event){
        this.setState({password: event.target.value});
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

      

    formSubmitHandler = () => {
        this.checkEmail(this.state.email).then(() => {
            this.checkPassword(this.state.password).then(() => {
                login(this.state.address,this.state.password).then(result => {
                    if(result.error){
                        console.log(result.error)
                    }
                    else {
                        console.log(result.message)
                    }
                  }).catch(err => {
                   console.log(err)
                 })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }


    

    render() {
        return(
        <div className='container' >
            <MuiThemeProvider theme={theme_login}>
            <FormControl style={{display:"flex", flexDirection:"row"}}>
                <TextField
                    name="email"
                    type="email"
                    size ="small"
                    style={{width:"150px"}}
                    id="outlined-secondary"
                    placeholder="Email"
                    variant="outlined"
                    value={this.state.email} 
                    onChange={this.handleChangeEmail}
                />
                <TextField
                    name="password"
                    type="password"
                    size ='small'
                    style={{width:"150px"}}
                    id="outlined-secondary"
                    placeholder="Mot de passe"
                    variant="outlined"
                    value={this.state.password} 
                    onChange={this.handleChangePassword}
                />
            </FormControl>
            </MuiThemeProvider>
            <ButtonSignIn customClick={this.formSubmitHandler}/>
            <ButtonSignUp/>
            <CartIcon className="cart-icon"/>
        </div>
        )
    }
}


export default ButtonShopContainer
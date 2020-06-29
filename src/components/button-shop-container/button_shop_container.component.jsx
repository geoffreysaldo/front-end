import React, { Component } from 'react';

import DialogFailConnection from '../dialog-fail-connection/dialog_fail_connection.component';

import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';


import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_login from '../../themes/theme_form_login.js';
import FormControl from '@material-ui/core/FormControl';

import CartIcon from '../cart-icon/cart_icon.component'
import ButtonSignIn from '../button-signin/button_signin.component';
import ButtonSignUp from '../button-signup/button_signup.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import './button_shop_container.styles.scss';
import {authenticate, isAuthenticated} from '../../services/auth-helper';

import { login } from '../../services/api_service'
import { connect } from 'react-redux';
import { setAdmin } from '../../redux/admin/admin.actions';

class ButtonShopContainer extends Component { 
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            dialogPannelConnection: false,
            dialogPannelUpdatePassword: false,
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleCloseConnection = this.handleCloseConnection.bind(this)
    }




    handleChangeEmail(event){
        this.setState({email: event.target.value});
      }
    
    handleChangePassword(event){
        this.setState({password: event.target.value});
      }

    handleCloseConnection(){
      this.setState({
        dialogPannelConnection: false
      })
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
                login(this.state.email,this.state.password)
                    .then(result => {
                      authenticate(result.token,result.admin)
                      if(result.admin){
                        this.props.setAdmin(true)
                      }
                      this.props.changeAuthenticate()
                    })
                    .catch(err => {
                      console.log(err)
                      if(err == 401){
                        this.setState({
                          dialogPannelConnection: true
                        })
                        console.log(this.state.dialogPannelConnection)
                      }
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
                <div style={{display:'flex',flexDirection:'column'}}>
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
                <Link  to="/update_password" style={{color:'white',fontSize:'13px',fontStyle:'italic',marginLeft:'105px',cursor:'pointer'}}>Oublié ?</Link>
                </div>
            </FormControl>
            </MuiThemeProvider>
            <ButtonSignIn customClick={this.formSubmitHandler}/>
            <ButtonSignUp/>
            <CartIcon className="cart-icon"/>
            {this.props.hidden ? null : <CartDropdown />}
            <DialogFailConnection  open={this.state.dialogPannelConnection} onClose={this.handleCloseConnection}/>
        </div>
        )
    }
}

const mapStateToProps = state => ({
  hidden : state.cart.hidden
})

const mapDispatchToProps = dispatch => ({
  setAdmin: value => dispatch(setAdmin(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(ButtonShopContainer)
import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';

import ButtonUpdate from '../../components/button_update/button_update.component'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { updateAddress, updateContact, getUserInformations } from '../../services/api_service';

import { ReactComponent as PencilBox } from '../../assets/pencil-box-outline.svg';
import { ReactComponent as Account } from '../../assets/account.svg';
import { ReactComponent as MapMarker } from '../../assets/map-marker.svg';
import { ReactComponent as Phone } from '../../assets/phone.svg';

import LinearProgress from '@material-ui/core/LinearProgress';


class Compte extends Component{
    constructor(props){
        super(props)
        this.state = {
            accountId:'',
            firstname:'',
            lastname:'',
            address:'',
            postalCode:'',
            city:'',
            phone:'',
            email:'',
            progress:false,
            updateAdressPanel:false, // Panel
            updateAddress:'',
            addressValidator:false,
            checkAddress:'',
            updateCity:'',
            cityValidator:false,
            checkCity:'',
            updatePostalCode:'',
            postalCodeValidator:false,
            checkPostalCode:'',
            addressPassword:'',
            passwordAddressValidator:false,
            checkAddressPassword:'',
            updateContactPanel:false, //Panel
            updatePhone:'',
            phoneValidator:false,
            checkPhone:'',
            updateEmail:'',
            emailValidator:false,
            checkEmail:'',
            contactPassword:'',
            checkContactPassword:'',
            passwordContactValidator:false,
        }

        this.handleClickAddress = this.handleClickAddress.bind(this)
        this.handleClickUpdateAddress = this.handleClickUpdateAddress.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.handleChangeCity = this.handleChangeCity.bind(this)
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this)
        this.handleChangePhone = this.handleChangePhone.bind(this);              
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAddressPassword = this.handleChangeAddressPassword.bind(this)
        this.handleClickContact = this.handleClickContact.bind(this)
        this.handleClickUpdateContact = this.handleClickUpdateContact.bind(this)
        this.handleChangeContactPassword = this.handleChangeContactPassword.bind(this)

 
    }


    componentDidMount(){
        getUserInformations().then(data => {
            this.setState({
                accountId: data.id,
                firstname: data.prenom,
                lastname: data.nom,
                address: data.adresse,
                postalCode: data.codePostal,
                city: data.ville,
                phone: data.telephone,
                email: data.email
            })
        })
    }

    handleClickAddress(){
        !this.state.updateAdressPanel  ? this.setState({ updateAdressPanel: true}) : this.setState({ updateAdressPanel: false })
    }

    handleClickContact(){
        !this.state.updateContactPanel  ? this.setState({ updateContactPanel: true}) : this.setState({ updateContactPanel: false })
    }

    handleChangeAddress(event){
        event.target.value = event.target.value
            .replace(/^\s/,'')
        this.setState({updateAddress: event.target.value});
      }

    handleChangeCity(event){
        event.target.value = event.target.value
            .replace(/^\s/,'')
        this.setState({updateCity: event.target.value});
      }

    handleChangePostalCode(event){
        event.target.value = event.target.value
            .replace(/^[^\d]/,'')
            .slice(0,5)
        this.setState({updatePostalCode: event.target.value})
    }

    handleChangePhone(event){
        event.target.value = event.target.value
            .replace(/\D+/,'')
            .replace(/(^10?)|(^20?)|(^30?)|(^40?)|(^50?)|(^60?)|(^70?)|(^80?)|(^90?)/, '0')
            .slice(0, 13)
            .replace(/(\d{2})(?=\d)/g, '$1 ')
        this.setState({updatePhone: event.target.value});
    }

    handleChangeEmail(event){
        event.target.value = event.target.value
            .replace(/^\s/,'')
        this.setState({updateEmail: event.target.value});
      }
    

    handleChangeAddressPassword(event){
        this.setState({addressPassword: event.target.value})
    }

    handleChangeContactPassword(event){
        this.setState({contactPassword: event.target.value})
    }




    checkAddress(address){
        return new Promise((resolve, reject) => {
            let reAddress =/[0-9]{0,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/
            if(!reAddress.test(address) || address == ""){
                this.setState({
                    checkAddress:'Adresse non valide', addressValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkAddress:'', addressValidator:false
                }, () => resolve())
            }
        })
    }

    checkCity(city){
        return new Promise((resolve, reject) => {
            let reCity =/[a-z]{2,30}/
            if(!reCity.test(city) || city == ""){
                this.setState({
                    checkCity:'Ville non valide', cityValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkCity:'', cityValidator:false
                }, () => resolve())
            }
        })
    }

    checkPostalcode(postalcode){
        return new Promise((resolve, reject) => {
            let rePostalcode =/\d{5}/
            if(!rePostalcode.test(postalcode) || postalcode == ""){
                this.setState({
                    checkPostalCode:'Code postal non valide', postalCodeValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkPostalCode:'', postalCodeValidator:false
                }, () => resolve())
            }
        })
    }

    checkPhone(phone){
        return new Promise((resolve, reject) => {
            let rePhone = /0\d\s\d{2}\s\d{2}\s\d{2}\s\d{2}/;
            let reEmptyPhone=/^$/;
            if(!rePhone.test(phone) && !reEmptyPhone.test(phone)){
                this.setState({
                    checkPhone:'Téléphone non valide', phoneValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkPhone:'', phoneValidator:false
                }, () => resolve())
            }


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

    checkPhoneAndEmail(phone, email){

        return new Promise((resolve, reject)=> {
            let rePhone = /0\d\s\d{2}\s\d{2}\s\d{2}\s\d{2}/;
            let reEmpty=/^$/;
            let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if(this.state.updatePhone=="" && this.state.updateEmail==""){
                this.setState({
                    checkContactPassword: "Veuillez modifier au moins un des deux champs", passwordContactValidator: true
                }, () => {
                    reject("champs vide")
                })
            }
            else {
                if(!reEmpty.test(phone) && reEmpty.test(email)){
                    if(!rePhone.test(phone)){
                        this.setState({
                            checkPhone:'Numéro de téléphone invalide', phoneValidator:true, checkEmail:'',emailValidator:false,checkContactPassword: "", passwordContactValidator: false
                        },() => reject())
                    }
                    else {
                        this.setState({
                            checkPhone:'', phoneValidator:false, checkEmail:'',emailValidator:false, updateEmail: email.toLowerCase(),checkContactPassword: "", passwordContactValidator: false 
                        }, () => {
                            resolve()
                        })
                    }
                }
                else if(reEmpty.test(phone) && !reEmpty.test(email)){
                    if(!re.test(email)){
                        this.setState({
                            checkPhone:'', phoneValidator:false, checkEmail:'Email invalide',emailValidator:true,checkContactPassword: "", passwordContactValidator: false
                        },() => reject())
                    }
                    else {
                        this.setState({
                            checkPhone:'', phoneValidator:false, checkEmail:'',emailValidator:false,checkContactPassword: "", passwordContactValidator: false
                        }, () => {
                            resolve()
                        })
                    }
                }
                else {
                    if(!rePhone.test(phone)){
                        if(!re.test(email)){
                            this.setState({
                                checkPhone:'Numéro de téléphone invalide', phoneValidator:true, checkEmail:'Email invalide',emailValidator:true,checkContactPassword: "", passwordContactValidator: false
                            },() => reject())
                        }
                        else {
                            this.setState({
                                checkPhone:'Numéro de téléphone invalide', phoneValidator:true, checkEmail:'',emailValidator:false,checkContactPassword: "", passwordContactValidator: false
                            },() => reject())
                        }
                    }
                    else{
                        if(!re.test(email)){
                            this.setState({
                                checkPhone:'', phoneValidator:false, checkEmail:'Email invalide',emailValidator:true,checkContactPassword: "", passwordContactValidator: false
                            },() => reject())
                        }
                        else {
                            this.setState({
                                checkPhone:'', phoneValidator:false, checkEmail:'',emailValidator:false,checkContactPassword: "", passwordContactValidator: false
                            },() => resolve())
                        }
                    }
                }    
            }
        })
    }

    handleClickUpdateAddress(){
        this.setState({progress:true})
        this.checkAddress(this.state.updateAddress).then(() => {
            this.checkPostalcode(this.state.updatePostalCode).then(() => {
                this.checkCity(this.state.updateCity).then(() => {
                    updateAddress(this.state).then(result => {
                        this.setState({checkAddressPassword:'', passwordAddressValidator:false, progress:false, address:result.address, postalCode: result.postalCode, city: result.city })
                    }).catch(err => {
                        if(err == 401){
                            this.setState({
                                checkAddressPassword:'Mot de passe Invalide', passwordAddressValidator:true
                            })
                        }
                        else {
                            this.setState({
                                checkAddressPassword:'Une erreur est survenue', passwordAddressValidator:true
                            })
                        }
                    })
                }).catch(() => {
                    this.setState({progress:false})
                })
            }).catch(() => {
                this.setState({progress:false})
            })
        }).catch(() => {
            this.setState({progress:false})
        })
    }

    handleClickUpdateContact(){
        this.checkPhoneAndEmail(this.state.updatePhone,this.state.updateEmail).then(() => {
                updateContact(this.state).then(data =>{
                    if(data.phone && data.email ){
                        this.setState({
                            phone:data.phone, email:data.email, checkContactPassword:'', passwordContactValidator:false
                        })
                    }
                    else if(data.phone && !data.email){
                        this.setState({
                            phone:data.phone, checkContactPassword:'', passwordContactValidator:false
                        })
                    }
                    else{
                        this.setState({
                            email:data.email, checkContactPassword:'', passwordContactValidator:false
                        })
                    }
                }).catch(err => {
                    if(err == 401 ){
                    this.setState({progress:false, checkContactPassword:'Mot de passe invalide', passwordContactValidator:true})
                    }
                    else {
                        console.log(err)
                        this.setState({
                        checkContactPassword:'Une erreur est survenue', passwordContactValidator:true
                    })
                }
                })
            }).catch(() => {
                this.setState({progress:false})
        })
    }


    render(){
        return(
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',marginTop:'10px'}}>
                <Paper style={{display:'flex',flexDirection:'column',width:'40%',minWidth:'550px',marginBottom:'10px'}}>
                    <div style={{fontSize:'20px', margin:'20px'}}>Mon compte</div>
                    <Paper style={{background:'#f2f2f2',margin:'0px 20px 0px 20px',minwidth:'500px'}}>  
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'start',marginLeft:'10px',marginTop:'10px',fontSize:'16px',fontWeight:'bold'}}>
                            <PencilBox/>
                            <p style={{fontSize:'16px',marginTop:'4px',marginLeft:'4px'}}> Données personnelles </p> 
                        </div>
                        <div style={{display:'flex',flexDirection:'column',marginLeft:'15px',marginBottom:'10px',fontSize:'14px'}}>
                            <div style={{display:'flex',flexDirection:'row'}}><span style={{width:'50%'}}>Numéro de compte </span><span style={{width:'50%'}}>{ this.state.accountId } </span></div>
                            <div style={{display:'flex',flexDirection:'row'}}><span style={{marginTop:'5px',width:'235px'}}>Date de création de compte</span><span style={{marginTop:'5px',width:'235px'}}> </span></div>
                            <div style={{display:'flex',flexDirection:'row'}}><span style={{marginTop:'5px',width:'235px'}}>Date de dernière commande </span><span style={{marginTop:'5px',width:'235px'}}> </span></div>
                        </div>
                    </Paper>
                    <br/>
                    <Paper style={{background:'#f2f2f2',margin:'0px 20px 0px 20px',minwidth:'500px'}}>  
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'start',marginLeft:'10px',marginTop:'10px',fontSize:'16px',fontWeight:'bold'}}>
                            <Account/>
                            <p style={{fontSize:'16px',marginTop:'4px',marginLeft:'4px'}}> Identité </p> 
                        </div>
                        <div style={{display:'flex',flexDirection:'column',marginLeft:'15px',marginBottom:'10px',fontSize:'14px'}}>
                            <div style={{display:'flex',flexDirection:'row'}}><span style={{width:'50%'}}>Prénom</span><span style={{width:'50%'}}>{ this.state.firstname } </span></div>
                            <div style={{display:'flex',flexDirection:'row'}}><span style={{marginTop:'5px',width:'50%'}}>Nom </span><span style={{marginTop:'5px',width:'50%'}}>{ this.state.lastname } </span></div>
                        </div>
                    </Paper>
                    <br/>
                    <Paper style={{background:'#f2f2f2',margin:'0px 20px 0px 20px',minwidth:'500px'}}> 
                    {this.progress ? <LinearProgress style={{margin:"10px",colorPrimary:"primary"}} /> : null }
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'start',marginLeft:'10px',marginTop:'10px',fontSize:'16px',fontWeight:'bold'}}>
                            <MapMarker/>
                            <p style={{fontSize:'16px',marginTop:'4px',marginLeft:'4px'}}> Adresse </p> 
                        </div>
                        <div style={{display:'flex',flexDirection:'column',marginLeft:'15px',fontSize:'14px'}}>
                            <div style={{display:'flex',flexDirection:'row'}}><span style={{width:'50%'}}>Adresse postale</span><span style={{width:'50%'}}>{ this.state.address }</span></div>
                            <div style={{display:'flex',flexDirection:'row'}}><span style={{marginTop:'5px',width:'50%'}}>Code postal </span><span style={{marginTop:'5px',width:'50%'}}>{ this.state.postalCode }</span></div>
                            <div style={{display:'flex',flexDirection:'row'}}> <span style={{marginTop:'5px',width:'50%'}}>Ville</span><span style={{marginTop:'5px',width:'50%'}}>{this.state.city}</span></div>
                        </div>

                        <ButtonUpdate customClick={this.handleClickAddress} name={"Modifier"}/>
                        { this.state.updateAdressPanel ? 
                        <div style={{visibility:this.state.updateAdressPanel,display:'flex',flexDirection:'column',fontSize:'14px',margin:'10px'}}>
                            <label> Adresse postale * </label>
                            <TextField type="text" 
                                name="updateAddress"
                                error={this.state.addressValidator}
                                size ="small"
                                style={{background:'white', width:'100%',marginTop:'5px'}}
                                variant="outlined"  
                                value={this.state.updateAddress} 
                                onChange={this.handleChangeAddress} />
                            {this.state.checkAddress != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic"}}>{this.state.checkAddress}</span> : null }                              
                            <label  style={{marginTop:'10px'}}> Code postal *</label>    
                            <TextField type="text" 
                                name="updatePostalCode"
                                error={this.state.postalCodeValidator}
                                size ="small"
                                style={{background:'white', width:'15%',marginTop:'5px'}}
                                variant="outlined"  
                                value={this.state.updatePostalCode} 
                                onChange={this.handleChangePostalCode} />
                            {this.state.checkPostalCode != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic"}}>{this.state.checkPostalCode}</span>  : null }          
                            <label style={{marginTop:'10px'}}> Ville *</label>
                            <TextField type="text" 
                                name="updateCity"
                                error={this.state.cityValidator}
                                size ="small"
                                style={{background:'white', width:'100%',marginTop:'5px'}}
                                variant="outlined"  
                                value={this.state.updateCity} 
                                onChange={this.handleChangeCity} />
                            {this.state.checkCity != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic"}}>{this.state.checkCity}</span> : null }          
                            <label style={{marginTop:'10px'}}> Mot de passe </label>
                            <div style={{display:'flex',flexDirection:'row'}}>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                <TextField type="password" 
                                    name="addressPassword"
                                    error={this.state.passwordAddressValidator}
                                    size ="small"
                                    style={{background:'white', width:'100%',marginTop:'5px'}}
                                    variant="outlined"  
                                    value={this.state.addressPassword} 
                                    onChange={this.handleChangeAddressPassword} />
                                {this.state.checkAddressPassword != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic"}}>{this.state.checkAddressPassword}</span>  : null }          
                                </div>
                                <ButtonUpdate customClick={this.handleClickUpdateAddress} name={"Sauvegarder"}/>
                            </div>
                        </div> :
                         null }
                    </Paper>
                    <br/>
                    <Paper style={{background:'#f2f2f2',margin:'0px 20px 0px 20px',minwidth:'500px'}}>  
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'start',marginLeft:'10px',marginTop:'10px',fontSize:'16px',fontWeight:'bold'}}>
                            <Phone/>
                            <p style={{fontSize:'16px',marginTop:'4px',marginLeft:'4px'}}> Contact </p> 
                        </div>
                        <div style={{display:'flex',flexDirection:'column',marginLeft:'15px',fontSize:'14px'}}>
                            <div style={{display:'flex',flexDirection:'row'}}><span style={{width:'50%'}}>Téléphone mobile</span> <span>{this.state.phone}</span></div>
                            <div style={{display:'flex',flexDirection:'row'}}><span style={{marginTop:'5px',width:'50%'}}>Adresse email </span> <span style={{marginTop:'5px'}}>{this.state.email}</span></div>
                        </div>
                        <ButtonUpdate customClick={this.handleClickContact} name={"Modifier"}/>
                        { this.state.updateContactPanel ? 
                        <div style={{visibility:this.state.updateContactPanel,display:'flex',flexDirection:'column',fontSize:'14px',margin:'10px'}}>
                            <label >Téléphone</label>
                            <TextField type="tel" 
                                name="telephone"
                                error={this.state.phoneValidator}
                                style={{marginTop:'10px',background:'white', width:'250px'}}
                                size='small' 
                                variant="outlined"  
                                value={this.state.updatePhone} 
                                onChange={this.handleChangePhone} />
                            {this.state.checkPhone != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkPhone}</span> : null }          
                            <label style={{marginTop:'10px'}}>Adresse email </label>
                            <TextField type="text" 
                                name="updateEmail"
                                error={this.state.emailValidator}
                                style={{marginTop:'10px',background:'white', width:'250px'}} 
                                //placeholder="vous@exemple.com"
                                size="small"
                                variant="outlined"  
                                value={this.state.updateEmail} 
                                onChange={this.handleChangeEmail} />
                            {this.state.checkEmail != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkEmail}</span> : null }
                            <label style={{marginTop:'10px'}}> Mot de passe </label>
                            <div style={{display:'flex',flexDirection:'row'}}>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                <TextField type="password" 
                                    name="contactPassword"
                                    error={this.state.passwordContactValidator}
                                    size ="small"
                                    style={{background:'white', width:'100%',marginTop:'5px'}}
                                    variant="outlined"  
                                    value={this.state.contactPassword} 
                                    onChange={this.handleChangeContactPassword} />
                                {this.state.checkContactPassword != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic"}}>{this.state.checkContactPassword}</span>  : null }          
                                </div>
                                <ButtonUpdate customClick={this.handleClickUpdateContact} name={"Sauvegarder"}/>

                            </div>
                            </div> : null}
                    </Paper>
                    <br/>
                </Paper>
            </div>       
        )
    }
}

export default Compte
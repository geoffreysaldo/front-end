import React, { Component} from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ButtonNextStep from '../button-next-step/button_next_step.component';

import { setEtape } from '../../redux/etapes-inscription/etapes_inscription.actions'
import { connect } from 'react-redux';

class FormInformation extends Component {

    constructor(props) {
      super(props)
      this.state = {nom:'',
                    prenom:'',
                    telephone:'',
                    adresse:'',
                    ville:'',
                    codePostal:'',
                    checkLastname:'',
                    checkFirstname:'',
                    checkPhone:'',
                    checkAddress:'',
                    checkCity:'',
                    checkPostalcode:'',
                    lastnameValidator: false,
                    firstnameValidator: false,
                    phoneValidator: false,
                    addressValidator: false,
                    cityValidator: false,
                    postalcodeValidator: false
                 }
        
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);              
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangePostalcode = this.handleChangePostalcode.bind(this);     
    }

    handleChangeLastname(event){
        event.target.value = event.target.value
            .replace(/[^a-zA-Z\s-]/,'')
        this.setState({nom: event.target.value});
    }

    handleChangeFirstname(event){
        event.target.value = event.target.value
        .replace(/[^a-zA-Z\s-]+/,'')
        this.setState({prenom: event.target.value});
      }

    handleChangePhone(event){
        event.target.value = event.target.value
            .replace(/\D+/,'')
            .replace(/(^10?)|(^20?)|(^30?)|(^40?)|(^50?)|(^60?)|(^70?)|(^80?)|(^90?)/, '0')
            .slice(0, 13)
            .replace(/(\d{2})(?=\d)/g, '$1 ')
        this.setState({telephone: event.target.value});
    }

    handleChangeAddress(event){
        event.target.value = event.target.value
            .replace(/^\s/,'')
        this.setState({adresse: event.target.value});
    }

    handleChangeCity(event){
        event.target.value = event.target.value
            .replace(/^\s/,'')
        this.setState({ville: event.target.value});
    }

    handleChangePostalcode(event){
        event.target.value = event.target.value
            .replace(/^[^\d]/,'')
            .slice(0,5)
        this.setState({codePostal: event.target.value});
    }

    checkLastname(name){
        return new Promise((resolve, reject) => {
            let rePattern = /[a-z]{2,30}/
            if(!rePattern.test(name)){
                this.setState({
                    checkLastname:'Nom non valide', lastnameValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkLastname:'', lastnameValidator:false
                }, () => resolve())
            }
        })
    }

    checkFirstname(name){
        return new Promise((resolve, reject) => {
            let rePattern = /[a-z]{2,30}/
            if(!rePattern.test(name)){
                this.setState({
                    checkFirstname:'Prénom non valide', firstnameValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkFirstname:'', firstnameValidator:false
                }, () => resolve())
            }
        })
    }

    checkPhone(phone){
        return new Promise((resolve, reject) => {
            let rePhone = /0\d\s\d{2}\s\d{2}\s\d{2}\s\d{2}/
            if(!rePhone.test(phone)){
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

    checkAddress(address){
        return new Promise((resolve, reject) => {
            let reAddress =/[0-9]{0,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/
            if(!reAddress.test(address) && address != ""){
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
            if(!reCity.test(city) && city != ""){
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
            if(!rePostalcode.test(postalcode) && postalcode != ""){
                this.setState({
                    checkPostalcode:'Code postal non valide', postalcodeValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkPostalcode:'', postalcodeValidator:false
                }, () => resolve())
            }
        })
    }

  
    formSubmitHandler = () => {
        this.checkLastname(this.state.nom).then(() => {
            this.checkFirstname(this.state.prenom).then(() => {
                this.checkPhone(this.state.telephone).then(() => {
                    this.checkAddress(this.state.adresse).then(() => {
                        this.checkCity(this.state.ville).then(() => {
                            this.checkPostalcode(this.state.codePostal).then(() =>{
                                this.props.setEtape(3)
                            }).catch(err => {
                                console.log(err)
                                })
                        }).catch(err => {
                            console.log(err)
                            })
                    }).catch(err => {
                        console.log(err)
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
    return (
      <div style={{display:'flex',flexDirection:'column', alignItems:'center',height:'540px',width:'70%'}}>
      <Paper className="formPaper" style={{display:'flex',flexDirection:'column',alignItems:"center",background:'#f2f2f2',height:'460px',width:'600px',marginTop:'20px'}}>
          <FormControl style={{display:'flex',flexDirection:'row',alignItems:"space-between"}}>
            <div style={{display:'flex',flexDirection:'column',width:"300px"}}>
            <label style={{marginLeft:'10px',marginTop:'20px'}}>Nom *</label>
            <TextField type="text" 
                       name="nom"
                       error={this.state.lastnameValidator}
                       style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} 
                       variant="outlined"  
                       value={this.state.nom} 
                       onChange={this.handleChangeLastname} />
    {this.state.checkLastname != "" ?<span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkLastname}</span>  : <div style={{width:"290px",height:"17px"}}></div> }          
            <label style={{marginLeft:'10px',marginTop:'20px'}}>Prénom *</label>
            <TextField type="text" 
                       name="prenom"
                       error={this.state.firstnameValidator}
                       style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} 
                       variant="outlined"  
                       value={this.state.prenom} 
                       onChange={this.handleChangeFirstname} />
    {this.state.checkFirstname != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkFirstname}</span>  : <div style={{width:"290px",height:"17px"}}></div> }          
            <label style={{marginLeft:'10px',marginTop:'20px'}}>Téléphone *</label>
            <TextField type="tel" 
                       name="telephone"
                       error={this.state.phoneValidator}
                       style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} 
                       variant="outlined"  
                       value={this.state.phone} 
                       onChange={this.handleChangePhone} />
    {this.state.checkPhone != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkPhone}</span> : <div style={{width:"290px",height:"17px"}}></div> }          
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
            <label style={{marginLeft:'10px',marginTop:'20px'}}>Adresse</label>
            <TextField type="text" 
                       name="adresse"
                       error={this.state.addressValidator}
                       style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} 
                       variant="outlined"  
                       value={this.state.address} 
                       onChange={this.handleChangeAddress} />
    {this.state.checkAddress != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkAddress}</span> : <div style={{width:"290px",height:"17px"}}></div> }                              
            <label style={{marginLeft:'10px',marginTop:'20px'}}>Ville</label>
            <TextField type="text" 
                       name="ville"
                       error={this.state.cityValidator}
                       style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} 
                       variant="outlined"  
                       value={this.state.city} 
                       onChange={this.handleChangeCity} />
    {this.state.checkCity != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkCity}</span> : <div style={{width:"290px",height:"17px"}}></div> }          
            <label style={{marginLeft:'10px',marginTop:'20px'}}>Code postal</label>
            <TextField type="text" 
                       name="codePostal"
                       error={this.state.postalcodeValidator}
                       style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} 
                       variant="outlined"  
                       value={this.state.postalcode} 
                       onChange={this.handleChangePostalcode} />
    {this.state.checkPostalcode != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkPostalcode}</span>  : <div style={{width:"290px",height:"17px"}}></div> }          
            </div>                   
          </FormControl>
          <ButtonNextStep customClick={this.formSubmitHandler} style={{display:'flex',flexDirection:'column'}}/>
      </Paper>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',height:'100px',width:'450px',fontSize:'11px'}}>
        <div style={{display:'flex', color:'green'}}>1- Paramètres du compte</div> 
        <div style={{display:'flex', color:'red'}}>2- Informations personnelles</div>
        <div style={{display:'flex'}}>3- Validation</div>
        </div>
      </div>
    );
  }
}

const mapDispatchedToProps = dispatch => ({
    setEtape: etape => dispatch(setEtape(etape))
  })

export default connect(null,mapDispatchedToProps)(FormInformation)
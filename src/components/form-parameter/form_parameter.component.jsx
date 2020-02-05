import React, { Component} from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ButtonNextStep from '../button-next-step/button_next_step.component';
import './form_parameter.styles.scss'

class FormParameter extends Component {

  constructor(props) {
    super(props)
    this.state = {  formControls:{
                      email: {
                        value: '',
                        placeholder: 'What is your Email',
                        valid: false,
                        touched: false,
                        validationRules: {
                          minLength: 3,
                          isEmail:true,
                        }
                      },
                      password:{ 
                        value:''
                      },
                      confirmation:{
                        value:''
                      }
                  }
    }
  }


  validate = (value, rules) => {
    let isValid = true;
    
    for (let rule in rules) {
    
      switch (rule) {
          case 'minLength': isValid = isValid && this.minLengthValidator(value, rules[rule]); break;
          case 'isEmail':{
            console.log(value)
            isValid = isValid && this.emailValidator(value); break;}
          default: isValid = true;
      }
  
    }
    
    return isValid;
  }


  /**
 * minLength Val
 * @param  value 
 * @param  minLength
 * @return          
 */
minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
}

/**
 * Email validation
 * 
 * @param value
 * @return 
 */
emailValidator = value => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
  return re.test(String(value));
}

  changeHandler = event => {
      
    const name = event.target.name;
    const value = event.target.value;
    
    const updatedControls = {
	    ...this.state.formControls
    };

    const updatedFormElement = {
	    ...updatedControls[name]
    };

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;
    console.log(updatedFormElement)
    console.log(updatedControls)
    this.setState({
    	formControls: updatedControls
    });
}

formSubmitHandler = () => {
  console.log(this.state.formControls);
}




  render(){
  return (
    <div style={{display:'flex',flexDirection:'column',height:'500px',width:'450px'}}>
    <Paper className="formPaper" style={{background:'#f2f2f2',display:'flex',alignItems:'center',flexDirection:'column',height:'420px',width:'300px',marginLeft:'75px',marginTop:'20px'}}>
        <FormControl>
            <label style={{marginLeft:'10px',marginTop:'20px'}}> Adresse email</label>
            <TextField type='email' 
                       name="email" 
                       style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} 
                       placeholder={this.state.formControls.email.placeholder}  
                       label="Email" 
                       variant="outlined"  
                       value={this.state.formControls.email.value} 
                       onChange={this.changeHandler} />
            
        </FormControl>
        <ButtonNextStep customClick={this.formSubmitHandler} />
    </Paper>
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',height:'100px',width:'450px',fontSize:'11px'}}>
      <div style={{display:'flex'}}>1- Paramètres du compte</div> 
      <div style={{display:'flex'}}>2- Informations personnelles</div>
      <div style={{display:'flex'}}>3- Validation</div>
      </div>
    </div>
  );
}
}


export default FormParameter
//<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
/*<label style={{marginLeft:'10px',marginTop:'20px'}}> Mot de passe</label>
            <TextField type="text" ref="password" style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'250px'}} placeholder={this.state.formControls.password.placeholder}  label="Mot de passe" variant="outlined" value={this.state.formControls.password.value} onChange={this.changeHandler}/>
            <TextField type="password" ref="confirmation" style={{marginLeft:'10px',marginTop:'15px',marginBottom:'20px',background:'white', width:'250px'}}  placeholder={this.state.formControls.confirmation.placeholder} label="confirmation" variant="outlined" value={this.state.formControls.confirmation.value} onChange={this.changeHandler} />*/
import React, { Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ButtonNextStep from '../button-next-step/button_next_step.component';


class FormValidation extends Component {
    constructor(props){
        super(props);
        this.state= {
            token: '',
            checkToken: '',
            tokenValidator: false,
        }
        this.handleChangeToken = this.handleChangeToken.bind(this);     

    }

    handleChangeToken(event){
        this.setState({token: event.target.value});
    }


    validate = () => {
        console.log(this.state.token)
    }

    render(){
        return(
            <FormControl style={{display:'flex',flexDirection:'column',alignItems:"space-between"}}>
            <label style={{marginTop:'-10px', fontSize:'20px'}}>Votre compte a bien été créer, un email de confirmation vient de vous être envoyé</label>
            <div style={{marginTop:'50px',display:'flex',flexDirection:'row',alignItems:"space-between"}}>
            <label style={{marginTop:'25px'}}>Code de validation</label>
            <TextField type="text" 
                       name="token"
                       error={this.state.tokenValidator}
                       style={{marginLeft:'10px',marginTop:'10px',marginRight:'10px',background:'white', width:'250px'}} 
                       variant="outlined"  
                       value={this.state.token } 
                       onChange={this.handleChangeToken} />
            <ButtonNextStep customClick={this.validate}/>
            </div>
            </FormControl>
        )
    }
}


export default FormValidation
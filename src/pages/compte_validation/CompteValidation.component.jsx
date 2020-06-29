import React, { Component } from 'react';

// import api

import { validateAccount } from '../../services/api_user';


// import material

import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_progress_bar from '../../themes/theme_progress_bar.js';

// import scss

import './CompteValidation.styles.scss'

class CompteValidation extends Component {
    constructor(props){
        super(props)
        this.state={
            message:'',
            progress:'visible',
            validate:false
        }
    }

    componentDidMount(){
        validateAccount(this.props.match.params.key).then(result => {
            this.setState({
                message: result.message,
                progress:'hidden',
                validate: result.user ? true : false
            })
        })
    }

    render() {
        return(
            <div className="pageValidationCompte">
            <Paper className="paperValidationCompte">              
                {this.state.progress === 'visible' ? 
                <MuiThemeProvider theme={theme_progress_bar}>
                    <div className="progressBar" >
                        <LinearProgress style={{visibility:this.state.progress,marginTop:"10px",colorPrimary:"primary"}} />
                    </div>
                </MuiThemeProvider>
                 :
                <div className="divSuccedValidationCompte">
                    <Paper className="paperSuccedValidationCompte" style={{background:'#f2f2f2'}}>
                        <label className="labelSuccedValidationCompte">{this.state.message}</label>
                    </Paper> 
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',height:'100px',width:'450px',fontSize:'11px'}}>
                        <div className='green'>1- Paramètres du compte</div> 
                        <div  className='green'>2- Informations personnelles</div>
                        {this.state.validate ? <div className='green'>3- Validation</div> : <div className='red'>3- Validation</div> }
                    </div>
                </div>}
            </Paper>
            </div>
        )
    }
}

export default CompteValidation
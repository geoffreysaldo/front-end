import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InfoSignup from '../../components/info-signup/info_signup.component';
import FormParameter from '../../components/form-parameter/form_parameter.component';
import FormInformation from '../../components/form_information/form_information.component';
import './inscription.styles.scss'
import { connect } from 'react-redux';

class Inscription extends Component {
  constructor(props){
    super(props)
  }

  ETAPE_FORMULAIRE = {
    1 : <div style={{display:"flex",flexDirection:"raw",justifyContent: "space-between",alignItems:"center",minWidth:"700px",width:"90%",margin: "10px"}}><InfoSignup/><FormParameter/></div>,
    2 : <FormInformation/>,
    3 : <div>3ème étape</div>
  }



  render(){
    return (
      <div className="pageInscription">
      <Paper className="paperInscription">
          { this.ETAPE_FORMULAIRE[this.props.etape.etape] }
      </Paper>
      </div>
    );
}}

const mapStateToProps = state =>({
  etape : state.etape
})

export default connect(mapStateToProps)(Inscription)
import React, { Component } from 'react';


import { connect } from 'react-redux';


class SignupConfirmation extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
            <label style={{marginTop:'-10px', fontSize:'20px'}}>{this.props.informations.informations.message}</label>
            <br/>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',height:'100px',width:'450px',fontSize:'11px',marginBottom:'-80px'}}>
            <div style={{display:'flex', color:'green'}}>1- Paramètres du compte</div> 
            <div style={{display:'flex', color:'green'}}>2- Informations personnelles</div>
            <div style={{display:'flex', color:'green'}}>3- Validation</div>
            </div>
            </div>
        )
    }
}



const mapStateToProps = state =>({
    informations: state.informations
  })

export default connect(mapStateToProps,null)(SignupConfirmation)
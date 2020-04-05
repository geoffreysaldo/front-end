import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types'


export default function DialogFailConnection(props){
    const { onClose, open } = props;

    const handleClickClose = () => {
        onClose();
      };

    return(
        <Dialog  open={open} >
            <div style={{display:'flex',alignIteml:'center', justifyContent:'center',width:'260px',height:'200px'}}>
               
               <div style={{paddingTop:'40px', paddingLeft:'20px', paddingRight:'20px',textAlign: 'center'}}>
               
                L'identifiant et/ou le mot de passe saisis sont invalides. 
            <br/>
            <br/>
                <b>Mot de passe oublié ?
                Cliquez sur "Mot de passe oublié" </b> pour le réinitialiser.
                </div>
            </div>
            <Button onClick={handleClickClose}>
                fermer
            </Button>
        </Dialog> 
  
        )
}

DialogFailConnection.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

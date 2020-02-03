import React from 'react';

import { jssPreset, StylesProvider, makeStyles } from '@material-ui/core/styles';
import './button_signin.styles.scss'
import { create } from 'jss';
import jssTemplate from 'jss-plugin-template';


  const jss = create({
    plugins: [jssTemplate(), ...jssPreset().plugins],
  });
  
  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(#e74042, #b20e10)',
      borderRadius: '3px',
      fontSize: '16px',
      marginTop:'10px',
      marginRight:'10px',
      border: '0px',
      color: 'white',
      textShadow: '0 -1px 0px #a90305',
      height: '32px',
      padding:' 0 30px',
      cursor:'pointer',
      boxShadow: 'inset 0 1px 0px rgba(255,255,255,0.4),0 1px 0 rgba(255,255,255,0.25)',
      "&:hover": {
        opacity:0.85
      }
    }
    ,

  });
  
  function Child() {
    const classes = useStyles();
    return (
      <button type="button" className={classes.root}>
        Connexion
      </button>
    );
  }
  
  function ButtonSignIn() {
    return (
      <StylesProvider jss={jss}>
        <Child />
      </StylesProvider>
    );
  }
  
  export default ButtonSignIn;
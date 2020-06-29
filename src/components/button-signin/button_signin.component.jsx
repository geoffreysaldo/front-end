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
      background: 'linear-gradient(#CF3737, #B60202)',
      borderRadius: '3px',
      fontSize: '12px',
      marginTop:'10px',
      marginRight:'10px',
      border: '0px',
      color: 'white',
      textShadow: '0 -1px 0px #7C0202',
      height: '30px',
      width:"100px",
      cursor:'pointer',
      boxShadow: 'inset 0 1px 0px rgba(255,255,255,0.4),0 1px 0 rgba(255,255,255,0.25)',
      "&:hover": {
        opacity:0.85
      }
    }
    ,

  });
  
  function Child(props) {
    const classes = useStyles();
    return (
      <button onClick={props.customClick}  type="button" className={classes.root}>
        Connexion
      </button>
    );
  }
  
  function ButtonSignIn(props) {
    return (
      <StylesProvider jss={jss}>
        <Child customClick = {props.customClick}/>
      </StylesProvider>
    );
  }
  
  export default ButtonSignIn;
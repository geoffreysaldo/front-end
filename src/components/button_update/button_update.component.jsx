import React from 'react';

import { jssPreset, StylesProvider, makeStyles } from '@material-ui/core/styles';
import './button_update.styles.scss'
import { create } from 'jss';
import jssTemplate from 'jss-plugin-template';


  const jss = create({
    plugins: [jssTemplate(), ...jssPreset().plugins],
  });
  
  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(#e74042, #b20e10)',
      borderRadius: '3px',
      fontSize: '12px',
      margin:'10px',
      border: '0px',
      color: 'white',
      textShadow: '0 -1px 0px #a90305',
      height: '30px',
      width:"150px",
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
        {props.name}
      </button>
    );
  }
  
  function ButtonUpdate(props) {
    return (
      <StylesProvider jss={jss}>
        <Child customClick = {props.customClick} name={props.name}/>
      </StylesProvider>
    );
  }
  
  export default ButtonUpdate;
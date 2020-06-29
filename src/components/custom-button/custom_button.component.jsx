import React from 'react';

import { jssPreset, StylesProvider, makeStyles } from '@material-ui/core/styles';
import { create } from 'jss';
import jssTemplate from 'jss-plugin-template';
import { ReactComponent as Home } from '../../assets/home.svg';
import { ReactComponent as Scooter } from '../../assets/moped.svg';

  const jss = create({
    plugins: [jssTemplate(), ...jssPreset().plugins],
  });
  
  const useStyles = makeStyles({
    root: {
      borderRadius: '3px',
      fontSize: '18px',
      fontWeight:'bold',
      margin:'10px',
      color: 'white',
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
      <button onClick={props.customClick}  type="button" className={classes.root} style={{background:props.color,fontSize:props.fontSize, width:props.width, height:props.height, border:props.border, textShadow:props.textShadow}}>
      {props.name}   
      </button>
    );
  }
  
  function CustomButton(props) {
    return (
      <StylesProvider jss={jss}>
        <Child customClick = {props.customClick} name={props.name} fontSize={props.fontSize} color={props.color} width={props.width} height={props.height} icon={props.icon} border={props.border} textShadow={props.textShadow} />
      </StylesProvider>
    );
  }
  
  export default CustomButton;
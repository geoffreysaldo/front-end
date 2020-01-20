import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withRouter, Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor:"#f2cf4c",
    color:"white",
  },  
});

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Homepage');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation  showLabels value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction  label="Homepage" value="Homepage" component={Link} to={"/"}/>
      <BottomNavigationAction  label="Poke bowl" value="Poke bowl" component={Link} to={"/pokebowl"}/>
      <BottomNavigationAction label="Entrées" value="Entrées" component={Link} to={"/entree"}/>
      <BottomNavigationAction  label="Désserts" value="Désserts" component={Link} to={"/dessert"}/>
      <BottomNavigationAction  label="Boissons" value="Boissons" component={Link} to={"/boisson"}/>
      <BottomNavigationAction  label="Formule midi" value="Formule midi" component={Link} to={"/formule"}/>
    </BottomNavigation>
  );
}

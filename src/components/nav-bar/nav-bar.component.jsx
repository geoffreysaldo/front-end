import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor:"white",
    color:"white"
  },
});

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Geoffrey');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation  showLabels value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Geoffrey" value="Geoffrey"/>
      <BottomNavigationAction label="Favorites" value="favorites"/>
      <BottomNavigationAction label="Nearby" value="nearby"/>
      <BottomNavigationAction label="Folder" value="folder"/>
    </BottomNavigation>
  );
}

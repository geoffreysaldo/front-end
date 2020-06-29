import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import PanneauCommande from '../panneau_commande/panneau_commande.component';

import Paper from '@material-ui/core/Paper';

import { getOrdersByDate, deleteOrder, updateOrderChosenTime, updateOrderState} from '../../services/api_service';
import { isAuthenticated } from '../../services/auth-helper';


import TableCell from '@material-ui/core/TableCell';

import LinearProgress from '@material-ui/core/LinearProgress';

//import theme

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_progress_bar from '../../themes/theme_progress_bar';

// Switch 'prêt' ou 'en livraison'

import Switch from '@material-ui/core/Switch'; 

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


// Bouton customisé

import openSocket from 'socket.io-client';

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
    fontWeight:600,
    color:'#e74042'

  },
}))(TableCell);

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `0px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});


class Commande extends Component {
  constructor(props){
    super(props)
    this.state = {
      today:'',
      tomorrow:'',
      date:'',
      tableauCommande:[],
      progress:'visible'
    }
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this)

  }

  componentDidMount(){
    let dayMap = new Map().set(0,'Dimanche').set(1,'Lundi').set(2,'Mardi').set(3,'Mercredi').set(4,'Jeudi').set(5,'Vendredi').set(6,'Samedi');
    let monthMap = new Map().set(0,'Janvier').set(1,'Février').set(2,'Mars').set(3,'Avril').set(4,'Mai').set(5,'Juin').set(6,'Juillet').set(7,'Aout').set(8,'Septembre').set(9,'Octobre').set(10,'Novembre').set(11,'Décembre')
    let today = new Date();
    let tomorrow = new Date(+new Date() + 86400000);
    if(this.state.today == ''){
        this.setState({today:dayMap.get(today.getDay()) + ' ' + today.getDate() + ' ' + monthMap.get(today.getMonth()) +' '+ today.getFullYear(), 
                        tomorrow : dayMap.get(tomorrow.getDay()) + ' ' + tomorrow.getDate() + ' ' + monthMap.get(tomorrow.getMonth()) +' '+ today.getFullYear(),
                        date: dayMap.get(today.getDay()) + ' ' + today.getDate() + ' ' + monthMap.get(today.getMonth()) +' '+ today.getFullYear()})
    }
    const socket = openSocket('http://localhost:3000');
    getOrdersByDate(isAuthenticated(),dayMap.get(today.getDay()) + ' ' + today.getDate() + ' ' + monthMap.get(today.getMonth()) +' '+ today.getFullYear())
    .then(
      orders => orders.length > 0 ? orders.map((order,index) => this.setState({
        tableauCommande: [order,...this.state.tableauCommande],
        progress :  index === orders.length-1 ? 'hidden' : 'visible' 
      })) :this.setState({
        progress:'hidden'
      }) 
    )

    socket.on('posts', data => {
      console.log(data, this.state.date)
      if(data.post.date === this.state.date){
        this.setState(
          {tableauCommande: [data.post,...this.state.tableauCommande] }
        )}
        })
  

}
handleChangeTime(id ,event){
  updateOrderChosenTime(id, isAuthenticated(),event.target.value).then(() =>
    this.setState(prevState => ({
      tableauCommande: prevState.tableauCommande.map(commande => commande._id === id ? {...commande, chosenTime:event.target.value,state:"En préparation"} : commande)
    }))
  )   
  }




handleChangeTime(id ,event){
  updateOrderChosenTime(id, isAuthenticated(),event.target.value).then(() =>
    this.setState(prevState => ({
      tableauCommande: prevState.tableauCommande.map(commande => commande._id === id ? {...commande, chosenTime:event.target.value,state:"En préparation"} : commande)
    }))
  )   
  }

handleChangeDate(event){
    this.setState({tableauCommande:[]})
    getOrdersByDate(isAuthenticated(),event.target.value).then(
      orders => orders.map(
        order => this.setState({tableauCommande: [order,...this.state.tableauCommande]})))
          .then(() => this.setState({
            date: event.target.value
          }) )
  }


  handleSwitch(command_id,commande_mode,command_switch,event){
    event.stopPropagation()
    let state = ""
    if(!command_switch){
      if(commande_mode == "Livraison"){
        state = "En livraison"
      }
      else{
        state = "Commande prête"
      }
    }
    else{
      state = "En préparation"
    }
    updateOrderState(command_id,isAuthenticated(),state,!command_switch).then((value) => {
      this.setState(prevState => ({
        tableauCommande: prevState.tableauCommande.map(commande => commande._id === command_id ? {...commande, switch:!command_switch,state:state} : commande)
      }))
    })
  }



deleteOrder(id){
  deleteOrder(id,isAuthenticated()).then(() => {
    this.state.tableauCommande.map(commande => {
      if(commande._id == id ){
        this.setState({
          tableauCommande: this.state.tableauCommande.filter(commande => commande._id !== id)
      }) 
    }
    })
  })
}
    
  
    render() {
      return (
        <div  style={{display:'flex',flexDirection:'column',width:'100%',alignItems:'center'}}>


        <Paper style={{display:'flex',flexDirection:'column',width:'90%',marginTop:'20px',alignItems:'center',background:'#f2f2f2'}}>
        {this.state.progress === 'visible' ? 
                <MuiThemeProvider theme={theme_progress_bar}>
                <div style={{height:'25px',width:'95%'}}>
                    <LinearProgress style={{visibility:this.state.progress,marginTop:"10px",colorPrimary:"primary"}} />
                </div>
                </MuiThemeProvider>
                :
          <div style={{width:"100%",display:'flex',flexDirection:'column', alignItems:'center'}}>
          <div style={{width:'100%',display:'flex', flexDirection:'row'}}>
          <FormControl variant="outlined" style={{marginLeft:'10px',marginTop:'10px',marginBottom:'10px',background:'white',width:'200px',height:'80%'}}>
          <Select 
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={this.state.date}
              onChange={this.handleChangeDate}
              >
                  <MenuItem value={this.state.today}>{this.state.today}</MenuItem>
                  <MenuItem value={this.state.tomorrow}>{this.state.tomorrow}</MenuItem>
          </Select>
          </FormControl>
            <div style={{width:'200px',marginLeft:'10px',marginTop:'30px',fontStyle:'italic'}}>Nombre de commande(s) : {this.state.tableauCommande.reduce((acc,commande) => acc + 1, 0)}</div>
           <div style={{width:'200px',marginLeft:'10px',marginTop:'30px',fontStyle:'italic'}}>Total du jour : {this.state.tableauCommande.reduce((acc,commande) => acc + commande.total, 0).toFixed(2)} €</div>
          </div>
          <Paper style={{background:"#DEDEDE",width:'95%',marginTop:'10px',marginBottom:'20px'}}>
            {this.state.tableauCommande.length > 0 ?
            this.state.tableauCommande.map((commande, index) =>
              <PanneauCommande key={index} commande={commande} onTimeChange={this.handleChangeTime} onSwitchChange={this.handleSwitch} onDeleteOrder={this.deleteOrder}/>)
            : null } 
            </Paper>
            </div>}
        </Paper>

        </div>
      )
    }
}


export default Commande
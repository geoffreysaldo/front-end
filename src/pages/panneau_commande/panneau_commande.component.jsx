import React, { Component } from 'react';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import theme from '../../themes/theme.js';


import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getOrdersByDate, deleteOrder, updateOrderChosenTime, updateOrderState} from '../../services/api_service';
import { isAuthenticated } from '../../services/auth-helper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Switch 'prêt' ou 'en livraison'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'; 

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import themeCommande from '../../themes/theme_command.js';

// Bouton customisé
import CustomButton from '../../components/custom-button/custom_button.component';

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

class PanneauCommande extends Component{
    constructor(props){
        super(props)
        this.state={
            time:'',
            arrayLunchTime:[],
            arrayDinnerTime:[]
        }
    }

    handleExpandPanel(commande,date,time){
        console.log(date, time)
        let arrayLunchTime = []
        let arrayDinnerTime = [];
          if(date.split(' ')[1] == new Date().getDate()){
            let today = new Date();
            let todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            let todayHours = today.getHours();
            let todayWithHours = new Date(todayWithoutTime.getTime() + todayHours*3600000);
            let todayMinutes = today.getMinutes();
            let closestInterval = Number(Math.floor((todayMinutes / 15))) + 1;
            let todayAround = new Date(todayWithoutTime.getTime() + todayHours*3600000 + closestInterval * 15 * 60000 + 45 * 60000);
            let todayAroundHours = todayAround.getHours();
            let todayAroundMinutes = todayAround.getMinutes();
            if(Number(time[0]+time[1]) <= 16){
              if(todayHours < 11){
                for(let pas = 0 ; pas < 12; pas ++){
                  arrayLunchTime.push(this.makeInterval(11, 45, pas, 15))
                    }
                  }
                else {
                  let remainingTime = (14 - todayHours - todayMinutes/60) / 0.25
                  for(let pas = 0 ; pas < Math.ceil(remainingTime); pas ++){
                    arrayLunchTime.push(this.makeInterval(todayAroundHours, todayAroundMinutes, pas, 15))
                    }
                  }
                  }
              else {
                if(Number(time[0]+time[1]) <= 24 && Number(time[0]+time[1]) > 15){
                  if(todayHours < 18){
                    for(let pas = 0 ; pas < 16; pas ++){
                      arrayDinnerTime.push(this.makeInterval(18, 45, pas, 15))
                      }
                      }
                  else {
                    let remainingTime = (22 - todayHours - todayMinutes/60) / 0.25
                      for(let pas = 0 ; pas < Math.ceil(remainingTime) ; pas ++){
                        arrayDinnerTime.push(this.makeInterval(todayAroundHours, todayAroundMinutes, pas, 15))
                        }
                      }
                    }
                  }
              } else{
                if(Number(time[0]+time[1]) <= 14){
                  for(let pas = 0 ; pas < 12; pas ++){
                      arrayLunchTime.push(this.makeInterval(11, 45, pas, 15))
                  }
                }
                else{
                  for(let pas = 0 ; pas < 16; pas ++){
                    arrayDinnerTime.push(this.makeInterval(18, 45, pas, 15))
                  }
                }
      
              }
              this.setState({arrayLunchTime:arrayLunchTime})
              this.setState({arrayDinnerTime: arrayDinnerTime})
      }
      


 
    
    makeInterval(startHours, startMinutes, pas, timeSlot){
      let newStartHours = Number(startHours);
      let newStartMinutes = Number(startMinutes) + pas * timeSlot;
      if(newStartMinutes >= 60){
          let addHours = Math.floor((newStartMinutes / 60));
          newStartHours = Number(newStartHours) + Number(addHours)
          newStartMinutes = Number(newStartMinutes) - addHours*60
      }
      if(newStartMinutes == 0){
          newStartMinutes = '00'
      }
      let newEndHours = newStartHours;
      let newEndMinutes = Number(newStartMinutes) + 15 
      if(newEndMinutes == 60){
          newEndHours = newEndHours + 1;
          newEndMinutes = '00'
      }
      return newStartHours + ':' + newStartMinutes + ' - '  + newEndHours + ':' + newEndMinutes
    }
    
    


    render(){
        return(
        <ExpansionPanel  onChange={() => this.handleExpandPanel(this.props.commande,this.props.commande.date, this.props.commande.desiredTime)}>
          <MuiThemeProvider theme={themeCommande}>
            <ExpansionPanelSummary  style={this.props.commande.chosenTime == "En attente" ? {height:'70px',opacity:'0.8',background:"#FDDF89",borderColor:'#FABA01'}:this.props.commande.state == "En préparation" ?{height:'70px',opacity:'0.8',background:"#6495ED",borderColor:'#014DC2'} : {height:'70px',opacity:'0.8',background:"#B4EF80",borderColor:'#438E01'} } expandIcon={<ExpandMoreIcon />}>
              <div style={{width:'15%', fontWeight:'bold'}}>{this.props.commande.mode}</div>
              <div style={{width:'30%',display:'flex',flexDirection:'column'}}>
                <div style={{fontSize:'14px'}}>{this.props.commande.date}</div>
                <div style={{fontStyle:'italic',fontSize:'12px'}}>Horaire désirée : {this.props.commande.desiredTime}</div>
                <div style={{fontStyle:'italic',fontSize:'12px'}}>Horaire choisie : {this.props.commande.chosenTime}</div>

              </div>
              <div style={{width:'25%',display:'flex',flexDirection:'column'}}>
                {this.props.commande.mode == "Livraison" ? <div style={{fontSize:'14px'}}>{this.props.commande.address}, {this.props.commande.postalcode}, {this.props.commande.city} </div> : null }
                <div style={{fontSize:'15px', fontWeight:'bold'}}>{this.props.commande.lastname} {this.props.commande.firstname}</div>
                <div style={{fontSize:'14px'}}>{this.props.commande.phone}</div>
              </div>
              <div style={{width:'15%',display:'flex',flexDirection:'column'}}>
              {!this.props.disabled ? 
                <div>
                  {this.props.commande.mode == 'Livraison' ? <span >En livraison ?</span> : <span>Prête ? </span> }
                <FormControlLabel
                 style={{marginLeft:'5%'}} control={<IOSSwitch checked={this.props.commande.switch} onClick={(e) => this.props.onSwitchChange(this.props.commande._id,this.props.commande.mode,this.props.commande.switch,e)}  /> }
              /> </div>  : null }
                </div>
              <div style={{width:'10%'}}>
                <span style={{fontWeight:'bold'}}>{this.props.commande.products.reduce((acc,product) => acc + product.quantity * product.price, 0).toFixed(2) } €</span>
              </div>

            </ExpansionPanelSummary >
            </MuiThemeProvider>

            <ExpansionPanelDetails style={{display:'flex',flexDirection:'column'}} >
              <div style={{display:'flex',flexDirection:'row',marginTop:'10px',width:"100%",marginBottom:'20px'}}>
            {!this.props.disabled ? <FormControl variant="outlined" style={{marginTop:'10px',width:"20%"}} disabled={this.props.disabled}>
                        <label style={{fontWeight:'bold'}}>Plage horaire choisie</label>
                        <Select style={{marginTop:'10px',marginBottom:'10px',background:'white',width:'100%'}}
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={this.props.commande.chosenTime}
                            onChange={(e) => this.props.onTimeChange(this.props.commande._id, e)}
                        >
                          {
                          this.state.arrayLunchTime.length > 0 ? 
                              this.state.arrayLunchTime.map(interval =>
                              <MenuItem key={interval} value={interval}>{interval}</MenuItem>)
                            :
                            this.state.arrayDinnerTime.map(interval =>
                                <MenuItem key={interval} value={interval}>{interval}</MenuItem>)
                            } 

                        </Select>
              </FormControl> : null }
                {this.props.commande.message != '' ?  <Paper style={{background:'#f2f2f2',marginTop:'10px',width:'70%',marginLeft:'20px',display:'flex',flexDirection:'column'}}>
                  <label style={{marginLeft:'10px',marginTop:'10px',fontWeight:'bold'}}>Commentaire :</label> 
                  <p style={{marginLeft:'10px',marginTop:'0px'}}>{this.props.commande.message}</p>
                  </Paper> : null}
              </div>
              <TableContainer component={Paper}>
                <Table >
                  <MuiThemeProvider theme={theme}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Produit</StyledTableCell>
                        <StyledTableCell align="left">Prix à l'unité</StyledTableCell>
                        <StyledTableCell align="left">Quantité</StyledTableCell>
                        <StyledTableCell align="left">Sous-total</StyledTableCell>
                      </TableRow>
                    </TableHead>
                  </MuiThemeProvider>
                    <TableBody>
                      {this.props.commande.products.map(product => (
                      <TableRow key={product.name} >
                        <TableCell align="left" component="th" scope="row">
                          {product.name}
                        </TableCell>
                        <TableCell align="left" >{product.price.toFixed(2)} €</TableCell>
                        <TableCell align="left" >      
                          { product.quantity > 1 ? <div style={{color:'red',fontWeight:'bold'}}>{product.quantity}</div> : <div>{product.quantity}</div> }
                        </TableCell>
                        <TableCell align="left">{(product.price * product.quantity).toFixed(2)} €</TableCell>
                        </TableRow>
                      ))}
                        <TableRow>
                          <TableCell rowSpan={2}></TableCell>
                          <TableCell rowSpan={2}></TableCell>
                            <StyledTableCell  rowSpan={2} align="left" >Total TTC</StyledTableCell>
                            <StyledTableCell rowSpan={2} align="left">{this.props.commande.products.reduce((acc,product) => acc + product.quantity * product.price, 0).toFixed(2) } €</StyledTableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    </TableContainer>
                {!this.props.disabled ?<div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                  <CustomButton customClick={() => this.props.onDeleteOrder(this.props.commande._id)} name="Supprimer la commande" color="linear-gradient(#e74042, #b20e10)"  width='130px' height='40px' fontSize='14px'/>
                </div> : null}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default PanneauCommande
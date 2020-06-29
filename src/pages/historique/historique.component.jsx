import React, { Component } from 'react';

//import material

import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';

//import theme

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_progress_bar from '../../themes/theme_progress_bar';


// import api

import { getOrdersHistorique , getOrdersByMonth, deleteOrder} from '../../services/api_service';
import { isAuthenticated } from '../../services/auth-helper';

// import componsants 

import PanneauCommande from '../panneau_commande/panneau_commande.component';

//import scss

import './historique.styles.scss'

class Historique extends Component{
    constructor(props){
        super(props);
        this.state={
            monthAndYearState:[],
            chosenMonthYear:'',
            tableauCommande:[],
            page:1,
            numberItem:0,
            totalMonth:"",
            progress:'visible'
        }

        this.handleChosenMonthYear = this.handleChosenMonthYear.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
    }


    componentDidMount(){
        getOrdersHistorique(isAuthenticated()).then(monthAndYear => {
            this.setState({
                monthAndYearState : monthAndYear, chosenMonthYear: monthAndYear[monthAndYear.length-1]
            })
        }).then(() => {
            getOrdersByMonth(isAuthenticated(), this.state.chosenMonthYear,0).then(commandes => {
                    this.setState({
                        numberItem:commandes.numberCommands, totalMonth:commandes.totalMonth.toFixed(2)
                    })
                    commandes.commandes.map((commande,index) => {this.setState({
                        tableauCommande:[...this.state.tableauCommande,commande]
                        })});
                    }
            ).then(() =>{
                this.setState({
                    progress:'hidden'
                })
            }
            )
        })
    }

    handleChosenMonthYear(e){
        this.setState({
            tableauCommande: [] ,chosenMonthYear:e.target.value
        })
        getOrdersByMonth(isAuthenticated(),e.target.value,0).then(commandes => {
            this.setState({
                numberItem:commandes.numberCommands, totalMonth:commandes.totalMonth.toFixed(2)
            })
            commandes.commandes.map((commande) => {
                this.setState({
                tableauCommande:[...this.state.tableauCommande,commande]
                })})
            })
    }

    handleChangePage(e,value){
        this.setState({
            tableauCommande: [], page:value
        })
        getOrdersByMonth(isAuthenticated(),this.state.chosenMonthYear,value-1).then(commandes => {
            this.setState({
                numberItem:commandes.numberCommands
            })
            commandes.commandes.map((commande) => {
                this.setState({
                tableauCommande:[...this.state.tableauCommande,commande]
                })})
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

    render(){
        return(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',marginTop:'10px'}}>

            <Paper style={{display:'flex',flexDirection:'column',alignItems:'center',width:'90%',marginTop:'20px',justifyContent:'flex-start',background:'#f2f2f2'}}>
                {this.state.progress ==='visible' ? 
                <MuiThemeProvider theme={theme_progress_bar}>
                <div style={{height:'25px',width:'95%'}}>
                    <LinearProgress style={{visibility:this.state.progress,marginTop:"10px",colorPrimary:"primary"}} />
                </div>
                </MuiThemeProvider>
                :
                <div className="PanneauHistorique">
                <Paper style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',marginTop:'10px',width:'100%',background:'linear-gradient(#343333, #090909)',color:'white',fontWeight:'bold'}}>

                <FormControl variant="outlined" style={{marginLeft:'10px',marginTop:'10px',marginBottom:'10px',background:'white',width:'200px',height:'80%',borderRadius:'4px'}}>
                    <Select 
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    value={this.state.chosenMonthYear}
                    onChange={(e) => this.handleChosenMonthYear(e)}
                    >
                        {this.state.monthAndYearState.map(monthYear => 
                        <MenuItem key={monthYear} value={monthYear}>{monthYear}</MenuItem>)}

                    </Select>
                    
                </FormControl>
                <div style={{width:'200px',marginLeft:'10px',marginTop:'30px'}}>Nombre de commandes : {this.state.numberItem}</div>
                <div style={{width:'200px',marginLeft:'10px',marginTop:'30px'}}>Total TTC : {this.state.totalMonth} €</div>

            </Paper>
            <Paper style={{background:"#DEDEDE",width:'100%',marginTop:'10px',marginBottom:'20px'}}>
                {this.state.tableauCommande.map((commande,index) => 
                    <PanneauCommande key={index} commande={commande} onTimeChange={this.handleChangeTime} onSwitchChange={this.handleSwitch} onDeleteOrder={this.deleteOrder} disabled={true}/>)}
            </Paper>
            {this.state.numberItem >10 ? <Pagination count={Math.floor(this.state.numberItem / 10)+1} page={Number(this.state.page)} value={this.state.page} onChange={this.handleChangePage} /> : null }      
            
                </div>}</Paper>
        </div>
        )
    }
}

export default Historique
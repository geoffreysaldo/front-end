import React , { Component } from 'react';

//import material
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';

// import composants
import PanneauCommande from '../panneau_commande/panneau_commande.component';

// import api 
import { getOrdersById } from '../../services/api_service';
import { isAuthenticated, isAdmin } from '../../services/auth-helper';

//import theme

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_progress_bar from '../../themes/theme_progress_bar';

//import scss
import './historique_client.styles.scss'
class ClientHistorique extends Component {
    constructor(props){
        super(props)
        this.state={
            lastname: "",
            firstname: "",
            total: "",
            nbOrders: "",
            orders: [],
            page:"",
            progress:"visible"
        }

        this.handleChangePage = this.handleChangePage.bind(this)
    }

    componentDidMount(){
        getOrdersById(isAuthenticated(),this.props.match.params.id,0).then(orders => {
            this.setState({total:orders.total.toFixed(2), nbOrders:orders.nbOrders, lastname: orders.lastname, firstname: orders.firstname, page:1})
            orders.orders.map((order,index) => {
                this.setState({
                    orders:[...this.state.orders,order],
                    progress: orders.orders.length -1 == index  ? "hidden" : "visible"
                })})
        })
    }

    handleChangePage(e,value){
        this.setState({
            orders:[], progress:'visible'
        })
        getOrdersById(isAuthenticated(),this.props.match.params.id,value-1).then(orders => {
            this.setState({total:orders.total.toFixed(2), nbOrders:orders.nbOrders, lastname: orders.lastname, firstname: orders.firstname, page:value})
            orders.orders.map((order,index) => {
                this.setState({
                    orders:[...this.state.orders,order],
                    progress: orders.orders.length -1 == index  ? "hidden" : "visible"
                })})
        })
        }


    render(){
        return(
            <div className="globalDiv">
                <Paper style={{width:'90%',marginTop:'10px',display:'flex', flexDirection:'column', alignItems:'center',background:'#f2f2f2'}}>
                {this.state.progress ==='visible' ? 
                <MuiThemeProvider theme={theme_progress_bar}>
                <div style={{height:'25px',width:'95%'}}>
                    <LinearProgress style={{visibility:this.state.progress,marginTop:"10px",colorPrimary:"primary"}} />
                </div>
                </MuiThemeProvider> :
                <div style={{width:'100%',display:'flex', flexDirection:'column', alignItems:'center'}}>
                {isAdmin() ?
                    <Paper style={{marginTop:'10px',width:'95%',background:'linear-gradient(#343333, #090909)',color:'white',fontWeight:'bold'}}>
                    <div className="infoCommandeClient">
                        <div className='identity'>Client: {this.state.firstname} {this.state.lastname}</div>
                         <div className="total">Total TTC: {this.state.total} €</div> 
                        <div className="nbOrder">Nombre de commandes: { this.state.nbOrders} </div>
                    </div>
                    </Paper>
                    : null }
                        {this.state.orders.length > 0 ? 
                            <Paper style={{width:'95%',marginTop:'10px',marginBottom:'10px'}}>
                            {this.state.orders.map((commande,index) => (
                                <PanneauCommande key={index} commande={commande} onTimeChange={this.handleChangeTime} onSwitchChange={this.handleSwitch} onDeleteOrder={this.deleteOrder} disabled={true}/>
                            ))}
                            </Paper>
                        : <div className="aucuneCommande">Aucune commande</div> }
                    {this.state.nbOrders >10 ? <Pagination count={Math.floor(this.state.nbOrders / 10)+1} page={Number(this.state.page)} value={this.state.page} onChange={this.handleChangePage} /> : null }        
                    </div>}
                </Paper>
            </div>
        )
    }
}

export default ClientHistorique
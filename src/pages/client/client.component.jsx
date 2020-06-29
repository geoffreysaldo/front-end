import React, { Component } from 'react';


// import componsant

import CarteClient from '../carte_client/carte_client.component';

// import material

import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';

//import theme

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme_progress_bar from '../../themes/theme_progress_bar';

// import api 

import { getUsers } from '../../services/api_service';
import { isAuthenticated } from '../../services/auth-helper';

// import router 

import { Link } from 'react-router-dom';


class Client extends Component {
    constructor(props){
        super(props)
        this.state={
            usersArray:[],
            numberUsers:0,
            page:1,
            progress:"visible"
        }

        this.handleChangePage = this.handleChangePage.bind(this)


    }

    componentDidMount(){
        getUsers(isAuthenticated(),0).then(data => {
            data.usersList.map((user,index) => this.setState({
                usersArray:[...this.state.usersArray, user],
                numberUsers: data.numberUsers,
                progress: index === data.usersList.length - 1 ? 'hidden' : 'visible'
            }))
        })
        }
    

        handleChangePage(e,value){
            this.setState({
                usersArray: [], page:value
            })
            getUsers(isAuthenticated(),this.state.page-1).then(data => {
                this.setState({
                    numberUsers:data.numberUsers
                })
                data.userLists.map((user) => {
                    this.setState({
                        usersArray:[...this.state.usersArray, user], numberUsers: data.numberUsers
                    })})
                })
            }

    render() {
        return(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',marginTop:'10px'}}>
                <Paper style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'90%',marginTop:'20px',background:'#f2f2f2'}}>
                {this.state.progress ==='visible' ? 
                <MuiThemeProvider theme={theme_progress_bar}>
                <div style={{height:'25px',width:'95%'}}>
                    <LinearProgress style={{visibility:this.state.progress,marginTop:"10px",colorPrimary:"primary"}} />
                </div>
                </MuiThemeProvider>
                :
                <div style={{width:'95%'}}>
                    {
                    this.state.usersArray.map((user) => 
                        <Link style={{ textDecoration: 'none',width:'100%' }} key={user._id} to={"/clients/"+user._id}><CarteClient nom={user.lastname} prenom={user.firstname} telephone={user.phone} adresse={user.address} codePostal={user.postalcode} ville={user.city} email={user.email}></CarteClient></Link>
                        ) 
                    } 
                </div>}
                </Paper>
                {this.state.numberUsers > 10 ? <Pagination count={Math.floor(this.state.usersArray.length / 10)+1} page={Number(this.state.page)} value={this.state.page} onChange={this.handleChangePage} /> : null }        
            </div>
        )
    }
}

export default Client
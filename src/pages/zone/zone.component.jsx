import React, { Component } from 'react';


// import composant

import CustomButton from '../../components/custom-button/custom_button.component';

// import material
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

// import api
import { getZones, postZone, updateZone, deleteZone } from '../../services/api_zone';

// import style
import './zone.styles.scss';

class Zone extends Component{
    constructor(props){
        super(props)
        this.state = {
            arrayZones:[],
            progress:'visible',
            addPanelZone:'hidden',
            name:'',
            postalCode:'',
            minimum:'',
            errorName:false,
            errorPostalCode:false,
            errorMinimum:false,
            checkName:'',
            checkPostalCode:'',
            checkMinimum:''
        }

        this.handleAddZone = this.handleAddZone.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSaveZone = this.handleSaveZone.bind(this)

    }

    componentDidMount(){
        getZones().then(zones => {
            zones.map(zone => 
                this.setState({
                    arrayZones: [...this.state.arrayZones, zone]
                })
            )})
    }

    deleteZone(id){
        console.log('salut')
        deleteZone(id).then(() => {
            this.setState({
                arrayZones: this.state.arrayZones.filter(zone => zone._id !== id)
            })})
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleAddZone(){
        this.setState({
            addPanelZone: this.state.addPanelZone === 'hidden' ? "visible" : 'hidden'
        })
    }

    checkName(name){
        return new Promise((resolve, reject) => {
            let reCity =/[a-z]{2,30}/
            if(!reCity.test(name) && name !== ""){
                this.setState({
                    checkName:'Ville non valide', errorName:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkName:'', errorName:false
                }, () => resolve())
            }
        })
    }

    checkPostalCode(postalCode){
        console.log(postalCode)
        return new Promise((resolve, reject) => {
            let rePostalcode =/\d{5}/
            if(!rePostalcode.test(postalCode) && postalCode != ""){
                console.log("erreur")
                this.setState({
                    checkPostalCode:'Code postal non valide', errorPostalCode:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkPostalCode:'', errorPostalCode:false
                }, () => resolve())
            }
        })
    }

    checkMinimum(){
        return new Promise((resolve, reject) => {
            if(this.state.minimum === ""){
                this.setState({
                    checkMinimum:'Montant minimum non valide', errorMinimum:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkMinimum:'', errorMinimum:false
                }, () => resolve())
            }
        })
    }


    handleSaveZone = () => {
        this.checkName(this.state.name).then(() => {
            this.checkPostalCode(this.state.postalCode).then(() => {
                this.checkMinimum(this.state.minimum).then(() => {  
                    postZone(this.state.name, this.state.postalCode, this.state.minimum).then(result => {
                        this.setState({
                            arrayZones:[...this.state.arrayZones, result ]
                        })
                    })
                }).catch(err => {
                    console.log("erreur de montant minimum")
                }) 
            }).catch(err => {
                console.log("erreur de code postal")
            })
        }).catch(err => {
            console.log("erreur nom de ville")
        })
    }

    render(){
        return(
            <div className="global">
                <Paper style={{width:'90%',display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20px', background:'#f2f2f2'}}>
                    <List style={{width:'95%'}}>
                        {this.state.arrayZones.map((zone,index) => (
                            <ListItem key={index} style={{background:"white",display:'flex',flexDirection:'row'}}>
                                <div className="fieldZone">{zone.name}</div>
                                <div className="fieldZone">{zone.postalCode}</div>
                                <div className="fieldZone">{zone.minimum} €</div>
                                <IconButton edge="end" aria-label="delete" onClick={() =>this.deleteZone(zone._id)}>
                                    <DeleteIcon  />
                                </IconButton>
                            </ListItem>
                        ))}
                        <div className="addZone">
                        <Fab size="small" color="primary" aria-label="add" onClick={this.handleAddZone} style={{marginTop:'15px'}}>
                            <AddIcon />
                        </Fab>
                        {this.state.addPanelZone === "visible" ?
                            <Paper style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'100%'}} >
                            <FormControl style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                            <div className="labelAndField">
                            <label className="label">Ville:</label>
                            <div className='field'>
                                <TextField 
                                size="small"
                                type="string" 
                                name="name"
                                error={this.state.errorName}
                                style={{marginLeft:'10px',background:'white'}} 
                                variant="outlined"  
                                value={this.state.name} 
                                onChange={(e) => this.handleChange(e)} />
                                {this.state.errorName ? <label style={{color:'red',fontStyle:'italic',fontSize:'12px',marginLeft:'10px'}}>{this.state.checkName}</label> : null}
                            </div>
                            </div>
                            <div className="labelAndField">
                            <label className="label">Code postal:</label>
                            <div className='field'>
                                <TextField 
                                size="small"
                                type="string" 
                                name="postalCode"
                                error={this.state.errorPostalCode}
                                style={{marginLeft:'10px',background:'white'}} 
                                variant="outlined"  
                                value={this.state.postalCode} 
                                onChange={(e) => this.handleChange(e)} />
                                {this.state.errorPostalCode ? <label style={{color:'red',fontStyle:'italic',fontSize:'12px',marginLeft:'10px'}}>{this.state.checkPostalCode}</label> : null}
                            </div>
                            </div>
                            <div className="labelAndField">
                            <label className="label">Minimum:</label>
                            <div className='field'>
                            <TextField 
                                size="small"
                                type="number" 
                                name="minimum"
                                error={this.state.errorMinimum}
                                style={{marginLeft:'10px',background:'white'}} 
                                variant="outlined"  
                                value={this.state.minimum} 
                                onChange={(e) => this.handleChange(e)} />
                                {this.state.errorMinimum ? <label style={{color:'red',fontStyle:'italic',fontSize:'12px',marginLeft:'10px'}}>{this.state.checkMinimum}</label> : null}
                            </div>
                            </div>
                            <CustomButton customClick={this.handleSaveZone} name="Enregistrer" height="35px" width="120px" color="linear-gradient(-180deg,#13aa52 0,#18964c 100%)" fontSize="14px" border="1px solid #158242"/>
                            </FormControl> 
                        </Paper> : null }
                        </div>
                    </List>
                </Paper>
            </div>
        )
    }
}

export default Zone
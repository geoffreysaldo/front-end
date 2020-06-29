import React, {Component} from 'react'

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../themes/theme.js';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import CustomButton from '../../components/custom-button/custom_button.component';
//import CustomButton from '../../components/custom-button/custom_button.component';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { ReactComponent as Less } from '../../assets/less.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';


// import api

import { postOrder, getTimeTodayTomorrow, getUserInformations } from '../../services/api_service';
import { addCommandProduct, deleteCommandProduct, removeCommandProduct } from '../../redux/command-products/command_products.actions';
import { getZones } from '../../services/api_zone';

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

class CommandValidation extends Component{
    constructor(props){
        super(props)
        this.state={
            userId:'',
            addressDeliveryPanel:false,
            addressTakeAwayPanel:false,
            mode:'',
            nom:'',
            prenom:'',
            phone:'',
            address:'',
            city:'',
            date:'',
            time:'',
            checkLastname:'',
            checkFirstname:'',
            checkPhone:'',
            postalCode:'',
            checkAddress:'',
            checkCity:'',
            checkPostalcode:'',
            checkDate:'',
            checkTime:'',
            lastnameValidator: false,
            firstnameValidator: false,
            phoneValidator: false,
            addressValidator: false,
            cityValidator: false,
            postalcodeValidator: false,
            dateValidator:false,
            timeValidator:false,
            today:'',
            todayDisabled:false,
            tomorrow:'',
            tomorrowDisabled:false,
            arrayLunchTime:[],
            arrayDinnerTime:[],
            message:'',
            todayOpenTime:{},
            tomorrowOpenTime:{},
            arrayZones: [],
            minimum:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);              
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangePostalcode = this.handleChangePostalcode.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
        this.handleChangeMessage = this.handleChangeMessage.bind(this)
        
    }

    componentDidMount(){
        getUserInformations().then(data => {
            console.log(data)
            this.setState({
                nom: data.nom,
                prenom:data.prenom, 
                phone: data.telephone, 
                address: data.adresse || '',
                postalcode: data.codePostal || '',
                city: data.ville || '',
                userId: data.id,
            })
        })
        // Si user Connecté, getUserInformations....
    }
  

    handleChange = (event) => {
        let dayMap = new Map().set(0,'Dimanche').set(1,'Lundi').set(2,'Mardi').set(3,'Mercredi').set(4,'Jeudi').set(5,'Vendredi').set(6,'Samedi');
        let monthMap = new Map().set(0,'Janvier').set(1,'Février').set(2,'Mars').set(3,'Avril').set(4,'Mai').set(5,'Juin').set(6,'Juillet').set(7,'Aout').set(8,'Septembre').set(9,'Octobre').set(10,'Novembre').set(11,'Décembre')
        let today = new Date();
        let tomorrow = new Date(+new Date() + 86400000);
        let todayDay = today.getDay()
        let tomorrowDay = tomorrow.getDay()
        todayDay <= 6  && todayDay > 0 ? todayDay = todayDay - 1 : todayDay = 6
        tomorrowDay <= 6  && tomorrowDay > 0 ? tomorrowDay = tomorrowDay - 1 : tomorrowDay = 6
        getTimeTodayTomorrow(todayDay,tomorrowDay).then((data) => {
            today = dayMap.get(today.getDay()) + ' ' + today.getDate() + ' ' + monthMap.get(today.getMonth()) + ' ' + new Date().getFullYear()
            tomorrow = dayMap.get(tomorrow.getDay()) + ' ' + tomorrow.getDate() + ' ' + monthMap.get(tomorrow.getMonth()) + ' ' + new Date().getFullYear()
            this.setState({
                today: !data[0].lunchTime.disabled && !data[0].dinnerTime.disabled ? today + " (fermé)" : today,
                tomorrow: !data[1].lunchTime.disabled && !data[1].dinnerTime.disabled ? tomorrow + " (fermé)" : tomorrow,
                todayDisabled: !data[0].lunchTime.disabled && !data[0].dinnerTime.disabled ? true : false,
                tomorrowDisabled : !data[1].lunchTime.disabled && !data[1].dinnerTime.disabled ? true : false,
                todayOpenTime: data[0],
                tomorrowOpenTime: data[1]
            })
        })

        if(event.target.value == 'Livraison'){
            getZones().then(zones => {
                this.setState({mode:event.target.value, addressDeliveryPanel:true, addressTakeAwayPanel:false, arrayZones:[]})
                zones.map(zone => {
                    this.setState({
                        arrayZones: [...this.state.arrayZones, zone]
                    })
                })
            })
        }
        else{
            this.setState({mode:event.target.value, addressDeliveryPanel:false, addressTakeAwayPanel:true})
        }
    }

    handleChangeLastname(event){
        event.target.value = event.target.value
            .replace(/[^a-zA-Z\s-]/,'')
        this.setState({nom: event.target.value});
    }

    handleChangeFirstname(event){
        event.target.value = event.target.value
        .replace(/[^a-zA-Z\s-]+/,'')
        this.setState({prenom: event.target.value});
      }

    handleChangePhone(event){
        event.target.value = event.target.value
            .replace(/\D+/,'')
            .replace(/(^10?)|(^20?)|(^30?)|(^40?)|(^50?)|(^60?)|(^70?)|(^80?)|(^90?)/, '0')
            .slice(0, 13)
            .replace(/(\d{2})(?=\d)/g, '$1 ')
        this.setState({phone: event.target.value});
    }

    handleChangeAddress(event){
        event.target.value = event.target.value
            .replace(/^\s/,'')
        this.setState({address: event.target.value});
    }

    handleChangeCity(event){
        console.log(this.state.minimum)
        this.setState({
            city:event.target.value,
            minimum: this.state.arrayZones.filter(zone => zone.name === event.target.value)[0].minimum
        })
}

    handleChangePostalcode(event){
        event.target.value = event.target.value
            .replace(/^[^\d]/,'')
            .slice(0,5)
        this.setState({postalCode: event.target.value});
    }

    handleChangeDate(event){
        console.log(this.state.todayOpenTime,this.state.tomorrowOpenTime)
        let hoursMap = new Map().set('0h',0).set('0h30',0.5).set('1h',1).set('1h30',1.5).set('2h',2).set('2h30',2.5).set('3h',0).set('3h30',3.5).set('4h',4).set('4h30',4.5).set('5h',5).set('5h30',5.5)
        .set('6h',6).set('6h30',6.5).set('7h',7).set('7h30',7.5).set('8h',8).set('8h30',8).set('9h',9).set('9h30',9.5).set('10h',10).set('10h30',10.5).set('11h',11).set('11h30',11.5)
        .set('12h',12).set('12h30',12.5).set('13h',13).set('13h30',13.5).set('14h',14).set('14h30',14.5).set('15h',15).set('15h30',15.5).set('16h',16).set('16h30',16.5).set('17h',17)
        .set('17h30',17.5).set('18h',18).set('18h30',18.5).set('19h',19).set('19h30',19.5).set('20h',20).set('20h30',20.5).set('21h',21).set('21h30',21.5).set('22h',22).set('22h30',22.5)
        .set('23h',23).set('23h30',23.5)
        let arrayLunchTime = []
        let arrayDinnerTime = [];
        if(event.target.value === this.state.today){
            let today = new Date();
            let todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            let todayHours = today.getHours();
            //let todayWithHours = new Date(todayWithoutTime.getTime() + todayHours*3600000);
            let todayMinutes = today.getMinutes();
            let closestInterval = Number(Math.floor((todayMinutes / 15))) + 1;
            let todayAround = new Date(todayWithoutTime.getTime() + todayHours*3600000 + closestInterval * 15 * 60000 + 45 * 60000);
            let todayAroundHours = todayAround.getHours();
            let todayAroundMinutes = todayAround.getMinutes();
            let lunchStart = hoursMap.get(this.state.todayOpenTime.lunchTime.start)
            let lunchStop = hoursMap.get(this.state.todayOpenTime.lunchTime.stop)
            let dinnerStart = hoursMap.get(this.state.todayOpenTime.dinnerTime.start)
            let dinnerStop =  hoursMap.get(this.state.todayOpenTime.dinnerTime.stop)
            if(todayHours < lunchStop && this.state.todayOpenTime.lunchTime.disabled){
                if(todayHours < lunchStart){
                    for(let pas = 0 ; pas < (lunchStop-lunchStart)*4; pas ++){
                        arrayLunchTime.push(this.makeInterval(lunchStart-1, 45, pas, 15))
                    }
                }
                else {
                    let remainingTime = (lunchStop - todayHours - todayMinutes/60) / 0.25
                    for(let pas = 0 ; pas < Math.ceil(remainingTime); pas ++){
                        arrayLunchTime.push(this.makeInterval(todayAroundHours, todayAroundMinutes, pas, 15))
                    }
                }
                if(this.state.todayOpenTime.dinnerTime.disabled){
                    for(let pas = 0 ; pas < (dinnerStop - dinnerStart) * 4 ; pas ++){
                        arrayDinnerTime.push(this.makeInterval(dinnerStart, 45, pas, 15))
                    }
                }

            }
            else {
                if(todayHours < dinnerStop && this.state.todayOpenTime.dinnerTime.disabled){
                    if(todayHours < dinnerStart){
                        for(let pas = 0 ; pas < (dinnerStop - dinnerStart)*4 ; pas ++){
                            arrayDinnerTime.push(this.makeInterval(dinnerStart, 45, pas, 15))
                        }
                    }
                    else {
                        let remainingTime = (dinnerStop - todayHours - todayMinutes/60) / 0.25
                        for(let pas = 0 ; pas < Math.ceil(remainingTime) ; pas ++){
                            arrayDinnerTime.push(this.makeInterval(todayAroundHours, todayAroundMinutes, pas, 15))
                        }
                    }
                }
            }
        } else{
            let lunchStart = hoursMap.get(this.state.tomorrowOpenTime.lunchTime.start)
            let lunchStop = hoursMap.get(this.state.tomorrowOpenTime.lunchTime.stop)
            let dinnerStart = hoursMap.get(this.state.tomorrowOpenTime.dinnerTime.start)
            let dinnerStop =  hoursMap.get(this.state.tomorrowOpenTime.dinnerTime.stop)
            if(this.state.tomorrowOpenTime.lunchTime.disabled){
                for(let pas = 0 ; pas < (lunchStop-lunchStart)*4; pas ++){
                    arrayLunchTime.push(this.makeInterval(lunchStart-1, 45, pas, 15))
                }
            }
            if(this.state.tomorrowOpenTime.dinnerTime.disabled){
                for(let pas = 0 ; pas < (dinnerStop-dinnerStart)*4; pas ++){
                    arrayDinnerTime.push(this.makeInterval(dinnerStart, 45, pas, 15))
                }
            }
        }
        this.setState({arrayLunchTime:arrayLunchTime,arrayDinnerTime: arrayDinnerTime,date: event.target.value})
    }


    handleChangeTime(event){
        this.setState({time: event.target.value})
    }

    handleChangeMessage(event){
        this.setState({message:event.target.value})
    }

    checkLastname(name){
        return new Promise((resolve, reject) => {
            let rePattern = /[a-z]{2,30}/
            if(!rePattern.test(name)){
                this.setState({
                    checkLastname:'Nom non valide', lastnameValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkLastname:'', lastnameValidator:false
                }, () => resolve())
            }
        })
    }

    checkFirstname(name){
        return new Promise((resolve, reject) => {
            let rePattern = /[a-z]{2,30}/
            if(!rePattern.test(name)){
                this.setState({
                    checkFirstname:'Prénom non valide', firstnameValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkFirstname:'', firstnameValidator:false
                }, () => resolve())
            }
        })
    }

    checkPhone(phone){
        return new Promise((resolve, reject) => {
            let rePhone = /0\d\s\d{2}\s\d{2}\s\d{2}\s\d{2}/
            if(!rePhone.test(phone)){
                this.setState({
                    checkPhone:'Téléphone non valide', phoneValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkPhone:'', phoneValidator:false
                }, () => resolve())
            }


        })
    }

    checkAddress(address){
        return new Promise((resolve, reject) => {
            let reAddress =/[0-9]{0,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/
            if(!reAddress.test(address)){
                this.setState({
                    checkAddress:'Adresse non valide', addressValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkAddress:'', addressValidator:false
                }, () => resolve())
            }
        })
    }

    checkCity(city){
        return new Promise((resolve, reject) => {
            let reCity =/[a-z]{2,30}/
            if(!reCity.test(city)){
                this.setState({
                    checkCity:'Ville non valide', cityValidator:true
                }, () => reject())
            }
            if(this.state.minimum > this.props.commandProducts.reduce((acc,product) => acc + product.quantity * product.price, 0).toFixed(2)){
                this.setState({
                    checkCity:'Montant minimum non valide, '+ this.state.minimum +' € minimum', cityValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkCity:'', cityValidator:false
                }, () => resolve())
            }
        })
    }

    checkPostalcode(postalcode){
        return new Promise((resolve, reject) => {
            let rePostalcode =/\d{5}/
            if(!rePostalcode.test(postalcode) && postalcode != ""){
                this.setState({
                    checkPostalcode:'Code postal non valide', postalcodeValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkPostalcode:'', postalcodeValidator:false
                }, () => resolve())
            }
        })
    }

    checkDate(date){
        return new Promise((resolve, reject) => {
            if(date == ''){
                this.setState({
                    checkDate:'Date non valide', dateValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkDate:'', dateValidator:false
                }, () => resolve())
            }


        })
    }

    checkTime(time){
        return new Promise((resolve, reject) => {
            if(time === '' || time === undefined){
                this.setState({
                    checkTime:'plage horaire non valide', timeValidator:true
                }, () => reject())
            }
            else {
                this.setState({
                    checkTime:'', timeValidator:false
                }, () => resolve())
            }


        })
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

    checkCommand = () => {
        this.checkLastname(this.state.nom).then(() => {
            this.checkFirstname(this.state.prenom).then(() => {
                this.checkPhone(this.state.phone).then(() => {
                    if(this.state.mode == "Livraison"){
                            this.checkAddress(this.state.address).then(() => {
                                this.checkCity(this.state.city).then(() => {
                                    this.checkPostalcode(this.state.postalCode).then(() => {
                                        this.checkDate(this.state.date).then(() => {
                                            this.checkTime(this.state.time).then(() => {
                                                postOrder(this.props.commandProducts,
                                                        this.state.mode,
                                                        this.state.nom,
                                                        this.state.prenom,
                                                        this.state.phone,
                                                        this.state.address,
                                                        this.state.city,
                                                        this.state.postalCode,
                                                        this.state.date,
                                                        this.state.time,
                                                        this.state.message,
                                                        this.state.userId)
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        }).catch(err => {
                                            console.log(err)
                                        })
                                    }).catch(err => {
                                    console.log(err)
                                })
                                }).catch(err => {
                                    console.log(err)
                                })
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    if(this.state.mode == "Emporter"){
                        this.checkDate(this.state.date).then(() => {
                            this.checkTime(this.state.time).then(() => {
                                postOrder(this.props.commandProducts,
                                        this.state.mode,
                                        this.state.nom,
                                        this.state.prenom,
                                        this.state.phone,
                                        this.state.address,
                                        this.state.city,
                                        this.state.postalCode,
                                        this.state.date,
                                        this.state.time,
                                        this.state.message,
                                        this.state.userId)
                            }).catch(err => {
                                console.log(err)
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
       })
    }

    

    render(){
        return(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',marginTop:'10px'}}>
            <Paper style={{display:'flex',flexDirection:'column',width:'75%',marginTop:'20px',alignItems:'center',background:'#f2f2f2'}}>
            <ExpansionPanel defaultExpanded={true} style={{width:'70%',marginTop:'10px'}}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}>
                <Typography>Ma commande</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    { this.props.commandProducts.length > 0 ? <TableContainer component={Paper}>
                        <Table >
                        <MuiThemeProvider theme={theme}>
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Produit</StyledTableCell>
                            <StyledTableCell align="center">Prix à l'unité</StyledTableCell>
                            <StyledTableCell align="center">Quantité</StyledTableCell>
                            <StyledTableCell align="center">Sous-total</StyledTableCell>
                            <StyledTableCell align="center">Supprimer</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        </MuiThemeProvider>
                        <TableBody>
                        {this.props.commandProducts.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{(row.price).toFixed(2)} €</TableCell>
                            <TableCell align="center">      
                                <Chip
                                    icon={<Less style={{cursor:'pointer',width:'20px',heigh:'20px'}} onClick={() => this.props.removeCommandProduct({name:row.name, price:row.price}) } />}
                                    label={row.quantity}
                                    color="default"
                                    deleteIcon={<Plus style={{cursor:'pointer',width:'20px',heigh:'20px'}} />}
                                    onDelete={ () => this.props.addCommandProduct({name:row.name, price:row.price})}
                                    variant="outlined"/>
                                
                            </TableCell>
                            <TableCell align="center">{(row.price * row.quantity).toFixed(2)} €</TableCell>
                            <TableCell align="center">
                                <IconButton edge="end" aria-label="delete" onClick={() => this.props.deleteCommandProduct(row.name)}>
                                    <DeleteIcon  />
                                </IconButton>
                            </TableCell>
                            </TableRow>

                        ))}
                            <TableRow>
                            <TableCell rowSpan={2}></TableCell>
                            <TableCell rowSpan={2}></TableCell>

                                <StyledTableCell  rowSpan={2} align="center" >Total TTC</StyledTableCell>
                                <StyledTableCell rowSpan={2} align="center">{this.props.commandProducts.reduce((acc,product) => acc + product.quantity * product.price, 0).toFixed(2) } €</StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                        </TableContainer> : <div>Votre panier est vide</div> }  
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Paper elevation={2} style={{width:'70%',marginTop:'10px',marginBottom:'10px',display:'flex', flexDirection:'column'}}>
                <div style={{marginLeft:'20px',marginTop:'15px'}}>Livraison ou à Emporter</div>
                <Paper style={{background:'#f2f2f2',width:'80%',marginLeft:'10%',marginTop:'20px',marginBottom:'20px'}}>
                    <FormControl variant="outlined"  style={{width:'30%'}}>
                        <label style={{margin:'10px'}}>Mode de livrasion</label>
                        <Select style={{marginLeft:'10px',marginBottom:'10px',background:'white'}}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        onChange={this.handleChange}
                        value={this.state.mode}
                        >
                        <MenuItem value='Livraison'>Livraison</MenuItem>
                        <MenuItem value='Emporter'>à Emporter</MenuItem>
                        </Select>
                    </FormControl>
                    { this.state.addressDeliveryPanel ?
                    <div style={{display:'flex',flexDirection:'row',width:"100%"}}>

                    <div style={{display:'flex',flexDirection:'column',width:"45%",color:"secondary",fontSize:'14px',marginBottom:'10px'}}>
        
                    <label style={{marginLeft:'10px',marginTop:'10px'}}>Nom *</label>
                    <TextField type="text" 
                               name="nom"
                               error={this.state.lastnameValidator}
                               style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'90%'}} 
                               variant="outlined"  
                               value={this.state.nom} 
                               onChange={this.handleChangeLastname} />
            {this.state.checkLastname != "" ?<span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkLastname}</span>  : null }          
                    <label style={{marginLeft:'10px',marginTop:'20px'}}>Prénom *</label>
                    <TextField type="text" 
                               name="prenom"
                               error={this.state.firstnameValidator}
                               style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'90%'}} 
                               variant="outlined"  
                               value={this.state.prenom} 
                               onChange={this.handleChangeFirstname} />
            {this.state.checkFirstname != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkFirstname}</span>  : null }          
                    <label style={{marginLeft:'10px',marginTop:'20px'}}>Téléphone *</label>
                    <TextField type="tel" 
                               name="telephone"
                               error={this.state.phoneValidator}
                               style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'90%'}} 
                               variant="outlined"  
                               value={this.state.phone} 
                               onChange={this.handleChangePhone} />
            {this.state.checkPhone != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkPhone}</span> : null}          
                    <FormControl variant="outlined"  style={{marginTop:'10px'}}>
                    <label style={{marginLeft:'10px',marginTop:'10px'}}>Date *</label>
                    <Select style={{marginLeft:'10px',marginTop:'10px',marginBottom:'10px',background:'white',width:'90%'}}
                        labelId="demo-controlled-open-select-label"
                        error={this.state.dateValidator}
                        id="demo-controlled-open-select"
                        value={this.state.date}
                        onChange={this.handleChangeDate}
                        >
                        <MenuItem disabled={this.state.todayDisabled} value={this.state.today}>{this.state.today}</MenuItem>
                        <MenuItem disabled={this.state.tomorrowDisabled} value={this.state.tomorrow}>{this.state.tomorrow}</MenuItem>
                        </Select>
                        {this.state.checkDate != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic",marginTop:'-10px', marginLeft:"10px"}}>{this.state.checkDate}</span> : null }          

                    </FormControl>

                    </div>
                    
                    <div style={{visibility:this.state.addressDeliveryPanel,display:'flex',flexDirection:'column',width:"90%",fontSize:'14px'}}>         
                    <label style={{marginLeft:'10px',marginTop:'10px'}}>Adresse *</label>
                    <TextField type="text" 
                            name="adresse"
                            error={this.state.addressValidator}
                            style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'90%'}} 
                            variant="outlined"  
                            value={this.state.address} 
                            onChange={this.handleChangeAddress} />
                            {this.state.checkAddress != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkAddress}</span> : null }                              
                    <FormControl variant="outlined"  style={{width:'90%',marginTop:'10px'}}>
                        <label style={{margin:'10px'}}>Ville *</label>
                        <Select style={{marginLeft:'10px',background:'white'}}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        error={this.state.cityValidator}
                        onChange={this.handleChangeCity}
                        value={this.state.city}
                        >
                        {this.state.arrayZones.map(zone => 
                        <MenuItem key={zone.name} value={zone.name}>{zone.name} ({zone.minimum}€ minimum)</MenuItem>
                        )}
                        </Select>
                    </FormControl >
                        {this.state.checkCity != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkCity}</span> : null }          
                    <label style={{marginLeft:'10px',marginTop:'20px'}}>Code postal *</label>
                    <TextField type="text" 
                            name="codePostal"
                            error={this.state.postalcodeValidator}
                            style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'30%'}} 
                            variant="outlined"  
                            value={this.state.postalcode} 
                            onChange={this.handleChangePostalcode} />
                            {this.state.checkPostalcode != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkPostalcode}</span>  : null }
                    {(this.state.arrayLunchTime.length > 0 || this.state.arrayDinnerTime.length > 0)  ? 
                    <FormControl variant="outlined" style={{marginTop:'10px'}}>
                        <label style={{marginTop:'10px',marginLeft:'10px'}}>Plage horaire souhaitée *</label>
                        <Select style={{marginLeft:'10px',marginTop:'10px',marginBottom:'10px',background:'white',width:'30%'}}
                            labelId="demo-controlled-open-select-label"
                            error={this.state.timeValidator}
                            id="demo-controlled-open-select"
                            onChange={this.handleChangeTime}
                            value={this.state.time}
                        >
                            <ListSubheader disabled={true}>Midi</ListSubheader>
                            {this.state.arrayLunchTime.map(interval =>
                                <MenuItem key={interval} value={interval}>{interval}</MenuItem>)
                            } 
                            <ListSubheader disabled={true}>Soir</ListSubheader>
                            {this.state.arrayDinnerTime.map(interval =>
                                <MenuItem key={interval} value={interval}>{interval}</MenuItem>)
                            } 
                        </Select>
                    </FormControl>
                    : null}
                    {this.state.checkTime != "" ? <span style={{marginTop:'-10px',color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkTime}</span> : null  }      

                    </div>
                    </div>
                    : 
                    this.state.addressTakeAwayPanel ? 
                    <div style={{display:'flex',flexDirection:'row',width:"100%"}}>

                    <div style={{display:'flex',flexDirection:'column',width:"45%",color:"secondary",fontSize:'14px',marginBottom:'10px'}}>
        
                    <label style={{marginLeft:'10px',marginTop:'10px'}}>Nom *</label>
                    <TextField type="text" 
                               name="nom"
                               error={this.state.lastnameValidator}
                               style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'90%'}} 
                               variant="outlined"  
                               value={this.state.nom} 
                               onChange={this.handleChangeLastname} />
            {this.state.checkLastname != "" ?<span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkLastname}</span>  : null }          
                    <label style={{marginLeft:'10px',marginTop:'20px'}}>Prénom *</label>
                    <TextField type="text" 
                               name="prenom"
                               error={this.state.firstnameValidator}
                               style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'90%'}} 
                               variant="outlined"  
                               value={this.state.prenom} 
                               onChange={this.handleChangeFirstname} />
            {this.state.checkFirstname != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkFirstname}</span>  : null }          
                    <label style={{marginLeft:'10px',marginTop:'20px'}}>Téléphone *</label>
                    <TextField type="tel" 
                               name="telephone"
                               error={this.state.phoneValidator}
                               style={{marginLeft:'10px',marginTop:'10px',background:'white', width:'90%'}} 
                               variant="outlined"  
                               value={this.state.phone} 
                               onChange={this.handleChangePhone} />
            {this.state.checkPhone != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkPhone}</span> : null}          
                    

                    </div>
                    
                    <div style={{visibility:this.state.addressTakeAwayPanel,display:'flex',flexDirection:'column',width:"90%",fontSize:'14px'}}>         
                    <FormControl variant="outlined"  >
                    <label style={{marginLeft:'10px',marginTop:'10px'}}>Date *</label>
                    <Select style={{marginLeft:'10px',marginTop:'10px',marginBottom:'10px',background:'white',width:'90%'}}
                        labelId="demo-controlled-open-select-label"
                        error={this.state.dateValidator}
                        id="demo-controlled-open-select"
                        onChange={this.handleChangeDate}
                        value={this.state.date}
                        >
                        <MenuItem disabled={this.state.todayDisabled} value={this.state.today}>{this.state.today}</MenuItem>
                        <MenuItem disabled={this.state.tomorrowDisabled} value={this.state.tomorrow}>{this.state.tomorrow }</MenuItem>
                        </Select>
                        {this.state.checkDate != "" ? <span style={{color:"red", fontSize:"13px", fontStyle:"italic",marginTop:'-10px', marginLeft:"10px"}}>{this.state.checkDate}</span> : null }          

                    </FormControl>
                    {(this.state.arrayLunchTime.length > 0 || this.state.arrayDinnerTime.length > 0)  ? 
                    <FormControl variant="outlined" >
                        <label style={{marginTop:'10px',marginLeft:'10px'}}>Plage horaire souhaitée *</label>
                        <Select style={{marginLeft:'10px',marginTop:'10px',marginBottom:'10px',background:'white',width:'30%'}}
                            labelId="demo-controlled-open-select-label"
                            error={this.state.timeValidator}
                            id="demo-controlled-open-select"
                            onChange={this.handleChangeTime}
                            value={this.state.time}
                        >
                            <ListSubheader disabled={true} >Midi</ListSubheader>
                            {this.state.arrayLunchTime.map(interval =>
                                <MenuItem key={interval} value={interval}>{interval}</MenuItem>)
                            } 
                            <ListSubheader disabled={true}>Soir</ListSubheader>
                            {this.state.arrayDinnerTime.map(interval =>
                                <MenuItem key={interval} value={interval}>{interval}</MenuItem>)
                            } 
                        </Select>
                    </FormControl>
                    : null}
                    {this.state.checkTime != "" ? <span style={{marginTop:'-10px',color:"red", fontSize:"13px", fontStyle:"italic", marginLeft:"10px"}}>{this.state.checkTime}</span> : null  }      

                    </div>
                    </div> : null 
                }
                </Paper>             

            </Paper>
            <Paper style={{marginTop:'10px',width:'70%',display:'flex',flexDirection:'column'}}>
            <div style={{marginLeft:'20px',marginTop:'15px'}}>Commentaire</div>
                <TextField
                    style={{width:'80%',marginLeft:'10%',marginTop:'10px',marginBottom:'10px'}}
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={this.state.message} 
                    onChange={this.handleChangeMessage} 
                    />
                </Paper>
            <CustomButton customClick={this.checkCommand} name="Valider la commande" color='linear-gradient(#e74042, #b20e10)' width='130px' height='40px' fontSize='14px'/>
            </Paper>
          </div>
        )
    }
}

const mapStateToProps = state => ({
    commandProducts : state.commandProducts.commandProducts
  })

const mapDispatchedToProps = dispatch => ({
    addCommandProduct: product => dispatch(addCommandProduct(product)),
    removeCommandProduct: product => dispatch(removeCommandProduct(product)),
    deleteCommandProduct: product => dispatch(deleteCommandProduct(product))
  })

export default connect(mapStateToProps,mapDispatchedToProps)(CommandValidation)

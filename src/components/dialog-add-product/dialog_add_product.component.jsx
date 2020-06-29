import React, {Component} from 'react';

// imports material
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';

// import switch IOS
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'; 
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

// import bouton customisable
import CustomButton from '../../components/custom-button/custom_button.component';

// import api
import {postProduct} from '../../services/api_service';

// import service auth
import {isAuthenticated} from '../../services/auth-helper';

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
class DialogAddProduct extends Component  {
    constructor(props){
      super(props)
      this.state={
        name:"",
        numberPieces:0,
        price:0,
        availability:false,
        comment:"",
        photo:"",
        nameValidator:false,
        numberPiecesValidator:false,
        priceValidator:false,
        commentvalidator:false,
        checkName:"",
        checkNumberPieces:false,
        checkPrice:false,
        checkComment:false,
        checkPhoto:false
      }
      this.handleClose = this.handleClose.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSwitch = this.handleSwitch.bind(this);
      this.handlePhoto = this.handlePhoto.bind(this);
      this.handleSaveProduct = this.handleSaveProduct.bind(this)
    }  

    handleChange = (e) => {
      e.target.value = e.target.value.replace(/^\s/,'')
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleClose = () => {
      this.props.onClose();
    };

    handleSwitch = () => {
      this.setState({
        availability: !this.state.availability
      })
    }

    handlePhoto = (e) =>{
      this.setState({
        photo: e.target.files[0].name
      })
    } 

    checkName(name){
      return new Promise((resolve, reject) => {
          if(name == ""){
              this.setState({
                  checkName:'Nom non valide', nameValidator:true
              }, () => reject())
          }
          else {
              this.setState({
                  checkName:'', nameValidator:false
              }, () => resolve())
          }
      })
    }

    checkNumberPieces(numberPieces){
      return new Promise((resolve, reject) => {
        if(numberPieces == 0){
            this.setState({
                checkNumberPieces:'Nombre de pièces non valide', numberPiecesValidator:true
            }, () => reject())
        }
        else {
            this.setState({
                checkNumberPieces:'', numberPiecesValidator:false
            }, () => resolve())
        }
    })
    }

    checkPrice(price){
      return new Promise((resolve, reject) => {
        if(price == 0){
            this.setState({
                checkPrice:'Prix non valide', priceValidator:true
            }, () => reject())
        }
        else {
            this.setState({
                checkPrice:'', priceValidator:false
            }, () => resolve())
        }
    })
    }

    checkComment(comment){
      return new Promise((resolve, reject) => {
          if(comment == ""){
              this.setState({
                  checkComment:'Commentaire non valide', commentValidator:true
              }, () => reject())
          }
          else {
              this.setState({
                  checkComment:'', commentValidator:false
              }, () => resolve())
          }
      })
    }

    handleSaveProduct(){
      this.checkName(this.state.name).then(() => {
        this.checkNumberPieces(this.state.numberPieces).then(() => {
          this.checkPrice(this.state.price).then(() => {
            this.checkComment(this.state.comment).then(() => {
              postProduct(this.props.category, this.state.name, this.state.numberPieces, this.state.price, this.state.availability, this.state.comment, isAuthenticated())
                .then(() => {
                  this.handleClose()
                })
            }).catch(error => {
              console.log(error)
            })
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    }
  

    render(){
      return (
      <Dialog onClose={this.handleClose}  open={this.props.open} >
        <DialogTitle id="simple-dialog-title" style={{background:"#EEEEEE"}}>Ajout dans catégorie: {this.props.category}</DialogTitle>
        <div style={{background:"#EEEEEE"}}>
        <FormControl style={{background:"#EEEEEE",width:'600px',display:'flex',flexDirection:"row",justifyContent:'space-evenly'}}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{height:'100px',display:'flex',flexDirection:'column'}}>
              <label style={{fontWeight:'bold'}}>Nom</label>
              <TextField type="text" variant="outlined" name="name" value={this.state.name} onChange={this.handleChange} error={this.state.nameValidator} style={{background:'white',marginTop:'5px'}}/>
              {this.state.checkName!= "" ? <span style={{fontStyle:"italic", color:"red", fontSize:'12px'}}>{this.state.checkName}</span> : null}
            </div>
            <div style={{height:'100px',display:'flex',flexDirection:'column'}}>
              <label style={{fontWeight:'bold'}}>Nombre de pièces</label>
              <TextField type="number" variant="outlined" name="numberPieces" value={this.state.numberPieces} onChange={this.handleChange} error={this.state.numberPiecesValidator} style={{background:'white',marginTop:'5px'}}/>
              {this.state.checkNumberPieces!= "" ? <span style={{fontStyle:"italic", color:"red", fontSize:'12px'}}>{this.state.checkNumberPieces}</span> : null}
            </div>
            <div style={{height:'100px',display:'flex',flexDirection:'column'}}>
              <label style={{fontWeight:'bold'}}>prix</label>
              <TextField type="number" variant="outlined" name="price" value={this.state.price} onChange={this.handleChange} error={this.state.priceValidator} style={{background:'white',marginTop:'5px'}}/>
              {this.state.checkPrice!= "" ? <span style={{fontStyle:"italic", color:"red", fontSize:'12px'}}>{this.state.checkPrice}</span> : null}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{height:'100px',display:'flex',flexDirection:'column'}}>
              <label style={{fontWeight:'bold'}}>Disponibilité</label>
              <FormControlLabel
                 style={{marginLeft:'5%'}} control={<IOSSwitch checked={this.state.availability} onClick={this.handleSwitch}/>}
              />   
            </div>
              <div style={{height:'100px',display:'flex',flexDirection:'column'}}>
              <label style={{fontWeight:'bold'}}>Commentaire</label>
              <TextField type="string" variant="outlined" name="comment" value={this.state.comment} onChange={this.handleChange} error={this.state.commentValidator} style={{background:'white',marginTop:'5px'}}/>
              {this.state.checkComment != "" ? <span style={{fontStyle:"italic", color:"red", fontSize:'12px'}}>{this.state.checkComment}</span> : null}
            </div>
            <div style={{height:'100px',display:'flex',flexDirection:'column'}}>
            <label style={{fontWeight:'bold'}}>photo</label>
              <input type="file" id="file" name="photo" value={this.state.photo} onChange={this.handlePhoto} style={{background:'white',marginTop:'5px',display:'none'}}/>
              <label htmlFor="file" style={{cursor:'pointer',textAlign:'center',verticalAlign:'baseline',fontWeight:'bold',marginTop:'5px',border:"1px solid #ddac00",borderRadius:'5px',boxShadow:"inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 0 #fff",width:'229px',textShadow:"0 1px 0 #feec98",padding:'16px 17px',background:'linear-gradient(#ffe073, #ffc514)'}} onChange={(e) => this.handlePhoto(e)}>
                {this.state.photo == "" ? <span>Choose a photo</span> : <span >{this.state.photo.slice(0,20)} ...</span>}
              </label>
              {this.state.checkPhoto != "" ? <span style={{fontStyle:"italic", color:"red", fontSize:'12px'}}>{this.state.checkPhoto}</span> : null}
            </div>
          </div>
        </FormControl>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
        <CustomButton
            name="Annuler"
            color="linear-gradient(#e74042, #b20e10)"
            customClick={this.handleClose}
            fontSize='14px'
            width='100px'
            height='40px'
            />
          <CustomButton
            name="Enregistrer"
            color="linear-gradient(#e74042, #b20e10)"
            customClick={this.handleSaveProduct}
            fontSize='14px'
            width='100px'
            height='40px'
            />
        </div>
        </div>
      </Dialog>
    );
  }

  }

export default DialogAddProduct;
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import svg

import { ReactComponent as ArrowDown } from '../../assets/expand.svg';

// import material

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import LinearProgress from '@material-ui/core/LinearProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


// import API

import { getProducts } from '../../services/api_service';


// import composants

import DialogAddProduct from '../../components/dialog-add-product/dialog_add_product.component';
import DialogUpdateProduct from '../../components/dialog-update-product/dialog_update_product.component';

// import socket
import openSocket from 'socket.io-client';

//import theme

import theme_progress_bar from '../../themes/theme_progress_bar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../themes/theme_products.js';

import './products.styles.scss'

class Products extends Component {
  constructor(props){
    super(props)
    this.state={
        product:{},
        category:'',
        products:[],
        dialogAddProduct:false,
        dialogUpdateProduct:false,
        open:false,
        positionPopover:null,
        element:'plateaux',
        progress:'visible'
    }

    this.handleProduct = this.handleProduct.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this)
    this.handleUpdateProduct = this.handleUpdateProduct.bind(this) 
    this.handleCloseAdd = this.handleCloseAdd.bind(this)
    this.handleCloseUpdate = this.handleCloseUpdate.bind(this)
    this.handleOpenPopover = this.handleOpenPopover.bind(this)
    this.handleClosePopover = this.handleClosePopover.bind(this)
  }

  componentDidMount(){
    const socket = openSocket('http://localhost:3000');
    getProducts("plateaux").then(
        products => products.map((product, index) =>
        this.setState({
            products:[...this.state.products,product],
            category:"plateaux",
            progress: index === products.length-1 ? 'hidden' : 'visible'

        }))
    )
    //ReactDOM.findDOMNode(document.getElementById('plateaux')).style.fontWeight = 'bold'
    socket.on('post_product', data => {
        if(data.post.date == this.state.date){
          this.setState(
            {products: [...this.state.products,data.post] }
          )}
          })
    socket.on('update_product', data => {
        this.setState(prevState => ({
            products: prevState.products.map(product => product._id === data.update._id ? {...product,price:data.update.price,numberPieces:data.update.numberPieces,comment:data.update.comment,availability:data.update.availability} : product)
          }))
    })
    
  }



  handleProduct(chosenProduct){
      if(this.state.element != ''){
        ReactDOM.findDOMNode(document.getElementById(this.state.element)).style.fontWeight = ''
      }
    this.setState(
        {element:chosenProduct, products:[], category:chosenProduct
        }) 
    ReactDOM.findDOMNode(document.getElementById(chosenProduct)).style.fontWeight = 'bold'
    getProducts(chosenProduct).then(
        products => products.map(product =>
        this.setState({
            products:[...this.state.products,product]
        }))
    )

  }

    handleAddProduct(){
    this.setState({
        dialogAddProduct:true
        })
    }
    handleCloseAdd = () => {
        this.setState({
            dialogAddProduct:false
        })
      };

    handleUpdateProduct(product){
        this.setState({
            dialogUpdateProduct:true, product: product
        })
    }

    handleCloseUpdate = () => {
        this.setState({
            dialogUpdateProduct:false
        })
      };

    handleOpenPopover = (e) =>{
        this.setState({
            open: true, positionPopover:e.currentTarget 
        })
    }

    handleClosePopover = () => {
        this.setState({
            open: false, positionPopover:null
        })
    }




    render() {
      return (
    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        {this.state.progress ==='visible' ? 
                <MuiThemeProvider theme={theme_progress_bar}>
                <Paper style={{marginTop:'20px',height:'25px',width:'95%',display:"flex",flexDirection:"row",justifyContent:'center',background:"#f2f2f2"}}>
                    <LinearProgress style={{visibility:this.state.progress,marginTop:"10px",colorPrimary:"primary", width:'95%'}} />
                </Paper>
                </MuiThemeProvider>
                :     
        <Paper style={{marginTop:'2%',width:'70%',background:"#f2f2f2",height:'100%',display:'flex',flexDirection:'row'}}>
            <Paper style={{width:'20%',marginLeft:'10px',marginTop:'10px',marginBottom:'10px',background:'linear-gradient(#343333, #090909)',display:'flex',flexDirection:'column'}}>
                <div id="plateaux" onClick={() => this.handleProduct("plateaux")} style={{margin:'20px',color:'white',cursor:'pointer'}}>Plateaux</div>
                <Divider style={{backgroundColor:'#f2f2f2'}}/>
                <div  id="entree" onClick={() => this.handleProduct("entree")} style={{margin:'20px',color:'white', cursor:'pointer'}}>Entrées</div>
                <Divider style={{backgroundColor:'#f2f2f2'}}/>
                <div id="plats" onClick={(e) => this.handleOpenPopover(e)} style={{margin:'20px',color:'white', cursor:'pointer'}}><div style={{display:'flex',flexDirection:'row'}}><label >Plats</label> <div style={{marginTop:'2px'}}><ArrowDown style={{marginLeft:'5px',width:'14px',height:'14px'}}/></div></div> </div>
                <Divider style={{backgroundColor:'#f2f2f2'}}/>
                <MuiThemeProvider theme={theme}>
                <Popover
                    open={this.state.open}
                    onClose={this.handleClosePopover}
                    anchorEl={this.state.positionPopover}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                >
                <div>
                    <div id="california" onClick={() => this.handleProduct("california")} style={{margin:'20px', cursor:'pointer'}}>california rolls</div>
                    <Divider  style={{backgroundColor:'#f2f2f2'}}/>
                    <div id="créations" onClick={() => this.handleProduct("creations")} style={{margin:'20px', cursor:'pointer'}}>créations</div>
                    <Divider style={{backgroundColor:'#f2f2f2'}}/>
                    <div id="sashimi" onClick={() => this.handleProduct("sashimi")} style={{margin:'20px', cursor:'pointer'}}>sashimi</div>
                </div>
                </Popover>
                </MuiThemeProvider>
                <div id="désserts" onClick={() => this.handleProduct("désserts")} style={{margin:'20px',color:'white', cursor:'pointer'}}>Désserts</div>
                <Divider  style={{backgroundColor:'#f2f2f2'}}/>
                <div id="boissons" onClick={() => this.handleProduct("boissons")} style={{margin:'20px',color:'white', cursor:'pointer'}}>Boissons</div>
                <Divider style={{backgroundColor:'#f2f2f2'}}/>
                <div id="formules" onClick={() => this.handleProduct("formules")} style={{margin:'20px',color:'white', cursor:'pointer'}}>Formules midi</div>

            </Paper>
            <Paper style={{width:'80%',marginRight:'10px',marginTop:'10px',marginBottom:'10px',overflowY:"auto",overflowX:"hidden",height:"350px"}}>
            <GridList cellHeight={100} cols={3}>
                    {this.state.products.map((tile) => (
                <GridListTile key={tile.name} cols={1} onClick={() => this.handleUpdateProduct(tile)} >
                   <div style={{marginLeft:"6px",marginTop:"5px",opacity:'0.8',border:"2px solid #014DC2",background:"#6495ED",cursor:'pointer',width:"90%",height:"90%",borderRadius:"3px",display:"flex",flexDirection:"column"}}>
                        <div style={{height:"50%",width:"97%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}><span>{tile.name}</span></div>
                        <div style={{width:"97%",height:"45%",display:"flex",flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end"}}><span style={{marginRight:"10px"}}>{tile.price.toFixed(2)} €</span></div>
                    </div> 
                </GridListTile>
                    ))}
                    <GridListTile >
                        <div style={{display:'flex',flexDirection:"row",justifyContent:"center",alignItems:"center", width:"90%",height:"100%"}}>
                            <Fab size="large" color="primary" aria-label="add" onClick={this.handleAddProduct}>
                                <AddIcon />
                            </Fab>
                        </div>
                    </GridListTile>
                </GridList>
            </Paper>
            { this.state.dialogUpdateProduct ? <DialogUpdateProduct open={this.state.dialogUpdateProduct} onClose={this.handleCloseUpdate} product={this.state.product}/>: null }
            <DialogAddProduct open={this.state.dialogAddProduct} onClose={this.handleCloseAdd} category={this.state.category} />
        </Paper>}
    </div>
      )
    }
}



export default Products